import LegalDocument from "@/components/Employer/Profile/legalDocument";
import { Separator } from "@/components/ui/separator";

export default function EmployerLegalDocumentCard() {
  return (
    <div className=" p-8 bg-white shadow rounded-md">
      <div className="flex flex-col gap-10 mb-10">
        <p className="font-medium text-sky-600"> Legal Documents</p>

        <Separator />
      </div>
      <div className="mb-10">
        <LegalDocument />
      </div>
    </div>
  );
}
