import { Separator } from "@/components/ui/separator";
import { useEmployerData } from "@/store/employer/employerStore";
import {
  InputField,
  PhoneNumberField,
  TextareaField,
} from "@/components/formFields";

export default function EmployerContactInfoCard({
  companyAddress,
  companyPhone,
  companyWebsite,
}) {
  const updateEmployerField = useEmployerData(
    (state) => state.updateEmployerField
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateEmployerField(name, value);
  };
  return (
    <div className=" p-2 bg-white md:shadow md:rounded-md">
      {/* <div className="flex flex-col gap-10 mb-10">
        <p className="font-medium text-sky-600"> Contact Information</p>

        <Separator />
      </div> */}
      <div className="mb-10 space-y-6">
        <TextareaField
          labelName="Company Address:"
          name="companyAddress"
          value={companyAddress || ""}
          onChange={handleInputChange}
          placeholder="company address"
          className="min-h-[120px]"
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <PhoneNumberField
            name="companyPhone"
            value={companyPhone || ""}
            labelName="Company Phone:"
            defaultCountry="NG"
            placeholder="+1 (555) 123-4567"
            onChange={handleInputChange}
          />
          <InputField
            labelName="Company Website:"
            name="companyWebsite"
            value={companyWebsite || ""}
            type="text"
            onChange={handleInputChange}
            placeholder="www.example.com"
          />
        </div>
        <div className="">
          <Separator />
        </div>
      </div>
    </div>
  );
}
