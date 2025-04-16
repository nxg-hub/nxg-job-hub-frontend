import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export default function XCandidatesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openAssignDialog, setOpenAssignDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState("");
  const [availableJobs, setAvailableJobs] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API fetch for candidates
    const fetchCandidates = async () => {
      setIsLoading(true);
      const mockCandidates = [
        {
          id: "1",
          name: "Alex Johnson",
          title: "Senior Frontend Developer",
          location: "San Francisco, CA",
          skills: ["React", "TypeScript", "Next.js", "Node.js"],
          experience: 5,
          availability: "Immediately",
          bio: "Passionate about building accessible and performant web applications with React.",
          email: "alex.johnson@example.com",
          phone: "(555) 123-4567",
          education: [
            {
              degree: "B.Sc Computer Science",
              institution: "Stanford University",
              year: 2018,
            },
          ],
          workHistory: [
            {
              position: "Senior Frontend Engineer",
              company: "TechCorp",
              duration: "2020 - Present",
              responsibilities: [
                "Led frontend team in migrating legacy codebase to React",
                "Implemented design system used across all company products",
                "Improved application performance by 40%",
              ],
            },
          ],
        },
        {
          id: "2",
          name: "Maria Garcia",
          title: "UX/UI Designer",
          location: "Austin, TX",
          skills: ["Figma", "User Research", "Prototyping", "CSS"],
          experience: 3,
          availability: "2 weeks notice",
          bio: "User-centered designer focused on creating intuitive and beautiful interfaces.",
          email: "maria.garcia@example.com",
          phone: "(555) 987-6543",
          education: [
            {
              degree: "B.A. Design",
              institution: "University of Texas",
              year: 2019,
            },
          ],
          workHistory: [
            {
              position: "Product Designer",
              company: "DesignHub",
              duration: "2021 - Present",
              responsibilities: [
                "Redesigned core product leading to 30% increase in user engagement",
                "Conducted user research studies with 100+ participants",
                "Created design system adopted company-wide",
              ],
            },
          ],
        },
      ];

      // Simulate API fetch for available jobs
      const mockJobs = [
        {
          id: "j1",
          title: "Frontend Developer",
          company: "Tech Solutions Inc.",
        },
        { id: "j2", title: "UX Designer", company: "Creative Minds LLC" },
        { id: "j3", title: "Full Stack Engineer", company: "WebBuild Co." },
      ];

      setTimeout(() => {
        setCandidates(mockCandidates);
        setSelectedCandidate(mockCandidates[0]);
        setAvailableJobs(mockJobs);
        setIsLoading(false);
      }, 800);
    };
    fetchCandidates();
  }, []);

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesLocation = locationFilter
      ? candidate.location.toLowerCase().includes(locationFilter.toLowerCase())
      : true;
    const matchesSkill = skillFilter
      ? candidate.skills.some((s) =>
          s.toLowerCase().includes(skillFilter.toLowerCase())
        )
      : true;
    const matchesExperience = experienceFilter
      ? (experienceFilter === "0-2" && candidate.experience <= 2) ||
        (experienceFilter === "3-5" &&
          candidate.experience >= 3 &&
          candidate.experience <= 5) ||
        (experienceFilter === "5+" && candidate.experience > 5)
      : true;

    return (
      matchesSearch && matchesLocation && matchesSkill && matchesExperience
    );
  });

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
    <div className="flex h-screen bg-gray-50">
      {/* Left Panel - Candidate List */}
      <div className="w-1/3 border-r border-gray-200 bg-white p-4 flex flex-col">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Find Candidates</h1>

          {/* Search and Filter Section */}
          <div className="space-y-3">
            <Input
              placeholder="Search by name, title, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="Filter by location..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              />
              <Input
                placeholder="Filter by skill..."
                value={skillFilter}
                onChange={(e) => setSkillFilter(e.target.value)}
              />
            </div>

            <Select onValueChange={setExperienceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-2">0-2 years</SelectItem>
                <SelectItem value="3-5">3-5 years</SelectItem>
                <SelectItem value="5+">5+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Candidate List */}
          <ScrollArea className="h-[calc(100vh-220px)]">
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Card
                    key={i}
                    className="animate-pulse">
                    <CardHeader>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {[...Array(3)].map((_, j) => (
                          <div
                            key={j}
                            className="h-6 bg-gray-200 rounded-full w-16"></div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredCandidates.length > 0 ? (
              <div className="space-y-3">
                {filteredCandidates.map((candidate) => (
                  <Card
                    key={candidate.id}
                    className={`cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedCandidate?.id === candidate.id
                        ? "border-primary bg-blue-50"
                        : ""
                    }`}
                    onClick={() => setSelectedCandidate(candidate)}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        {candidate.name}
                      </CardTitle>
                      <p className="text-sm text-gray-600">{candidate.title}</p>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <div className="flex flex-wrap gap-2">
                        {candidate.skills.slice(0, 4).map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                        {candidate.skills.length > 4 && (
                          <Badge variant="outline">
                            +{candidate.skills.length - 4}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between text-sm text-gray-500">
                      <span>{candidate.location}</span>
                      <span>{candidate.experience} yrs exp</span>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  No candidates match your filters
                </p>
                <Button
                  variant="ghost"
                  className="mt-2"
                  onClick={() => {
                    setSearchTerm("");
                    setLocationFilter("");
                    setSkillFilter("");
                    setExperienceFilter("");
                  }}>
                  Clear filters
                </Button>
              </div>
            )}
          </ScrollArea>
        </div>
      </div>

      {/* Right Panel - Candidate Detail */}
      <div className="w-2/3 p-6">
        {selectedCandidate ? (
          <ScrollArea className="h-full">
            <div className="space-y-6">
              {/* Candidate Header */}
              <div className="flex items-start gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src={`https://i.pravatar.cc/150?u=${selectedCandidate.id}`}
                  />
                  <AvatarFallback>
                    {selectedCandidate.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">
                    {selectedCandidate.name}
                  </h2>
                  <p className="text-lg text-gray-600">
                    {selectedCandidate.title}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>{selectedCandidate.location}</span>
                    <span>•</span>
                    <span>{selectedCandidate.experience} years experience</span>
                    <span>•</span>
                    <span className="text-green-600">
                      {selectedCandidate.availability}
                    </span>
                  </div>
                </div>
                <div className="ml-auto space-x-2">
                  <Button variant="default">Contact</Button>
                  <Button variant="outline">Save</Button>
                  <Button
                    variant="default"
                    onClick={() => setOpenAssignDialog(true)}>
                    Assign to Job
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Skills */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCandidate.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="text-sm py-1 px-3">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              {/* About */}
              <div>
                <h3 className="font-semibold text-lg mb-3">About</h3>
                <p className="text-gray-700">{selectedCandidate.bio}</p>
              </div>

              <Separator />

              {/* Contact Info */}
              <div>
                <h3 className="font-semibold text-lg mb-3">
                  Contact Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p>{selectedCandidate.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p>{selectedCandidate.phone}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Work History */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Work History</h3>
                <div className="space-y-4">
                  {selectedCandidate.workHistory.map((job, index) => (
                    <div
                      key={index}
                      className="border-l-2 border-gray-200 pl-4">
                      <h4 className="font-medium">{job.position}</h4>
                      <p className="text-gray-600">
                        {job.company} • {job.duration}
                      </p>
                      <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700">
                        {job.responsibilities.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Education */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Education</h3>
                <div className="space-y-3">
                  {selectedCandidate.education.map((edu, index) => (
                    <div key={index}>
                      <h4 className="font-medium">{edu.degree}</h4>
                      <p className="text-gray-600">
                        {edu.institution} • {edu.year}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Select a candidate to view details</p>
          </div>
        )}
      </div>

      {/* Assign Candidate Dialog */}
      <Dialog
        open={openAssignDialog}
        onOpenChange={setOpenAssignDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Candidate to Job</DialogTitle>
            <DialogDescription>
              Assign {selectedCandidate?.name} to an available job position.
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
