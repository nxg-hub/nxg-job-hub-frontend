import React, { useState } from "react";
import { X, Plus } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const RenderStepOneTalent = ({ formData, setFormData, formError }) => {
  const [newSkill, setNewSkill] = useState("");

  // Experience level options
  const experienceLevel = [
    "Entry Level (0-2 years)",
    "Junior (2-4 years)",
    "Mid-Level (4-7 years)",
    "Senior (7-10 years)",
    "Lead/Principal (10+ years)",
    "Executive/Director (15+ years)"
  ];

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
    "System Architecture"
  ];

  // Handle form data updates
  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Skills management
  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      updateFormData("skills", [...formData.skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    updateFormData("skills", formData.skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-6">
      {/* Bio Section */}
      <div className="space-y-2">
        <Label htmlFor="bio" className="text-sm font-medium">
          Short Bio *
        </Label>
        <Textarea
          id="bio"
          placeholder="Tell us about yourself, your passion for technology, and what drives you..."
          value={formData.bio}
          onChange={(e) => updateFormData("bio", e.target.value)}
          className={`min-h-[100px] ${formError && !formData.bio.trim() ? 'border-red-500' : ''}`}
          maxLength={500}
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>Keep it under 500 characters. This will be visible to employers.</span>
          <span>{formData.bio.length}/500</span>
        </div>
      </div>

      {/* Skills Section */}
      <div className="space-y-2">
        <Label htmlFor="skills" className="text-sm font-medium">
          Technical Skills *
        </Label>
        <div className="space-y-3">
          <div className="flex gap-2">
            <Input
              id="skills"
              placeholder="Add a skill (e.g., React, Python, AWS)"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button
              type="button"
              onClick={addSkill}
              variant="outline"
              size="sm"
              disabled={!newSkill.trim()}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Skills Display */}
          <div className="flex flex-wrap gap-2 min-h-[40px] p-3 border rounded-md bg-gray-50">
            {formData.skills.length > 0 ? (
              formData.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="flex items-center gap-1 px-2 py-1"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))
            ) : (
              <span className="text-gray-400 text-sm">No skills added yet</span>
            )}
          </div>
          {formError && formData.skills.length === 0 && (
            <p className="text-red-500 text-xs">Please add at least one skill</p>
          )}
        </div>
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
          <SelectTrigger className={formError && !formData.jobInterest ? 'border-red-500' : ''}>
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

      {/* Current Job Section */}
      <div className="space-y-2">
        <Label htmlFor="currentJob" className="text-sm font-medium">
          Current Job Title *
        </Label>
        <Input
          id="currentJob"
          placeholder="e.g., Frontend Developer, Software Engineer"
          value={formData.currentJob}
          onChange={(e) => updateFormData("currentJob", e.target.value)}
          className={formError && !formData.currentJob.trim() ? 'border-red-500' : ''}
        />
      </div>

      {/* Years of Experience Section */}
      <div className="space-y-2">
        <Label htmlFor="yearsOfExperience" className="text-sm font-medium">
          Years of Experience *
        </Label>
        <Input
          id="yearsOfExperience"
          type="number"
          min="0"
          max="50"
          placeholder="e.g., 3"
          value={formData.yearsOfExperience}
          onChange={(e) => updateFormData("yearsOfExperience", parseInt(e.target.value) || 0)}
          className={formError && formData.yearsOfExperience === 0 ? 'border-red-500' : ''}
        />
      </div>

      {/* Experience Level Section */}
      <div className="space-y-2">
        <Label htmlFor="experienceLevel" className="text-sm font-medium">
          Experience Level *
        </Label>
        <Select
          value={formData.experienceLevel}
          onValueChange={(value) => updateFormData("experienceLevel", value)}
        >
          <SelectTrigger className={formError && !formData.experienceLevel ? 'border-red-500' : ''}>
            <SelectValue placeholder="Select your experience level" />
          </SelectTrigger>
          <SelectContent>
            {experienceLevel.map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Helper Text */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Tip:</strong> Make sure your bio is engaging and highlights your key strengths. 
          Add relevant technical skills that match your experience level and job interests.
        </p>
      </div>
    </div>
  );
};

export default RenderStepOneTalent;