import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bookmark, MapPin, Search } from "lucide-react";
import kcyimage from "@/static/images/kyc-image.png";
import driver from "@/static/images/driver.png";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Job Card Component
 * @param {Object} props
 * @param {Object} props.job - Job data
 * @param {boolean} props.isBookmarked - Whether the job is bookmarked
 * @param {Function} props.onBookmarkToggle - Function to toggle bookmark
 */

const recommendedJobs = [
  {
    id: 1,
    company: "Employer",
    location: "Lagos, Nigeria",
    title: "Skilled Driver",
    description:
      "I need a skilled Driver with 3 years of Experience.",
    type: ["Full time", "On-site"],
    salary: "$32k-$60k",
    views: 30,
    applicants: 2,
    bookmarked: false,
  },
  {
    id: 2,
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
    id: 3,
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
    id:4,
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
];

const nearbyJobs = [
  {
    id:5 ,
    company: "Employer",
    location: "Kano, Nigeria",
    title: "Skilled Driver",
    description:
      "I need a skilled Driver with 3 years of Experience.",
    type: ["Full time", "On-site"],
    salary: "$32k-$60k",
    views: 30,
    applicants: 2,
    bookmarked: false,
  },
  {
    id:6 ,
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
    description:
      "I need a skilled Driver with 3 years of Experience.",
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
      <img src={driver} alt="driver-image" />
        {/* Employer/bookmark */}
      <div className="flex justify-between w-full">
        <div className="flex gap-2">
          <div className="flex-col">
            <h3 className="font-medium">{job.company}</h3>
            <div className="flex items-center text-xs text-gray-500">
              <MapPin className="h-3 w-3 mr-1" />
              {job.location}
            </div>
          </div>
        </div>
        <Button 
          variant="ghost"
          size="icon"
          className="h-8 w-8 border-none"
          onClick={onBookmarkToggle}>
          <div className="flex flex-col items-center">
            <Bookmark
              className={cn(
                "h-10 w-",
                isBookmarked ? "fill-[#0078B4] text-[#0078B4]" : "text-gray-400"
              )}
            />
            <span className="text-xs text-gray-300">
              {isBookmarked ? "saved" : "save"}
            </span>
          </div>
        </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h4 className="font-medium mb-2">{job.title}</h4>
        <p className="text-sm text-gray-600 mb-3 line-clamp-3">
          {job.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          {job.type.map((type) => (
            <Badge
              key={type}
              variant="outline"
              className="font-normal">
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
        <Button
          size="sm"
          className="bg-sky-400 border-none hover:bg-[#006699]">
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
}

export function ServicesProviderHomePage() {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  const toggleBookmark = (jobId) => {
    setBookmarkedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };
  return (
    <div>
      {/* Search Section */}
      <div className="p-4 bg-white border-b">
        <p className="text-sm text-gray-500 mb-2">Search for Jobs</p>
        <div className="flex flex-wrap gap-2">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Nurse/Driver"
              className="pl-9"
            />
          </div>

          <div className="relative flex-1 min-w-[200px]">
            <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Location"
              className="pl-9"
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <Select>
              <SelectTrigger className="hover:bg-gray-100 hover:text-gray-500">
                <SelectValue placeholder="Type of employment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Volunteer</SelectItem>
                <SelectItem value="part-time">Contract</SelectItem>
                <SelectItem value="contract">Part-time</SelectItem>
                <SelectItem value="freelance">Full-time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <Select>
              <SelectTrigger className="hover:bg-gray-100 hover:text-gray-500">
                <SelectValue placeholder="Experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entry">Internship</SelectItem>
                <SelectItem value="mid">Entry level</SelectItem>
                <SelectItem value="senior">Mid level</SelectItem>
                <SelectItem value="senior">Senior level</SelectItem>
                <SelectItem value="senior">Director</SelectItem>
                <SelectItem value="senior">Executive</SelectItem>
                <SelectItem value="senior">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="bg-sky-400 hover:bg-[#006699] border-none">
            Search Job
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">sort by</span>
            <Select defaultValue="relevance">
              <SelectTrigger className="w-[130px] hover:bg-gray-100">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="date">Popularity</SelectItem>
                <SelectItem value="salary">Recent</SelectItem>
                <SelectItem value="salary">Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      {/* end of search setion */}
      {/* Profile Completion */}
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-10 flex items-center justify-between">
            <div className="flex-1 min-w-[300px]">
              <h2 className="text-xl font-semibold text-gray-800">
                Get started by Completing your Profile
              </h2>
              <p className="text-gray-600 mt-1">
                Stand a better chance of being hired by completing your profile
              </p>
              <Button className="mt-4 bg-sky-400 hover:bg-[#006699] border-none">
                Complete Profile
              </Button>
            </div>
            <div className="min-w-[300px]">
              <img
                src={kcyimage}
                alt="Complete profile illustration"
                className="object-contain w-44 h-44"
              />
            </div>
          </div>
        </div>
      </div>
      {/* end of complete profile */}
      {/* Recommended Jobs */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800 border-b-2 border-sky-400 pb-1">
            Recommeded Jobs for you
          </h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 border-gray-200 ">
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommendedJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isBookmarked={bookmarkedJobs.includes(job.id)}
              onBookmarkToggle={() => toggleBookmark(job.id)}
            />
          ))}
        </div>
      </div>

      {/* Jobs Near You */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800 border-b-2 border-sky-400 pb-1">
            Jobs Near You
          </h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 border-gray-200">
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {nearbyJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isBookmarked={bookmarkedJobs.includes(job.id)}
              onBookmarkToggle={() => toggleBookmark(job.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
