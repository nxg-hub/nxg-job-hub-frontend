import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const Jobs = () => {
  const tittleStyle = cn("text-gray-800 text-sm font-medium");
  const infoStyle = cn(
    "text-gray-400 text-sm rounded border-[1px] border-gray-200 p-2"
  );
  return (
    <div className="space-y-8">
      <div className="w-full flex items-center justify-evenly gap-7">
        <div className="w-1/2 space-y-3">
          <p className={tittleStyle}>Number of Vacancies:</p>
          <p className={infoStyle}>Adewaleking academy</p>
        </div>
        <div className="w-1/2 space-y-3">
          <p className={tittleStyle}>Preferred Job Board:</p>
          <p className={infoStyle}>Adewaleking</p>
        </div>
      </div>
    </div>
  );
};

const EditJobs = () => {
  return (
    <div>
      {/* <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Job Information
                  </CardTitle>
                  <CardDescription>
                    Job posting and recruitment details
                  </CardDescription>
                </CardHeader> */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
          <div className="space-y-2">
            <Label htmlFor="jobBoard">Preferred Job Board</Label>
            <Select
            // onValueChange={(value) => handleInputChange("jobBoard", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select job board" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="indeed">Indeed</SelectItem>
                <SelectItem value="glassdoor">Glassdoor</SelectItem>
                <SelectItem value="monster">Monster</SelectItem>
                <SelectItem value="jobvite">Jobvite</SelectItem>
                <SelectItem value="company-website">Company Website</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Jobs, EditJobs };
