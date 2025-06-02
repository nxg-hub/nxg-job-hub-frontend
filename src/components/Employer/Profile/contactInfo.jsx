import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useState } from "react";

const EditContactInfo = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyDescription: "",
    position: "",
    companyAddress: "",
    companyPhone: "",
    companyWebsite: "",
    country: "",
    industryType: "",
    companySize: "",
    jobBoard: "",
    address: "",
    nationality: "",
    state: "",
    zipCode: "",
    companyZipCode: "",
    vacancies: "",
    taxClearanceCertificate: "",
    namesOfDirectors: "",
    companyMemorandum: "",
    caccertificate: "",
    tin: "",
  });
  return (
    <div>
      {/* <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Contact Information
                      </CardTitle>
                      <CardDescription>
                        Contact details and address information
                      </CardDescription>
                    </CardHeader> */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="companyPhone">Company Phone</Label>
            <Input
              id="companyPhone"
              value={formData.companyPhone}
              onChange={(e) =>
                handleInputChange("companyPhone", e.target.value)
              }
              placeholder="+1 (555) 123-4567"
              type="tel"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyWebsite">Company Website</Label>
            <Input
              id="companyWebsite"
              value={formData.companyWebsite}
              onChange={(e) =>
                handleInputChange("companyWebsite", e.target.value)
              }
              placeholder="https://www.company.com"
              type="url"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="companyAddress">Company Address</Label>
          <Textarea
            id="companyAddress"
            value={formData.companyAddress}
            onChange={(e) =>
              handleInputChange("companyAddress", e.target.value)
            }
            placeholder="Enter complete company address"
            className="min-h-[80px]"
          />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Select
              onValueChange={(value) => handleInputChange("country", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
                <SelectItem value="ng">Nigeria</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State/Province</Label>
            <Input
              id="state"
              value={formData.state}
              onChange={(e) => handleInputChange("state", e.target.value)}
              placeholder="Enter state/province"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyZipCode">Company Zip Code</Label>
            <Input
              id="companyZipCode"
              value={formData.companyZipCode}
              onChange={(e) =>
                handleInputChange("companyZipCode", e.target.value)
              }
              placeholder="12345"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="address">Personal Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Your personal address"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipCode">Personal Zip Code</Label>
            <Input
              id="zipCode"
              value={formData.zipCode}
              onChange={(e) => handleInputChange("zipCode", e.target.value)}
              placeholder="12345"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="nationality">Nationality</Label>
          <Input
            id="nationality"
            value={formData.nationality}
            onChange={(e) => handleInputChange("nationality", e.target.value)}
            placeholder="Enter your nationality"
          />
        </div>
      </div>
    </div>
  );
};

const ContactInfo = () => {
  const tittleStyle = cn("text-gray-800 text-sm font-medium");
  const infoStyle = cn(
    "text-gray-400 text-sm rounded border-[1px] border-gray-200 p-2"
  );
  return (
    <div className="space-y-8">
      <div className="w-full flex items-center justify-evenly gap-7">
        <div className="w-1/2 space-y-3">
          <p className={tittleStyle}>Company Phone:</p>
          <p className={infoStyle}>Adewaleking academy</p>
        </div>
        <div className="w-1/2 space-y-3">
          <p className={tittleStyle}>Company Website:</p>
          <p className={infoStyle}>Adewaleking</p>
        </div>
      </div>
      <div className="space-y-3">
        <p className={tittleStyle}>Company Address:</p>
        <p className={cn(infoStyle, "h-36 leading-relaxed p-4")}>
          Experienced recruitment agent with over 8 years of experience
          connecting top talent with leading companies. Specializing in tech and
          creative industries, I pride myself on understanding both client needs
          and candidate aspirations to create lasting professional
          relationships.
        </p>
      </div>
      <div className="w-full flex items-center justify-evenly gap-7">
        <div className="w-1/2 space-y-3">
          <p className={tittleStyle}>Country:</p>
          <p className={infoStyle}>Adewaleking academy</p>
        </div>
        <div className="w-1/2 space-y-3">
          <p className={tittleStyle}>State/Province:</p>
          <p className={infoStyle}>Adewaleking</p>
        </div>
        <div className="w-1/2 space-y-3">
          <p className={tittleStyle}>Company Zip Code:</p>
          <p className={infoStyle}>Adewaleking</p>
        </div>
      </div>
      <div className="w-full flex items-center justify-evenly gap-7">
        <div className="w-1/2 space-y-3">
          <p className={tittleStyle}>Personal Address:</p>
          <p className={infoStyle}>Adewaleking academy</p>
        </div>
        <div className="w-1/2 space-y-3">
          <p className={tittleStyle}>Personal Zip Code:</p>
          <p className={infoStyle}>Adewaleking</p>
        </div>
      </div>
      <div className="w-full space-y-3">
        <p className={tittleStyle}>Nationality:</p>
        <p className={infoStyle}>Adewaleking academy</p>
      </div>
    </div>
  );
};

export { EditContactInfo, ContactInfo };
