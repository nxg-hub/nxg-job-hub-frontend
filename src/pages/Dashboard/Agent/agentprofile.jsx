import { useState } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Mail, Phone, Briefcase, MapPin, Clock } from "lucide-react";

export default function AgentProfilePage() {
  const { id } = useParams();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");

  // Mock candidate data - in a real app, this would come from an API
  const candidate = {
    id: id || "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    status: "assigned",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
    bio: "Senior frontend developer with 5+ years of experience building responsive web applications. Specialized in React ecosystem and modern JavaScript frameworks.",
    experience: [
      {
        id: "exp1",
        role: "Frontend Developer",
        company: "TechCorp",
        duration: "Jan 2020 - Present",
        description:
          "Led the development of customer-facing dashboard using React and TypeScript. Implemented performance optimizations that reduced load times by 40%.",
        skills: ["React", "TypeScript", "Redux", "Jest"],
      },
      {
        id: "exp2",
        role: "Web Developer",
        company: "Digital Solutions",
        duration: "Mar 2018 - Dec 2019",
        description:
          "Developed and maintained e-commerce platforms using React and Node.js. Collaborated with designers to implement responsive UI components.",
        skills: ["React", "Node.js", "MongoDB", "SASS"],
      },
    ],
    education: [
      {
        id: "edu1",
        degree: "B.Sc Computer Science",
        institution: "University of California",
        year: "2017",
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
        contact: "Sarah Johnson (sjohnson@techcorp.com)",
      },
      {
        id: "assign2",
        employer: "InnovateSoft",
        jobTitle: "React Consultant",
        startDate: "2022-01-10",
        endDate: "2023-03-20",
        status: "completed",
        rate: "$75/hr",
        contact: "Michael Chen (mchen@innovatesoft.com)",
      },
    ],
  };

  const handleReleaseCandidate = () => {
    // In a real app, this would call an API
    toast({
      title: "Candidate Released",
      description: `${candidate.name} has been released from their current assignment`,
    });
  };

  const handleExtendAssignment = () => {
    toast({
      title: "Assignment Extended",
      description: `${candidate.name}'s assignment has been extended`,
    });
  };

  return (
    <div className="mx-auto p-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Candidate Profile Card */}
        <Card className="w-full md:w-1/3">
          <CardHeader className="items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={candidate.avatar} />
              <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <CardTitle>{candidate.name}</CardTitle>
            <div className="flex justify-center mt-2">
              <Badge
                variant={
                  candidate.status === "assigned" ? "default" : "secondary"
                }>
                {candidate.status}
              </Badge>
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span>{candidate.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>{candidate.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>{candidate.location}</span>
              </div>

              <Separator className="my-2" />

              <div>
                <h3 className="font-medium mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1">
              Edit Profile
            </Button>
            {candidate.status === "assigned" && (
              <Button
                variant="destructive"
                className="flex-1"
                onClick={handleReleaseCandidate}>
                Release
              </Button>
            )}
          </CardFooter>
        </Card>

        {/* Candidate Details Tabs */}
        <div className="w-full md:w-2/3">
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

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Professional Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{candidate.bio}</p>

                  <Separator className="my-6" />

                  <h3 className="font-medium text-lg mb-4">Education</h3>
                  <div className="space-y-4">
                    {candidate.education.map((edu) => (
                      <div
                        key={edu.id}
                        className="border-l-2 pl-4 border-primary">
                        <h4 className="font-medium">{edu.degree}</h4>
                        <p className="text-gray-600">{edu.institution}</p>
                        <p className="text-sm text-gray-500">{edu.year}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Experience Tab */}
            <TabsContent value="experience">
              <Card>
                <CardHeader>
                  <CardTitle>Work Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {candidate.experience.map((exp) => (
                      <div
                        key={exp.id}
                        className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-lg">{exp.role}</h3>
                            <p className="text-gray-600">{exp.company}</p>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock className="h-4 w-4" />
                            <span>{exp.duration}</span>
                          </div>
                        </div>

                        <p className="mt-3 text-gray-700">{exp.description}</p>

                        <div className="mt-4">
                          <h4 className="text-sm font-medium mb-2">
                            Technologies Used
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
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Assignments Tab */}
            <TabsContent value="assignments">
              <Card>
                <CardHeader>
                  <CardTitle>Current & Past Assignments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {candidate.assignments.map((assignment) => (
                      <div
                        key={assignment.id}
                        className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-lg">
                              {assignment.jobTitle}
                            </h3>
                            <p className="text-gray-600">
                              {assignment.employer}
                            </p>
                          </div>
                          <Badge
                            variant={
                              assignment.status === "active"
                                ? "default"
                                : "outline"
                            }>
                            {assignment.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div>
                            <p className="text-sm text-gray-500">Rate</p>
                            <p className="font-medium">{assignment.rate}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Duration</p>
                            <p className="font-medium">
                              {assignment.startDate}
                              {assignment.endDate
                                ? ` - ${assignment.endDate}`
                                : " - Present"}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4">
                          <p className="text-sm text-gray-500">Contact</p>
                          <p className="font-medium">{assignment.contact}</p>
                        </div>

                        {assignment.status === "active" && (
                          <div className="mt-4 flex gap-2">
                            <Button
                              variant="outline"
                              size="sm">
                              View Contract
                            </Button>
                            <Button
                              size="sm"
                              onClick={handleExtendAssignment}>
                              Extend Assignment
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
