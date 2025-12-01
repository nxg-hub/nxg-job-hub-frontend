import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Building2,
  ChevronRight,
  ChevronLeft,
  FileText,
  Phone,
  Save,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import EmployerCompanyInfoCard from "../../../components/Employer/Profile/employerCompanyInfoCard";
import EmployerContactInfoCard from "../../../components/Employer/Profile/employerContactInfoCard";
import EmployerProfileJobsTabCard from "../../../components/Employer/Profile/employerProfileJobsTabCard";
import EmployerLegalDocumentCard from "../../../components/Employer/Profile/employerLegalDocumentCard";
import { useEmployerData } from "@/store/employer/employerStore";
import EmployerProfilePhotoCard from "@/components/Employer/Profile/employerProfilePhotoCard";
import EmployerProfilePersonInfoCard from "@/components/Employer/Profile/employerProfilePersonalInfoCard";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import EmployerProfileMobileView from "@/components/Employer/Profile/employerProfileMobileView";
import { useUserData } from "@/store/userDataStorage";
import { useMobile } from "@/hooks/use-mobile";
import EmployerProfileOverview from "@/components/Employer/Profile/employerProfileOverview";

export default function EmployerCompanyProfileTab() {
  const employer = useUserData((state) => state.userData);

  return (
    <div className="w-full flex flex-col md:flex-row gap-20 ">
      <div className=" md:w-1/3">
        <EmployerProfileOverview
          userId={employer?.employer?.employerID}
          companyDescription={employer?.employer?.companyDescription}
          profilePicture={employer?.employer?.companyLogo}
          companyName={employer?.employer?.companyName}
          companyAddress={employer?.employer.companyAddress}
          country={employer?.employer?.country}
          state={employer?.employer?.state}
          companyZipCode={employer?.employer?.companyZipCode}
        />
      </div>
      <div className="md:w-3/5">
        <EmployerCompanyInfoCard
          industryType={employer?.employer?.industryType}
          companySize={employer?.employer?.companySize}
          vacancies={employer?.employer?.vacancies}
          position={employer?.employer?.position}
          jobBoard={employer?.employer?.jobBoard}
          namesOfDirectors={employer?.employer?.namesOfDirectors}
          companyPhone={employer?.phoneNumber}
          companyWebsite={employer?.employer?.companyWebsite}
          companyEmail={employer?.email}
        />
      </div>
      <div className="mt-8 flex md:justify-end space-x-4">
        {/* <Button
              className="w-full border-transparent bg-primary hover:bg-secondary md:w-fit"
              type="submit"
            >
              <Save className="w-24 h-24" />
              Save Profile
            </Button> */}
      </div>
    </div>
  );
}
