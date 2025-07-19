import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEmployerData } from "@/store/employer/employerStore";

export default function ContactInfo() {
  const employer = useEmployerData((state) => state.employerData);
  const updateEmployerField = useEmployerData(
    (state) => state.updateEmployerField
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateEmployerField(name, value);
  };

  return (
    <div>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="companyAddress">Company Address</Label>
          <Textarea
            id="companyAddress"
            name="companyAddress"
            value={employer?.companyAddress || ""}
            onChange={handleInputChange}
            placeholder="Enter complete company address"
            className="min-h-[80px]"
          />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="companyPhone">Company Phone</Label>
            <Input
              id="companyPhone"
              name="companyPhone"
              value={employer?.companyPhone || ""}
              onChange={handleInputChange}
              placeholder="+1 (555) 123-4567"
              type="tel"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyWebsite">Company Website</Label>
            <Input
              id="companyWebsite"
              name="companyWebsite"
              value={employer?.companyWebsite || ""}
              onChange={handleInputChange}
              placeholder="https://www.company.com"
              type="url"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
