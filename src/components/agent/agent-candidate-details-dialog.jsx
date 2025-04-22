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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  MapPin,
  Briefcase,
  Mail,
  Phone,
  Calendar,
  Award,
  Clock,
} from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

export default function AgentCandidateDetailsDialog({
  candidate,
  open,
  onOpenChange,
}) {
  if (!candidate) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-4xl max-h-[650px] scrollbar-custom overflow-y-auto hover:scrollbar-visible 
            scrollbar-hidden">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={candidate.avatar || "/placeholder.svg"}
                alt={candidate.name}
              />
              <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle className="text-xl">{candidate.name}</DialogTitle>
              <DialogDescription className="flex items-center gap-2">
                <Badge variant="outline">{candidate.type}</Badge>
                {candidate.location && (
                  <span className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-3 w-3" />
                    {candidate.location}
                  </span>
                )}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <Tabs defaultValue="profile">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger
              className="border-none data-[state=active]:bg-sky-500 data-[state=active]:text-sky-50 hover:bg-white hover:text-slate-950"
              value="profile">
              Profile
            </TabsTrigger>
            <TabsTrigger
              className="border-none data-[state=active]:bg-sky-500 data-[state=active]:text-sky-50 hover:bg-white hover:text-slate-950"
              value="experience">
              Experience
            </TabsTrigger>
            <TabsTrigger
              className="border-none data-[state=active]:bg-sky-500 data-[state=active]:text-sky-50 hover:bg-white hover:text-slate-950"
              value="history">
              Match History
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="profile"
            className="space-y-4 pt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h3 className="font-medium">Contact Information</h3>
                <div className="space-y-2 rounded-md border p-3">
                  {candidate.email && (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{candidate.email}</span>
                    </div>
                  )}
                  {candidate.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{candidate.phone}</span>
                    </div>
                  )}
                  {candidate.currentRole && (
                    <div className="flex items-center gap-2 text-sm">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <span>{candidate.currentRole}</span>
                    </div>
                  )}
                  {candidate.availability && (
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Available: {candidate.availability}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Skills Assessment</h3>
                <div className="space-y-3 rounded-md border p-3">
                  {candidate.skillAssessments?.map((skill, index) => (
                    <div
                      key={index}
                      className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>{skill.name}</span>
                        <span className="font-medium">{skill.level}/10</span>
                      </div>
                      <Progress
                        value={skill.level * 10}
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">About</h3>
              <div className="rounded-md border p-3">
                <p className="text-sm text-muted-foreground">
                  {candidate.bio || "No bio provided."}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Skills</h3>
              <div className="flex flex-wrap gap-1.5 rounded-md border p-3">
                {candidate.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {candidate.preferences && (
              <div className="space-y-2">
                <h3 className="font-medium">Job Preferences</h3>
                <div className="space-y-2 rounded-md border p-3">
                  <div className="grid gap-2 sm:grid-cols-2">
                    {candidate.preferences.jobTypes && (
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">
                          Preferred Job Types
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {candidate.preferences.jobTypes.map((type, index) => (
                            <Badge
                              key={index}
                              variant="outline">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {candidate.preferences.industries && (
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">
                          Preferred Industries
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {candidate.preferences.industries.map(
                            (industry, index) => (
                              <Badge
                                key={index}
                                variant="outline">
                                {industry}
                              </Badge>
                            )
                          )}
                        </div>
                      </div>
                    )}
                    {candidate.preferences.salary && (
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">
                          Expected Salary
                        </p>
                        <p className="text-sm font-medium">
                          {candidate.preferences.salary}
                        </p>
                      </div>
                    )}
                    {candidate.preferences.locations && (
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">
                          Preferred Locations
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {candidate.preferences.locations.map(
                            (location, index) => (
                              <Badge
                                key={index}
                                variant="outline">
                                {location}
                              </Badge>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent
            value="experience"
            className="space-y-4 pt-4">
            {candidate.experience && candidate.experience.length > 0 ? (
              <div className="space-y-4">
                <h3 className="font-medium">Work Experience</h3>
                <div className="space-y-4">
                  {candidate.experience.map((exp, index) => (
                    <div
                      key={index}
                      className="rounded-md border p-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{exp.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {exp.company}
                          </p>
                        </div>
                        <Badge variant="outline">{exp.period}</Badge>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="rounded-md border p-4 text-center text-muted-foreground">
                No experience information available
              </div>
            )}

            {candidate.education && candidate.education.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-medium">Education</h3>
                <div className="space-y-4">
                  {candidate.education.map((edu, index) => (
                    <div
                      key={index}
                      className="rounded-md border p-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{edu.degree}</h4>
                          <p className="text-sm text-muted-foreground">
                            {edu.institution}
                          </p>
                        </div>
                        <Badge variant="outline">{edu.year}</Badge>
                      </div>
                      {edu.description && (
                        <p className="mt-2 text-sm text-muted-foreground">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {candidate.certifications &&
              candidate.certifications.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-medium">Certifications</h3>
                  <div className="space-y-2">
                    {candidate.certifications.map((cert, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-md border p-3">
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-muted-foreground" />
                          <span>{cert.name}</span>
                        </div>
                        <Badge variant="outline">{cert.year}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </TabsContent>

          <TabsContent
            value="history"
            className="space-y-4 pt-4">
            {candidate.matchHistory && candidate.matchHistory.length > 0 ? (
              <div className="space-y-4">
                {candidate.matchHistory.map((match, index) => (
                  <div
                    key={index}
                    className="rounded-md border p-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{match.jobTitle}</h4>
                        <p className="text-sm text-muted-foreground">
                          {match.company}
                        </p>
                      </div>
                      <Badge
                        variant={
                          match.status === "Hired" ? "default" : "outline"
                        }>
                        {match.status}
                      </Badge>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Matched on {match.date}</span>
                    </div>
                    {match.feedback && (
                      <div className="mt-2">
                        <p className="text-xs text-muted-foreground">
                          Feedback:
                        </p>
                        <p className="text-sm">{match.feedback}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-md border p-4 text-center text-muted-foreground">
                No match history available
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
          <Button className="border-none bg-sky-500 hover:bg-sky-600 text-white">
            Assign to Employer
          </Button>
          <Button
            className="border-none bg-green-500 hover:bg-green-600 text-white"
            variant="secondary">
            Download Resume
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
