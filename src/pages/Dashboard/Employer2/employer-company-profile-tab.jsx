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

import ProfilePhotoCard from "@/components/Profile/profilePhotoCard";
import ProfilePersonInfoCard from "@/components/Profile/profilePersonalInfoCard";
import { employerData } from "@/utils/data/employer-mock-data";
import { cn } from "@/lib/utils";
import EmployerCompanyInfoCard from "../../../components/Employer/Profile/employerCompanyInfoCard";
import EmployerContactInfoCard from "../../../components/Employer/Profile/employerContactInfoCard";
import EmployerBusinessDetailsCard from "./employerBusinessDetails";
import EmployerProfileJobsTabCard from "../../../components/Employer/Profile/employerProfileJobsTabCard";
import EmployerLegalDocumentCard from "../../../components/Employer/Profile/employerLegalDocumentCard";
import axios from "axios";
import { API_HOST_URL } from "@/utils/api/API_HOST";

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
    taxClearanceCertificateFileName: "",
    caccertificate: "",
    caccertificateFileName: "",
    namesOfDirectors: "",
    companyMemorandum: "",
    companyMemorandumFileName: "",
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

  const fetchEmployer = async () => {
    const token =
      localStorage.getItem("NXGJOBHUBLOGINKEYV1") ||
      sessionStorage.getItem("NXGJOBHUBLOGINKEYV1");
    const response = await axios
      .get(`${API_HOST_URL}/api/v1/auth/get-user`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error getting user data", error);
        throw error;
      });
    return response.data;
  };

  const updataEmployerProfileDetails = async (updateData) => {
    const token =
      localStorage.getItem("NXGJOBHUBLOGINKEYV1") ||
      sessionStorage.getItem("NXGJOBHUBLOGINKEYV1");
    const response = await axios
      .put(`${API_HOST_URL}/api/v1/auth/get-user`, updateData)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error getting user data", error);
        throw error;
      });
    return response.data;
  };

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
