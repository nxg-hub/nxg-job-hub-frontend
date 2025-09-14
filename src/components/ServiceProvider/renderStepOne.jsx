import React from "react";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

const ServiceProviderStepOne = ({ formData, setFormData, formError }) => {
  const mainSkills = [
    "CARPENTRY",
    "ELECTRICAL",
    "PLUMBING",
    "PAINTING",
    "MASONRY",
    "WELDING",
    "OTHERS"
  ];

  const contactMethods = [
    { value: "EMAIL", label: "EMAIL" },
    { value: "PHONE", label: "PHONE" },
    { value: "SMS", label: "SMS" },
    { value: "WHATSAPP", label: "WHATSAPP" }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isFieldEmpty = (field) => {
    const value = formData[field];
    return !value || value.toString().trim() === "";
  };

  const getFieldError = (field) => {
    return formError && isFieldEmpty(field);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
        <CardDescription>
          Let's start with your basic details and primary skill
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">
              First Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              className={getFieldError("firstName") ? "border-red-500" : ""}
            />
            {getFieldError("firstName") && (
              <p className="text-sm text-red-500">First name is required</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">
              Last Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              className={getFieldError("lastName") ? "border-red-500" : ""}
            />
            {getFieldError("lastName") && (
              <p className="text-sm text-red-500">Last name is required</p>
            )}
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email">
            Email Address <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={getFieldError("email") ? "border-red-500" : ""}
          />
          {getFieldError("email") && (
            <p className="text-sm text-red-500">Email address is required</p>
          )}
        </div>

         {/* Main Skill (changed to dropdown) */}
        <div className="space-y-2">
          <Label htmlFor="mainSkill">
            Primary Skill <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.mainSkill}
            onValueChange={(value) => handleInputChange("mainSkill", value)}
          >
            <SelectTrigger className={getFieldError("mainSkill") ? "border-red-500" : ""}>
              <SelectValue placeholder="Select your primary skill" />
            </SelectTrigger>
            <SelectContent>
              {mainSkills.map((skill) => (
                <SelectItem key={skill} value={skill}>
                  {skill}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {getFieldError("mainSkill") && (
            <p className="text-sm text-red-500">Primary skill is required</p>
          )}
        </div>

        {/* Preferred Contact Method */}
        <div className="space-y-2">
          <Label htmlFor="preferredContact">
            Preferred Contact Method <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.preferredContact}
            onValueChange={(value) => handleInputChange("preferredContact", value)}
          >
            <SelectTrigger className={getFieldError("preferredContact") ? "border-red-500" : ""}>
              <SelectValue placeholder="Select your preferred contact method" />
            </SelectTrigger>
            <SelectContent>
              {contactMethods.map((method) => (
                <SelectItem key={method.value} value={method.value}>
                  {method.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {getFieldError("preferredContact") && (
            <p className="text-sm text-red-500">Preferred contact method is required</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceProviderStepOne;