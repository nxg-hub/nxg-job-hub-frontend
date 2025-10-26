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

  const acceptedRecentJobs = recentJobs.filter((job) => {
    return (
      job.jobStatus === "ACCEPTED" && job.jobClassification === "PROFESSIONAL"
    );
  });

  const acceptedNearJobs = nearByJobs.filter((job) => {
    return (
      job.jobStatus === "ACCEPTED" && job.jobClassification === "PROFESSIONAL"
    );
  });
  const token =
    JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
    JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));

  const dispatch = useDispatch();
  const [loadingJobId, setLoadingJobId] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState(new Set());

  useEffect(() => {
    dispatch(fetchTalentRecentJobs({ token: token.authKey }));
    dispatch(fetchTalentNearByJobs({ token: token.authKey }));
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
      const res = await axios.post(
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
                {!loading && error ? (
                  <p className="text-red-500">Failed to fetch</p>
                ) : acceptedRecentJobs.length > 0 ? (
                  acceptedRecentJobs.map((job) => {
                    const isLoading = loadingJobId === job.jobID;
                    const isApplied = appliedJobs.has(job.jobID);

                    return (
                      <div
                        key={job.jobID}
                        className="flex items-center gap-4 p-3 border rounded-lg">
                        <Briefcase className="h-10 w-10 text-primary" />
                        <div className="flex-1">
                          <h3 className="font-medium">{job.job_title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {`${job.employer_name} • ${job.job_type}`}
                          </p>
                        </div>

                        <div className="text-sm text-muted-foreground grid grid-col-2 text-right">
                          <span>{formatCurrency(job.salary)}</span>
                          <span className="flex justify-end items-center">
                            <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                            {job.job_location}
                          </span>
                        </div>

                        <Button
                          className="text-sm flex items-center gap-2"
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
                        className="flex items-center gap-4 p-3 border rounded-lg">
                        <Briefcase className="h-10 w-10 text-primary" />
                        <div className="flex-1">
                          <h3 className="font-medium">{job.job_title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {`${job.employer_name} • ${job.job_type}`}
                          </p>
                        </div>

                        <div className="text-sm text-muted-foreground grid grid-col-2 text-right">
                          <span>{formatCurrency(job.salary)}</span>
                          <span className="flex justify-end items-center">
                            <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                            {job.job_location}
                          </span>
                        </div>

                        <Button
                          className="text-sm flex items-center gap-2"
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
