import { MapPin, Timer } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/utils/data/agent-mock-data";

export default function JobCard({ job, onViewDetails, onFindMatches }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b-[1px]">
        <div className="flex justify-between">
          <div className="flex  items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={job.companyLogo || "/placeholder.svg"}
                alt={job.company}
              />
              <AvatarFallback>{job.company.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="">
              <p className="font-medium text-xl">{job.company}</p>
              <p className="flex items-center space-x-1 text-muted-foreground ">
                <MapPin size={12} />
                <span className="text-xs">{job.location}</span>
              </p>
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-medium">{job.salary}</div>
            <div className="flex items-center text-sm space-x-1 text-muted-foreground">
              <Timer size={17} />
              <span>{job.type}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-4 space-y-2">
        <div className="flex justify-between">
          <CardTitle className="text-xl">{job.title}</CardTitle>
          <div className="text-xs text-muted-foreground">
            Posted {formatDate(job.postedDate)}
          </div>
        </div>
        <CardDescription>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {job.description}
          </p>
          <div className="flex flex-wrap gap-1">
            {job.skills.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="font-normal">
                {skill}
              </Badge>
            ))}
          </div>
        </CardDescription>
        <div className="flex gap-2 pt-10">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(job)}>
            View Details
          </Button>
          <Button
            onClick={() => onFindMatches(job)}
            className="border-none bg-sky-500 hover:bg-sky-600"
            size="sm">
            Match Candidates
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
