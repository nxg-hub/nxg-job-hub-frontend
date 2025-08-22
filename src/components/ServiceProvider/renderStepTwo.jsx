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
  const [newSubSkill, setNewSubSkill] = useState("");
  const [newInterest, setNewInterest] = useState("");

  const qualifications = [
    "High School Diploma",
    "Associate Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "PhD",
    "Trade Certificate",
    "Professional Certification",
    "Apprenticeship Completion",
    "Other"
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  // const skillSuggestions = {
  //   CARPENTRY: ["Framing", "Finish Carpentry", "Cabinet Making", "Deck Building", "Furniture Making"],
  //   PLUMBING: ["Pipe Installation", "Leak Repair", "Drain Cleaning", "Water Heater Installation", "Bathroom Installation"],
  //   ELECTRICAL: ["Wiring", "Panel Installation", "Lighting", "Outlet Installation", "Smart Home Setup"],
  //   PAINTING: ["Interior Painting", "Exterior Painting", "Wall Preparation", "Color Consultation", "Decorative Painting"],
  //   CLEANING: ["Deep Cleaning", "Move-out Cleaning", "Commercial Cleaning", "Carpet Cleaning", "Window Cleaning"],
  //   LANDSCAPING: ["Lawn Care", "Garden Design", "Tree Trimming", "Irrigation", "Hardscaping"],
  //   ROOFING: ["Shingle Installation", "Roof Repair", "Gutter Installation", "Roof Inspection", "Emergency Repairs"],
  //   FLOORING: ["Hardwood Installation", "Tile Installation", "Carpet Installation", "Laminate Installation", "Floor Refinishing"],
  //   HVAC: ["Installation", "Repair", "Maintenance", "Duct Cleaning", "Energy Efficiency"],
  //   MASONRY: ["Brickwork", "Stone Work", "Concrete", "Chimney Repair", "Patio Installation"],
  //   WELDING: ["Arc Welding", "MIG Welding", "TIG Welding", "Fabrication", "Repair Welding"],
  //   APPLIANCE_REPAIR: ["Refrigerator Repair", "Washer/Dryer Repair", "Dishwasher Repair", "Oven Repair", "HVAC Units"],
  //   PEST_CONTROL: ["Termite Treatment", "Rodent Control", "Insect Control", "Prevention", "Inspection"],
  //   SECURITY_INSTALLATION: ["Camera Systems", "Alarm Systems", "Access Control", "Smart Locks", "Monitoring Setup"],
  //   MOVING_SERVICES: ["Local Moving", "Long Distance", "Packing", "Storage", "Commercial Moving"]
  // };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addSubSkill = () => {
    if (newSubSkill.trim() && !formData.subSkills.includes(newSubSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        subSkills: [...prev.subSkills, newSubSkill.trim()]
      }));
      setNewSubSkill("");
    }
  };

  const removeSubSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      subSkills: prev.subSkills.filter(skill => skill !== skillToRemove)
    }));
  };

  const addInterest = () => {
    if (newInterest.trim() && !formData.interests.includes(newInterest.trim())) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest("");
    }
  };

  const removeInterest = (interestToRemove) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(interest => interest !== interestToRemove)
    }));
  };

  const addSuggestedSkill = (skill) => {
    if (!formData.subSkills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        subSkills: [...prev.subSkills, skill]
      }));
    }
  };

  const isFieldEmpty = (field) => {
    const value = formData[field];
    if (Array.isArray(value)) {
      return value.length === 0;
    }
    return !value || value.toString().trim() === "";
  };

  const getFieldError = (field) => {
    return formError && isFieldEmpty(field);
  };

  // const suggestionsList = formData.mainSkill ? skillSuggestions[formData.mainSkill] || [] : [];

  return (
    <div className="space-y-6">
      {/* Sub Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Skills</CardTitle>
          <CardDescription>
            Add specific skills related to your primary expertise
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subSkills">
              Sub Skills <span className="text-red-500">*</span>
            </Label>
            <div className="flex gap-2">
              <Input
                id="subSkills"
                type="text"
                placeholder="Enter a sub skill"
                value={newSubSkill}
                onChange={(e) => setNewSubSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSubSkill())}
                className={getFieldError("subSkills") ? "border-red-500" : ""}
              />
              <Button type="button" onClick={addSubSkill} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Suggested Skills */}
            {/* {suggestionsList.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Suggested skills for {formData.mainSkill}:</Label>
                <div className="flex flex-wrap gap-2">
                  {suggestionsList
                    .filter(skill => !formData.subSkills.includes(skill))
                    .map((skill) => (
                    <Button
                      key={skill}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addSuggestedSkill(skill)}
                      className="text-xs"
                    >
                      + {skill}
                    </Button>
                  ))}
                </div>
              </div>
            )} */}
            
            {/* Current Sub Skills */}
            {formData.subSkills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.subSkills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center text-white gap-1">
                    {skill}
                    <X 
                      className="h-3 w-3 text-white cursor-pointer" 
                      onClick={() => removeSubSkill(skill)}
                    />
                  </Badge>
                ))}
              </div>
            )}
            {getFieldError("subSkills") && (
              <p className="text-sm text-red-500">At least one sub skill is required</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader>
          <CardTitle>Education</CardTitle>
          <CardDescription>
            Tell us about your educational background
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="highestQualification">
              Highest Qualification <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.highestQualification}
              onValueChange={(value) => handleInputChange("highestQualification", value)}
            >
              <SelectTrigger className={getFieldError("highestQualification") ? "border-red-500" : ""}>
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
            {getFieldError("highestQualification") && (
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
                value={formData.schoolName}
                onChange={(e) => handleInputChange("schoolName", e.target.value)}
                className={getFieldError("schoolName") ? "border-red-500" : ""}
              />
              {getFieldError("schoolName") && (
                <p className="text-sm text-red-500">School name is required</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="schoolYear">
                Graduation Year <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.schoolYear}
                onValueChange={(value) => handleInputChange("schoolYear", value)}
              >
                <SelectTrigger className={getFieldError("schoolYear") ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {getFieldError("schoolYear") && (
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
              value={formData.schoolLocation}
              onChange={(e) => handleInputChange("schoolLocation", e.target.value)}
              className={getFieldError("schoolLocation") ? "border-red-500" : ""}
            />
            {getFieldError("schoolLocation") && (
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
              value={formData.schoolDescription}
              onChange={(e) => handleInputChange("schoolDescription", e.target.value)}
              className={getFieldError("schoolDescription") ? "border-red-500" : ""}
              rows={3}
            />
            {getFieldError("schoolDescription") && (
              <p className="text-sm text-red-500">Education description is required</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Interests and Additional Info */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Share your interests and any additional information
          </CardDescription>
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
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest())}
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
                      className="h-3 w-3 text-white cursor-pointer" 
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