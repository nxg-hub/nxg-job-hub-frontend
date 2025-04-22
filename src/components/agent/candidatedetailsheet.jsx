import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Briefcase, Clock, Calendar } from "lucide-react";

export default function CandidateDetailSheet({
  open,
  onOpenChange,
  candidate,
}) {
  const [activeTab, setActiveTab] = useState("profile");

  // Mock candidate data if not provided
  const defaultCandidate = {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    status: "assigned",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
    bio: "Senior frontend developer with 5+ years of experience building responsive web applications.",
    experience: [
      {
        id: "exp1",
        role: "Frontend Developer",
        company: "TechCorp",
        duration: "Jan 2020 - Present",
        description:
          "Led the development of customer-facing dashboard using React and TypeScript.",
        skills: ["React", "TypeScript", "Redux"],
      },
    ],
    assignments: [
      {
        id: "assign1",
        employer: "TechCorp",
        jobTitle: "Senior Frontend Developer",
        startDate: "2023-05-15",
        status: "active",
        rate: "$85/hr",
      },
    ],
  };

  const displayCandidate = candidate || defaultCandidate;

  const handleRelease = () => {
    // Handle release logic here
    console.log("Releasing candidate:", displayCandidate.id);
    onOpenChange(false);
  };

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="mx-10 mb-1 h-[90vh] overflow-y-auto rounded-t-md">
        <SheetHeader className="mt-10 text-left">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={displayCandidate.avatar} />
              <AvatarFallback>{displayCandidate.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <SheetTitle>{displayCandidate.name}</SheetTitle>
              <Badge
                variant={
                  displayCandidate.status === "assigned"
                    ? "default"
                    : "secondary"
                }>
                {displayCandidate.status}
              </Badge>
            </div>
          </div>
        </SheetHeader>

        <div className="grid gap-4 py-4">
          <Tabs
            defaultValue="profile"
            className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger
                value="profile"
                onClick={() => setActiveTab("profile")}>
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="experience"
                onClick={() => setActiveTab("experience")}>
                Experience
              </TabsTrigger>
              <TabsTrigger
                value="assignments"
                onClick={() => setActiveTab("assignments")}>
                Assignments
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab Content */}
            <TabsContent
              value="profile"
              className="mt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p>{displayCandidate.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p>{displayCandidate.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p>{displayCandidate.location}</p>
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div>
                  <h3 className="font-medium mb-2">About</h3>
                  <p className="text-muted-foreground">
                    {displayCandidate.bio}
                  </p>
                </div>

                <Separator className="my-4" />

                <div>
                  <h3 className="font-medium mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {displayCandidate.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Experience Tab Content */}
            <TabsContent
              value="experience"
              className="mt-4">
              <div className="space-y-6">
                {displayCandidate.experience.map((exp) => (
                  <div
                    key={exp.id}
                    className="border rounded-lg p-4">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium text-lg">{exp.role}</h3>
                        <p className="text-muted-foreground">{exp.company}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{exp.duration}</span>
                      </div>
                    </div>
                    <p className="mt-3 text-muted-foreground">
                      {exp.description}
                    </p>
                    {exp.skills && exp.skills.length > 0 && (
                      <div className="mt-3">
                        <h4 className="text-sm font-medium mb-1">
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill) => (
                            <Badge
                              key={skill}
                              variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Assignments Tab Content */}
            <TabsContent
              value="assignments"
              className="mt-4">
              <div className="space-y-4">
                {displayCandidate.assignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">
                          {assignment.jobTitle}
                        </h3>
                        <p className="text-muted-foreground">
                          {assignment.employer}
                        </p>
                      </div>
                      <Badge
                        variant={
                          assignment.status === "active" ? "default" : "outline"
                        }>
                        {assignment.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Rate</p>
                        <p className="font-medium">{assignment.rate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Start Date
                        </p>
                        <p className="font-medium">{assignment.startDate}</p>
                      </div>
                    </div>
                    {assignment.endDate && (
                      <div className="mt-2">
                        <p className="text-sm text-muted-foreground">
                          End Date
                        </p>
                        <p className="font-medium">{assignment.endDate}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <SheetFooter className="mt-6">
          <div className="flex gap-2 w-full">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}>
              Close
            </Button>
            {displayCandidate.status === "assigned" && (
              <Button
                variant="destructive"
                className="flex-1"
                onClick={handleRelease}>
                Release Candidate
              </Button>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
