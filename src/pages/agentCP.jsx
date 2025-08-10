import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building,
  Camera,
  Mail,
  Shield,
  User,
  Phone,
  MapPin,
  Users,
  Globe,
  Target,
  X,
  FileText,
  CheckCircle,
  Upload,
  AlertCircle,
  Save,
  Briefcase,
  CircleDashed,
  Circle,
  Building2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Checkbox from "@/components/Checkbox";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export default function AgentCompleteProfile() {
  const [profileImage, setProfileImage] = useState(
    "/placeholder.svg?height=120&width=120"
  );
  const [selectedExpertise, setSelectedExpertise] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [uploadedDocuments, setUploadedDocuments] = useState([]);

  const expertiseOptions = [
    "Executive Search",
    "Technical Recruitment",
    "Sales & Marketing Roles",
    "C-Suite Placement",
    "Startup Talent Acquisition",
    "Remote Team Building",
    "Contract Staffing",
    "Volume Hiring",
    "Healthcare Recruitment",
    "Finance & Banking",
    "Creative & Design",
    "Operations & Supply Chain",
  ];

  const industryOptions = [
    "Technology & Software",
    "Financial Services",
    "Healthcare & Biotech",
    "E-commerce & Retail",
    "Consulting Services",
    "Manufacturing",
    "Real Estate",
    "Media & Entertainment",
    "Education",
    "Non-Profit",
    "Government",
    "Energy & Utilities",
  ];

  const requiredDocuments = [
    { id: "license", name: "Professional License", required: true },
    { id: "certification", name: "Recruitment Certification", required: true },
    { id: "identity", name: "Government ID", required: true },
    { id: "resume", name: "Professional Resume", required: false },
    { id: "references", name: "Professional References", required: false },
  ];

  const handleExpertiseChange = (expertise, checked) => {
    if (checked) {
      setSelectedExpertise([...selectedExpertise, expertise]);
    } else {
      setSelectedExpertise(
        selectedExpertise.filter((item) => item !== expertise)
      );
    }
  };

  const handleIndustryChange = (industry, checked) => {
    if (checked) {
      setSelectedIndustries([...selectedIndustries, industry]);
    } else {
      setSelectedIndustries(
        selectedIndustries.filter((item) => item !== industry)
      );
    }
  };

  const removeExpertise = (expertise) => {
    setSelectedExpertise(
      selectedExpertise.filter((item) => item !== expertise)
    );
  };

  const removeIndustry = (industry) => {
    setSelectedIndustries(
      selectedIndustries.filter((item) => item !== industry)
    );
  };

  const handleDocumentUpload = (documentId) => {
    if (!uploadedDocuments.includes(documentId)) {
      setUploadedDocuments([...uploadedDocuments, documentId]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Agent Profile</h1>
          <p className="text-gray-600 mt-2">
            Complete your profile to help clients find and connect with you
          </p>
        </div>

        <form className="space-y-8">
          <Tabs defaultValue="person-info" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger
                value="person-info"
                className="flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                Person Info
              </TabsTrigger>
              <TabsTrigger
                value="agency-info"
                className="flex items-center gap-2"
              >
                <Building className="w-4 h-4" />
                Agency Info
              </TabsTrigger>
              <TabsTrigger
                value="verified-document"
                className="flex items-center gap-2"
              >
                <Shield className="w-4 h-4" />
                Verified Document
              </TabsTrigger>
              <TabsTrigger
                value="verified-document"
                className="flex items-center gap-2"
              >
                <Shield className="w-4 h-4" />
                Verified Document
              </TabsTrigger>
            </TabsList>

            {/* Person Info Tab */}
            <TabsContent value="person-info" className="space-y-6">
              {/* Profile Picture */}
              <Card>
                <CardHeader>
                  <CardTitle>Profile Picture</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6">
                    <Avatar className="w-24 h-24">
                      <AvatarImage
                        src={profileImage || "/placeholder.svg"}
                        alt="Profile"
                      />
                      <AvatarFallback>
                        <Camera className="w-8 h-8" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Button type="button" variant="outline">
                        <Camera className="w-4 h-4 mr-2" />
                        Upload Photo
                      </Button>
                      <p className="text-sm text-gray-500 mt-2">
                        JPG, PNG or GIF. Max size 2MB.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          className="pl-10"
                          placeholder="your.email@company.com"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          type="tel"
                          className="pl-10"
                          placeholder="+1 (555) 123-4567"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input id="dateOfBirth" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not-to-say">
                            Prefer not to say
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="address"
                        className="pl-10"
                        placeholder="Street address"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input id="city" placeholder="City" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State/Province *</Label>
                      <Input id="state" placeholder="State/Province" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
                      <Input id="zipCode" placeholder="ZIP Code" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Professional Bio *</Label>
                    <Textarea
                      id="bio"
                      placeholder="Write a brief description of your experience, approach, and what makes you unique as a talent acquisition agent..."
                      className="min-h-[120px]"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Experience */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Experience
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="yearsExperience">
                        Years of Experience *
                      </Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select years of experience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-2">1-2 years</SelectItem>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                          <SelectItem value="6-10">6-10 years</SelectItem>
                          <SelectItem value="11-15">11-15 years</SelectItem>
                          <SelectItem value="15+">15+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="totalPlacements">
                        Total Successful Placements
                      </Label>
                      <Input
                        id="totalPlacements"
                        type="number"
                        placeholder="e.g., 150"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="achievements">Key Achievements</Label>
                    <Textarea
                      id="achievements"
                      placeholder="List your key achievements, certifications, awards, or notable accomplishments..."
                      className="min-h-[100px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Agency Info Tab */}
            <TabsContent value="agency-info" className="space-y-6">
              {/* Company Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name *</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="companyName"
                          className="pl-10"
                          placeholder="Your company name"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Job Title *</Label>
                      <Input
                        id="jobTitle"
                        placeholder="e.g., Senior Talent Acquisition Agent"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="companySize">Company Size</Label>
                      <Select>
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
                    <div className="space-y-2">
                      <Label htmlFor="workType">Work Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select work type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">
                            Full-time Employee
                          </SelectItem>
                          <SelectItem value="contractor">
                            Independent Contractor
                          </SelectItem>
                          <SelectItem value="freelancer">Freelancer</SelectItem>
                          <SelectItem value="consultant">Consultant</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="companyWebsite">Company Website</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="companyWebsite"
                          className="pl-10"
                          placeholder="www.company.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn Profile</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="linkedin"
                          className="pl-10"
                          placeholder="linkedin.com/in/yourprofile"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyDescription">
                      Company Description
                    </Label>
                    <Textarea
                      id="companyDescription"
                      placeholder="Brief description of your company and its services..."
                      className="min-h-[100px]"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Expertise Areas */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Expertise Areas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label>
                      Select your areas of expertise (choose multiple)
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {expertiseOptions.map((expertise) => (
                        <div
                          key={expertise}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={expertise}
                            checked={selectedExpertise.includes(expertise)}
                            onCheckedChange={(checked) =>
                              handleExpertiseChange(expertise, checked)
                            }
                          />
                          <Label
                            htmlFor={expertise}
                            className="text-sm font-normal cursor-pointer"
                          >
                            {expertise}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedExpertise.length > 0 && (
                    <div className="space-y-2">
                      <Label>Selected Expertise Areas:</Label>
                      <div className="flex flex-wrap gap-2">
                        {selectedExpertise.map((expertise) => (
                          <Badge
                            key={expertise}
                            variant="outline"
                            className="pr-1"
                          >
                            {expertise}
                            <button
                              type="button"
                              onClick={() => removeExpertise(expertise)}
                              className="ml-2 hover:bg-gray-200 rounded-full p-0.5"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Preferred Industries */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    Preferred Industries
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label>
                      Select industries you prefer to work with (choose
                      multiple)
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {industryOptions.map((industry) => (
                        <div
                          key={industry}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={industry}
                            checked={selectedIndustries.includes(industry)}
                            onCheckedChange={(checked) =>
                              handleIndustryChange(industry, checked)
                            }
                          />
                          <Label
                            htmlFor={industry}
                            className="text-sm font-normal cursor-pointer"
                          >
                            {industry}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedIndustries.length > 0 && (
                    <div className="space-y-2">
                      <Label>Selected Industries:</Label>
                      <div className="flex flex-wrap gap-2">
                        {selectedIndustries.map((industry) => (
                          <Badge
                            key={industry}
                            variant="secondary"
                            className="pr-1"
                          >
                            {industry}
                            <button
                              type="button"
                              onClick={() => removeIndustry(industry)}
                              className="ml-2 hover:bg-gray-200 rounded-full p-0.5"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Verified Document Tab */}
            <TabsContent value="verified-document" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Document Verification
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    Upload the required documents to verify your professional
                    credentials and identity.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {requiredDocuments.map((doc) => (
                    <div key={doc.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{doc.name}</h3>
                            {doc.required && (
                              <Badge variant="destructive" className="text-xs">
                                Required
                              </Badge>
                            )}
                          </div>
                          {uploadedDocuments.includes(doc.id) && (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {uploadedDocuments.includes(doc.id) ? (
                            <Badge
                              variant="secondary"
                              className="text-green-700 bg-green-100"
                            >
                              Uploaded
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="text-orange-700 bg-orange-50"
                            >
                              Pending
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleDocumentUpload(doc.id)}
                          disabled={uploadedDocuments.includes(doc.id)}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          {uploadedDocuments.includes(doc.id)
                            ? "Uploaded"
                            : "Upload File"}
                        </Button>
                        <p className="text-sm text-gray-500">
                          PDF, JPG, PNG accepted. Max size 5MB.
                        </p>
                      </div>

                      {uploadedDocuments.includes(doc.id) && (
                        <div className="mt-3 p-3 bg-green-50 rounded-md">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-green-700">
                              Document uploaded successfully and under review
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-900 mb-1">
                          Verification Process
                        </h4>
                        <p className="text-sm text-blue-700">
                          All uploaded documents will be reviewed by our
                          verification team within 2-3 business days. You'll
                          receive an email notification once the verification is
                          complete.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button type="button" variant="outline">
              Save as Draft
            </Button>
            <Button type="submit">
              <Save className="w-4 h-4 mr-2" />
              Submit Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
