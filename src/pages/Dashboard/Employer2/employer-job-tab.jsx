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
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import CreateNewJob from "@/components/Employer/createNewJob";
import { cn, getDateAsTextLabel } from "@/lib/utils";
import {
  useDeletePostedJob,
  useFetchJobApplicants,
  useFetchJobs,
} from "@/hooks/useJobs";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_HOST_URL } from "@/utils/api/API_HOST";
import ApplicantsList from "./ApplicantsList";
import EditJobModal from "./EditJobModal";
import { JobCardSkeleton } from "@/components/job-card-skeleton";
import { useUserData } from "@/store/employer/userDataStorage";

export default function EmployerJobTab() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: deleteJob } = useDeletePostedJob();
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(null);
  const employer = useUserData((state) => state.userData);
  const [isCreateJobDialogOpen, setIsCreateJobDialogOpen] = useState(false);
  const { isLoading, isError, data } = useFetchJobs(employer?.id);
  const token =
    JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
    JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));

  const closedJobs = data?.filter((job) => job.jobStatus === "CLOSED");
  const activeJobs = data?.filter((job) => {
    return job.jobStatus === "ACCEPTED";
  });
  //function to open the create job dialog
  const openCreateJobDialog = () => {
    setIsCreateJobDialogOpen(true);
  };
  //function to close the create job dialog
  const closeCreateJobDialog = () => {
    setIsCreateJobDialogOpen(false);
  };
  const handleCloseJob = async (job) => {
    setLoading(job.jobID);
    try {
      const response = await axios.put(
        `${API_HOST_URL}/api/job-postings/update/${job.jobID}`,
        job,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token.authKey,
          },
        }
      );

      toast({
        title: "Job Updated",
        description: "The job has been closed successfully.",
      });
      queryClient.invalidateQueries(["employerJobs", employer.id]);
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error closing job",
        description: "Failed to update job.",
      });
    } finally {
      setLoading(null);
    }
  };

  const handleDeleteJob = (jobId) => {
    if (jobId) {
      deleteJob(jobId, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["employerJobs"] });
          queryClient.invalidateQueries({ queryKey: ["jobsEngagements"] });
          toast({
            className: cn(
              "bottom-10 right-4 flex fixed max-w-[400px] md:max-w-[420px]"
            ),
            title: <p className="text-red-800">Job Deleted</p>,
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-red-200 p-4">
                <p>The job has been permanently deleted</p>
              </pre>
            ),
          });
        },
      });
    }
  };
  if (isLoading) return <JobCardSkeleton />;
  if (isError) return <p className="p-8">Error fetching data</p>;
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-end"></div>
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-start md:items-center">
        <div className=" grid-cols-2 grid md:grid-cols-4 gap-2">
          <Button
            className={cn(
              `${
                activeTab === "all"
                  ? "bg-primary text-white border-transparent"
                  : "bg-white border border-gray-300 text-gray-800 hover:bg-slate-50 hover:text-gray-800"
              }`,
              ""
            )}
            onClick={() => setActiveTab("all")}>
            All Jobs
            <Badge variant="secondary" className="ml-2 text-white">
              {data?.length || 0}
            </Badge>
          </Button>
          <Button
            className={cn(
              `${
                activeTab === "active"
                  ? "bg-primary text-white border-transparent"
                  : "bg-white border border-gray-300 text-gray-800 hover:bg-slate-50 hover:text-gray-800"
              }`,
              ""
            )}
            onClick={() => setActiveTab("active")}>
            Accepted
            {activeJobs?.length > 0 && (
              <Badge variant="success" className="ml-2">
                {activeJobs?.length || 0}
              </Badge>
            )}
          </Button>
          <Button
            className={cn(
              `${
                activeTab === "close"
                  ? "bg-primary text-white border-transparent"
                  : "bg-white border border-gray-300 text-gray-800 hover:bg-slate-50 hover:text-gray-800"
              }`,
              ""
            )}
            onClick={() => setActiveTab("close")}>
            Closed
            {closedJobs?.length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {closedJobs?.length}
              </Badge>
            )}
          </Button>
          <div className="flex gap-2 w-full md:w-auto ">
            <Button
              onClick={openCreateJobDialog}
              className="border-transparent bg-primary hover:bg-secondary">
              <FileText className="mr-1 h-4 w-4" />
              Create New Job
            </Button>
          </div>
        </div>
      </div>
      <div>
        {activeTab === "all" && (
          <div className="space-y-8">
            {data
              ?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))
              .map((job, index) => (
                <Job
                  key={job.id}
                  job={job}
                  onCloseJob={handleCloseJob}
                  onDeleteJob={handleDeleteJob}
                  loader={loading}
                />
              ))}
          </div>
        )}
        {activeTab === "active" && (
          <div className="space-y-8">
            {activeJobs?.length > 0 ? (
              activeJobs
                ?.sort(
                  (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
                )
                .map((job, index) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onCloseJob={handleCloseJob}
                    onDeleteJob={handleDeleteJob}
                    loader={loading}
                  />
                ))
            ) : (
              <div className="text-center p-8 border rounded-lg">
                <p className="text-muted-foreground">No jobs found.</p>
              </div>
            )}
          </div>
        )}
        {activeTab === "close" && (
          <div className="space-y-8">
            {closedJobs?.length > 0 ? (
              closedJobs?.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onCloseJob={handleCloseJob}
                  onDeleteJob={handleDeleteJob}
                />
              ))
            ) : (
              <div className="text-center p-8 border rounded-lg">
                <p className="text-muted-foreground">No jobs found.</p>
              </div>
            )}
          </div>
        )}
      </div>
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
  );
}

