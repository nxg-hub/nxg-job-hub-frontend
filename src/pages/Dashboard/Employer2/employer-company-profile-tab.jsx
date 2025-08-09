import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Briefcase, Building2, FileText, Phone, Save } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import EmployerCompanyInfoCard from "../../../components/Employer/Profile/employerCompanyInfoCard";
import EmployerContactInfoCard from "../../../components/Employer/Profile/employerContactInfoCard";
import EmployerProfileJobsTabCard from "../../../components/Employer/Profile/employerProfileJobsTabCard";
import EmployerLegalDocumentCard from "../../../components/Employer/Profile/employerLegalDocumentCard";
import { useEmployerData } from "@/store/employer/employerStore";
import EmployerProfilePhotoCard from "@/components/Employer/Profile/employerProfilePhotoCard";
import EmployerProfilePersonInfoCard from "@/components/Employer/Profile/employerProfilePersonalInfoCard";

export default function EmployerCompanyProfileTab() {
  const employer = useEmployerData((state) => state.employerData);

  const handleSubmit = (e) => {};

  const tabCssStyle = cn(
    "h-12 gap-2 rounded-none text-gray-500 font-medium",
    "data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-sky-600 ",
    "data-[state=active]:!border-b-4 data-[state=active]:!border-b-sky-600  transition"
  );

  return (
    <div className="w-full flex flex-col gap-10 md:p-10">
      <h1 className="text-lg text-sky-600 font-medium">Company Profile</h1>
      <div className="flex flex-col md:gap-10">
        <EmployerProfilePhotoCard
          userId={employer?.id}
          firstName={employer?.firstName}
          lastName={employer?.lastName}
          userType={employer?.userType}
          country={employer?.employer?.country}
          profilePicture={employer?.profilePicture}
          companyName={employer?.employer?.companyName}
        />
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="company" className="space-y-8 w-full">
            <TabsList className="w-full h-14 bg-transparent overflow-x-auto overflow-y-hidden">
              {/* <TabsTrigger value="profile" className={tabCssStyle}>
                <User className="h-4 w-4" />
                Personal
              </TabsTrigger> */}
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

            {/* <TabsContent value="profile" className="flex flex-col gap-8">
              <EmployerProfilePersonInfoCard
                firstName={employer?.firstName}
                lastName={employer?.lastName}
                role={employer?.userType}
                email={employer?.email}
                phoneNumber={employer?.phoneNumber}
              />
            </TabsContent> */}

            <TabsContent value="company">
              <EmployerCompanyInfoCard
                companyName={employer?.employer?.companyName}
                companyDescription={employer?.employer?.companyDescription}
                country={employer?.employer?.country}
                state={employer?.employer?.state}
                companyZipCode={employer?.employer?.companyZipCode}
                industryType={employer?.employer?.industryType}
                companySize={employer?.employer?.companySize}
              />
            </TabsContent>

            <TabsContent value="contact">
              <EmployerContactInfoCard
                companyAddress={employer?.employer.companyAddress}
                companyPhone={employer?.phoneNumber}
                companyWebsite={employer?.employer?.companyWebsite}
              />
            </TabsContent>

            <TabsContent value="Job">
              <EmployerProfileJobsTabCard
                vacancies={employer?.employer?.vacancies}
                position={employer?.employer?.position}
                jobBoard={employer?.employer?.jobBoard}
              />
            </TabsContent>

            {/*<TabsContent value="documents">
              <EmployerLegalDocumentCard />
            </TabsContent> */}
          </Tabs>

          <div className="mt-8 flex md:justify-end space-x-4">
            <Button
              className="w-full border-transparent bg-primary hover:bg-secondary md:w-fit"
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
