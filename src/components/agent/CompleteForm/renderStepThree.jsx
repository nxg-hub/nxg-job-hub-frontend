import { PortFolioField } from "@/components/formFields";

export default function RenderStepThree({ formData, setFormData }) {
  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div>
      <PortFolioField
        labelName="Key Achivement"
        name="agencyPortfolio"
        records={formData.agencyPortfolio}
        onChange={updateFormData}
      />
    </div>
  );
}
