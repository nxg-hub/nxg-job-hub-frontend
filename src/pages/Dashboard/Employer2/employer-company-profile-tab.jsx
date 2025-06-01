import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Briefcase,
  Building2,
  FileText,
  MapPin,
  Phone,
  Upload,
  User,
  Users,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProfilePhotoCard from "@/components/Profile/ProfilePhotoCard";
import ProfilePersonInfoCard from "@/components/Profile/profilePersonalInfoCard";
import { employerData } from "@/utils/data/employer-mock-data";

export default function EmployerCompanyProfileTab() {
  const [profileData, setProfileData] = useState(employerData);
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

  const [files, setFiles] = useState({
    profilePicture: null,
    taxClearanceCertificate: null,
    caccertificate: null,
    companyMemorandum: null,
  });

  const [previewUrl, setPreviewUrl] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (field, file) => {
    if (file) {
      setFiles((prev) => ({
        ...prev,
        [field]: file,
      }));

      if (field === "profilePicture") {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      }
    }
  };

  const removeFile = (field) => {
    setFiles((prev) => ({
      ...prev,
      [field]: null,
    }));

    if (field === "profilePicture") {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { formData, files });
  };

  return (
    <div className="flex flex-col p-10 gap-10">
      <div className="text-lg text-sky-600 font-medium">Company Profile</div>
      <div className="container mx-auto max-w-4xl px-4">
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="company" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Company
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Contact
              </TabsTrigger>
              <TabsTrigger value="business" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Business
              </TabsTrigger>
              <TabsTrigger
                value="documents"
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Documents
              </TabsTrigger>
              <TabsTrigger value="jobs" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Jobs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <ProfilePhotoCard profileData={profileData} />
              <ProfilePersonInfoCard profileData={profileData} />
            </TabsContent>

            <TabsContent value="company">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Company Information
                  </CardTitle>
                  <CardDescription>
                    Basic information about your company
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) =>
                          handleInputChange("companyName", e.target.value)
                        }
                        placeholder="Enter company name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">Your Position *</Label>
                      <Input
                        id="position"
                        value={formData.position}
                        onChange={(e) =>
                          handleInputChange("position", e.target.value)
                        }
                        placeholder="e.g., HR Manager, CEO"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyDescription">
                      Company Description
                    </Label>
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
                          <SelectItem value="manufacturing">
                            Manufacturing
                          </SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="consulting">Consulting</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companySize">Company Size</Label>
                      <Select
                        onValueChange={(value) =>
                          handleInputChange("companySize", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 employees</SelectItem>
                          <SelectItem value="11-50">11-50 employees</SelectItem>
                          <SelectItem value="51-200">
                            51-200 employees
                          </SelectItem>
                          <SelectItem value="201-500">
                            201-500 employees
                          </SelectItem>
                          <SelectItem value="501-1000">
                            501-1000 employees
                          </SelectItem>
                          <SelectItem value="1000+">1000+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Contact Information
                  </CardTitle>
                  <CardDescription>
                    Contact details and address information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
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
                        onValueChange={(value) =>
                          handleInputChange("country", value)
                        }
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
                        onChange={(e) =>
                          handleInputChange("state", e.target.value)
                        }
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
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        placeholder="Your personal address"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">Personal Zip Code</Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) =>
                          handleInputChange("zipCode", e.target.value)
                        }
                        placeholder="12345"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nationality">Nationality</Label>
                    <Input
                      id="nationality"
                      value={formData.nationality}
                      onChange={(e) =>
                        handleInputChange("nationality", e.target.value)
                      }
                      placeholder="Enter your nationality"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="business">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Business Details
                  </CardTitle>
                  <CardDescription>
                    Business registration and tax information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="tin">
                        Tax Identification Number (TIN)
                      </Label>
                      <Input
                        id="tin"
                        value={formData.tin}
                        onChange={(e) =>
                          handleInputChange("tin", e.target.value)
                        }
                        placeholder="Enter TIN"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taxClearanceCertificate">
                        Tax Clearance Certificate Number
                      </Label>
                      <Input
                        id="taxClearanceCertificate"
                        value={formData.taxClearanceCertificate}
                        onChange={(e) =>
                          handleInputChange(
                            "taxClearanceCertificate",
                            e.target.value
                          )
                        }
                        placeholder="Certificate number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taxClearanceFile">
                        Tax Clearance Certificate File
                      </Label>
                      <div className="flex items-center gap-2">
                        <Label
                          htmlFor="taxClearanceFile"
                          className="cursor-pointer flex-1"
                        >
                          <div className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                            <Upload className="h-4 w-4" />
                            {files.taxClearanceCertificate
                              ? files.taxClearanceCertificate.name
                              : "Upload Certificate"}
                          </div>
                        </Label>
                        <Input
                          id="taxClearanceFile"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) =>
                            handleFileUpload(
                              "taxClearanceCertificate",
                              e.target.files[0]
                            )
                          }
                          className="hidden"
                        />
                        {files.taxClearanceCertificate && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              removeFile("taxClearanceCertificate")
                            }
                            className="h-8 w-8 p-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="namesOfDirectors">Names of Directors</Label>
                    <Textarea
                      id="namesOfDirectors"
                      value={formData.namesOfDirectors}
                      onChange={(e) =>
                        handleInputChange("namesOfDirectors", e.target.value)
                      }
                      placeholder="List all company directors (one per line)"
                      className="min-h-[100px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Legal Documents
                  </CardTitle>
                  <CardDescription>
                    Company registration and legal documentation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="caccertificate">
                        CAC Certificate Number
                      </Label>
                      <Input
                        id="caccertificate"
                        value={formData.caccertificate}
                        onChange={(e) =>
                          handleInputChange("caccertificate", e.target.value)
                        }
                        placeholder="CAC registration number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="caccertificateFile">
                        CAC Certificate File
                      </Label>
                      <div className="flex items-center gap-2">
                        <Label
                          htmlFor="caccertificateFile"
                          className="cursor-pointer flex-1"
                        >
                          <div className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                            <Upload className="h-4 w-4" />
                            {files.caccertificate
                              ? files.caccertificate.name
                              : "Upload CAC Certificate"}
                          </div>
                        </Label>
                        <Input
                          id="caccertificateFile"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) =>
                            handleFileUpload(
                              "caccertificate",
                              e.target.files[0]
                            )
                          }
                          className="hidden"
                        />
                        {files.caccertificate && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile("caccertificate")}
                            className="h-8 w-8 p-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyMemorandum">
                      Company Memorandum Details
                    </Label>
                    <Textarea
                      id="companyMemorandum"
                      value={formData.companyMemorandum}
                      onChange={(e) =>
                        handleInputChange("companyMemorandum", e.target.value)
                      }
                      placeholder="Company memorandum details or reference number"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyMemorandumFile">
                      Company Memorandum File
                    </Label>
                    <div className="flex items-center gap-2">
                      <Label
                        htmlFor="companyMemorandumFile"
                        className="cursor-pointer flex-1"
                      >
                        <div className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                          <Upload className="h-4 w-4" />
                          {files.companyMemorandum
                            ? files.companyMemorandum.name
                            : "Upload Memorandum"}
                        </div>
                      </Label>
                      <Input
                        id="companyMemorandumFile"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) =>
                          handleFileUpload(
                            "companyMemorandum",
                            e.target.files[0]
                          )
                        }
                        className="hidden"
                      />
                      {files.companyMemorandum && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile("companyMemorandum")}
                          className="h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="jobs">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Job Information
                  </CardTitle>
                  <CardDescription>
                    Job posting and recruitment details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="vacancies">Number of Vacancies</Label>
                      <Input
                        id="vacancies"
                        value={formData.vacancies}
                        onChange={(e) =>
                          handleInputChange("vacancies", e.target.value)
                        }
                        placeholder="e.g., 5"
                        type="number"
                        min="1"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="jobBoard">Preferred Job Board</Label>
                      <Select
                        onValueChange={(value) =>
                          handleInputChange("jobBoard", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select job board" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="linkedin">LinkedIn</SelectItem>
                          <SelectItem value="indeed">Indeed</SelectItem>
                          <SelectItem value="glassdoor">Glassdoor</SelectItem>
                          <SelectItem value="monster">Monster</SelectItem>
                          <SelectItem value="jobvite">Jobvite</SelectItem>
                          <SelectItem value="company-website">
                            Company Website
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 flex justify-end space-x-4">
            <Button type="button" variant="outline">
              Save as Draft
            </Button>
            <Button type="submit">Save Profile</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
