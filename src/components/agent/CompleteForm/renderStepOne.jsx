import {
  InputField,
  MultiSelectField,
  SelectionField,
  TextareaField,
} from "@/components/formFields";

const titleOptions = [
  { value: "talent-recruitment", label: "Talent Recruitment Specialists" },
  {
    value: "employer-consultants",
    label: "Employer-Focused Recruitment Consultants",
  },
  {
    value: "service-provider-agent",
    label: "Service Provider/Vendor Sourcing Agents",
  },
  { value: "general-agent", label: "General/Independent Agents" },
  { value: "industry-agent", label: "Industry-Specific/Niche Agents" },
];

const yearsExperienceOptions = [
  { value: "1-2", label: "1-2 years" },
  { value: "3-5", label: "3-5 years" },
  { value: "6-10", label: "6-10 years" },
  { value: "11-15", label: "11-15 years" },
  { value: "15+", label: "15+ years" },
];
const agencySizeOptions = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "501-1000", label: "501-1000 employees" },
  { value: "1000+", label: "1000+ employees" },
];

const expertiseOptions = [
  { value: "Executive Search", label: "Executive Search" },
  { value: "Technical Recruitment", label: "Technical Recruitment" },
  { value: "Sales & Marketing Roles", label: "Sales & Marketing Roles" },
  { value: "Startup Talent Acquisition", label: "Startup Talent Acquisition" },
  { value: "Remote Team Building", label: "Remote Team Building" },
  { value: "Contract Staffing", label: "Contract Staffing" },
  { value: "Volume Hiring", label: "Volume Hiring" },
  { value: "Healthcare Recruitment", label: "Healthcare Recruitment" },
  { value: "Finance & Banking", label: "Finance & Banking" },
  { value: "Creative & Design", label: "Creative & Design" },
  { value: "Operations & Supply Chain", label: "Operations & Supply Chain" },
];

const specializationOptions = [
  { value: "Executive Search", label: "Executive Search" },
  { value: "C-Suite Placement", label: "C-Suite Placement" },
  { value: "Contract Staffing", label: "Contract Staffing" },
  { value: "Finance & Banking", label: "Finance & Banking" },
  { value: "Technical Recruitment", label: "Technical Recruitment" },
  { value: "Startup Talent Acquisition", label: "Startup Talent Acquisition" },
  { value: "Volume Hiring", label: "Volume Hiring" },
  { value: "Creative & Design", label: "Creative & Design" },
  { value: "Sales & Marketing Roles", label: "Sales & Marketing Roles" },
  { value: "Remote Team Building", label: "Remote Team Building" },
  { value: "Healthcare Recruitment", label: "Healthcare Recruitment" },
  { value: "Operations & Supply Chain", label: "Operations & Supply Chain" },
];

const indudtryOptions = [
  { value: "Technology & Software", label: "Technology & Software" },
  { value: "E-commerce & Retail", label: "E-commerce & Retail" },
  { value: "Real Estate", label: "Real Estate" },
  { value: "Non-Profit", label: "Non-Profit" },
  { value: "Financial Services", label: "Financial Services" },
  { value: "Consulting Services", label: "Consulting Services" },
  { value: "Media & Entertainment", label: "Media & Entertainment" },
  { value: "Government", label: "Government" },
  { value: "Healthcare & Biotech", label: "Healthcare & Biotech" },
  { value: "Manufacturing", label: "Manufacturing" },
  { value: "Education", label: "Education" },
  { value: "Energy & Utilities", label: "Energy & Utilities" },
];

export default function RenderStepOne({ formData, setFormData }) {
  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <InputField
          labelName="Agency Name:"
          name="agencyName"
          value={formData.agencyName}
          type="text"
          onChange={updateFormData}
          placeholder="Enter agency name"
        />
        <SelectionField
          labelName="Agency Title:"
          name="agentTitle"
          value={formData.agencyTitle}
          onChange={updateFormData}
          options={titleOptions}
          placeholder="Select your agency title"
        />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <SelectionField
          labelName="Year of Experience:"
          name="yearOfExperience"
          value={formData.yearOfExperience}
          onChange={updateFormData}
          options={yearsExperienceOptions}
          placeholder="Select your years of experience"
        />
        <SelectionField
          labelName="Agency Size:"
          name="agencySize"
          value={formData.agencySize}
          onChange={updateFormData}
          options={agencySizeOptions}
          placeholder="Select your agency size"
        />
      </div>
      <TextareaField
        labelName="Agency Bio.:"
        name="agencyBio"
        value={formData.agencyBio}
        onChange={updateFormData}
        placeholder="Describe your company, its mission, and values..."
        className="min-h-[120px]"
      />

      <MultiSelectField
        labelName="Area of Specialization"
        name="areaOfSpecialization"
        options={specializationOptions}
        selected={formData.areaOfSpecialization}
        onValueChange={updateFormData}
        className="w-full"
      />
      <MultiSelectField
        labelName="Preferred Industries"
        name="preferredIndustry"
        options={indudtryOptions}
        selected={formData.preferredIndustry}
        onValueChange={updateFormData}
        className="w-full"
      />
    </div>
  );
}
