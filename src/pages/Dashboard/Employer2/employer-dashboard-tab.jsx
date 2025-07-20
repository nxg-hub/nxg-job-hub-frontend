import { useContext, useEffect, useState } from "react";
import {
  Briefcase,
  BookmarkCheck,
  Eye,
  Heart,
  MessageCircle,
  Clock,
  PenLine,
  FileText,
} from "lucide-react";

import { cn } from "@/lib/utils";
import sarahicon from "@/static/images/John.png";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { matchesData } from "@/utils/data/agent-mock-data";
import CreateNewJob from "@/components/Employer/createNewJob";
import RecentPostedJobs from "@/components/Employer/recentPostedJobs";
import NewApplicants from "@/components/Employer/newApplicants";
import SuggestedCandidates from "@/components/Employer/suggestedCandidate";
import { Separator } from "@radix-ui/react-context-menu";
import emptySuggestedImage from "@/static/images/empty-suggest.svg";
import emptyRecentPostImage from "@/static/images/empty-employer-table.svg";
import UserGuard from "@/components/Employer/employerUserGuard";

export default function EmployerDashboardTab() {
  const [candidates, setCandidates] = useState(matchesData);
  const [filteredCandidates, setFilteredCandidates] = useState(matchesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEmployer, setFilterEmployer] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [releaseDialogOpen, setReleaseDialogOpen] = useState(false);
  const [isCreateJobDialogOpen, setIsCreateJobDialogOpen] = useState(false);
  const [isProfileNotComplete, setIsProfileNotNotComplete] = useState(true);
  const [showGuard, setShowGuard] = useState(false);

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

  //function to open the create job dialog
  const openCreateJobDialog = () => {
    setIsCreateJobDialogOpen(true);
  };
  //function to close the create job dialog
  const closeCreateJobDialog = () => {
    setIsCreateJobDialogOpen(false);
  };

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

  useEffect(() => {
    // Check if user is new (you can replace this with actual logic)
    const isNewUser = !localStorage.getItem("user-onboarded");
    if (isNewUser) {
      setShowGuard(true);
    }
  }, []);

  const handleGuardComplete = () => {
    localStorage.setItem("user-onboarded", "true");
    setShowGuard(false);
  };

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
    // {
    //   candidateImage: sarahicon,
    //   candidateFullname: "Oluwasun Opeyemi",
    //   candidateRole: "React Developer",
    //   candidateAvalability: "Full Time",
    //   candidateTitle: "Junior Dev",
    // },
    // {
    //   candidateImage: sarahicon,
    //   candidateFullname: "Oluwasun Opeyemi",
    //   candidateRole: "React Developer",
    //   candidateAvalability: "Full Time",
    //   candidateTitle: "Junior Dev",
    // },
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
    <div className="flex flex-col gap-8">
      <div className="md:w-[200px]">
        <Button
          onClick={openCreateJobDialog}
          className="border-transparent bg-primary hover:bg-secondary"
        >
          <FileText className="mr-1 h-4 w-4" />
          Create New Job
        </Button>
        <CreateNewJob
          isOpenDialog={isCreateJobDialogOpen}
          openChange={setIsCreateJobDialogOpen}
          isCloseDialog={closeCreateJobDialog}
        />
      </div>
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
      <p className="text-sky-600 font-medium text-lg">Recent job Posts</p>
      <div className="w-full flex gap-16">
        {/* recent posted jobs table here */}
        <RecentPostedJobs setOpenCreateJobDialog={openCreateJobDialog} />
        {/* <NewApplicants /> */}
        {/* <SuggestedCandidates /> */}
      </div>
      {/* <div className="flex  gap-16">
            <div className="w-1/4 bg-white shadow-md flex flex-col  py-4 border rounded-lg">
              <h1 className="text-gray-500 text-sm px-5 border-b-[1px] pb-5">
                Suggested Candidates
              </h1>
              <div className="h-72 flex flex-col gap-3 items-center justify-center">
                <img
                  className="w-28"
                  src={emptySuggestedImage}
                  alt="no suggested "
                />
                <div className="text-sm italic text-center text-gray-400">
                  <p>
                    <span
                      onClick={openCreateJobDialog}
                      className="text-primary underline hover:cursor-pointer"
                    >
                      create a job now
                    </span>{" "}
                    <span className="block">
                      and get the best candidate's that suit your requirement
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div> */}
      {/* {showGuard && <UserGuard onComplete={handleGuardComplete} />} */}
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
