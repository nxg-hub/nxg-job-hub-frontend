import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  formatDate,
  getEmployerRequestsForJob,
  getJobRequirements,
} from "@/utils/data/agent-mock-data";
import EmployerRequestCard from "@/pages/Dashboard/Agent/employer-request-card";
import { ScrollArea } from "../ui/scroll-area";

export default function JobDetailsDialog({ job, open, onOpenChange }) {
  if (!job) return null;

  const jobRequirements = getJobRequirements(job.id);
  const employerRequests = getEmployerRequestsForJob(job.id);

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}>
      <DialogContent className=" max-w-6xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={job.companyLogo || "/placeholder.svg"}
                alt={job.company}
              />
              <AvatarFallback>{job.company.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle className="text-xl">{job.title}</DialogTitle>
              <DialogDescription>
                {job.company} • {job.location}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="h-3/4 px-10">
          <div className="grid gap-6 py-4 md:grid-cols-[2fr_1fr]">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">Job Description</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {job.description}
                </p>
              </div>

              {jobRequirements && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Requirements</h3>

                  <div>
                    <h4 className="font-medium">Essential Skills</h4>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {jobRequirements.essentialSkills.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium">Desirable Skills</h4>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {jobRequirements.desirableSkills.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <div>
                      <span className="font-medium">Experience: </span>
                      <span className="text-sm text-muted-foreground">
                        {jobRequirements.experience}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">Education: </span>
                      <span className="text-sm text-muted-foreground">
                        {jobRequirements.education}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">
                        Additional Information:{" "}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {jobRequirements.additionalInfo}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">Job Details</h3>
                <div className="mt-2 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="font-medium">{job.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Salary:</span>
                    <span className="font-medium">{job.salary}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Industry:</span>
                    <span className="font-medium">{job.industry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Posted:</span>
                    <span className="font-medium">
                      {formatDate(job.postedDate)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="h-px bg-border" />

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Employer Requests</h3>
                  <Badge
                    variant="outline"
                    className="font-normal">
                    {employerRequests.length} requests
                  </Badge>
                </div>

                <div className="mt-2 space-y-3 max-h-[300px] overflow-y-auto pr-2">
                  {employerRequests.length > 0 ? (
                    employerRequests.map((request) => (
                      <EmployerRequestCard
                        key={request.id}
                        request={request}
                      />
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <p className="text-sm text-muted-foreground">
                        No specific requests from employer
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
        <div>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button className="border-none bg-sky-500 hover:bg-sky-600">
            Match Candidates
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
