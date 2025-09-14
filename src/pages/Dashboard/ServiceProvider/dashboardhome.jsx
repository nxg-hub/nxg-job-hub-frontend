import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bookmark, MapPin, Search, ChevronLeft, ChevronRight } from "lucide-react";
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
import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";

const nearbyJobs = [
  {
    id: 5,
    company: "Employer",
    location: "Kano, Nigeria",
    title: "Skilled Driver",
    description: "I need a skilled Driver with 3 years of Experience.",
    type: ["Full time", "On-site"],
    salary: "$32k-$60k",
    views: 30,
    applicants: 2,
    bookmarked: false,
  },
  {
    id: 6,
    company: "Agency",
    location: "Albany, NY",
    title: "Housemaid Needed",
    description:
      "Professional Housemaid needed urgently. Lorem interdum euis ut turpis lorem. An interdum nisl interdum euis ut turpis lorem.",
    type: ["Contract", "Full time"],
    salary: "$45k-$80k",
    views: 30,
    applicants: 0,
    bookmarked: false,
  },
  {
    id: 7,
    company: "Employer",
    location: "Abuja, Nigeria",
    title: "Experience Nurse",
    description:
      "I need an experience nurse that can treate. Lorem interdum euis ut turpis lorem. An interdum nisl interdum euis ut turpis lorem.",
    type: ["Full time", "On-site", "Off-site"],
    salary: "$32k-$60k",
    views: 30,
    applicants: 2,
    bookmarked: false,
  },
  {
    id: 8,
    company: "Employer",
    location: "Lagos, Nigeria",
    title: "Skilled Driver",
    description: "I need a skilled Driver with 3 years of Experience.",
    type: ["Full time", "On-site"],
    salary: "$32k-$60k",
    views: 30,
    applicants: 2,
    bookmarked: false,
  },
  {
    id: 9,
    company: "Employer",
    location: "Kano, Nigeria",
    title: "Skilled Driver",
    description: "I need a skilled Driver with 3 years of Experience.",
    type: ["Full time", "On-site"],
    salary: "$32k-$60k",
    views: 30,
    applicants: 2,
    bookmarked: false,
  },
  {
    id: 10,
    company: "Agency",
    location: "Albany, NY",
    title: "Housemaid Needed",
    description:
      "Professional Housemaid needed urgently. Lorem interdum euis ut turpis lorem. An interdum nisl interdum euis ut turpis lorem.",
    type: ["Contract", "Full time"],
    salary: "$45k-$80k",
    views: 30,
    applicants: 0,
    bookmarked: false,
  },
  {
    id: 11,
    company: "Employer",
    location: "Abuja, Nigeria",
    title: "Experience Nurse",
    description:
      "I need an experience nurse that can treate. Lorem interdum euis ut turpis lorem. An interdum nisl interdum euis ut turpis lorem.",
    type: ["Full time", "On-site", "Off-site"],
    salary: "$32k-$60k",
    views: 30,
    applicants: 2,
    bookmarked: false,
  },
  {
    id: 12,
    company: "Employer",
    location: "Lagos, Nigeria",
    title: "Skilled Driver",
    description: "I need a skilled Driver with 3 years of Experience.",
    type: ["Full time", "On-site"],
    salary: "$32k-$60k",
    views: 30,
    applicants: 2,
    bookmarked: false,
  },
];

function JobCard({ job, isBookmarked, onBookmarkToggle }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 pb-0 flex flex-col justify-between items-start">
        <img src={driver} alt="" />
        <div className="flex justify-between w-full">
          <div>
            <h3 className="font-medium">{job.company}</h3>
            <div className="flex items-center text-xs text-gray-500">
              <MapPin className="h-3 w-3 mr-1" />
              {job.location}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 border-none"
            onClick={onBookmarkToggle}
          >
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
        <h4 className="font-medium mb-2">{job.title}</h4>
        <p className="text-sm text-gray-600 mb-3 line-clamp-3">{job.description}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {job.type.map((type) => (
            <Badge key={type} variant="outline" className="font-normal">
              {type}
            </Badge>
          ))}
        </div>
        <div className="font-medium">{job.salary}</div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center border-t">
        <div className="text-xs text-gray-500">
          {job.views} views • {job.applicants} applicants
        </div>
        <Button size="sm" className="bg-sky-400 border-none hover:bg-[#006699]">
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
}

function JobCarousel({ jobs, bookmarkedJobs, toggleBookmark, innerRef }) {
  return (
    <div
      ref={innerRef}
      className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
    >
      {jobs.map((job) => (
        <div key={job.id} className="flex-none w-80 sm:w-72 md:w-80">
          <JobCard
            job={job}
            isBookmarked={bookmarkedJobs.includes(job.id)}
            onBookmarkToggle={() => toggleBookmark(job.id)}
          />
        </div>
      ))}
    </div>
  );
}

export function ServicesProviderHomePage() {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [nearbyJobs, setNearbyJobs] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);

  const recCarouselRef = useRef(null);
  const nearCarouselRef = useRef(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          "https://nxg-job-hub-backend.onrender.com/api/job-postings/recent-job-postings"
        );
        const data = await response.json();
        setRecommendedJobs(data.content || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
  const fetchNearbyJobs = async () => {
    try {
      const response = await fetch(
        `https://nxg-job-hub-backend.onrender.com/api/job-postings/recommend-nearby-jobs`
      );
      const data = await response.json();
      setNearbyJobs(data.content || []);
    } catch (error) {
      console.error("Error fetching nearby jobs:", error);
    }
  };

  fetchNearbyJobs();
}, []);


  const toggleBookmark = (jobId) => {
    setBookmarkedJobs((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
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
    <div className="max-w-full overflow-hidden space-y-10">
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
              className="p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-100 shadow-sm"
            >
              <ChevronLeft className="h-4 w-4 text-gray-600" />
            </button>
            <button
              onClick={() => scroll(recCarouselRef, "right")}
              className="p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-100 shadow-sm"
            >
              <ChevronRight className="h-4 w-4 text-gray-600" />
            </button>
            <Button variant="ghost" size="sm" className="text-gray-500 border-gray-200">
              View All
            </Button>
          </div>
        </div>

        {/* Scrollable row */}
        {recommendedJobs.length > 0 ? (
          <JobCarousel
            innerRef={recCarouselRef}
            jobs={recommendedJobs}
            bookmarkedJobs={bookmarkedJobs}
            toggleBookmark={toggleBookmark}
          />
        ) : (
          <p>No recent jobs found.</p>
        )}
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
              className="p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-100 shadow-sm"
            >
              <ChevronLeft className="h-4 w-4 text-gray-600" />
            </button>
            <button
              onClick={() => scroll(nearCarouselRef, "right")}
              className="p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-100 shadow-sm"
            >
              <ChevronRight className="h-4 w-4 text-gray-600" />
            </button>
            <Button variant="ghost" size="sm" className="text-gray-500 border-gray-200">
              View All
            </Button>
          </div>
        </div>

        {/* Scrollable row */}
        <JobCarousel
          innerRef={nearCarouselRef}
          jobs={nearbyJobs}
          bookmarkedJobs={bookmarkedJobs}
          toggleBookmark={toggleBookmark}
        />
      </div>
    </div>
  );
}