import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { API_HOST_URL } from "@/utils/api/API_HOST";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { Toaster } from "@/components/ui/toaster";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyJobs, fetchSavedJobs } from "@/redux/ServiceProviderJobSlice";
import {
  fetchMyTalentJobs,
  fetchTalentSavedJobs,
} from "@/redux/TalentJobSlice";

const JobCardFooter = ({ service, handleViewDetails, tab }) => {
  const dispatch = useDispatch();
  const userType = useSelector(
    (state) => state.AllUserReducer.userData.userType
  );
  const [loadingStates, setLoadingStates] = useState({}); // e.g. { jobId: { applying: false, saving: false } }
  const token =
    JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
    JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));

  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const [savedJobs, setSavedJobs] = useState(new Set());
  const myJob = useSelector((state) => state.TalentReducer.myJobs);
  const myJobs = useSelector((state) => state.ServiceProviderJobReducer.myJobs);
  const savedJobTalent = useSelector((state) => state.TalentReducer.savedJobs);
  const savedJobService = useSelector(
    (state) => state.ServiceProviderJobReducer.savedJobs
  );

  useEffect(() => {
    const jobIDs =
      userType === "TECHTALENT"
        ? new Set(myJob.map((job) => job.jobPosting.jobID))
        : new Set(myJobs.map((job) => job.jobPosting.jobID));
    setAppliedJobs(jobIDs);
    const savedJobId =
      userType === "TECHTALENT"
        ? new Set(savedJobTalent.map((job) => job.jobPosting.jobID))
        : new Set(savedJobService.map((job) => job.jobPosting.jobID));
    setSavedJobs(savedJobId);
  }, [myJob, myJobs, savedJobTalent, savedJobService]);
  // 🔹 Helper to update specific job's loading state
  const setJobLoading = (jobId, field, value) => {
    setLoadingStates((prev) => ({
      ...prev,
      [jobId]: { ...prev[jobId], [field]: value },
    }));
  };

  // 🔹 Handle Apply
  const handleApply = async (job) => {
    if (appliedJobs.has(job.jobID)) return;
    try {
      setJobLoading(job.jobID, "applying", true);

      const response = await axios.post(
        `${API_HOST_URL}/api/job-postings/${job.jobID}/apply`,
        { jobPostingId: job.jobID },
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token.authKey}`,
          },
        }
      );
      if (response.status !== 200) {
        throw new Error("Failed to apply for job");
      }

      toast({
        title: "Application Successful 🎉",
        description: `You have successfully applied for ${job.job_title}.`,
      });
      userType === "TECHTALENT"
        ? dispatch(fetchMyTalentJobs({ token: token.authKey }))
        : dispatch(fetchMyJobs({ token: token.authKey }));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Application Failed",
        description:
          error?.response?.data || "An error occurred while applying.",
      });
    } finally {
      setJobLoading(job.jobID, "applying", false);
    }
  };

  const handleSave = async (job) => {
    if (savedJobs.has(job.jobID)) return;
    try {
      setJobLoading(job.jobID, "saving", true);

      const response = await fetch(
        `${API_HOST_URL}/api/job-postings/${job.jobID}/save`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token.authKey}`,
          },
        }
      );

      // ✅ Handle error responses safely
      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        let errorData = null;

        if (contentType && contentType.includes("application/json")) {
          errorData = await response.json();
        } else {
          errorData = await response.text();
        }

        throw new Error(
          errorData?.message || errorData || "Failed to save job"
        );
      }

      // ✅ Handle success (JSON or empty response)
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        await response.json();
      }

      toast({
        title: "Job Saved",
        description: `${job.job_title} has been added to your saved jobs.`,
      });
      userType === "TECHTALENT"
        ? dispatch(fetchTalentSavedJobs({ token: token.authKey }))
        : dispatch(fetchSavedJobs({ token: token.authKey }));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Save Failed",
        description: error.message || "An error occurred while saving job.",
      });
    } finally {
      setJobLoading(job.jobID, "saving", false);
    }
  };

  const handleUnSave = async (job) => {
    try {
      setJobLoading(job.jobID, "saving", true);

      const response = await fetch(
        `${API_HOST_URL}/api/job-postings/${job.jobID}/unsave`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token.authKey}`,
          },
        }
      );
      // ✅ Handle error responses safely
      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        let errorData = null;

        if (contentType && contentType.includes("application/json")) {
          errorData = await response.json();
        } else {
          errorData = await response.text();
        }

        throw new Error(
          errorData?.message || errorData || "Failed to save job"
        );
      }

      // ✅ Handle success (JSON or empty response)
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        await response.json();
      }
      userType === "TECHTALENT"
        ? dispatch(fetchTalentSavedJobs({ token: token.authKey }))
        : dispatch(fetchSavedJobs({ token: token.authKey }));

      toast({
        title: "Job Unsaved",
        description: `${job.job_title} has been removed to your saved jobs.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Save Failed",
        description: error.message || "An error occurred while saving job.",
      });
    } finally {
      setJobLoading(job.jobID, "saving", false);
    }
  };

  const isApplying = loadingStates[service.jobID]?.applying;
  const isSaving = loadingStates[service.jobID]?.saving;
  const isApplied = appliedJobs.has(service.jobID);
  const isSaved = savedJobs.has(service.jobID);

  return (
    <div className="flex justify-between pt-2">
      <div className="flex gap-2">
        {/* View Details */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleViewDetails(service)}>
          View Details
        </Button>

        {/* Save/Unsave */}
        <Button
          size="icon"
          className="border-none bg-transparent hover:bg-sky-100"
          onClick={() =>
            !isSaved ? handleSave(service) : handleUnSave(service)
          }
          disabled={isSaving}>
          <Heart
            className={`h-5 w-5 transition-all duration-200 ${
              isSaved
                ? "fill-sky-500 text-sky-500" // filled blue when saved
                : "fill-transparent text-sky-500" // outline only when not saved
            }`}
          />
        </Button>

        {/* Apply */}
        <Button
          variant="outline"
          size="sm"
          className={`${
            isApplied
              ? "bg-sky-500 text-white cursor-not-allowed opacity-50"
              : ""
          } `}
          onClick={() => handleApply(service)}
          disabled={isApplying || isApplied}>
          {isApplying ? "Applying..." : !isApplied ? "Apply" : "Applied"}
        </Button>
      </div>
      <Toaster />
    </div>
  );
};

export default JobCardFooter;
