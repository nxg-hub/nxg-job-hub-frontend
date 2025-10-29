import { JobCardSkeleton } from "@/components/job-card-skeleton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, MapPin, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  fetchMyTalentJobs,
  fetchTalentNearByJobs,
  fetchTalentRecentJobs,
} from "@/redux/TalentJobSlice";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { API_HOST_URL } from "@/utils/api/API_HOST";
import { Link } from "react-router-dom";

export default function TalentDashboardTab() {
  const loading = useSelector((state) => state.TalentReducer.loading);
  const error = useSelector((state) => state.TalentReducer.error);
  const nearError = useSelector((state) => state.TalentReducer.nearError);
  const recentJobs = useSelector((state) => state.TalentReducer.recentJobs);
  const nearByJobs = useSelector((state) => state.TalentReducer.nearByJobs);
  const myJob = useSelector((state) => state.TalentReducer.myJobs);
  const userType = useSelector(
    (state) => state.AllUserReducer.userData.userType
  );

  const acceptedRecentJobs = recentJobs.filter((job) => {
    return job.jobStatus === "ACCEPTED";
  });

  const acceptedNearJobs = nearByJobs.filter((job) => {
    return job.jobStatus === "ACCEPTED";
  });
  const token =
    JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
    JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));

  const dispatch = useDispatch();
  const [loadingJobId, setLoadingJobId] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  useEffect(() => {
    const jobIDs = new Set(myJob.map((job) => job.jobPosting.jobID));
    setAppliedJobs(jobIDs);
  }, [myJob]);

  useEffect(() => {
    dispatch(fetchTalentRecentJobs({ token: token.authKey }));
    dispatch(fetchTalentNearByJobs({ token: token.authKey }));
    dispatch(fetchMyTalentJobs({ token: token.authKey }));
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  // 🔹 Handle Apply Button
  const handleApply = async (job) => {
    if (loadingJobId === job.jobID || appliedJobs.has(job.jobID)) return;

    setLoadingJobId(job.jobID);
    try {
      const response = await axios.post(
        `${API_HOST_URL}/api/job-postings/${job.jobID}/apply`,
        { jobPostingId: job.jobID },
        {
          headers: {
            Authorization: ` ${token.authKey}`,
            "Content-Type": "application/json",
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
    } catch (error) {
      console.error("Error applying:", error);
      toast({
        variant: "destructive",
        title: "Application Failed",
        description: error.response.data || "An error occurred while applying.",
      });
    } finally {
      setLoadingJobId(null);
    }
  };

  if (loading) return <JobCardSkeleton />;

  return (
    <div className="space-y-6 px-6">
      <Tabs defaultValue="matches">
        <TabsList className="grid w-full grid-cols-2 border-none">
          <TabsTrigger
            value="matches"
            className="border-none hover:bg-white hover:text-black">
            Job Matches
          </TabsTrigger>
          <TabsTrigger
            value="near"
            className="border-none hover:bg-white hover:text-black">
            Nearby Jobs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="matches" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Posted Jobs</CardTitle>
              <CardDescription>
                <Link to={"/talent/jobs"}>View All</Link>
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {!loading && nearError ? (
                  <p className="text-red-500">Failed to fetch</p>
                ) : acceptedRecentJobs.length > 0 ? (
                  acceptedRecentJobs.map((job) => {
                    const isLoading = loadingJobId === job.jobID;
                    const isApplied = appliedJobs.has(job.jobID);

                    return (
                      <div
                        key={job.jobID}
                        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 border rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
                        {/* Left Section */}
                        <div className="flex items-start gap-4 flex-1">
                          <div className="p-3 rounded-lg bg-sky-50">
                            <Briefcase className="h-8 w-8 text-sky-600" />
                          </div>

                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-gray-800 mb-1">
                              {job.job_title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-1">
                              {`${job.employer_name} • ${job.job_type}`}
                            </p>
                            <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                              {job.job_description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                              {job.tags?.map((tag, index) => (
                                <span
                                  key={index}
                                  className="text-xs bg-sky-100 text-sky-700 px-2 py-1 rounded-full font-medium">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Right Section */}
                        <div className="flex flex-col items-end text-sm text-gray-600 gap-2">
                          <div className="grid grid-cols-1 text-right">
                            <span className="font-medium text-gray-800">
                              {formatCurrency(job.salary)}
                            </span>
                            <span className="flex items-center justify-end text-gray-500">
                              <MapPin className="h-4 w-4 mr-1 text-sky-500" />
                              {job.job_location}
                            </span>
                          </div>

                          {/* Deadline */}
                          <p className="text-xs text-gray-400 italic">
                            Apply before:{" "}
                            {new Date(job.deadline).toLocaleDateString()}
                          </p>

                          {/* Button */}
                          <Button
                            className="text-sm flex items-center gap-2 mt-1"
                            onClick={() => handleApply(job)}
                            disabled={isLoading || isApplied}>
                            {isLoading ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Applying...
                              </>
                            ) : isApplied ? (
                              "Applied"
                            ) : (
                              "Apply"
                            )}
                          </Button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p>No recent jobs</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="near" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Nearby Jobs</CardTitle>
              <CardDescription>
                <Link to={"/talent/jobs"}>View All</Link>
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {!loading && nearError ? (
                  <p className="text-red-500">Failed to fetch</p>
                ) : acceptedNearJobs.length > 0 ? (
                  acceptedNearJobs.map((job) => {
                    const isLoading = loadingJobId === job.jobID;
                    const isApplied = appliedJobs.has(job.jobID);

                    return (
                      <div
                        key={job.jobID}
                        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 border rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
                        {/* Left Section */}
                        <div className="flex items-start gap-4 flex-1">
                          <div className="p-3 rounded-lg bg-sky-50">
                            <Briefcase className="h-8 w-8 text-sky-600" />
                          </div>

                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-gray-800 mb-1">
                              {job.job_title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-1">
                              {`${job.employer_name} • ${job.job_type}`}
                            </p>
                            <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                              {job.job_description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                              {job.tags?.map((tag, index) => (
                                <span
                                  key={index}
                                  className="text-xs bg-sky-100 text-sky-700 px-2 py-1 rounded-full font-medium">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Right Section */}
                        <div className="flex flex-col items-end text-sm text-gray-600 gap-2">
                          <div className="grid grid-cols-1 text-right">
                            <span className="font-medium text-gray-800">
                              {formatCurrency(job.salary)}
                            </span>
                            <span className="flex items-center justify-end text-gray-500">
                              <MapPin className="h-4 w-4 mr-1 text-sky-500" />
                              {job.job_location}
                            </span>
                          </div>

                          {/* Deadline */}
                          <p className="text-xs text-gray-400 italic">
                            Apply before:{" "}
                            {new Date(job.deadline).toLocaleDateString()}
                          </p>

                          {/* Button */}
                          <Button
                            className="text-sm flex items-center gap-2 mt-1"
                            onClick={() => handleApply(job)}
                            disabled={isLoading || isApplied}>
                            {isLoading ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Applying...
                              </>
                            ) : isApplied ? (
                              "Applied"
                            ) : (
                              "Apply"
                            )}
                          </Button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p>No nearby jobs at the moment</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Toaster />
    </div>
  );
}
