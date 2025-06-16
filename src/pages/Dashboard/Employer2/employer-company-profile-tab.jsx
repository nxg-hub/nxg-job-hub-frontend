import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Building2,
  FileText,
  Phone,
  User,
  Users,
  Save,
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
import EmployerLegalDocumentCard from "./employerLegalDocumentCard";

export default function EmployerCompanyProfileTab() {
  const [isEditCompanyInfo, setEditCompanyInfo] = useState(false);
  const [isEditContactInfo, setEditContactInfo] = useState(false);
  const [isEditBusinessDetails, setEditBusinessDetails] = useState(false);
  const [isEditJobs, setEditJobs] = useState(false);

  const [profileData, setProfileData] = useState(employerData);
  const [formData, setFormData] = useState({
    // Basic Company Information
    companyName: "",
    companyDescription: "",
    country: "",
    state: "",
    companyZipCode: "",
    industryType: "",
    companySize: "",

    // Company Contact
    companyAddress: "",
    companyPhone: "",
    companyWebsite: "",

    // Job Information
    vacancies: "",
    position: "",
    jobBoard: "",

    // Legal & Compliance
    tin: "",
    taxClearanceCertificate: "",
    caccertificate: "",
    namesOfDirectors: "",
    companyMemorandum: "",
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
      <h1 className="text-lg text-sky-600 font-medium">Company Profile</h1>
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
                Company Information
              </TabsTrigger>
              <TabsTrigger value="contact" className={tabCssStyle}>
                <Phone className="h-4 w-4" />
                Contact Information
              </TabsTrigger>
              <TabsTrigger value="Job" className={tabCssStyle}>
                <Briefcase className="h-4 w-4" />
                Job Information
              </TabsTrigger>
              <TabsTrigger value="documents" className={tabCssStyle}>
                <FileText className="h-4 w-4" />
                Legal & Compliance
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

            <TabsContent value="documents">
              <EmployerLegalDocumentCard />
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
            <Button
              className="border-transparent bg-cyan-500 hover:bg-cyan-600"
              type="submit"
            >
              <Save className="w-24 h-24" />
              Save Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