const JobCard = ({ job, onCloseJob, onDeleteJob, loader }) => {
  const jobPostData = {
    employerID: job.employerID,
    jobID: job.jobID,
    job_title: job.job_title,
    job_description: job.job_description,
    jobClassification: job.jobClassification,
    company_bio: job.company_bio,
    salary: job.salary,
    job_type: job.job_type,
    deadline: job.deadline,
    requirements: job.requirements,
    employer_name: job.employer_name,
    // employer_profile_pic: job.employer_profile_pic,
    job_location: job.job_location,
    tags: job.tags || [],
    jobStatus: "CLOSED",
  };
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const [isApplicantsDialogOpen, setIsApplicantsDialogOpen] = useState(false);
  const { toast } = useToast();
  const jobID = job?.jobID;
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const { mutate: deleteJob } = useDeletePostedJob();
  const {
    data: numberOfApplicants,
    isLoading,
    isError,
    error,
  } = useFetchJobApplicants({ jobID });

  const handleViewApplicants = async () => {
    setIsApplicantsDialogOpen(true);
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_HOST_URL}/api/employers/job-postings/${jobID}/get-all-applicants-for-a-job?page=0&size=1000&sort=string`
      );

      setApplicants(response.data);
    } catch (err) {
      console.log(err);
      setErr(err.response.data);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">{job.job_title}</h2>
              <span
                className={`rounded-full px-2 py-1 text-xs ${
                  job.jobStatus === "ACCEPTED"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}>
                {job.jobStatus === "ACCEPTED"
                  ? "Accepted"
                  : job.jobStatus === "CLOSED"
                  ? "Closed"
                  : ""}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" /> {job.job_type}
              </span>
              <span>•</span>
              <span>{job.job_location}</span>
              <span>•</span>
              <span>{formatCurrency(job.salary)}</span>
              <span>•</span>
              <span>Posted {getDateAsTextLabel(job?.createdAt)}</span>
            </div>
            <p className="mt-2 text-sm">{job.job_description}</p>
          </div>
          <div className="flex flex-col gap-2 md:items-end">
            <div className="flex items-center gap-2">
              <span className=" flex gap-1 text-sm font-medium">
                {numberOfApplicants}
                <p>Applicants</p>
              </span>
            </div>
            <div className="flex gap-2">
              {/* <Button
                variant="outline"
                size="sm"
               >
                Edit
              </Button> */}
              {job.jobStatus === "ACCEPTED" ? (
                <Button
                  variant="outline"
                  size="sm"
                  disabled={loader === job.jobID}
                  onClick={() => onCloseJob(jobPostData)}>
                  {loader === job.jobID ? "Processing.." : " Close Job"}
                </Button>
              ) : (
                // <Button variant="outline" size="sm">
                //   Reopen Job
                // </Button>
                ""
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {/* <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuItem>Share</DropdownMenuItem> */}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => onDeleteJob(job.jobID)}>
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
            onClick={handleViewApplicants}>
            View Applicants ({numberOfApplicants})
          </Button>
        </div>
      </CardContent>

      {/* Applicants Dialog */}
      <Dialog
        open={isApplicantsDialogOpen}
        onOpenChange={setIsApplicantsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Applicants for {job.job_title}</DialogTitle>
            <DialogDescription>
              {numberOfApplicants} applicants for this position
            </DialogDescription>
          </DialogHeader>

          {/* Applicants List */}
          <div className="space-y-4">
            {loading ? (
              <p className="text-center text-gray-600">Loading applicants...</p>
            ) : !loading && err ? (
              <p className="text-center text-red-600">
                Failed to load applicants
              </p>
            ) : applicants?.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                No applicants yet
              </p>
            ) : (
              <ApplicantsList applicants={applicants} />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

const Job = ({ job, onCloseJob, onDeleteJob, loader }) => {
  const jobPostData = {
    employerID: job.employerID,
    jobID: job.jobID,
    job_title: job.job_title,
    job_description: job.job_description,
    jobClassification: job.jobClassification,
    company_bio: job.company_bio,
    salary: job.salary,
    job_type: job.job_type,
    deadline: job.deadline,
    requirements: job.requirements,
    employer_name: job.employer_name,
    // employer_profile_pic: job.employer_profile_pic,
    job_location: job.job_location,
    tags: job.tags || [],
    jobStatus: job.jobStatus,
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const employer = useUserData((state) => state.userData);
  const [editLoader, setEditLoader] = useState(false);
  const token =
    JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
    JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));
  const queryClient = useQueryClient();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const jobID = job?.jobID;
  const {
    data: numberOfApplicants,
    isLoading,
    isError,
    error,
  } = useFetchJobApplicants({ jobID });
  const { mutate: deleteJob } = useDeletePostedJob();
  const [isApplicantsDialogOpen, setIsApplicantsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleViewApplicants = async () => {
    setIsApplicantsDialogOpen(true);
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_HOST_URL}/api/employers/job-postings/${jobID}/get-all-applicants-for-a-job?page=0&size=1000&sort=string`
      );

      setApplicants(response.data);
    } catch (err) {
      console.log(err);
      setErr(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (updatedJob) => {
    setEditLoader(true);
    try {
      const response = await axios.put(
        `${API_HOST_URL}/api/job-postings/update/${job.jobID}`,
        updatedJob,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token.authKey,
          },
        }
      );

      toast({
        title: "Job Updated",
        description: "The job has been updated successfully.",
      });
      queryClient.invalidateQueries(["employerJobs", employer.id]);
      setTimeout(() => {
        setIsEditModalOpen(false);
      }, 2000);
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error updating job",
        description: "Failed to update job.",
      });
    } finally {
      setEditLoader(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "ACCEPTED":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            {status}
          </Badge>
        );
      case "PENDING":
        return (
          <Badge
            variant="secondary"
            className="bg-yellow-300 text-white hover:bg-secondary">
            {status}
          </Badge>
        );
      case "REJECTED":
        return <Badge variant="destructive">{status}</Badge>;
      case "CLOSED":
        return <Badge variant="destructive">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">{job.job_title}</h2>
              {getStatusBadge(job.jobStatus)}
            </div>
            <div className="flex flex-wrap gap-2 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" /> {job.job_type}
              </span>
              <span>•</span>
              <span>{job.job_location}</span>
              <span>•</span>
              <span>{formatCurrency(job.salary)}</span>
              <span>•</span>
              <span>Posted {getDateAsTextLabel(job?.createdAt)}</span>
            </div>
            <p className="mt-2 text-sm">{job.job_description}</p>
          </div>
          <div className="flex flex-col gap-2 md:items-end">
            <div className="flex items-center gap-2">
              <span className="text-sm flex gap-1 font-medium">
                {isLoading && "..."}
                {isError && "0"}
                {numberOfApplicants}
                <p>Applicants</p>
              </span>
            </div>
            <div className="flex gap-2">
              {job.jobStatus === "PENDING" && (
                <Button
                  onClick={() => setIsEditModalOpen(true)}
                  variant="outline"
                  size="sm">
                  Edit
                </Button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {/* <DropdownMenuItem>Duplicate</DropdownMenuItem> */}
                  {/* <DropdownMenuItem>Share</DropdownMenuItem> */}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => onDeleteJob(job.jobID)}>
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
            onClick={handleViewApplicants}>
            View Applicants ({numberOfApplicants})
          </Button>
        </div>
      </CardContent>

      {/* Edit modal */}
      <EditJobModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        job={jobPostData}
        onSave={handleEdit}
        loader={editLoader}
      />
      {/* Applicants Dialog */}
      <Dialog
        open={isApplicantsDialogOpen}
        onOpenChange={setIsApplicantsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Applicants for {job.job_title}</DialogTitle>
            <DialogDescription>
              {numberOfApplicants} applicants for this position
            </DialogDescription>
          </DialogHeader>

          {/* Applicants List */}
          <div className="space-y-4">
            {loading ? (
              <p className="text-center text-gray-600">Loading applicants...</p>
            ) : !loading && err ? (
              <p className="text-center text-red-600">
                Failed to load applicants
              </p>
            ) : applicants?.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                No applicants yet
              </p>
            ) : (
              <ApplicantsList applicants={applicants} />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
