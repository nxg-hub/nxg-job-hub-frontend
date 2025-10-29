import { useState } from "react";
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
import { nigerianStates } from "@/lib/utils";

const RenderStepOneTalent = ({ formData, setFormData, formError }) => {
  // Common countries for country code
  const countryCodes = [
    { code: "NG", name: "Nigeria" },
    { code: "OT", name: "Others" },

    // { code: "US", name: "United States" },
    // { code: "UK", name: "United Kingdom" },
    // { code: "CA", name: "Canada" },
    // { code: "GH", name: "Ghana" },
    // { code: "KE", name: "Kenya" },
    // { code: "ZA", name: "South Africa" },
    // { code: "DE", name: "Germany" },
    // { code: "FR", name: "France" },
    // { code: "AU", name: "Australia" },
  ];

  // Handle form data updates
  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
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
          className={`min-h-[100px] ${
            formError && !formData.bio.trim() ? "border-red-500" : ""
          }`}
          maxLength={500}
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>
            Keep it under 500 characters. This will be visible to employers.
          </span>
          <span>{formData.bio.length}/500</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
            className={
              formError && !formData.portfolioLink.trim()
                ? "border-red-500"
                : ""
            }
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
            className={
              formError && !formData.linkedInUrl.trim() ? "border-red-500" : ""
            }
          />
          <p className="text-xs text-gray-500">
            Your professional LinkedIn profile URL
          </p>
        </div>
      </div>

      {/* Residential Address */}
      <div className="space-y-2">
        <Label htmlFor="residentialAddress" className="text-sm font-medium">
          Residential Address *
        </Label>
        <Input
          id="residentialAddress"
          placeholder="e.g. No5 Olaniyi Street, Surulere"
          value={formData.residentialAddress}
          onChange={(e) => updateFormData("residentialAddress", e.target.value)}
          className={
            formError && !formData.residentialAddress.trim()
              ? "border-red-500"
              : ""
          }
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Location (General) */}
        <div className="space-y-2">
          <Label htmlFor="location" className="text-sm font-medium">
            Location Summary *
          </Label>
          <Input
            id="location"
            placeholder="e.g. Lagos, Nigeria"
            value={formData.location}
            onChange={(e) => updateFormData("location", e.target.value)}
            className={
              formError && !formData.location.trim() ? "border-red-500" : ""
            }
          />
          <p className="text-xs text-gray-500">
            A brief location description (e.g., "Lagos, Nigeria" or "Remote")
          </p>
        </div>

        {/* Country Code */}
        <div className="space-y-2">
          <Label htmlFor="countryCode" className="text-sm font-medium">
            Country *
          </Label>
          <Select
            value={formData.countryCode}
            onValueChange={(value) => updateFormData("countryCode", value)}
          >
            <SelectTrigger
              className={
                formError && !formData.countryCode ? "border-red-500" : ""
              }
            >
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {countryCodes.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  {country.name} ({country.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* City */}
        <div className="space-y-2">
          <Label htmlFor="city" className="text-sm font-medium">
            City *
          </Label>
          <Input
            id="city"
            placeholder="e.g. Ikeja"
            value={formData.city}
            onChange={(e) => updateFormData("city", e.target.value)}
            className={
              formError && !formData.city.trim() ? "border-red-500" : ""
            }
          />
        </div>

        {/* State */}
        <div className="space-y-2">
          <Label htmlFor="state" className="text-sm font-medium">
            State *
          </Label>
          <Select
            value={formData.state}
            onValueChange={(value) => updateFormData("state", value)}
          >
            <SelectTrigger
              className={formError && !formData.state ? "border-red-500" : ""}
            >
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {nigerianStates.map((state) => (
                <SelectItem key={state.value} value={state.value}>
                  {state.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Zip Code */}
      <div className="space-y-2">
        <Label htmlFor="zipCode" className="text-sm font-medium">
          Zip/Postal Code *
        </Label>
        <Input
          id="zipCode"
          placeholder="e.g. 100123"
          value={formData.zipCode}
          onChange={(e) => updateFormData("zipCode", e.target.value)}
          className={
            formError && !formData.zipCode.trim() ? "border-red-500" : ""
          }
        />
      </div>

      {/* Helper Text */}
      {/* <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Tip:</strong> Make sure your bio is engaging and highlights
          your key strengths. Add relevant technical skills that match your
          experience level and job interests.
        </p>
      </div> */}
    </div>
  );
};

export default RenderStepOneTalent;
