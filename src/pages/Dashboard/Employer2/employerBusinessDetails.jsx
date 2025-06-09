import BusinessDetails from "@/components/Employer/Profile/businessDetails";
import { Separator } from "@/components/ui/separator";

export default function EmployerBusinessDetailsCard({
  isEditing,
  onEditClick,
}) {
  return (
    <div className=" p-8 bg-white shadow rounded-md">
      <div className="flex flex-col gap-10 mb-10">
        <p className="font-medium text-sky-600"> Business Details</p>

        <Separator />
      </div>
      <div className="mb-10">
        <BusinessDetails />
      </div>
    </div>
  );
}
