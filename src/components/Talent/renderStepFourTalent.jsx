import React from "react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RenderStepFourTalent = ({ formData, setFormData, formError }) => {
  // Handle form data updates
  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Job type options
  const jobTypeOptions = [
    "Full-time",
    "Part-time",
    "Contract",
    "Freelance",
    "Internship",
    "Temporary",
  ];

  // Work mode options
  const workModeOptions = ["Full Time", "Part Time", "Contract", "Hybrid"];

  // Job interest options
  const jobInterest = [
    "Frontend Development",
    "Backend Development",
    "Full Stack Development",
    "Mobile Development",
    "DevOps/Cloud Engineering",
    "Data Science/Analytics",
    "Machine Learning/AI",
    "Cybersecurity",
    "Product Management",
    "UI/UX Design",
    "Quality Assurance",
    "System Architecture",
  ];

  return (
    <div className="space-y-6">
      {/* Work Mode */}
      <div className="space-y-2">
        <Label htmlFor="workMode" className="text-sm font-medium">
          Preferred Work Mode *
        </Label>
        <Select
          value={formData.workMode}
          onValueChange={(value) => updateFormData("workMode", value)}
        >
          <SelectTrigger
            className={formError && !formData.workMode ? "border-red-500" : ""}
          >
            <SelectValue placeholder="Select your preferred work mode" />
          </SelectTrigger>
          <SelectContent>
            {workModeOptions.map((mode) => (
              <SelectItem key={mode} value={mode}>
                {mode}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* Job Interest Section */}
      <div className="space-y-2">
        <Label htmlFor="jobInterest" className="text-sm font-medium">
          Primary Job Interest *
        </Label>
        <Select
          value={formData.jobInterest}
          onValueChange={(value) => updateFormData("jobInterest", value)}
        >
          <SelectTrigger
            className={
              formError && !formData.jobInterest ? "border-red-500" : ""
            }
          >
            <SelectValue placeholder="Select your primary area of interest" />
          </SelectTrigger>
          <SelectContent>
            {jobInterest.map((interest) => (
              <SelectItem key={interest} value={interest}>
                {interest}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Job Type */}
      <div className="space-y-2">
        <Label htmlFor="jobType" className="text-sm font-medium">
          Preferred Job Type *
        </Label>
        <Select
          value={formData.jobType}
          onValueChange={(value) => updateFormData("jobType", value)}
        >
          <SelectTrigger
            className={formError && !formData.jobType ? "border-red-500" : ""}
          >
            <SelectValue placeholder="Select your preferred job type" />
          </SelectTrigger>
          <SelectContent>
            {jobTypeOptions.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Helper Text */}
      {/* <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Your location information helps employers understand your availability for different work arrangements. 
          This information is used for job matching and logistics planning.
        </p>
      </div> */}
    </div>
  );
};

export default RenderStepFourTalent;
