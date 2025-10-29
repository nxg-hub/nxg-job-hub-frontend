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

const RenderStepThreeTalent = ({ formData, setFormData, formError }) => {
  // Handle form data updates
  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Education/Qualification options
  const qualificationOptions = [
    "High School Diploma",
    "Associate Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "PhD/Doctorate",
    "Professional Certificate",
    "Bootcamp Graduate",
    "Self-Taught",
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
    "Other",
  ];

  return (
    <div className="space-y-6">
      {/* Highest Qualification */}
      <div className="space-y-2">
        <Label htmlFor="highestQualification" className="text-sm font-medium">
          Highest Educational Qualification *
        </Label>
        <Select
          value={formData.highestQualification}
          onValueChange={(value) =>
            updateFormData("highestQualification", value)
          }
        >
          <SelectTrigger
            className={
              formError && !formData.highestQualification
                ? "border-red-500"
                : ""
            }
          >
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
          <SelectTrigger
            className={
              formError && !formData.professionalCert ? "border-red-500" : ""
            }
          >
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

export default RenderStepThreeTalent;
