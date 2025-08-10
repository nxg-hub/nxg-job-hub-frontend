import {
  InputField,
  PhoneNumberField,
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
  { label: "Nigeria", value: "Nigeria" },
  { label: "Others", value: "Others" },
];

export default function RenderStepTwo({ formData, setFormData }) {
  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <SelectionField
          labelName="Country:"
          name="country"
          value={formData.country}
          onChange={updateFormData}
          options={countryOptions}
          placeholder="Select country"
        />
        <SelectionField
          labelName="State:"
          name="state"
          value={formData.state}
          onChange={updateFormData}
          options={nigerianStates}
          placeholder="Select state"
        />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <InputField
          labelName="City:"
          name="city"
          value={formData.city}
          type="text"
          onChange={updateFormData}
          placeholder="Enter the name of your city"
        />
        <InputField
          labelName="Company Zip Code:"
          name="postalCode"
          value={formData.postalCode}
          type="text"
          onChange={updateFormData}
          placeholder="12345"
        />
      </div>
      <TextareaField
        labelName="Agency Address:"
        name="agencyAddress"
        value={formData.agencyAddress}
        onChange={updateFormData}
        placeholder="agency address"
        className="min-h-[120px]"
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <PhoneNumberField
          name="phoneNumber"
          value={formData.phoneNumber}
          labelName="Agency Phone Number:"
          defaultCountry="NG"
          placeholder="+1 (555) 123-4567"
          onChange={updateFormData}
        />
        <InputField
          labelName="Agency Email:"
          name="email"
          value={formData.email}
          type="text"
          onChange={updateFormData}
          placeholder="(example@gmail.com)"
        />
        <InputField
          labelName="Agency Website:"
          name="agencyWebsite"
          value={formData.agencyWebsite}
          type="text"
          onChange={updateFormData}
          placeholder="(www.example.com)"
        />
      </div>
    </div>
  );
}
