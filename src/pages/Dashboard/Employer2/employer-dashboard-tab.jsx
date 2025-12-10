import { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { matchesData } from "@/utils/data/agent-mock-data";
import CreateNewJob from "@/components/Employer/createNewJob";
import KPIBoard from "@/components/Employer/Dashboard/kpisBoard";
import RecentPostedJobs from "@/components/Employer/Dashboard/recentPostedJobs";
import { useUserData } from "@/store/userDataStorage";
import { ApplicationsChart } from "@/components/Employer/Dashboard/applications-charts";
import JobStatisticsChart from "@/components/Employer/Dashboard/job-statistics-chart";
import KPIsBoard from "@/components/Employer/Dashboard/kpis-board";
import { ScheduledInterview } from "@/components/Employer/Dashboard/interview-scheduled";

export default function EmployerDashboardTab() {
  const employer = useUserData((state) => state.userData);
  const [candidates, setCandidates] = useState(matchesData);
  const [filteredCandidates, setFilteredCandidates] = useState(matchesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEmployer, setFilterEmployer] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [isCreateJobDialogOpen, setIsCreateJobDialogOpen] = useState(false);
  const [showGuard, setShowGuard] = useState(false);

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

  return (
    <div className="max-w-full flex flex-col gap-8">
      <div className="flex flex-col gap-10 md:flex-row md:gap-6">
        <div className="flex flex-col gap-">
          <KPIsBoard
            jobPost={958}
            totalApplication={"65k"}
            shortListed={765}
            totalInterview={540}
          />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sky-600 font-medium text-lg">
                Recent job Posts{" "}
              </p>
              <div className="md:w-[200px]">
                <Button
                  onClick={openCreateJobDialog}
                  className="border-transparent bg-primary hover:bg-secondary"
                >
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
            </div>
            {/* recent posted jobs table here */}
            <RecentPostedJobs
              setOpenCreateJobDialog={openCreateJobDialog}
              employerID={employer?.id}
            />
          </div>
        </div>

        <ScheduledInterview />
      </div>
      <div className="flex flex-col gap-7 md:flex-row">
        <ApplicationsChart /> <JobStatisticsChart />
      </div>
      {/* <KPIBoard employerID={employer?.id} /> */}
    </div>
  );
}
