import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Plus, Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { StateSelect } from "./StateSelect";

const ServiceProviderStepThree = ({ formData, setFormData, formError }) => {
  const employmentTypes = [
    "Full-time",
    "Part-time",
    "Contract",
    "Freelance",
    "Internship",
    "Apprenticeship",
    "Temporary",
    "Self-employed",
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleWorkExperienceChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      workExperiences: prev.workExperiences.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const addWorkExperience = () => {
    setFormData((prev) => ({
      ...prev,
      workExperiences: [
        ...prev.workExperiences,
        {
          jobTitle: "",
          companyName: "",
          employmentType: "",
          startDate: "",
          endDate: "",
          location: "",
          description: "",
        },
      ],
    }));
  };

  const removeWorkExperience = (index) => {
    setFormData((prev) => ({
      ...prev,
      workExperiences: prev.workExperiences.filter((_, i) => i !== index),
    }));
  };

  const isFieldEmpty = (field) => {
    if (field === "workExperiences") {
      return formData.workExperiences.length === 0;
    }
    const value = formData[field];
    return !value || value.toString().trim() === "";
  };

  const getFieldError = (field) => {
    return formError && isFieldEmpty(field);
  };

  const isWorkExperienceValid = (experience) => {
    return (
      experience.jobTitle &&
      experience.companyName &&
      experience.employmentType &&
      experience.startDate &&
      experience.location &&
      experience.description
    );
  };

  return (
    <div className="space-y-6">
      {/* Work Experience */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Work Experience
            <Button type="button" onClick={addWorkExperience} size="sm">
              <Plus className="h-4 w-4 mr-1" /> Add Experience
            </Button>
          </CardTitle>
          <CardDescription>
            Add your work history and professional experience{" "}
            <span className="text-red-500">*</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {formData.workExperiences.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No work experiences added yet.</p>
              <p className="text-sm">Click "Add Experience" to get started.</p>
            </div>
          ) : (
            formData.workExperiences.map((experience, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 space-y-4 relative">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Experience {index + 1}</Badge>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeWorkExperience(index)}
                    className="text-red-500 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`jobTitle-${index}`}>
                      Job Title <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id={`jobTitle-${index}`}
                      type="text"
                      placeholder="e.g., Senior Carpenter"
                      value={experience.jobTitle}
                      onChange={(e) =>
                        handleWorkExperienceChange(
                          index,
                          "jobTitle",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`companyName-${index}`}>
                      Company Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id={`companyName-${index}`}
                      type="text"
                      placeholder="e.g., ABC Construction"
                      value={experience.companyName}
                      onChange={(e) =>
                        handleWorkExperienceChange(
                          index,
                          "companyName",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`employmentType-${index}`}>
                      Employment Type <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={experience.employmentType}
                      onValueChange={(value) =>
                        handleWorkExperienceChange(
                          index,
                          "employmentType",
                          value
                        )
                      }>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {employmentTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`startDate-${index}`}>
                      Start Date <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id={`startDate-${index}`}
                      type="date"
                      value={experience.startDate}
                      onChange={(e) =>
                        handleWorkExperienceChange(
                          index,
                          "startDate",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`endDate-${index}`}>End Date</Label>
                    <Input
                      id={`endDate-${index}`}
                      type="date"
                      value={experience.endDate}
                      onChange={(e) =>
                        handleWorkExperienceChange(
                          index,
                          "endDate",
                          e.target.value
                        )
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Leave blank if this is your current position
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`location-${index}`}>
                    Location <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id={`location-${index}`}
                    type="text"
                    placeholder="e.g., Lagos, Nigeria"
                    value={experience.location}
                    onChange={(e) =>
                      handleWorkExperienceChange(
                        index,
                        "location",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`description-${index}`}>
                    Job Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id={`description-${index}`}
                    placeholder="Describe your responsibilities, achievements, and key projects..."
                    value={experience.description}
                    onChange={(e) =>
                      handleWorkExperienceChange(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    rows={3}
                  />
                </div>
              </div>
            ))
          )}

          {getFieldError("workExperiences") && (
            <p className="text-sm text-red-500">
              At least one complete work experience is required
            </p>
          )}
        </CardContent>
      </Card>

      {/* Address Information */}
      <Card>
        <CardHeader>
          <CardTitle>Address Information</CardTitle>
          <CardDescription>
            Provide your current address details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">
              Street Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="address"
              type="text"
              placeholder="Enter your street address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className={getFieldError("address") ? "border-red-500" : ""}
            />
            {getFieldError("address") && (
              <p className="text-sm text-red-500">Street address is required</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">
                City <span className="text-red-500">*</span>
              </Label>
              <Input
                id="city"
                type="text"
                placeholder="Enter your city"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className={getFieldError("city") ? "border-red-500" : ""}
              />
              {getFieldError("city") && (
                <p className="text-sm text-red-500">City is required</p>
              )}
            </div>

            {/* <div className="space-y-2">
              <Label htmlFor="state">
                State/Province <span className="text-red-500">*</span>
              </Label>
              <Input
                id="state"
                type="text"
                placeholder="Enter your state or province"
                value={formData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
                className={getFieldError("state") ? "border-red-500" : ""}
              />
              {getFieldError("state") && (
                <p className="text-sm text-red-500">
                  State/Province is required
                </p>
              )}
            </div> */}
            <StateSelect
              value={formData.state}
              onChange={(val) => handleInputChange("state", val)}
              error={getFieldError("state")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="zipCode">
              ZIP/Postal Code <span className="text-red-500">*</span>
            </Label>
            <Input
              id="zipCode"
              type="text"
              placeholder="Enter your ZIP or postal code"
              value={formData.zipCode}
              onChange={(e) => handleInputChange("zipCode", e.target.value)}
              className={getFieldError("zipCode") ? "border-red-500" : ""}
            />
            {getFieldError("zipCode") && (
              <p className="text-sm text-red-500">
                ZIP/Postal code is required
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg">Profile Summary</CardTitle>
          <CardDescription>
            Review your profile completion status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {formData.firstName} {formData.lastName}
              </p>
              <p>
                <strong>Email:</strong> {formData.email}
              </p>
              <p>
                <strong>Primary Skill:</strong> {formData.mainSkill}
              </p>
              <p>
                <strong>Sub Skills:</strong> {formData.subSkills.length} added
              </p>
            </div>
            <div className="space-y-2">
              <p>
                <strong>Work Experience:</strong>
                {formData.workExperiences.length} entries
              </p>
              <p>
                <strong>Education:</strong>
                {`${formData.education.highestQualification} at ${formData.education.schoolName}`}
              </p>
              <p>
                <strong>Address:</strong> {formData.city}, {formData.state}
              </p>
              <p>
                <strong>Interests:</strong> {formData.interests.length} listed
              </p>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-800">
              <strong>Ready to submit!</strong> Your profile will be reviewed by
              our team before activation.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceProviderStepThree;
