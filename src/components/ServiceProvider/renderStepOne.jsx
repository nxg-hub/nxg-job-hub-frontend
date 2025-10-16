import React from "react";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const ServiceProviderStepOne = ({ formData, setFormData, formError }) => {
  const mainSkills = [
    "CARPENTRY",
    "ELECTRICAL",
    "PLUMBING",
    "PAINTING",
    "MASONRY",
    "WELDING",
    "OTHERS",
  ];

  const subSkillsOptions = {
    CARPENTRY: ["Furniture Making", "Cabinetry", "Framing", "Finishing"],
    ELECTRICAL: ["Wiring", "Installation", "Repair", "Maintenance"],
    PLUMBING: ["Installation", "Repair", "Drainage", "Fixtures"],
    PAINTING: ["Interior Painting", "Exterior Painting", "Decorative Finishes"],
    MASONRY: ["Bricklaying", "Concrete Work", "Stonework"],
    WELDING: ["Arc Welding", "MIG Welding", "TIG Welding", "Fabrication"],
    OTHERS: [],
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
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
          Choose your main skill and related sub-skills
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Main Skill */}
        <div className="space-y-2">
          <Label>
            Primary Skill <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.mainSkill}
            onValueChange={(value) => {
              handleInputChange("mainSkill", value);
              // reset sub-skills when main skill changes
              setFormData((prev) => ({
                ...prev,
                subSkills: [],
              }));
            }}>
            <SelectTrigger
              className={getFieldError("mainSkill") ? "border-red-500" : ""}>
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

        {/* Dynamic Sub-Skills */}
        {formData.mainSkill && (
          <div className="space-y-2">
            <Label>
              Sub Skills <span className="text-red-500">*</span>
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {subSkillsOptions[formData.mainSkill]?.map((sub) => (
                <label key={sub} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4"
                    checked={formData.subSkills?.includes(sub)}
                    onChange={(e) => {
                      const list = formData.subSkills || [];
                      const newSubs = e.target.checked
                        ? [...list, sub]
                        : list.filter((s) => s !== sub);
                      setFormData((prev) => ({ ...prev, subSkills: newSubs }));
                    }}
                  />
                  {sub}
                </label>
              ))}
            </div>
            {getFieldError("subSkills") && (
              <p className="text-sm text-red-500">
                At least one sub-skill is required
              </p>
            )}
          </div>
        )}

        {/* Custom sub-skill input for "OTHERS" */}
        {formData.mainSkill === "OTHERS" && (
          <div className="space-y-2">
            <Label>
              Enter Your Skill <span className="text-red-500">*</span>
            </Label>
            <Input
              placeholder="Describe your skill"
              value={formData.customSubSkill || ""}
              onChange={(e) =>
                handleInputChange("customSubSkill", e.target.value)
              }
              className={
                getFieldError("customSubSkill") ? "border-red-500" : ""
              }
            />
            {getFieldError("customSubSkill") && (
              <p className="text-sm text-red-500">Please enter your skill</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceProviderStepOne;
