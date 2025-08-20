import { Separator } from "@/components/ui/separator";
import { useEmployerData } from "@/store/employer/employerStore";
import { InputField, VacancyField } from "@/components/formFields";

export default function EmployerProfileJobsTabCard({
  vacancies,
  position,
  jobBoard,
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
        <p className="font-medium text-sky-600"> Job Information</p>
        <Separator />
      </div> */}
      <div className="space-y-6">
        <VacancyField
          labelName="Vacancies"
          name="vacancies"
          value={vacancies || ""}
          onChange={handleInputChange}
          placeholder="Enter available vacancy"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <InputField
            labelName="Position:"
            name="position"
            value={position || ""}
            type="text"
            onChange={handleInputChange}
            placeholder="Enter position/job title"
          />
          <InputField
            labelName="Preferred Job Board:"
            name="jobBoard"
            value={jobBoard || ""}
            type="text"
            onChange={handleInputChange}
            placeholder="Enter job board"
          />
        </div>
      </div>
    </div>
  );
}
