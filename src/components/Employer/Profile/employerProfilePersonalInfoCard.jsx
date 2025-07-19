import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useEmployerData } from "@/store/employer/employerStore";

export default function EmployerProfilePersonInfoCard() {
  const employer = useEmployerData((state) => state.employerData);
  const updateEmployerField = useEmployerData(
    (state) => state.updateEmployerField
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateEmployerField(name, value);
  };

  return (
    <div className="p-8 bg-white shadow rounded-md">
      <div className="flex flex-col gap-10 mb-10">
        <p className="font-medium text-sky-600">Personal Information</p>
        <Separator />
        <div className="grid grid-cols-3 gap-8">
          <div>
            <Label htmlFor="fname">First name</Label>
            <Input
              name="user.firstName"
              onChange={handleInputChange}
              type="text"
              value={employer?.user?.firstName || ""}
            />
          </div>
          <div>
            <Label htmlFor="lname">Last name</Label>
            <Input
              name="user.lastName"
              onChange={handleInputChange}
              type="text"
              value={employer?.user?.lastName || ""}
            />
          </div>
          <div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Input
                name="user.userType"
                onChange={handleInputChange}
                type="text"
                value={employer?.user?.userType || ""}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex gap-8">
          <div className="w-1/2">
            <Label htmlFor="email">Email</Label>
            <Input
              name="user.email"
              onChange={handleInputChange}
              type="text"
              value={employer?.user?.email || ""}
            />
          </div>
          <div className="w-1/2">
            <Label htmlFor="number">Phone number</Label>
            <Input
              name="user.phoneNumber"
              onChange={handleInputChange}
              type="text"
              value={employer?.user?.phoneNumber || ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
