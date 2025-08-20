import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useEmployerData } from "@/store/employer/employerStore";
import { InputField } from "@/components/formFields";

export default function EmployerProfilePersonInfoCard({
  firstName,
  lastName,
  role,
  email,
  phoneNumber,
}) {
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
          <InputField
            labelName="First name:"
            name="firstName"
            value={firstName || ""}
            type="text"
            onChange={handleInputChange}
            placeholder="Enter first name"
          />
          <InputField
            labelName="Last name:"
            name="lastName"
            value={lastName || ""}
            type="text"
            onChange={handleInputChange}
            placeholder="Enter last name"
          />
          <InputField
            labelName="Role:"
            name="userType"
            value={role || ""}
            type="text"
            onChange={handleInputChange}
          />
        </div>
        <div className="grid grid-cols-2 gap-8">
          <InputField
            labelName="Email:"
            name="email"
            value={email || ""}
            type="email"
            onChange={handleInputChange}
            placeholder="Enter your email"
          />
          <InputField
            labelName="Phone number:"
            name="phoneNumber"
            value={phoneNumber || ""}
            type="text"
            onChange={handleInputChange}
            placeholder="Enter your phone number"
          />
        </div>
      </div>
    </div>
  );
}
