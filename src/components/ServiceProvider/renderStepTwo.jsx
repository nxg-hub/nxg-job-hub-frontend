import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { X, Plus } from "lucide-react";

const ServiceProviderStepTwo = ({ formData, setFormData, formError }) => {
  const [newInterest, setNewInterest] = useState("");

  const contactMethods = [
    { value: "EMAIL", label: "EMAIL" },
    { value: "PHONE", label: "PHONE" },
    { value: "SMS", label: "SMS" },
    { value: "WHATSAPP", label: "WHATSAPP" },
  ];

  const qualifications = [
    "High School Diploma",
    "Associate Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "PhD",
    "Professional Certification",
    "Other",
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  // ✅ Top-level updates (preferredContact, additionalInfo, etc.)
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ✅ Nested education updates
  const handleEducationChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        [field]: value,
      },
    }));
  };

  const addInterest = () => {
    if (newInterest.trim() && !formData.interests.includes(newInterest.trim())) {
      setFormData((prev) => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()],
      }));
      setNewInterest("");
    }
  };

  const removeInterest = (interestToRemove) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.filter((interest) => interest !== interestToRemove),
    }));
  };

  const isFieldEmpty = (field) => {
    let value;
    if (field.startsWith("education.")) {
      const key = field.split(".")[1];
      value = formData.education?.[key];
    } else {
      value = formData[field];
    }
    if (Array.isArray(value)) return value.length === 0;
    return !value || value.toString().trim() === "";
  };

  const getFieldError = (field) => formError && isFieldEmpty(field);

  return (
    <div className="space-y-6">
      {/* Contact Preference */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Preference</CardTitle>
          <CardDescription>Select how we can reach you</CardDescription>
        </CardHeader>
        <CardContent>
          <Label>
            Preferred Contact Method <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.preferredContact}
            onValueChange={(v) => handleInputChange("preferredContact", v)}
          >
            <SelectTrigger className={getFieldError("preferredContact") ? "border-red-500" : ""}>
              <SelectValue placeholder="Select contact method" />
            </SelectTrigger>
            <SelectContent>
              {contactMethods.map((m) => (
                <SelectItem key={m.value} value={m.value}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {getFieldError("preferredContact") && (
            <p className="text-sm text-red-500">Preferred contact method is required</p>
          )}
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader>
          <CardTitle>Education</CardTitle>
          <CardDescription>Tell us about your educational background</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="highestQualification">
              Highest Qualification <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.education.highestQualification}
              onValueChange={(v) => handleEducationChange("highestQualification", v)}
            >
              <SelectTrigger
                className={getFieldError("education.highestQualification") ? "border-red-500" : ""}
              >
                <SelectValue placeholder="Select your highest qualification" />
              </SelectTrigger>
              <SelectContent>
                {qualifications.map((qual) => (
                  <SelectItem key={qual} value={qual}>
                    {qual}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {getFieldError("education.highestQualification") && (
              <p className="text-sm text-red-500">Highest qualification is required</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="schoolName">
                School/Institution Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="schoolName"
                type="text"
                placeholder="Enter school/institution name"
                value={formData.education.schoolName}
                onChange={(e) => handleEducationChange("schoolName", e.target.value)}
                className={getFieldError("education.schoolName") ? "border-red-500" : ""}
              />
              {getFieldError("education.schoolName") && (
                <p className="text-sm text-red-500">School name is required</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="schoolYear">
                Graduation Year <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.education.schoolYear}
                onValueChange={(v) => handleEducationChange("schoolYear", v)}
              >
                <SelectTrigger
                  className={getFieldError("education.schoolYear") ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={String(year)}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {getFieldError("education.schoolYear") && (
                <p className="text-sm text-red-500">Graduation year is required</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="schoolLocation">
              School Location <span className="text-red-500">*</span>
            </Label>
            <Input
              id="schoolLocation"
              type="text"
              placeholder="Enter school location (City, State/Country)"
              value={formData.education.schoolLocation}
              onChange={(e) => handleEducationChange("schoolLocation", e.target.value)}
              className={getFieldError("education.schoolLocation") ? "border-red-500" : ""}
            />
            {getFieldError("education.schoolLocation") && (
              <p className="text-sm text-red-500">School location is required</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="schoolDescription">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="schoolDescription"
              placeholder="Briefly describe your studies, achievements, or relevant coursework"
              value={formData.education.schoolDescription}
              onChange={(e) => handleEducationChange("schoolDescription", e.target.value)}
              className={getFieldError("education.schoolDescription") ? "border-red-500" : ""}
              rows={3}
            />
            {getFieldError("education.schoolDescription") && (
              <p className="text-sm text-red-500">Education description is required</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Interests and Additional Info */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Share your interests and any additional information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="interests">
              Interests <span className="text-red-500">*</span>
            </Label>
            <div className="flex gap-2">
              <Input
                id="interests"
                type="text"
                placeholder="Enter an interest"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addInterest())}
                className={getFieldError("interests") ? "border-red-500" : ""}
              />
              <Button type="button" onClick={addInterest} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {formData.interests.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.interests.map((interest, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center text-white gap-1">
                    {interest}
                    <X
                      className="h-3 w-3  text-white cursor-pointer"
                      onClick={() => removeInterest(interest)}
                    />
                  </Badge>
                ))}
              </div>
            )}
            {getFieldError("interests") && (
              <p className="text-sm text-red-500">At least one interest is required</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalInfo">
              Additional Information <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="additionalInfo"
              placeholder="Tell us anything else about yourself, your experience, or what makes you unique"
              value={formData.additionalInfo}
              onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
              className={getFieldError("additionalInfo") ? "border-red-500" : ""}
              rows={4}
            />
            {getFieldError("additionalInfo") && (
              <p className="text-sm text-red-500">Additional information is required</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceProviderStepTwo;
