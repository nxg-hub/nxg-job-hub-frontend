import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
export default function Jobs({ formData, updateFormData }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <div>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="vacancies">Number of Vacancies</Label>
          <Input
            id="vacancies"
            name="vacancies"
            value={formData.vacancies}
            onChange={handleInputChange}
            placeholder="e.g., 5"
            type="number"
            min="1"
          />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="position">Position *</Label>
            <Input
              id="position"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              placeholder="Enter position/job title"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="jobBoard">Preferred Job Board</Label>
            <Input
              id="jobBoard"
              name="jobBoard"
              value={formData.jobBoard}
              onChange={handleInputChange}
              placeholder="Enter position/job title"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}
