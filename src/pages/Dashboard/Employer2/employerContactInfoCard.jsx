import ContactInfo from "@/components/Employer/Profile/contactInfo";
import { Separator } from "@/components/ui/separator";

export default function EmployerContactInfoCard({ isEditing, onEditClick }) {
  return (
    <div className=" p-8 bg-white shadow rounded-md">
      <div className="flex flex-col gap-10 mb-10">
        <p className="font-medium text-sky-600"> Contact Information</p>

        <Separator />
      </div>
      <div className="mb-10">
        <ContactInfo />
      </div>
    </div>
  );
}
