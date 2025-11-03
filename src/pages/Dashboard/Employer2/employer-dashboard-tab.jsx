import { useEffect, useState } from "react";
import { Briefcase, Heart, MessageCircle, Clock, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import sarahicon from "@/static/images/John.png";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { matchesData } from "@/utils/data/agent-mock-data";
import CreateNewJob from "@/components/Employer/createNewJob";
import NewApplicants from "@/components/Employer/newApplicants";
import { Separator } from "@radix-ui/react-context-menu";
import emptySuggestedImage from "@/static/images/empty-suggest.svg";
import emptyRecentPostImage from "@/static/images/empty-employer-table.svg";
import UserGuard from "@/components/Employer/employerUserGuard";
import KPIBoard from "@/components/Employer/Dashboard/kpisBoard";
import { useEmployerData } from "@/store/employer/employerStore";
import RecentPostedJobs from "@/components/Employer/Dashboard/recentPostedJobs";

export default function EmployerDashboardTab() {
  const employer = useEmployerData((state) => state.employerData);
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

  return (
    <div className="max-w-full flex flex-col gap-8">
      <KPIBoard employerID={employer?.id} />
      <div className="md:w-[200px]">
        <Button
          onClick={openCreateJobDialog}
          className="border-transparent bg-primary hover:bg-secondary">
          <FileText className="mr-1 h-4 w-4" />
          Create New Job
        </Button>
        <CreateNewJob
          companyBio={employer?.employer?.companyDescription}
          companyName={employer?.employer?.companyName}
          country={employer?.employer?.country}
          industryType={employer?.employer?.industryType}
          companySize={employer?.employer?.companySize}
          employerID={employer?.employer?.employerID}
          companyLogo={employer?.employer?.companyLogo}
          isOpenDialog={isCreateJobDialogOpen}
          openDialog={openCreateJobDialog}
          closeDialog={closeCreateJobDialog}
        />
      </div>
      <div className="space-y-4">
        {/* recent posted jobs table here */}
        <p className="text-sky-600 font-medium text-lg">Recent job Posts </p>
        <RecentPostedJobs
          setOpenCreateJobDialog={openCreateJobDialog}
          employerID={employer?.id}
        />
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
