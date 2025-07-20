import { InputField, VacancyField } from "../formFields";

export default function RenderStepFour({ formData, setFormData }) {
  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <VacancyField
          labelName="Vacancies"
          name="vacancies"
          value={formData.vacancies}
          onChange={updateFormData}
          placeholder="Enter available vacancy"
        />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <InputField
          labelName="Position:"
          name="position"
          value={formData.position}
          type="text"
          onChange={updateFormData}
          placeholder="Enter position/job title"
        />
        <InputField
          labelName="Preferred Job Board:"
          name="jobBoard"
          value={formData.jobBoard}
          type="text"
          onChange={updateFormData}
          placeholder="Enter job board"
        />
      </div>
    </div>
  );
}
