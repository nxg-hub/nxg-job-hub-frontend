import { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
import { fetchMyTalentJobs } from "@/redux/TalentJobSlice";
import { fetchMyJobs } from "@/redux/ServiceProviderJobSlice";

const JobDetailsModal = ({ job, open, onClose }) => {
  const [isApplying, setIsApplying] = useState(false);
  const userType = useSelector(
    (state) => state.AllUserReducer.userData.userType
  );

  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const myJob = useSelector((state) => state.TalentReducer.myJobs);
  const myJobs = useSelector((state) => state.ServiceProviderJobReducer.myJobs);

  useEffect(() => {
    const jobIDs =
      userType === "TECHTALENT"
        ? new Set(myJob.map((job) => job.jobPosting.jobID))
        : new Set(myJobs.map((job) => job.jobPosting.jobID));
    setAppliedJobs(jobIDs);
  }, [myJob, myJobs]);
  const token =
    JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
    JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));

  if (!job) return null;

  const handleApply = async () => {
    if (appliedJobs.has(job.jobID)) return;
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
      userType === "TECHTALENT"
        ? dispatch(fetchMyTalentJobs({ token: token.authKey }))
        : dispatch(fetchMyJobs({ token: token.authKey }));

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
  const isApplied = appliedJobs.has(job.jobID);

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="w-[90%] md:max-w-3xl max-h-[85vh] overflow-y-auto rounded-xl">
          <DialogHeader>
            <div className="flex items-center gap-4 border-b pb-4">
              <img
                src={job.employer_profile_pic || "/placeholder-company.png"}
                alt="Company logo"
                className="w-14 h-14 rounded-full object-cover border"
              />
              <div>
                <DialogTitle className="text-xl font-semibold text-gray-900">
                  {job.job_title}
                </DialogTitle>
                <p className="text-sm text-gray-600">{job.employer_name}</p>
                <div className="flex flex-wrap gap-2 mt-1 text-xs text-gray-500">
                  <span className="px-2 py-1 rounded-md bg-sky-100 text-sky-600 font-medium">
                    {job.job_type}
                  </span>
                  <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-600 font-medium">
                    {job.job_location}
                  </span>
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6 mt-4 text-sm leading-relaxed text-gray-700">
            {/* Company Overview */}
            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                About the Company
              </h3>
              <p className="text-gray-600 whitespace-pre-line">
                {job.company_bio}
              </p>
            </section>

            <Separator />

            {/* Job Description */}
            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                Job Description
              </h3>
              <p className="text-gray-700 whitespace-pre-line">
                {job.job_description}
              </p>
            </section>

            {/* Requirements */}
            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                Requirements
              </h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {job.requirements
                  ?.split("\n")
                  .filter((line) => line.trim() !== "")
                  .map((req, idx) => (
                    <li key={idx}>{req.trim()}</li>
                  ))}
              </ul>
            </section>

            <Separator />

            {/* Job Summary */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 text-sm text-gray-700">
              <div>
                <span className="font-semibold text-gray-900">Job Type:</span>{" "}
                {job.job_type}
              </div>
              <div>
                <span className="font-semibold text-gray-900">Salary:</span> ₦
                {Number(job.salary).toLocaleString()}
              </div>
              <div>
                <span className="font-semibold text-gray-900">Location:</span>{" "}
                {job.job_location}
              </div>
              <div>
                <span className="font-semibold text-gray-900">Deadline:</span>{" "}
                {new Date(job.deadline).toLocaleDateString("en-GB")}
              </div>

              {job.tags?.length > 0 && (
                <div className="col-span-2 flex flex-wrap gap-2 mt-2">
                  {job.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </section>

            <Separator />

            {/* Apply Button */}
            <div className="flex justify-end">
              <Button
                disabled={isApplying || isApplied}
                onClick={handleApply}
                className="bg-sky-600 hover:bg-sky-700 text-white font-medium px-6 py-2">
                {isApplying ? "Applying..." : !isApplied ? "Apply" : "Applied"}
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
