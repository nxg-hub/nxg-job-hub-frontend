import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Briefcase,
  Building2,
  FileText,
  Phone,
  Upload,
  User,
  Users,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import ProfilePhotoCard from "@/components/Profile/ProfilePhotoCard";
import ProfilePersonInfoCard from "@/components/Profile/profilePersonalInfoCard";
import { employerData } from "@/utils/data/employer-mock-data";
import { cn } from "@/lib/utils";
import EmployerCompanyInfoCard from "./employerCompanyInfoCard";
import EmployerContactInfoCard from "./employerContactInfoCard";
import EmployerBusinessDetailsCard from "./employerBusinessDetails";
import EmployerProfileJobsTabCard from "./employerProfileJobsTabCard";

export default function EmployerCompanyProfileTab() {
  const [isEditCompanyInfo, setEditCompanyInfo] = useState(false);
  const [isEditContactInfo, setEditContactInfo] = useState(false);
  const [isEditBusinessDetails, setEditBusinessDetails] = useState(false);
  const [isEditJobs, setEditJobs] = useState(false);

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

  const toggleEditCompanyInfo = () => {
    setEditCompanyInfo((prev) => !prev);
  };

  const toggleEditContactInfo = () => {
    setEditContactInfo((prev) => !prev);
  };

  const toggleEditBusinessDetails = () => {
    setEditBusinessDetails((prev) => !prev);
  };

  const toggleEditJobs = () => {
    setEditJobs((prev) => !prev);
  };

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

  const tabCssStyle = cn(
    "h-12 gap-2 rounded-none text-gray-500 font-medium",
    "data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-sky-600 ",
    "data-[state=active]:!border-b-4 data-[state=active]:!border-b-sky-600  transition"
  );

  return (
    <div className="flex flex-col p-10 gap-10">
      <div className="text-lg text-sky-600 font-medium">Company Profile</div>
      <div>
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="profile" className="space-y-8 ">
            <TabsList className="h-14 bg-transparent">
              <TabsTrigger value="profile" className={tabCssStyle}>
                <User className="h-4 w-4" />
                Personal
              </TabsTrigger>
              <TabsTrigger value="company" className={tabCssStyle}>
                <Building2 className="h-4 w-4" />
                Company
              </TabsTrigger>
              <TabsTrigger value="contact" className={tabCssStyle}>
                <Phone className="h-4 w-4" />
                Contact
              </TabsTrigger>
              <TabsTrigger value="business" className={tabCssStyle}>
                <Users className="h-4 w-4" />
                Business
              </TabsTrigger>
              <TabsTrigger value="documents" className={tabCssStyle}>
                <FileText className="h-4 w-4" />
                Documents
              </TabsTrigger>
              <TabsTrigger value="jobs" className={tabCssStyle}>
                <Briefcase className="h-4 w-4" />
                Jobs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="flex flex-col gap-8">
              <ProfilePhotoCard profileData={profileData} />
              <ProfilePersonInfoCard profileData={profileData} />
            </TabsContent>

            <TabsContent value="company">
              <EmployerCompanyInfoCard
                isEditing={isEditCompanyInfo}
                onEditClick={toggleEditCompanyInfo}
              />
            </TabsContent>

            <TabsContent value="contact">
              <EmployerContactInfoCard
                isEditing={isEditContactInfo}
                onEditClick={toggleEditContactInfo}
              />
            </TabsContent>

            <TabsContent value="business">
              <EmployerBusinessDetailsCard
                isEditing={isEditBusinessDetails}
                onEditClick={toggleEditBusinessDetails}
              />
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
              <EmployerProfileJobsTabCard
                isEditing={isEditJobs}
                onEditClick={toggleEditJobs}
              />
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
