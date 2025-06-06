import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function Jobs() {
  return (
    <div>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="vacancies">Number of Vacancies</Label>
          <Input
            id="vacancies"
            // value={formData.vacancies}
            // onChange={(e) => handleInputChange("vacancies", e.target.value)}
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
              // value={formData.position}
              // onChange={(e) => handleInputChange("position", e.target.value)}
              placeholder="Enter position/job title"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="position">Preferred Job Board</Label>
            <Input
              id="position"
              // value={formData.position}
              // onChange={(e) => handleInputChange("position", e.target.value)}
              placeholder="Enter position/job title"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}
