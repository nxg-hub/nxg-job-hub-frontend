import CompanyInfo from "@/components/Employer/Profile/companyInfo";
import { Separator } from "@/components/ui/separator";
import { useEmployerData } from "@/store/employer/employerStore";
import {
  InputField,
  SelectionField,
  TextareaField,
} from "@/components/formFields";

const nigerianStates = [
  { value: "Abia", label: "Abia" },
  { value: "Adamawa", label: "Adamawa" },
  { value: "Akwa Ibom", label: "Akwa Ibom" },
  { value: "Anambra", label: "Anambra" },
  { value: "Bauchi", label: "Bauchi" },
  { value: "Bayelsa", label: "Bayelsa" },
  { value: "Benue", label: "Benue" },
  { value: "Borno", label: "Borno" },
  { value: "Cross River", label: "Cross River" },
  { value: "Delta", label: "Delta" },
  { value: "Ebonyi", label: "Ebonyi" },
  { value: "Edo", label: "Edo" },
  { value: "Ekiti", label: "Ekiti" },
  { value: "Enugu", label: "Enugu" },
  { value: "Gombe", label: "Gombe" },
  { value: "Imo", label: "Imo" },
  { value: "Jigawa", label: "Jigawa" },
  { value: "Kaduna", label: "Kaduna" },
  { value: "Kano", label: "Kano" },
  { value: "Katsina", label: "Katsina" },
  { value: "Kebbi", label: "Kebbi" },
  { value: "Kogi", label: "Kogi" },
  { value: "Kwara", label: "Kwara" },
  { value: "Lagos", label: "Lagos" },
  { value: "Nasarawa", label: "Nasarawa" },
  { value: "Niger", label: "Niger" },
  { value: "Ogun", label: "Ogun" },
  { value: "Ondo", label: "Ondo" },
  { value: "Osun", label: "Osun" },
  { value: "Oyo", label: "Oyo" },
  { value: "Plateau", label: "Plateau" },
  { value: "Rivers", label: "Rivers" },
  { value: "Sokoto", label: "Sokoto" },
  { value: "Taraba", label: "Taraba" },
  { value: "Yobe", label: "Yobe" },
  { value: "Zamfara", label: "Zamfara" },
  { value: "FCT", label: "Abuja" },
];

const countryOptions = [
  { label: "Nigeria", value: "ng" },
  { label: "Others", value: "Others" },
];

const industryOptions = [
  { value: "technology", label: "Technology" },
  { value: "healthcare", label: "Healthcare" },
  { value: "finance", label: "Finance" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "retail", label: "Retail" },
  { value: "consulting", label: "Consulting" },
  { value: "other", label: "Other" },
];

const companySizeOptions = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "501-1000", label: "501-1000 employees" },
  { value: "1000+", label: "1000+ employees" },
];

export default function EmployerCompanyInfoCard({
  companyName,
  companyDescription,
  country,
  state,
  companyZipCode,
  industryType,
  companySize,
}) {
  const updateEmployerField = useEmployerData(
    (state) => state.updateEmployerField
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateEmployerField(name, value);
  };
  return (
    <div className="p-2 bg-white md:shadow md:rounded-md">
      {/* <div className="flex flex-col gap-10 mb-10">
        <p className="font-medium text-sky-600"> Company Information</p>

        <Separator />
      </div> */}
      <div className="mb-10 space-y-5">
        <InputField
          labelName="Company Name:"
          name="employer.companyName"
          value={companyName || ""}
          type="text"
          onChange={handleInputChange}
          placeholder="Enter company name"
        />
        <TextareaField
          labelName="Company description:"
          name="employer.companyDescription"
          value={companyDescription || ""}
          onChange={handleInputChange}
          placeholder="Describe your company, its mission, and values..."
          className="min-h-[120px]"
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <SelectionField
            labelName="Country:"
            name="country"
            value={country || ""}
            onChange={handleInputChange}
            options={countryOptions}
            placeholder="Select country"
          />
          <SelectionField
            labelName="State:"
            name="state"
            value={state || ""}
            onChange={handleInputChange}
            options={nigerianStates}
            placeholder="Select state"
          />
          <InputField
            labelName="Company Zip Code:"
            name="companyZipCode"
            value={companyZipCode || ""}
            type="text"
            onChange={handleInputChange}
            placeholder="12345"
          />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <SelectionField
            labelName="Industry Type:"
            name="industryType"
            value={industryType || ""}
            onChange={handleInputChange}
            options={industryOptions}
            placeholder="Select industry"
          />
          <SelectionField
            labelName="Company Size:"
            name="companySize"
            value={companySize || ""}
            onChange={handleInputChange}
            options={companySizeOptions}
            placeholder="Select company size"
          />
        </div>
      </div>
    </div>
  );
}
