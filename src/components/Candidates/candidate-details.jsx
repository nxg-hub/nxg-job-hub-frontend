import {
  MapPin,
  Briefcase,
  Calendar,
  Mail,
  Phone,
  Globe,
  Linkedin,
  Github,
  Download,
  CircleUser,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import sarahicon from "@/static/images/admin-sarah.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";

export function CandidateDetails({ candidate }) {
  const [openAssignDialog, setOpenAssignDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState("");
  const [availableJobs, setAvailableJobs] = useState([]);

  const handleAssignCandidate = () => {
    if (!selectedJob) {
      toast({
        title: "Error",
        description: "Please select a job first",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would make an API call here to assign the candidate
    const selectedJobData = availableJobs.find((job) => job.id === selectedJob);

    toast({
      title: "Candidate Assigned",
      description: `${selectedCandidate.name} has been assigned to ${selectedJobData.title} at ${selectedJobData.company}`,
    });

    setOpenAssignDialog(false);
    setSelectedJob("");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <div className="relative h-24 w-24 flex-shrink-0">
              <Avatar className="h-24 w-24 mb-4 border-none">
                <AvatarImage
                  src={sarahicon}
                  alt="Sarah"
                />
                <AvatarFallback>
                  <CircleUser className="h-12 w-12 border-none" />
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <CardTitle className="text-2xl">{candidate.name}</CardTitle>
                  <p className="text-lg text-muted-foreground">
                    {candidate.title}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="space-x-4">
                    <Button
                      variant="outline"
                      size="sm">
                      <Mail className="mr-2 h-4 w-4" />
                      Contact
                    </Button>
                    <Button
                      className="border-none bg-green-500 hover:bg-green-700"
                      size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download CV
                    </Button>
                  </div>
                  <Button
                    onClick={() => setOpenAssignDialog(true)}
                    className="border-none bg-sky-500 hover:bg-sky-700"
                    size="sm">
                    Assign to Job
                  </Button>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-4 w-4" />
                  {candidate.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Briefcase className="mr-1 h-4 w-4" />
                  {candidate.preferredJobType}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-4 w-4" />
                  {candidate.yearsOfExperience} years experience
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

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
            value="education">
            Education
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="profile"
          className="mt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{candidate.bio}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill) => (
                  <Badge
                    key={skill}
                    className="px-2.5 py-1 rounded-md ">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{candidate.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{candidate.phone}</span>
                </div>
                {candidate.website && (
                  <div className="flex items-center">
                    <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                    <a
                      href={candidate.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline">
                      {candidate.website.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                )}
                {candidate.linkedin && (
                  <div className="flex items-center">
                    <Linkedin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <a
                      href={candidate.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline">
                      LinkedIn Profile
                    </a>
                  </div>
                )}
                {candidate.github && (
                  <div className="flex items-center">
                    <Github className="mr-2 h-4 w-4 text-muted-foreground" />
                    <a
                      href={candidate.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline">
                      GitHub Profile
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent
          value="experience"
          className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Work Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {candidate.experience?.map((exp, index) => (
                  <div
                    key={index}
                    className="border-l-2 border-muted pl-4 pb-2">
                    <h3 className="font-medium">{exp.role}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Briefcase className="mr-1 h-3 w-3" />
                      {exp.company}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {exp.startDate} - {exp.endDate || "Present"}
                    </div>
                    <p className="mt-2 text-sm">{exp.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent
          value="education"
          className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {candidate.education?.map((edu, index) => (
                  <div
                    key={index}
                    className="border-l-2 border-muted pl-4 pb-2">
                    <h3 className="font-medium">{edu.degree}</h3>
                    <div className="text-sm text-muted-foreground">
                      {edu.institution}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {edu.startDate} - {edu.endDate || "Present"}
                    </div>
                    {edu.description && (
                      <p className="mt-2 text-sm">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {/* Assign Candidate Dialog */}
      <Dialog
        open={openAssignDialog}
        onOpenChange={setOpenAssignDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Candidate to Job</DialogTitle>
            <DialogDescription>
              Assign {candidate?.name} to an available job position.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Select Job Position
              </label>
              <Select
                onValueChange={setSelectedJob}
                value={selectedJob}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a job" />
                </SelectTrigger>
                <SelectContent>
                  {availableJobs.map((job) => (
                    <SelectItem
                      key={job.id}
                      value={job.id}>
                      {job.title} - {job.company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedJob && (
              <div className="p-4 bg-gray-50 rounded-md">
                <h4 className="font-medium mb-2">Assignment Details</h4>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Candidate:</span>{" "}
                  {selectedCandidate?.name}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Job:</span>{" "}
                  {availableJobs.find((job) => job.id === selectedJob)?.title}{" "}
                  at{" "}
                  {availableJobs.find((job) => job.id === selectedJob)?.company}
                </p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setOpenAssignDialog(false);
                setSelectedJob("");
              }}>
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleAssignCandidate}
              disabled={!selectedJob}>
              Confirm Assignment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
