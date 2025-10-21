import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { API_HOST_URL } from "@/utils/api/API_HOST";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { Toaster } from "@/components/ui/toaster";
import { useDispatch } from "react-redux";
import { fetchMyJobs, fetchSavedJobs } from "@/redux/ServiceProviderJobSlice";
import { fetchMyTalentJobs } from "@/redux/TalentJobSlice";

const JobCardFooter = ({ service, handleViewDetails, tab }) => {
  const dispatch = useDispatch();
  const [loadingStates, setLoadingStates] = useState({}); // e.g. { jobId: { applying: false, saving: false } }
  const token =
    JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
    JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));
  // 🔹 Helper to update specific job's loading state
  const setJobLoading = (jobId, field, value) => {
    setLoadingStates((prev) => ({
      ...prev,
      [jobId]: { ...prev[jobId], [field]: value },
    }));
  };

  // 🔹 Handle Apply
  const handleApply = async (job) => {
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

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to apply for job");
      }

      toast({
        title: "Application Successful 🎉",
        description: `You have successfully applied for ${job.job_title}.`,
      });

      dispatch(fetchMyTalentJobs({ token: token.authKey }));
      dispatch(fetchMyJobs({ token: token.authKey }));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Application Failed",
        description: error.response.data || "An error occurred while applying.",
      });
    } finally {
      setJobLoading(job.jobID, "applying", false);
    }
  };

  const handleSave = async (job) => {
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
      dispatch(fetchSavedJobs({ token: token.authKey }));
      toast({
        title: "Job Saved",
        description: `${job.job_title} has been added to your saved jobs.`,
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
      console.log(response);
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
      dispatch(fetchSavedJobs({ token: token.authKey }));
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
          variant="secondary"
          size="sm"
          className="border-none gap-1 bg-sky-500 text-white hover:bg-sky-600"
          onClick={() =>
            tab === "all" ? handleSave(service) : handleUnSave(service)
          }
          disabled={isSaving}>
          <MessageCircle className="h-4 w-4" />
          {isSaving ? "Processing..." : tab === "all" ? "Save" : "Unsave"}
        </Button>

        {/* Apply */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleApply(service)}
          disabled={isApplying}>
          {isApplying ? "Applying..." : "Apply"}
        </Button>
      </div>
      <Toaster />
    </div>
  );
};

export default JobCardFooter;
