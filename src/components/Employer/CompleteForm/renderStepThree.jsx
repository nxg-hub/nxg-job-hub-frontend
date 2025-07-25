import { DirectorsField } from "../formFields";

export default function RenderStepThree({ formData, setFormData }) {
  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div>
      <DirectorsField
        labelName="Name of Directors"
        name="namesOfDirectors"
        value={formData.namesOfDirectors}
        onChange={updateFormData}
        placeholder="Enter available vacancy"
      />
    </div>
  );
}
