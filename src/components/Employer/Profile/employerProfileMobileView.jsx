import { useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import EmployerCompanyInfoCard from "./employerCompanyInfoCard";
import {
  Briefcase,
  Building2,
  ChevronLeft,
  ChevronRight,
  FileText,
  Phone,
} from "lucide-react";
import EmployerContactInfoCard from "./employerContactInfoCard";
import EmployerProfileJobsTabCard from "./employerProfileJobsTabCard";

export default function EmployerProfileMobileView({ employer }) {
  const [isCompanyInfoOpen, setIsCompanyInfoOpen] = useState(false);
  const [isContactInfoOpen, setIsContactInfoOpen] = useState(false);
  const [isJobInfoOpen, setIsJobInfoOpen] = useState(false);

  const isCloseCompanyInfo = () => {
    setIsCompanyInfoOpen(false);
  };

  const isCloseContactInfo = () => {
    setIsContactInfoOpen(false);
  };

  const isCloseJobInfo = () => {
    setIsJobInfoOpen(false);
  };

  return (
    <div className="p-3 flex flex-col mt-5 gap-5 md:hidden">
      {/* company information */}
      <AlertDialog open={isCompanyInfoOpen} onOpenChange={setIsCompanyInfoOpen}>
        <AlertDialogTrigger asChild>
          <div className="bg-gray-100 rounded-lg shadow">
            <div className="flex items-center justify-between py-5 px-5">
              <div className="flex items-center gap-2">
                <span className="text-white bg-secondary p-2 rounded-full">
                  <Building2 size={16} />
                </span>
                <span className="font-semibold text-gray-900">
                  Company Information
                </span>
              </div>
              <ChevronRight className="text-gray-700" />
            </div>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="h-screen p-0 flex flex-col gap-0">
          <AlertDialogHeader>
            <AlertDialogTitle className="border-gray-400 border-b-[1px] p-4">
              <div className="flex items-center gap-10">
                <ChevronLeft
                  onClick={isCloseCompanyInfo}
                  className="text-gray-700"
                />
                <h1 className="text-xl">Company Information</h1>
              </div>
            </AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
          </AlertDialogHeader>
          <div className="px-4">
            <EmployerCompanyInfoCard
              companyName={employer?.employer?.companyName}
              companyDescription={employer?.employer?.companyDescription}
              country={employer?.employer?.country}
              state={employer?.employer?.state}
              companyZipCode={employer?.employer?.companyZipCode}
              industryType={employer?.employer?.industryType}
              companySize={employer?.employer?.companySize}
            />
          </div>
        </AlertDialogContent>
      </AlertDialog>
      {/* contact information */}
      <AlertDialog open={isContactInfoOpen} onOpenChange={setIsContactInfoOpen}>
        <AlertDialogTrigger asChild>
          <div className="bg-gray-100 rounded-lg shadow">
            <div className="flex items-center justify-between py-5 px-5">
              <div className="flex items-center gap-2">
                <span className="text-white bg-secondary p-2 rounded-full">
                  <Phone size={16} />
                </span>
                <span className="font-semibold text-gray-900">
                  Contact Information
                </span>
              </div>
              <ChevronRight className="text-gray-700" />
            </div>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="h-screen p-0 flex flex-col gap-0">
          <AlertDialogHeader>
            <AlertDialogTitle className="border-gray-400 border-b-[1px] p-4">
              <div className="flex items-center gap-10">
                <ChevronLeft
                  onClick={isCloseContactInfo}
                  className="text-gray-700"
                />
                <h1 className="text-xl">Contact Information</h1>
              </div>
            </AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
          </AlertDialogHeader>
          <div className="px-4">
            <EmployerContactInfoCard
              companyAddress={employer?.employer.companyAddress}
              companyPhone={employer?.phoneNumber}
              companyWebsite={employer?.employer?.companyWebsite}
            />
          </div>
        </AlertDialogContent>
      </AlertDialog>
      {/* Job Information */}
      <AlertDialog open={isJobInfoOpen} onOpenChange={setIsJobInfoOpen}>
        <AlertDialogTrigger asChild>
          <div className="bg-gray-100 rounded-lg shadow">
            <div className="flex items-center justify-between py-5 px-5">
              <div className="flex items-center gap-2">
                <span className="text-white bg-secondary p-2 rounded-full">
                  <Briefcase size={16} />
                </span>
                <span className="font-semibold text-gray-900">
                  Job Information
                </span>
              </div>
              <ChevronRight className="text-gray-700" />
            </div>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="h-screen p-0 flex flex-col gap-0">
          <AlertDialogHeader>
            <AlertDialogTitle className="border-gray-400 border-b-[1px] p-4">
              <div className="flex items-center gap-10">
                <ChevronLeft
                  onClick={isCloseJobInfo}
                  className="text-gray-700"
                />
                <h1 className="text-xl">Job Information</h1>
              </div>
            </AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
          </AlertDialogHeader>
          <div className="px-4">
            <EmployerProfileJobsTabCard
              vacancies={employer?.employer?.vacancies}
              position={employer?.employer?.position}
              jobBoard={employer?.employer?.jobBoard}
            />
          </div>
        </AlertDialogContent>
      </AlertDialog>
      {/* Job Information */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className="bg-gray-100 rounded-lg shadow">
            <div className="flex items-center justify-between py-5 px-5">
              <div className="flex items-center gap-2">
                <span className="text-white bg-secondary p-2 rounded-full">
                  <FileText size={16} />
                </span>
                <span className="font-semibold text-gray-900">
                  Legal & Compliance
                </span>
              </div>
              <ChevronRight className="text-gray-700" />
            </div>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="h-screen p-0 flex flex-col gap-0">
          <AlertDialogHeader>
            <AlertDialogTitle>Area you ready</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be done . this....
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
