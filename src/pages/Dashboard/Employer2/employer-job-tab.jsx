import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Briefcase,
  FileText,
  MoreHorizontal,
  Eye,
  X,
  Check,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useOutletContext } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sampleJobs } from "@/utils/data/employer-mock-data";
import { Badge } from "@/components/ui/badge";
import { Toaster } from "@/components/ui/toaster";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CreateNewJob from "@/components/Employer/createNewJob";

export default function EmployerJobTab() {
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

  const [activeTab, setActiveTab] = useState("all");

  const [jobs, setJobs] = useState(sampleJobs);
  const { toast } = useToast();

  const filterActive = sampleJobs.filter((job) => job.status === "active");
  const filterClosed = sampleJobs.filter((job) => job.status === "closed");

  const handleCloseJob = (jobId) => {
    const updatedJobs = jobs.map((job) =>
      job.id === jobId ? { ...job, status: "closed" } : job
    );
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    toast({
      title: "Job Closed",
      description:
        "The job has been closed and is no longer accepting applications",
    });
  };

  const handleDeleteJob = (jobId) => {
    const updatedJobs = sampleJobs.filter((job) => job.id !== jobId);

    toast({
      title: "Job Deleted",
      description: "The job has been permanently deleted",
    });
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-end">
        <CreateNewJob />
      </div>

      <div>
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-start md:items-center">
          <Tabs
            className="w-full space-y-10"
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger
                className="border-none data-[state=active]:bg-sky-500 data-[state=active]:text-sky-50 hover:bg-white hover:text-slate-950"
                value="all"
              >
                All Jobs
                <Badge variant="secondary" className="ml-2">
                  {jobs.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger
                className="border-none data-[state=active]:bg-sky-500 data-[state=active]:text-sky-50 hover:bg-white hover:text-slate-950"
                value="active"
              >
                Active
                {sampleJobs.length > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {jobs.filter((job) => job.status === "active").length}
                  </Badge>
                )}
              </TabsTrigger>

              <TabsTrigger
                className="border-none data-[state=active]:bg-sky-500 data-[state=active]:text-sky-50 hover:bg-white hover:text-slate-950"
                value="closed"
              >
                Closed
                {filterClosed.length > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {jobs.filter((job) => job.status === "closed").length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <div className="space-y-8">
                {sampleJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onCloseJob={handleCloseJob}
                    onDeleteJob={handleDeleteJob}
                    setJobs={setJobs}
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="active" className="mt-4">
              <div className="space-y-8">
                {filterActive.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onCloseJob={handleCloseJob}
                    onDeleteJob={handleDeleteJob}
                    setJobs={setJobs}
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="closed" className="mt-4">
              {filterClosed.length > 0 ? (
                filterClosed.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onCloseJob={handleCloseJob}
                    onDeleteJob={handleDeleteJob}
                    setJobs={setJobs}
                  />
                ))
              ) : (
                <div className="text-center p-8 border rounded-lg">
                  <p className="text-muted-foreground">
                    No jobs found. Create your first job posting!
                  </p>
                </div>
              )}
            </TabsContent>
            <Toaster />
          </Tabs>
        </div>
      </div>
    </div>
  );
}

const JobCard = ({ job, onCloseJob, onDeleteJob, setJobs }) => {
  const [isApplicantsDialogOpen, setIsApplicantsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleUpdateApplicantStatus = (applicantId, newStatus) => {
    // Update applicant status
    const updatedApplicants = job.applicants.map((applicant) =>
      applicant.id === applicantId
        ? { ...applicant, status: newStatus }
        : applicant
    );

    // Update job with new applicants list
    const updatedJob = { ...job, applicants: updatedApplicants };

    // Update jobs in state and localStorage
    const jobs = JSON.parse(localStorage.getItem("jobs") || "[]");
    const updatedJobs = jobs.map((j) => (j.id === job.id ? updatedJob : j));
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));

    // Update the jobs state in the parent component
    setJobs(updatedJobs);

    toast({
      title: "Status Updated",
      description: `Applicant status changed to ${newStatus}`,
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <span
                className={`rounded-full px-2 py-1 text-xs ${
                  job.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {job.status === "active" ? "Active" : "Closed"}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" /> {job.jobType}
              </span>
              <span>•</span>
              <span>{job.location}</span>
              <span>•</span>
              <span>{job.salary}</span>
              <span>•</span>
              <span>Posted {job.postedDate}</span>
            </div>
            <p className="mt-2 text-sm">{job.description}</p>
          </div>
          <div className="flex flex-col gap-2 md:items-end">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                {job.applicants.length} Applicants
              </span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Edit
              </Button>
              {job.status === "active" ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onCloseJob(job.id)}
                >
                  Close Job
                </Button>
              ) : (
                <Button variant="outline" size="sm">
                  Reopen Job
                </Button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuItem>Share</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => onDeleteJob(job.id)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t">
          <Button
            className="border-none bg-sky-500 hover:bg-sky-600"
            onClick={() => setIsApplicantsDialogOpen(true)}
          >
            View Applicants ({job.applicants.length})
          </Button>
        </div>
      </CardContent>

      {/* Applicants Dialog */}
      <Dialog
        open={isApplicantsDialogOpen}
        onOpenChange={setIsApplicantsDialogOpen}
      >
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Applicants for {job.title}</DialogTitle>
            <DialogDescription>
              {job.applicants.length} applicants for this position
            </DialogDescription>
          </DialogHeader>

          {/* Applicants List */}
          <div className="space-y-4">
            {job.applicants.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                No applicants yet
              </p>
            ) : (
              job.applicants.map((applicant) => (
                <div
                  key={applicant.id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent"
                >
                  <Avatar>
                    <AvatarFallback>
                      {applicant.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{applicant.name}</h3>
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${
                          applicant.status === "review"
                            ? "bg-blue-100 text-blue-800"
                            : applicant.status === "shortlisted"
                            ? "bg-purple-100 text-purple-800"
                            : applicant.status === "interview"
                            ? "bg-green-100 text-green-800"
                            : applicant.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {applicant.status.charAt(0).toUpperCase() +
                          applicant.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {applicant.position} • {applicant.experience} experience
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill={
                            star <= applicant.rating ? "currentColor" : "none"
                          }
                          stroke={
                            star <= applicant.rating ? "none" : "currentColor"
                          }
                          className={`w-4 h-4 ${
                            star <= applicant.rating
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }`}
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleUpdateApplicantStatus(applicant.id, "interview")
                      }
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Interview
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleUpdateApplicantStatus(applicant.id, "rejected")
                      }
                    >
                      <X className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
