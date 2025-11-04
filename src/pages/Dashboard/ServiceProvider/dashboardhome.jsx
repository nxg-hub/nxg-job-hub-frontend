import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bookmark,
  MapPin,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import kcyimage from "@/static/images/kyc-image.png";
import driver from "@/static/images/driver.png";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoggedInServiceProviderData,
  getUserData,
} from "@/redux/ServiceProviderUserDataSlice";
import { API_HOST_URL } from "@/utils/api/API_HOST";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { Toaster } from "@/components/ui/toaster";
import { JobCardSkeleton } from "@/components/job-card-skeleton";
import { Link } from "react-router-dom";

function JobCard({ job, isBookmarked, onBookmarkToggle }) {
  const [loadingStates, setLoadingStates] = useState({});
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
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
  const isApplying = loadingStates[job.jobID]?.applying;
  const isSaving = loadingStates[job.jobID]?.saving;
  return (
    <Card className="">
      <CardHeader className="p-4 pb-0 flex flex-col justify-between items-start">
        <img src={job.employer_profile_pic || driver} alt="" />
        <div className="flex justify-between w-full">
          <div>
            <h3 className="font-medium">{job.company}</h3>
            <div className="flex items-center text-xs text-gray-500">
              <MapPin className="h-3 w-3 mr-1" />
              {job.job_location}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 border-none"
            onClick={onBookmarkToggle}>
            <Bookmark
              className={cn(
                "h-6 w-6",
                isBookmarked ? "fill-[#0078B4] text-[#0078B4]" : "text-gray-400"
              )}
            />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h4 className="font-medium mb-2">{job.job_title}</h4>
        <p className="text-sm text-gray-600 mb-3 line-clamp-3">
          {job.job_description}
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          {
            <Badge key={job.job_type} variant="outline" className="font-normal">
              {job.job_type}
            </Badge>
          }
        </div>
        <div className="font-medium">{formatCurrency(job.salary)}</div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center border-t">
        <div className="text-xs text-gray-500">
          {job.reactions} views •{/* {job.applicants} applicants */}
        </div>
        <Button
          onClick={() => handleApply(job)}
          size="sm"
          disabled={isApplying}
          className="bg-sky-400 border-none hover:bg-[#006699]">
          {isApplying ? "Applying..." : "Apply"}
        </Button>
      </CardFooter>
      <Toaster />
    </Card>
  );
}

function JobCarousel({
  jobs,
  bookmarkedJobs,
  toggleBookmark,
  innerRef,
  loading,
}) {
  if (loading) {
    return <JobCardSkeleton />;
  }
  return (
    <div
      ref={innerRef}
      className="flex gap-4 overflow-x-auto w-full scrollbar-hide scroll-smooth">
      {jobs.length === 0 ? (
        <p>No job post at the moment</p>
      ) : (
        jobs.map((job) => (
          <div key={job.jobID} className="flex-none w-80 sm:w-72 md:w-80">
            <JobCard
              job={job}
              isBookmarked={bookmarkedJobs.includes(job.jobID)}
              onBookmarkToggle={() => toggleBookmark(job.jobID)}
            />
          </div>
        ))
      )}
    </div>
  );
}

export function ServicesProviderHomePage() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.AllUserReducer.userData);
  const token =
    JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
    JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [nearbyJobs, setNearbyJobs] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const recCarouselRef = useRef(null);
  const nearCarouselRef = useRef(null);
  useEffect(() => {
    dispatch(getUserData({ token: token.authKey, id: userData.id }));
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${API_HOST_URL}/api/job-postings/recent-job-postings?page=0&size=5`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok) throw new Error(`Request failed with ${res.status}`);
        const data = await res.json();
        const acceptedJobs = data.filter((job) => {
          return (
            job.jobStatus === "ACCEPTED" && job.jobClassification === "SERVICE"
          );
        });
        setRecommendedJobs(acceptedJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    const fetchNearbyJobs = async () => {
      setLoading(true);
      try {
        // ✅ Get session & userId
        const session =
          sessionStorage.getItem("NXGJOBHUBLOGINKEYV1") ||
          window.localStorage.getItem("NXGJOBHUBLOGINKEYV1");
        const parsed = session ? JSON.parse(session) : null;
        const userId = parsed?.id; // adjust if your session object uses a different key
        if (!userId) {
          console.error("User ID not found. Please login again.");
          return;
        }
        // ✅ Call the user-specific API
        const res = await fetch(
          `${API_HOST_URL}/api/job-postings/recommend-nearby-jobs`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token.authKey,
            },
          }
        );
        if (!res.ok) throw new Error(`Request failed with ${res.status}`);
        const data = await res.json();
        const acceptedJobs = data.filter((job) => {
          return (
            job.jobStatus === "ACCEPTED" && job.jobClassification === "SERVICE"
          );
        });
        // console.log(acceptedJobs);
        setNearbyJobs(acceptedJobs || []);
      } catch (error) {
        console.error("Error fetching nearby jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNearbyJobs();
  }, []);
  const toggleBookmark = (jobId) => {
    setBookmarkedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  const scroll = (ref, direction) => {
    if (!ref.current) return;
    const step = 300; // how far to move per click
    ref.current.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  return (
    <div className="max-w-full overflow-x-hidden overflow-y-auto relative space-y-10 ">
      {/* ✅ Recent Jobs */}
      <div className="p-4">
        {/* Header row with arrows */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800 border-b-2 border-sky-400 pb-1">
            Recent Jobs for you
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll(recCarouselRef, "left")}
              className="p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-100 shadow-sm">
              <ChevronLeft className="h-4 w-4 text-gray-600" />
            </button>
            <button
              onClick={() => scroll(recCarouselRef, "right")}
              className="p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-100 shadow-sm">
              <ChevronRight className="h-4 w-4 text-gray-600" />
            </button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 border-gray-200">
              <Link to={"job-tracker"}>View All</Link>
            </Button>
          </div>
        </div>

        {/* Scrollable row */}

        <JobCarousel
          innerRef={recCarouselRef}
          jobs={recommendedJobs}
          bookmarkedJobs={bookmarkedJobs}
          toggleBookmark={toggleBookmark}
          loading={loading}
        />
      </div>
      {/* ✅ Jobs Near You */}
      <div className="p-4">
        {/* Header row with arrows */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800 border-b-2 border-sky-400 pb-1">
            Jobs Near You
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll(nearCarouselRef, "left")}
              className="p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-100 shadow-sm">
              <ChevronLeft className="h-4 w-4 text-gray-600" />
            </button>
            <button
              onClick={() => scroll(nearCarouselRef, "right")}
              className="p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-100 shadow-sm">
              <ChevronRight className="h-4 w-4 text-gray-600" />
            </button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 border-gray-200">
              <Link to={"job-tracker"}>View All</Link>
            </Button>
          </div>
        </div>
        {/* Scrollable row */}

        <JobCarousel
          innerRef={nearCarouselRef}
          jobs={nearbyJobs}
          bookmarkedJobs={bookmarkedJobs}
          toggleBookmark={toggleBookmark}
          loading={loading}
        />
      </div>
    </div>
  );
}
