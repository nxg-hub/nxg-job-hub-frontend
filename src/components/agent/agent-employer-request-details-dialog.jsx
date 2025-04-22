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
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Briefcase,
  Mail,
  Phone,
  Calendar,
  Clock,
  DollarSign,
  Users,
} from "lucide-react";

export default function AgentEmployerRequestDetailsDialog({
  request,
  open,
  onOpenChange,
}) {
  if (!request) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={request.employer.avatar || "/placeholder.svg"}
                alt={request.employer.name}
              />
              <AvatarFallback>{request.employer.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle className="text-xl">{request.jobTitle}</DialogTitle>
              <DialogDescription className="flex items-center gap-2">
                {request.employer.name} • {request.location}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="details">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Job Details</TabsTrigger>
            <TabsTrigger value="employer">Employer Info</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
          </TabsList>

          <TabsContent
            value="details"
            className="space-y-4 pt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h3 className="font-medium">Job Overview</h3>
                <div className="space-y-2 rounded-md border p-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span>{request.jobType}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{request.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>{request.salary}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Posted: {request.datePosted}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Deadline: {request.deadline || "Not specified"}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Request Details</h3>
                <div className="space-y-2 rounded-md border p-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>Positions: {request.positions || 1}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge
                      variant={
                        request.urgency === "High" ? "destructive" : "outline"
                      }>
                      {request.urgency || "Normal"} Priority
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge
                      variant={
                        request.status === "New" ? "destructive" : "default"
                      }>
                      {request.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Job Description</h3>
              <div className="rounded-md border p-3">
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {request.description}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Additional Notes</h3>
              <div className="rounded-md border p-3">
                <p className="text-sm text-muted-foreground">
                  {request.additionalNotes || "No additional notes provided."}
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="employer"
            className="space-y-4 pt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h3 className="font-medium">Company Information</h3>
                <div className="space-y-2 rounded-md border p-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={request.employer.avatar || "/placeholder.svg"}
                        alt={request.employer.name}
                      />
                      <AvatarFallback>
                        {request.employer.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{request.employer.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {request.industry}
                      </p>
                    </div>
                  </div>
                  {request.employer.description && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      {request.employer.description}
                    </p>
                  )}
                  {request.employer.website && (
                    <a
                      href={request.employer.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 text-sm text-primary hover:underline">
                      Visit Website
                    </a>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Contact Information</h3>
                <div className="space-y-2 rounded-md border p-3">
                  {request.contactPerson && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium">
                        {request.contactPerson.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {request.contactPerson.position}
                      </p>
                    </div>
                  )}
                  <div className="space-y-2 pt-2">
                    {request.contactPerson?.email && (
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{request.contactPerson.email}</span>
                      </div>
                    )}
                    {request.contactPerson?.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{request.contactPerson.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Previous Placements</h3>
              <div className="rounded-md border p-3">
                {request.employer.previousPlacements &&
                request.employer.previousPlacements.length > 0 ? (
                  <div className="space-y-3">
                    {request.employer.previousPlacements.map(
                      (placement, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">
                              {placement.position}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {placement.date}
                            </p>
                          </div>
                          <Badge variant="outline">{placement.status}</Badge>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No previous placements with this employer.
                  </p>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="requirements"
            className="space-y-4 pt-4">
            <div className="space-y-2">
              <h3 className="font-medium">Required Skills</h3>
              <div className="flex flex-wrap gap-1.5 rounded-md border p-3">
                {request.requiredSkills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {request.preferredSkills && request.preferredSkills.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-medium">Preferred Skills</h3>
                <div className="flex flex-wrap gap-1.5 rounded-md border p-3">
                  {request.preferredSkills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <h3 className="font-medium">Experience & Education</h3>
              <div className="space-y-2 rounded-md border p-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Experience</p>
                  <p className="text-sm text-muted-foreground">
                    {request.experience || "Not specified"}
                  </p>
                </div>
                <Separator className="my-2" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Education</p>
                  <p className="text-sm text-muted-foreground">
                    {request.education || "Not specified"}
                  </p>
                </div>
                {request.certifications && (
                  <>
                    <Separator className="my-2" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Certifications</p>
                      <p className="text-sm text-muted-foreground">
                        {request.certifications}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {request.additionalRequirements && (
              <div className="space-y-2">
                <h3 className="font-medium">Additional Requirements</h3>
                <div className="rounded-md border p-3">
                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {request.additionalRequirements}
                  </p>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button>Find Matches</Button>
          <Button variant="secondary">Contact Employer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
