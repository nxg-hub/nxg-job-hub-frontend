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
  // Nigerian states for better UX
  const nigerianStates = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", 
    "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", 
    "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", 
    "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", 
    "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara", "FCT"
  ];

  // Common countries for country code
  const countryCodes = [
    { code: "NG", name: "Nigeria" },
    { code: "US", name: "United States" },
    { code: "UK", name: "United Kingdom" },
    { code: "CA", name: "Canada" },
    { code: "GH", name: "Ghana" },
    { code: "KE", name: "Kenya" },
    { code: "ZA", name: "South Africa" },
    { code: "DE", name: "Germany" },
    { code: "FR", name: "France" },
    { code: "AU", name: "Australia" }
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
          className={formError && !formData.residentialAddress.trim() ? 'border-red-500' : ''}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
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
            className={formError && !formData.city.trim() ? 'border-red-500' : ''}
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
            <SelectTrigger className={formError && !formData.state ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {nigerianStates.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
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
            className={formError && !formData.zipCode.trim() ? 'border-red-500' : ''}
          />
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
            <SelectTrigger className={formError && !formData.countryCode ? 'border-red-500' : ''}>
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
          className={formError && !formData.location.trim() ? 'border-red-500' : ''}
        />
        <p className="text-xs text-gray-500">
          A brief location description (e.g., "Lagos, Nigeria" or "Remote")
        </p>
      </div>

      {/* Helper Text */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Your location information helps employers understand your availability for different work arrangements. 
          This information is used for job matching and logistics planning.
        </p>
      </div>
    </div>
  );
};

export default RenderStepThreeTalent;