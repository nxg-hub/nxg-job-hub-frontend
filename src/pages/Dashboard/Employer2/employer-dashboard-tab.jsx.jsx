import { useEffect, useState } from "react";
import {
  Briefcase,
  BookmarkCheck,
  Eye,
  PenLine,
  Heart,
  MessageCircle,
  Clock,
  FileText,
  Ellipsis,
  BookUser,
} from "lucide-react";

import { cn } from "@/lib/utils";
import sarahicon from "@/static/images/john.png";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  matchesData,
  candidatesData,
  employersData,
} from "@/utils/data/agent-mock-data";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function EmployerDashboardTab() {
  const [candidates, setCandidates] = useState(matchesData);
  const [filteredCandidates, setFilteredCandidates] = useState(matchesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEmployer, setFilterEmployer] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [releaseDialogOpen, setReleaseDialogOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    jobType: "Full-time",
    salaryMin: "",
    salaryMax: "",
    deadline: "",
    skills: "",
    experienceLevel: "Mid Level",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePublishJob = () => {
    // Validate form
    if (!formData.title || !formData.description || !formData.location) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Create new job object
    const newJob = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      location: formData.location,
      jobType: formData.jobType,
      salary: `$${formData.salaryMin} - $${formData.salaryMax}`,
      deadline: formData.deadline,
      skills: formData.skills.split(",").map((skill) => skill.trim()),
      experienceLevel: formData.experienceLevel,
      status: "active",
      postedDate: new Date().toLocaleDateString(),
      applicants: [],
    };

    // In a real app, you would save this to a database
    // For this demo, we'll use localStorage to persist the job
    const existingJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
    localStorage.setItem("jobs", JSON.stringify([...existingJobs, newJob]));

    toast({
      title: "Job Published",
      description: "Your job has been successfully published",
    });

    // Navigate to job listings
    setActiveMenu("jobs");
  };

  // Apply filters when search term or filters change
  useEffect(() => {
    let result = candidates;

    if (searchTerm) {
      result = result.filter(
        (candidate) =>
          candidate.candidate.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          candidate.job.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterEmployer) {
      result = result.filter(
        (candidate) => candidate.employer.name === filterEmployer
      );
    }

    if (filterStatus) {
      result = result.filter((candidate) => candidate.status === filterStatus);
    }

    setFilteredCandidates(result);
  }, [searchTerm, filterEmployer, filterStatus, candidates]);

  // Handle releasing a candidate from an employer
  const handleReleaseCandidate = () => {
    if (selectedCandidate) {
      setCandidates(
        candidates.filter((candidate) => candidate.id !== selectedCandidate.id)
      );
      setReleaseDialogOpen(false);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setFilterEmployer("");
    setFilterStatus("");
  };

  const suggestedCandidates = [
    {
      candidateImage: sarahicon,
      candidateFullname: "Oluwasun Opeyemi",
      candidateRole: "React Developer",
      candidateAvalability: "Full Time",
      candidateTitle: "Junior Dev",
    },
    {
      candidateImage: sarahicon,
      candidateFullname: "Oluwasun Opeyemi",
      candidateRole: "React Developer",
      candidateAvalability: "Full Time",
      candidateTitle: "Junior Dev",
    },
    {
      candidateImage: sarahicon,
      candidateFullname: "Oluwasun Opeyemi",
      candidateRole: "React Developer",
      candidateAvalability: "Full Time",
      candidateTitle: "Junior Dev",
    },
  ];

  const recentJobs = [
    {
      jobTitle: "Web developer",
      jobLocation: "Abuja",
      timePosted: "6 Days ago",
      experienced: "Experieced",
      seasonal: "Seasional",
      numverOfApplicant: 15,
      aboutJob: `We're looking for an experienced Machine Learning Engineer to join our AI team. 
        The ideal candidate will have strong experience in developing and deploying machine learning models at scale.`,
    },
    {
      jobTitle: "Web developer",
      jobLocation: "Abuja",
      timePosted: "6 Days ago",
      experienced: "Experieced",
      seasonal: "Seasional",
      numverOfApplicant: 15,
      aboutJob: `We're looking for an experienced Machine Learning Engineer to join our AI team. 
        The ideal candidate will have strong experience in developing and deploying machine learning models at scale.`,
    },
    {
      jobTitle: "Web developer",
      jobLocation: "Abuja",
      timePosted: "6 Days ago",
      experienced: "Experieced",
      seasonal: "Seasional",
      numverOfApplicant: 15,
      aboutJob: `We're looking for an experienced Machine Learning Engineer to join our AI team. 
        The ideal candidate will have strong experience in developing and deploying machine learning models at scale.`,
    },
  ];
  return (
    <div className=" p-8">
      <div className="flex">
        <h1 className="text-2xl text-sky-600 font-medium">Dashboard</h1>
        <div className="ml-auto flex gap-4">
          <div className="flex items-center justify-end">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="border-none bg-sky-500 hover:bg-sky-600">
                  <FileText className="mr-2 h-4 w-4" />
                  Create New Job
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Job</DialogTitle>
                </DialogHeader>

                <Card>
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Job Title</Label>
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="e.g. Senior Frontend Developer"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Job Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="min-h-[150px]"
                        placeholder="Describe the responsibilities, requirements, and benefits of the position..."
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          placeholder="e.g. San Francisco, CA or Remote"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="jobType">Job Type</Label>
                        <Select
                          value={formData.jobType}
                          onValueChange={(value) =>
                            handleSelectChange("jobType", value)
                          }
                        >
                          <SelectTrigger id="jobType">
                            <SelectValue placeholder="Select job type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Full-time">Full-time</SelectItem>
                            <SelectItem value="Part-time">Part-time</SelectItem>
                            <SelectItem value="Contract">Contract</SelectItem>
                            <SelectItem value="Internship">
                              Internship
                            </SelectItem>
                            <SelectItem value="Temporary">Temporary</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="salaryMin">
                          Salary Range (Minimum)
                        </Label>
                        <Input
                          id="salaryMin"
                          name="salaryMin"
                          type="number"
                          value={formData.salaryMin}
                          onChange={handleInputChange}
                          placeholder="e.g. 50000"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="salaryMax">
                          Salary Range (Maximum)
                        </Label>
                        <Input
                          id="salaryMax"
                          name="salaryMax"
                          type="number"
                          value={formData.salaryMax}
                          onChange={handleInputChange}
                          placeholder="e.g. 80000"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="deadline">Application Deadline</Label>
                      <Input
                        id="deadline"
                        name="deadline"
                        type="date"
                        value={formData.deadline}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="skills">Required Skills</Label>
                      <Input
                        id="skills"
                        name="skills"
                        value={formData.skills}
                        onChange={handleInputChange}
                        placeholder="e.g. React, JavaScript, CSS"
                      />
                      <p className="text-xs text-muted-foreground">
                        Separate skills with commas
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experienceLevel">Experience Level</Label>
                      <Select
                        value={formData.experienceLevel}
                        onValueChange={(value) =>
                          handleSelectChange("experienceLevel", value)
                        }
                      >
                        <SelectTrigger id="experienceLevel">
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Entry Level">
                            Entry Level
                          </SelectItem>
                          <SelectItem value="Mid Level">Mid Level</SelectItem>
                          <SelectItem value="Senior Level">
                            Senior Level
                          </SelectItem>
                          <SelectItem value="Executive">Executive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
                <DialogFooter className="flex justify-end gap-2">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>

                  <Button
                    className="border-none bg-sky-500 hover:bg-sky-600"
                    onClick={handlePublishJob}
                  >
                    Publish Job
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex items-center space-x-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">
                  New Applicants
                  <Badge variant="secondary" className="ml-2">
                    2
                  </Badge>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>New Applicants</SheetTitle>
                </SheetHeader>
                <Separator className="my-8" />
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between">
                    <h1>Designer</h1>
                    <Badge
                      variant="secondary"
                      className="ml-2 bg-sky-500 text-white"
                    >
                      4
                    </Badge>
                  </div>
                  <div className="flex flex-col">
                    {[1, 2, 3, 4].map(() => (
                      <div className="flex items-center gap-2 p-3 rounded hover:bg-sky-50 hover:cursor-pointer">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={sarahicon} alt="Sarah" />
                          <AvatarFallback className="text-2xl">
                            AC
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <p className="text-slate-900 font-medium text-sm">
                            Oluwaseun
                          </p>
                          <p className="text-slate-500 text-xs">Opeyemi</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator className="my-8" />
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between">
                    <h1>Web developer</h1>
                    <Badge
                      variant="secondary"
                      className="ml-2 bg-sky-500 text-white"
                    >
                      2
                    </Badge>
                  </div>
                  <div className="flex flex-col">
                    {[1, 2].map(() => (
                      <div className="flex items-center gap-2 p-3 rounded hover:bg-sky-50 hover:cursor-pointer">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={sarahicon} alt="Sarah" />
                          <AvatarFallback className="text-2xl">
                            AC
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <p className="text-slate-900 font-medium text-sm">
                            Oluwaseun
                          </p>
                          <p className="text-slate-500 text-xs">Opeyemi</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {(filterEmployer || filterStatus) && (
              <Button
                className="border-none bg-red-500 hover:bg-red-600"
                size="sm"
                onClick={resetFilters}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8 mt-10">
        <div className="flex justify-between">
          <KpiCard
            title="Posted Job"
            value="07"
            icon={
              <div className="bg-orange-100 p-3 rounded-full">
                <Briefcase className="h-5 w-5 text-orange-400" />
              </div>
            }
          />
          <KpiCard
            title="Shortlisted"
            value="24"
            icon={
              <div className="bg-sky-100 p-3 rounded-full">
                <BookmarkCheck className="h-5 w-5 text-sky-400" />
              </div>
            }
          />
          <KpiCard
            title="Application"
            value="1.4k"
            icon={
              <div className="bg-cyan-100 p-3 rounded-full">
                <Eye className="h-5 w-5 text-cyan-400" />
              </div>
            }
          />
          <KpiCard
            title="Save Candidate"
            value="04"
            icon={
              <div className="bg-green-100 p-3 rounded-full">
                <PenLine className="h-5 w-5 text-green-400" />
              </div>
            }
          />
        </div>
        <div className="flex flex-col gap-7">
          <p className="text-sky-600 font-medium text-lg">
            Suggested Candidates
          </p>
          <div className="flex gap-8">
            {suggestedCandidates.map((candidate) => (
              <CandidateCard
                candidateImage={candidate.candidateImage}
                candidateFullname={candidate.candidateFullname}
                candidateRole={candidate.candidateRole}
                candidateAvalability={candidate.candidateAvalability}
                candidateTitle={candidate.candidateTitle}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-7">
          <p className="text-sky-600 font-medium text-lg">Recent job Posts</p>
          <div className="flex gap-8">
            {recentJobs.map((job) => (
              <JobCard
                jobTitle={job.jobTitle}
                jobLocation={job.jobLocation}
                timePosted={job.timePosted}
                experienced={job.experienced}
                seasonal={job.seasonal}
                numverOfApplicant={job.numverOfApplicant}
                aboutJob={job.aboutJob}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const KpiCard = ({ title, value, icon }) => {
  return (
    <div className={cn("bg-white flex items-center gap-20 rounded-2xl p-6")}>
      <div>
        <p className="text-slate-800 font-medium text-3xl">{value}</p>
        <p className="text-gray-500 text-sm">{title}</p>
      </div>
      <>{icon}</>
    </div>
  );
};

const CandidateCard = ({
  candidateImage,
  candidateFullname,
  candidateRole,
  candidateAvalability,
  candidateTitle,
}) => {
  return (
    <div className="flex flex-col bg-white rounded-2xl py-4 px-8 gap-3">
      <div className="flex"></div>
      <div className="flex items-center justify-center gap-20 mb-3">
        <div className="flex items-center justify-center gap-2">
          <Avatar className="h-16 w-16">
            <AvatarImage src={candidateImage} alt="Sarah" />
            <AvatarFallback className="text-2xl">AC</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-slate-900 font-extrabold">{candidateFullname}</p>
            <p className="text-slate-500">{candidateRole}</p>
          </div>
        </div>
        <div className="flex gap-4 text-slate-500 self-start">
          <Heart className="h-5 w-5" />
          <MessageCircle className="h-5 w-5" />
        </div>
      </div>
      <div className="flex gap-10">
        <p className="flex items-center gap-1 text-slate-600">
          <Clock className="h-5 w-5 " />
          {candidateAvalability}
        </p>
        <p className="flex items-center gap-1 text-slate-600">
          <Briefcase className="h-5 w-5" />
          {candidateTitle}
        </p>
      </div>
      <Button className="border-none bg-sky-500 text-white hover:bg-sky-600">
        Invite
      </Button>
    </div>
  );
};

const JobCard = ({
  jobTitle,
  jobLocation,
  timePosted,
  experienced,
  seasonal,
  numverOfApplicant,
  aboutJob,
}) => {
  return (
    <div className="flex flex-col bg-white rounded-2xl py-4 px-8 gap-3">
      <div className="flex justify-between">
        <div>
          <h1 className="text-slate-800 font-bold">{jobTitle}</h1>
          <p className="text-slate-500">{jobLocation}</p>
        </div>
        <div className="flex flex-col items-end text-slate-500">
          <Ellipsis />
          <p>{timePosted}</p>
        </div>
      </div>
      <p>220 VND</p>
      <div className="flex gap-8">
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5" />
          {experienced}
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          {seasonal}
        </div>
        <div className="flex items-center gap-2">
          <BookUser className="w-5 h-5" />
          {numverOfApplicant} Applicants
        </div>
      </div>
      <p>{aboutJob}</p>
    </div>
  );
};

// const JobView = () => {
//   const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
//   const [selectedHeader, setSelectedHeader] = useState("1h");
//   const chartData = [
//     { day: "Mon.", value: 50 },
//     { day: "Tue.", value: 150 },
//     { day: "Wed.", value: 500 },
//     { day: "Thur.", value: 200 },
//     { day: "Fri.", value: 10 },
//     { day: "Sat.", value: 220 },
//     { day: "Sun", value: 100 },
//   ];
//   return (
//     <div className="w-7/12 flex flex-col bg-white rounded-2xl gap-10 p-6">
//       <p className="font-semibold text-lg text-sky-600">Job Views</p>
//       <div className="flex gap-5">
//         <Label className="font-medium text-slate-700 mt-3" htmlFor="select-job">
//           Jobs:
//         </Label>
//         <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
//           <SelectTrigger className="font-medium" id="select-job">
//             <SelectValue placeholder="Select job posted" />
//           </SelectTrigger>
//           <SelectContent>
//             {industryOptions.map((industry) => (
//               <SelectItem key={industry} value={industry}>
//                 {industry}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>
//       <div>
//         <div className="ml-10 flex gap-10">
//           <Button
//             className={cn(
//               selectedHeader === "1h"
//                 ? "bg-sky-600 border-none hover:bg-sky-500"
//                 : "text-sky-600",
//               "h-9 rounded-full px-6"
//             )}
//             variant={selectedHeader === "1h" ? "default" : "outline"}
//             onClick={() => setSelectedHeader("1h")}
//           >
//             1h
//           </Button>
//           <Button
//             className={cn(
//               selectedHeader === "Day"
//                 ? "bg-sky-600 border-none hover:bg-sky-500"
//                 : "text-sky-600",
//               "h-9 rounded-full px-6"
//             )}
//             variant={selectedHeader === "Day" ? "default" : "outline"}
//             onClick={() => setSelectedHeader("Day")}
//           >
//             Day
//           </Button>
//           <Button
//             className={cn(
//               selectedHeader === "Week"
//                 ? "bg-sky-600 border-none hover:bg-sky-500"
//                 : "text-sky-600",
//               "h-9 rounded-full px-6"
//             )}
//             variant={selectedHeader === "Week" ? "default" : "outline"}
//             onClick={() => setSelectedHeader("Week")}
//           >
//             Week
//           </Button>
//           <Button
//             className={cn(
//               selectedHeader === "Month"
//                 ? "bg-sky-600 border-none hover:bg-sky-500"
//                 : "text-sky-600",
//               "h-9 rounded-full px-6"
//             )}
//             variant={selectedHeader === "Month" ? "default" : "outline"}
//             onClick={() => setSelectedHeader("Month")}
//           >
//             Month
//           </Button>
//           <Button
//             className={cn(
//               selectedHeader === "Year"
//                 ? "bg-sky-600 border-none hover:bg-sky-500"
//                 : "text-sky-600",
//               "h-9 rounded-full px-6"
//             )}
//             variant={selectedHeader === "Year" ? "default" : "outline"}
//             onClick={() => setSelectedHeader("Year")}
//           >
//             Year
//           </Button>
//         </div>
//       </div>
//       <AreaChart width={730} height={250} data={chartData}>
//         <defs>
//           <linearGradient id="colorUv" x1={0} y1={0} y2={1}>
//             <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
//             <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
//           </linearGradient>
//           <XAxis dataKey="day" />
//           <YAxis />
//           <Area
//             type="monotone"
//             dataKey="day"
//             stroke="#8884d8"
//             fillOpacity="url(#colorUv)"
//           />
//         </defs>
//       </AreaChart>
//     </div>
//   );
// };
