import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { API_HOST_URL } from "@/utils/api/API_HOST";
import { toast } from "@/hooks/use-toast";
import { fetchLoggedInUser } from "@/redux/LoggedInUserSlice";
import { useDispatch } from "react-redux";
import { fetchTalentData } from "@/redux/TalentUserDataSlice";

const SkillsExperienceTab = ({ userData, token }) => {
  const dispatch = useDispatch();
  // 🔹 Option Lists
  const qualifications = [
    "High School Diploma",
    "Associate Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "PhD",
    "Professional Certification",
    "Other",
  ];

  const experienceLevels = [
    "Entry Level (0-2 years)",
    "Junior (2-4 years)",
    "Mid-Level (4-7 years)",
    "Senior (7-10 years)",
    "Lead/Principal (10+ years)",
    "Executive/Director (15+ years)",
  ];

  const jobTypeOptions = [
    "Full-time",
    "Part-time",
    "Contract",
    "Freelance",
    "Internship",
    "Temporary",
  ];

  const workModeOptions = ["Remote", "On-site", "Hybrid"];

  // 🔹 State management
  const [skills, setSkills] = useState(userData?.skills || []);
  const [newSkill, setNewSkill] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    highestQualification: userData?.highestQualification || "",
    currentJob: userData?.currentJob || "",
    jobType: userData?.jobType || "",
    yearsOfExperience: userData?.yearsOfExperience || "",
    experienceLevel: userData?.experienceLevel || "",
    workMode: userData?.workMode || "",
  });

  // 🔹 Helpers
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    if (!skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
    }
    setNewSkill("");
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  // 🔹 Update backend
  const handleUpdate = async () => {
    setUpdating(true);
    try {
      const payload = {
        techId: userData.techId || "",
        skills,
        highestQualification: formData.highestQualification,
        experienceLevel: formData.experienceLevel,
        jobType: formData.jobType,
        workMode: formData.workMode,
        currentJob: formData.currentJob,
        yearsOfExperience: Number(formData.yearsOfExperience),
        verified: userData.verified,
      };

      await axios.put(
        `   ${API_HOST_URL}/api/v1/tech-talent/${userData.techId}`,
        payload,
        {
          headers: { Authorization: `${token.authKey}` },
        }
      );
      toast({
        title: "Success",
        description: "  Profile updated successfully!",
      });
      dispatch(fetchTalentData({ token: token.authKey }));
      setIsEditing(false);
    } catch (error) {
      console.error("Update failed:", error);
      toast({
        title: "Update Failed",
        description:
          error?.response?.data?.message ||
          error?.message ||
          "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  return (
    <TabsContent value="skills">
      <Card className="shadow-sm rounded-2xl">
        <CardHeader className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">Skills & Experience</CardTitle>
            <CardDescription>
              Your technical and work experience
            </CardDescription>
          </div>

          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-[#0659a6] hover:bg-[#054884] text-white">
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={handleUpdate}
                disabled={updating}
                className="bg-green-600 hover:bg-green-700 text-white">
                {updating ? "Saving..." : "Save"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setSkills(userData?.skills || []);
                  setFormData({
                    highestQualification: userData?.highestQualification || "",
                    currentJob: userData?.currentJob || "",
                    jobType: userData?.jobType || "",
                    yearsOfExperience: userData?.yearsOfExperience || "",
                    experienceLevel: userData?.experienceLevel || "",
                    workMode: userData?.workMode || "",
                  });
                }}>
                Cancel
              </Button>
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          {/* 🟩 Skills Section */}
          <div>
            <Label>Skills</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.length > 0 ? (
                skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-primary/10 text-primary font-medium text-sm px-3 py-1 rounded-full">
                    <span>{skill}</span>
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-red-500 font-bold text-xs hover:text-red-700">
                        ✕
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <span className="text-muted-foreground">No skills listed</span>
              )}
            </div>

            {isEditing && (
              <div className="flex items-center gap-2 mt-3">
                <Input
                  placeholder="Enter new skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                  className="flex-1"
                />
                <Button
                  onClick={handleAddSkill}
                  className="bg-[#0659a6] hover:bg-[#054884] text-white">
                  Add
                </Button>
              </div>
            )}
          </div>

          {/* 🟩 Experience Section */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Qualification dropdown */}
            <div>
              <Label>Highest Qualification</Label>
              {isEditing ? (
                <Select
                  value={formData.highestQualification}
                  onValueChange={(value) =>
                    handleSelectChange("highestQualification", value)
                  }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select qualification" />
                  </SelectTrigger>
                  <SelectContent>
                    {qualifications.map((q) => (
                      <SelectItem key={q} value={q}>
                        {q}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input value={formData.highestQualification || "—"} readOnly />
              )}
            </div>

            <div>
              <Label>Current Job</Label>
              <Input
                id="currentJob"
                value={formData.currentJob}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>

            {/* Job Type dropdown */}
            <div>
              <Label>Job Type</Label>
              {isEditing ? (
                <Select
                  value={formData.jobType}
                  onValueChange={(value) =>
                    handleSelectChange("jobType", value)
                  }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobTypeOptions.map((j) => (
                      <SelectItem key={j} value={j}>
                        {j}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input value={formData.jobType || "—"} readOnly />
              )}
            </div>

            {/* <div>
              <Label>Years of Experience</Label>
              <Input
                id="yearsOfExperience"
                type="number"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div> */}

            {/* Experience level dropdown */}
            <div>
              <Label>Experience Level</Label>
              {isEditing ? (
                <Select
                  value={formData.experienceLevel}
                  onValueChange={(value) =>
                    handleSelectChange("experienceLevel", value)
                  }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceLevels.map((lvl) => (
                      <SelectItem key={lvl} value={lvl}>
                        {lvl}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input value={formData.experienceLevel || "—"} readOnly />
              )}
            </div>

            {/* Work mode dropdown */}
            <div>
              <Label>Work Mode</Label>
              {isEditing ? (
                <Select
                  value={formData.workMode}
                  onValueChange={(value) =>
                    handleSelectChange("workMode", value)
                  }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent>
                    {workModeOptions.map((mode) => (
                      <SelectItem key={mode} value={mode}>
                        {mode}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input value={formData.workMode || "—"} readOnly />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default SkillsExperienceTab;
