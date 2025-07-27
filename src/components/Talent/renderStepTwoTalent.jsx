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

const RenderStepTwoTalent = ({ formData, setFormData, formError }) => {
  // Education/Qualification options
  const qualificationOptions = [
    "High School Diploma",
    "Associate Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "PhD/Doctorate",
    "Professional Certificate",
    "Bootcamp Graduate",
    "Self-Taught"
  ];

  // Job type options
  const jobTypeOptions = [
    "Full-time",
    "Part-time",
    "Contract",
    "Freelance",
    "Internship",
    "Temporary"
  ];

  // Work mode options
  const workModeOptions = [
    "Remote",
    "On-site",
    "Hybrid"
  ];

  // Professional certifications (common tech certs)
  const certificationOptions = [
    "None",
    "AWS Certified Solutions Architect",
    "AWS Certified Developer",
    "Google Cloud Professional",
    "Microsoft Azure Certified",
    "Cisco Certified Network Associate (CCNA)",
    "CompTIA Security+",
    "Certified ScrumMaster (CSM)",
    "Project Management Professional (PMP)",
    "Certified Kubernetes Administrator (CKA)",
    "Oracle Certified Professional",
    "Salesforce Certified",
    "Other"
  ];

  // Handle form data updates
  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Highest Qualification */}
      <div className="space-y-2">
        <Label htmlFor="highestQualification" className="text-sm font-medium">
          Highest Educational Qualification *
        </Label>
        <Select
          value={formData.highestQualification}
          onValueChange={(value) => updateFormData("highestQualification", value)}
        >
          <SelectTrigger className={formError && !formData.highestQualification ? 'border-red-500' : ''}>
            <SelectValue placeholder="Select your highest qualification" />
          </SelectTrigger>
          <SelectContent>
            {qualificationOptions.map((qualification) => (
              <SelectItem key={qualification} value={qualification}>
                {qualification}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Professional Certification */}
      <div className="space-y-2">
        <Label htmlFor="professionalCert" className="text-sm font-medium">
          Professional Certification *
        </Label>
        <Select
          value={formData.professionalCert}
          onValueChange={(value) => updateFormData("professionalCert", value)}
        >
          <SelectTrigger className={formError && !formData.professionalCert ? 'border-red-500' : ''}>
            <SelectValue placeholder="Select your certification (or None)" />
          </SelectTrigger>
          <SelectContent>
            {certificationOptions.map((cert) => (
              <SelectItem key={cert} value={cert}>
                {cert}
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
          <SelectTrigger className={formError && !formData.jobType ? 'border-red-500' : ''}>
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

      {/* Work Mode */}
      <div className="space-y-2">
        <Label htmlFor="workMode" className="text-sm font-medium">
          Preferred Work Mode *
        </Label>
        <Select
          value={formData.workMode}
          onValueChange={(value) => updateFormData("workMode", value)}
        >
          <SelectTrigger className={formError && !formData.workMode ? 'border-red-500' : ''}>
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

      {/* Portfolio Link */}
      <div className="space-y-2">
        <Label htmlFor="portfolioLink" className="text-sm font-medium">
          Portfolio Link *
        </Label>
        <Input
          id="portfolioLink"
          type="url"
          placeholder="https://yourportfolio.com"
          value={formData.portfolioLink}
          onChange={(e) => updateFormData("portfolioLink", e.target.value)}
          className={formError && !formData.portfolioLink.trim() ? 'border-red-500' : ''}
        />
        <p className="text-xs text-gray-500">
          Share your portfolio, GitHub, or personal website
        </p>
      </div>

      {/* LinkedIn URL */}
      <div className="space-y-2">
        <Label htmlFor="linkedInUrl" className="text-sm font-medium">
          LinkedIn Profile URL *
        </Label>
        <Input
          id="linkedInUrl"
          type="url"
          placeholder="https://linkedin.com/in/yourprofile"
          value={formData.linkedInUrl}
          onChange={(e) => updateFormData("linkedInUrl", e.target.value)}
          className={formError && !formData.linkedInUrl.trim() ? 'border-red-500' : ''}
        />
        <p className="text-xs text-gray-500">
          Your professional LinkedIn profile URL
        </p>
      </div>

      {/* Helper Text */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Tip:</strong> Make sure your portfolio showcases your best work and your LinkedIn profile is up-to-date. 
          These links help employers understand your background and see examples of your work.
        </p>
      </div>
    </div>
  );
};

export default RenderStepTwoTalent;