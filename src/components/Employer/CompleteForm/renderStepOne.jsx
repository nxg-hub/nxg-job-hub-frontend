import {
  InputField,
  SelectionField,
  TextareaField,
} from "@/components/formFields";

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

export default function RenderStepOne({ formData, setFormData }) {
  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div>
      <div className="space-y-6">
        <InputField
          labelName="Company Name:"
          name="companyName"
          value={formData.companyName}
          type="text"
          onChange={updateFormData}
          placeholder="Enter company name"
        />
        <TextareaField
          labelName="Company Description:"
          name="companyDescription"
          value={formData.companyDescription}
          onChange={updateFormData}
          placeholder="Describe your company, its mission, and values..."
          className="min-h-[120px]"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <SelectionField
            labelName="Industry Type:"
            name="industryType"
            value={formData.industryType}
            onChange={updateFormData}
            options={industryOptions}
            placeholder="Select industry"
          />
          <SelectionField
            labelName="Company Size:"
            name="companySize"
            value={formData.companySize}
            onChange={updateFormData}
            options={companySizeOptions}
            placeholder="Select company size"
          />
        </div>
        <InputField
          labelName="Company Website:"
          name="companyWebsite"
          value={formData.companyWebsite}
          type="text"
          onChange={updateFormData}
          placeholder="www.example.com"
        />
      </div>
    </div>
  );
}
