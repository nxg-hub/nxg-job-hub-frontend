import {
  CompanyInfoCard,
  EditCompanyInfoCard,
} from "@/components/Employer/Profile/companyInfo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Pencil, Save, X } from "lucide-react";

export default function EmployerCompanyInfoCard({ isEditing, onEditClick }) {
  return (
    <div className=" p-8 bg-white shadow rounded-md">
      <div className="flex flex-col gap-10 mb-10">
        <div className="flex items-center justify-between">
          <p className="font-medium text-sky-600"> Company Information</p>
          {isEditing ? (
            <div className="flex gap-2">
              <Button
                className="text-red-400 hover:text-red-600 hover:bg-red-50"
                variant="outline"
                size="sm"
                onClick={onEditClick}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button
                variant="outline"
                className="bg-cyan-500 hover:bg-cyan-600 text-white hover:text-white"
                size="sm"
                type="submit"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              className="bg-cyan-500 hover:bg-cyan-600 text-white hover:text-white"
              size="sm"
              onClick={onEditClick}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>
          )}
        </div>
        <Separator />
      </div>
      <div className="mb-10">
        {isEditing ? <EditCompanyInfoCard /> : <CompanyInfoCard />}
      </div>
    </div>
  );
}
