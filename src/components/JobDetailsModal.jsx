import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { API_HOST_URL } from "@/utils/api/API_HOST";
import axios from "axios";
import { Toaster } from "./ui/toaster";

const JobDetailsModal = ({ job, open, onClose }) => {
  const [isApplying, setIsApplying] = useState(false);
  const token =
    JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
    JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));

  if (!job) return null;

  const handleApply = async () => {
    try {
      setIsApplying(true);
      const response = await axios.post(
        `${API_HOST_URL}/api/job-postings/${job.jobID}/apply`,
        { jobPostingId: job.jobID },

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token.authKey,
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

      onClose(); // close modal after successful apply
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Application Failed",
        description: error.response.data || "An error occurred while applying.",
      });
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="w-[90%] h-[600px] overflow-y-scroll md:max-w-2xl">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <img
                src={job.employer_profile_pic}
                alt={job.employer_name}
                className="w-12 h-12 rounded-full object-cover border"
              />
              <div>
                <DialogTitle className="text-lg font-semibold">
                  {job.job_title}
                </DialogTitle>
                <p className="text-sm text-gray-600">{job.employer_name}</p>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-4 text-sm">
            <p className="text-gray-600">{job.company_bio}</p>

            <Separator />

            <div>
              <h3 className="font-semibold text-base mb-1">Job Description</h3>
              <p>{job.job_description}</p>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-1">Requirements</h3>
              <p className="whitespace-pre-line">{job.requirements}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
              <div>
                <span className="font-semibold">Type:</span> {job.job_type}
              </div>
              <div>
                <span className="font-semibold">Salary:</span> ₦
                {Number(job.salary).toLocaleString()}
              </div>
              <div>
                <span className="font-semibold">Location:</span>{" "}
                {job.job_location}
              </div>
              <div>
                <span className="font-semibold">Deadline:</span>{" "}
                {new Date(job.deadline).toLocaleDateString("en-GB")}
              </div>
            </div>

            <Separator />

            <div className="flex justify-end">
              <Button
                disabled={isApplying}
                onClick={handleApply}
                className="bg-sky-600 hover:bg-sky-700 border-none text-white">
                {isApplying ? "Applying..." : "Apply Now"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Toaster />
    </>
  );
};

export default JobDetailsModal;
