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
import { Building2 } from "lucide-react";
import { useState } from "react";

const EditCompanyInfoCard = () => {
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
      {/* <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Company Information
        </div>
        <p>Basic information about your company</p>
      </div> */}

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name *</Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
              placeholder="Enter company name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="position">Your Position *</Label>
            <Input
              id="position"
              value={formData.position}
              onChange={(e) => handleInputChange("position", e.target.value)}
              placeholder="e.g., HR Manager, CEO"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="companyDescription">Company Description</Label>
          <Textarea
            id="companyDescription"
            value={formData.companyDescription}
            onChange={(e) =>
              handleInputChange("companyDescription", e.target.value)
            }
            placeholder="Describe your company, its mission, and values..."
            className="min-h-[120px]"
          />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="industryType">Industry Type</Label>
            <Select
              onValueChange={(value) =>
                handleInputChange("industryType", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="consulting">Consulting</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="companySize">Company Size</Label>
            <Select
              onValueChange={(value) => handleInputChange("companySize", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select company size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-10">1-10 employees</SelectItem>
                <SelectItem value="11-50">11-50 employees</SelectItem>
                <SelectItem value="51-200">51-200 employees</SelectItem>
                <SelectItem value="201-500">201-500 employees</SelectItem>
                <SelectItem value="501-1000">501-1000 employees</SelectItem>
                <SelectItem value="1000+">1000+ employees</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

const CompanyInfoCard = () => {
  const tittleStyle = cn("text-gray-800 text-sm font-medium");
  const infoStyle = cn(
    "text-gray-400 text-sm rounded border-[1px] border-gray-200 p-2"
  );
  return (
    <div className="space-y-8">
      <div className="w-full flex items-center justify-evenly gap-7">
        <div className="w-1/2 space-y-3">
          <p className={tittleStyle}>Company Name:</p>
          <p className={infoStyle}>Adewaleking academy</p>
        </div>
        <div className="w-1/2 space-y-3">
          <p className={tittleStyle}>Your Position:</p>
          <p className={infoStyle}>Adewaleking</p>
        </div>
      </div>
      <div className="space-y-3">
        <p className={tittleStyle}>Company Description:</p>
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
          <p className={tittleStyle}>Industry Type:</p>
          <p className={infoStyle}>Adewaleking academy</p>
        </div>
        <div className="w-1/2 space-y-3">
          <p className={tittleStyle}>Company Size:</p>
          <p className={infoStyle}>Adewaleking</p>
        </div>
      </div>
    </div>
  );
};

export { CompanyInfoCard, EditCompanyInfoCard };
