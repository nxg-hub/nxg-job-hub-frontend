import {
  BookUser,
  Briefcase,
  Building,
  Calendar,
  Clock,
  Ellipsis,
  Hash,
  MapPin,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export default function PostedJobCard({ job }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDaysAgo = (dateString) => {
    const now = new Date();
    const jobDate = new Date(dateString);
    const diffTime = Math.abs(now.getTime() - jobDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-4 ">
        <Avatar className="h-12 w-12 border-8 border-sky-200">
          <AvatarImage
            src={job.employer_profile_pic || "/placeholder.svg"}
            alt={job.employer_name}
          />
          <AvatarFallback>{job.employer_name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex items-start justify-between">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={job.employer_profile_pic || "/placeholder.svg"}
              alt={job.employer_name}
            />
            <AvatarFallback>{job.employer_name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={job.employer_profile_pic || "/placeholder.svg"}
                alt={job.employer_name}
              />
              <AvatarFallback>{job.employer_name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg hover:text-primary cursor-pointer">
                <Link href={`/jobs/${job.jobID}`}>{job.job_title}</Link>
              </h3>
              <div className="flex items-center text-muted-foreground text-sm space-x-4">
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-1" />
                  {job.employer_name}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {job.job_location}
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <Badge
              variant={job.jobStatus === "active" ? "default" : "secondary"}
            >
              {job.jobStatus}
            </Badge>
            <p className="text-sm text-muted-foreground mt-1">
              {getDaysAgo(job.createdAt)} days ago
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {job.job_description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {job.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Hash className="h-4 w-4 mr-1" />
            {job.salary}
          </div>
          <div className="flex items-center text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            {job.job_type}
          </div>
          <div className="flex items-center text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            Deadline: {formatDate(job.deadline)}
          </div>
          <div className="text-muted-foreground">
            {job.requirements.length} requirements
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex w-full gap-2">
          <Link href={`/jobs/${job.jobID}`} className="flex-1">
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>
          <Button className="flex-1">Apply Now</Button>
        </div>
      </CardFooter>
    </Card>
  );
}

const JobCard = ({
  jobTitle,
  jobLocation,
  timePosted,
  experienced,
  seasonal,
  numverOfApplicant,
  aboutJob,
}) => {
  return (
    <div className="flex flex-col bg-white rounded-2xl py-4 px-8 gap-3">
      <div className="flex justify-between">
        <div>
          <h1 className="text-slate-800 font-bold">{jobTitle}</h1>
          <p className="text-slate-500">{jobLocation}</p>
        </div>
        <div className="flex flex-col items-end text-slate-500">
          <Ellipsis />
          <p>{timePosted}</p>
        </div>
      </div>
      <p>220 VND</p>
      <div className="flex gap-8">
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5" />
          {experienced}
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          {seasonal}
        </div>
        <div className="flex items-center gap-2">
          <BookUser className="w-5 h-5" />
          {numverOfApplicant} Applicants
        </div>
      </div>
      <p>{aboutJob}</p>
    </div>
  );
};
