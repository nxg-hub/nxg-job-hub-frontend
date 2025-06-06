import Jobs from "@/components/Employer/Profile/jobs";
import { Separator } from "@/components/ui/separator";

export default function EmployerProfileJobsTabCard({ isEditing, onEditClick }) {
  return (
    <div className=" p-8 bg-white shadow rounded-md">
      <div className="flex flex-col gap-10 mb-10">
        <p className="font-medium text-sky-600"> Job Information</p>
        <Separator />
      </div>
      <Jobs />
    </div>
  );
}
