import { useState, useEffect, useContext } from "react";
import { FileText, X, Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { matchesData } from "@/utils/data/agent-mock-data";
import { NavLink } from "react-router-dom";
import { useEmployerData } from "@/store/employer/employerStore";

export default function CreateNewJob({
  isOpenDialog,
  openChange,
  isCloseDialog,
}) {
  const employer = useEmployerData((state) => state.employerData);
  // new
  const [tags, setTags] = useState([]);
  const [requirements, setRequirements] = useState([""]);
  const [newTag, setNewTag] = useState("");

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const addRequirement = () => {
    setRequirements([...requirements, ""]);
  };

  const updateRequirement = (index, value) => {
    const updated = [...requirements];
    updated[index] = value;
    setRequirements(updated);
  };

  const removeRequirement = (index) => {
    if (requirements.length > 1) {
      setRequirements(requirements.filter((_, i) => i !== index));
    }
  };

  // end new

  const [candidates, setCandidates] = useState(matchesData);
  const [filteredCandidates, setFilteredCandidates] = useState(matchesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEmployer, setFilterEmployer] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [releaseDialogOpen, setReleaseDialogOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    jobType: "Full-time",
    salaryMin: "",
    salaryMax: "",
    deadline: "",
    skills: "",
    experienceLevel: "Mid Level",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePublishJob = () => {
    // Validate form
    if (!formData.title || !formData.description || !formData.location) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Create new job object
    const newJob = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      location: formData.location,
      jobType: formData.jobType,
      salary: `$${formData.salaryMin} - $${formData.salaryMax}`,
      deadline: formData.deadline,
      skills: formData.skills.split(",").map((skill) => skill.trim()),
      experienceLevel: formData.experienceLevel,
      status: "active",
      postedDate: new Date().toLocaleDateString(),
      applicants: [],
    };

    // In a real app, you would save this to a database
    // For this demo, we'll use localStorage to persist the job
    const existingJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
    localStorage.setItem("jobs", JSON.stringify([...existingJobs, newJob]));

    toast({
      title: "Job Published",
      description: "Your job has been successfully published",
    });

    // Navigate to job listings
    setActiveMenu("jobs");
  };

  // Apply filters when search term or filters change
  useEffect(() => {
    let result = candidates;

    if (searchTerm) {
      result = result.filter(
        (candidate) =>
          candidate.candidate.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          candidate.job.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterEmployer) {
      result = result.filter(
        (candidate) => candidate.employer.name === filterEmployer
      );
    }

    if (filterStatus) {
      result = result.filter((candidate) => candidate.status === filterStatus);
    }

    setFilteredCandidates(result);
  }, [searchTerm, filterEmployer, filterStatus, candidates]);

  // Handle releasing a candidate from an employer
  const handleReleaseCandidate = () => {
    if (selectedCandidate) {
      setCandidates(
        candidates.filter((candidate) => candidate.id !== selectedCandidate.id)
      );
      setReleaseDialogOpen(false);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setFilterEmployer("");
    setFilterStatus("");
  };

  return (
    <Dialog open={isOpenDialog} onOpenChange={openChange}>
      {/* <DialogTrigger asChild>
        <Button className="border-transparent bg-primary hover:bg-secondary">
          <FileText className="mr-1 h-4 w-4" />
          Create New Job
        </Button>
      </DialogTrigger> */}
      <form className="space-y-8">
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Job</DialogTitle>
          </DialogHeader>
          {!employer?.user?.profileVerified ? (
            <div>
              <p className="border p-3 rounded-lg text-base text-red-500 text-center ">
                Your account is yet to be verified, please head on to your{" "}
                <NavLink
                  className="italic underline text-primary "
                  to={"companyprofile"}
                >
                  {" "}
                  profile to complete
                </NavLink>{" "}
                it in order to be able to create job
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              <Card>
                <CardContent className="space-y-4 pt-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="job_title">Job Title *</Label>
                      <Input
                        id="job_title"
                        placeholder="e.g. Senior Frontend Developer"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="job_location">Location *</Label>
                      <Input
                        id="job_location"
                        placeholder="e.g. San Francisco, CA or Remote"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="job_type">Job Type *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="on-site">On-site</SelectItem>
                          <SelectItem value="remote">Remote</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="salary">Salary Range</Label>
                      <Input
                        id="salary"
                        placeholder="e.g. $80,000 - $120,000"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deadline">Application Deadline</Label>
                    <Input id="deadline" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="job_description">Job Description *</Label>
                    <Textarea
                      id="job_description"
                      placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
                      className="min-h-[120px]"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {requirements.map((requirement, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={requirement}
                          onChange={(e) =>
                            updateRequirement(index, e.target.value)
                          }
                          placeholder={`Requirement ${index + 1}`}
                          className="flex-1"
                        />
                        {requirements.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeRequirement(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addRequirement}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Requirement
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add a skill or tag"
                      onKeyPress={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addTag())
                      }
                    />
                    <Button
                      className="border-transparent bg-secondary"
                      type="button"
                      onClick={addTag}
                    >
                      Add
                    </Button>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Company Information */}

              {/* Submit */}
              <div className="flex gap-4 justify-end">
                <Button type="button" variant="outline">
                  Save as Draft
                </Button>
                <Button type="submit">Post Job</Button>
              </div>
            </div>
          )}
          <DialogFooter className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button
              className="border-none bg-sky-500 hover:bg-sky-600"
              onClick={handlePublishJob}
            >
              Publish Job
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
