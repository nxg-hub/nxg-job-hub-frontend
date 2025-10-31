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
import { sampleJobs } from "@/utils/data/employer-mock-data";
import { Badge } from "@/components/ui/badge";
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
import { cn, getDateAsTextLabel } from "@/lib/utils";
import {
  useDeletePostedJob,
  useFetchJobApplicants,
  useFetchJobs,
} from "@/hooks/useJobs";
import { useEmployerData } from "@/store/employer/employerStore";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_HOST_URL } from "@/utils/api/API_HOST";
import ApplicantsList from "./ApplicantsList";

export default function EmployerJobTab() {
  const [activeTab, setActiveTab] = useState("all");

  const employer = useEmployerData((state) => state.employerData);
  const { isLoading, isError, data } = useFetchJobs(employer?.id);
  console.log(employer, "hhhhhhhh");

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
      <div className="flex items-center justify-end"></div>
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-start md:items-center">
        <div className="flex gap-2">
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
            Active
            {data?.length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {data?.length || 0}
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
            {filterClosed.length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {jobs.filter((job) => job.status === "closed").length}
              </Badge>
            )}
          </Button>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          {/* <CreateNewJob />  */}
        </div>
      </div>
      <div>
        {activeTab === "all" && (
          <div className="space-y-8">
            {data
              ?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))
              .map((job, index) => (
                <Job key={index} job={job} />
              ))}
            {/* {sampleJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onCloseJob={handleCloseJob}
                onDeleteJob={handleDeleteJob}
                setJobs={setJobs}
              />
            ))} */}
          </div>
        )}
        {activeTab === "active" && (
          <div className="space-y-8">
            {data
              ?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))
              .map((job, index) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onCloseJob={handleCloseJob}
                  onDeleteJob={handleDeleteJob}
                  setJobs={setJobs}
                />
              ))}
            {/* {filterActive.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onCloseJob={handleCloseJob}
                onDeleteJob={handleDeleteJob}
                setJobs={setJobs}
              />
            ))} */}
          </div>
        )}
        {activeTab === "close" && (
          <div className="space-y-8">
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
          </div>
        )}
      </div>
    </div>
  );
}

const JobCard = ({ job, onCloseJob, onDeleteJob, setJobs }) => {
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
                }`}>
                {job.jobStatus === "ACCEPTED"
                  ? "Active"
                  : job.jobStatus === "SUSPENDED"
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
              <span>{job.salary}</span>
              <span>•</span>
              <span>Posted {getDateAsTextLabel(job?.createdAt)}</span>
            </div>
            <p className="mt-2 text-sm">{job.job_description}</p>
          </div>
          <div className="flex flex-col gap-2 md:items-end">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                {numberOfApplicants} Applicants
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
                  onClick={() => onCloseJob(job.id)}>
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
                    onClick={() => onDeleteJob(job.id)}>
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
            <DialogTitle>Applicants for {job.title}</DialogTitle>
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
              <ApplicantsList
                applicants={applicants}
                handleViewApplicants={handleViewApplicants}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

const Job = ({ job }) => {
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
            className="bg-secondary text-white hover:bg-secondary">
            {status}
          </Badge>
        );
      case "REJECTED":
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
              <span>{job.salary}</span>
              <span>•</span>
              <span>Posted {getDateAsTextLabel(job?.createdAt)}</span>
            </div>
            <p className="mt-2 text-sm">{job.job_description}</p>
          </div>
          <div className="flex flex-col gap-2 md:items-end">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                {isLoading && "..."}
                {isError && "0"}
                {numberOfApplicants} Applicants
              </span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Edit
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {/* <DropdownMenuItem>Duplicate</DropdownMenuItem> */}
                  <DropdownMenuItem>Share</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => handleDeleteJob(jobID)}>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {/* <div className="flex gap-2">
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
            </div> */}
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
              <ApplicantsList
                applicants={applicants}
                handleViewApplicants={handleViewApplicants}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
