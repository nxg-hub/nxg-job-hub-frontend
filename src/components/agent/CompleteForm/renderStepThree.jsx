import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const jobTypeOptions = [
  { value: "full-time", label: "Full time" },
  { value: "part-time", label: "Part time" },
  { value: "contract", label: "Contract" },
  { value: "volunteer", label: "Volunteer" },
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

const preferredIndustryOptions = [
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

const industryTypeOptions = [
  { value: "FINTECH", label: "Financial Technology" },
  { value: "EDTECH", label: "Educational Technology" },
  { value: "PROPTECH", label: "Property Technology" },
  { value: "INSURTECH", label: "Insurance Technology" },
  { value: "WEALTHTECH", label: "Wealth Technology" },
  { value: "REGTECH", label: "Regulatory Technology" },
  { value: "LEGALTECH", label: "Legal Technology" },
  { value: "FEMTECH", label: "Female Technology" },
  { value: "FOODTECH", label: "Food Technology" },
  { value: "MEDTECH", label: "Medical Technology" },
  { value: "GREENTECH", label: "Green Technology" },
  { value: "HEALTHTECH", label: "Health Technology" },
  { value: "RETAILTECH", label: "Retail Technology" },
];

export default function RenderStepThree({ form }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="jobType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Job Type</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="font-normal">
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {jobTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="industryType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Industry Type</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="font-normal">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {industryTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="areaOfSpecialization"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Area of Specialization</FormLabel>
            <FormControl>
              <MultiSelector
                values={field.value}
                onValuesChange={field.onChange}
                loop
                className="w-full"
              >
                <MultiSelectorTrigger>
                  <MultiSelectorInput placeholder="Select your Specialization" />
                </MultiSelectorTrigger>
                <MultiSelectorContent>
                  <MultiSelectorList>
                    {specializationOptions.map((option) => (
                      <MultiSelectorItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </MultiSelectorItem>
                    ))}
                  </MultiSelectorList>
                </MultiSelectorContent>
              </MultiSelector>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="preferredIndustries"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preferred Industries</FormLabel>
            <FormControl>
              <MultiSelector
                values={field.value}
                onValuesChange={field.onChange}
                loop
                className="w-full"
              >
                <MultiSelectorTrigger>
                  <MultiSelectorInput placeholder="Select your oreferred industry" />
                </MultiSelectorTrigger>
                <MultiSelectorContent>
                  <MultiSelectorList>
                    {preferredIndustryOptions.map((option) => (
                      <MultiSelectorItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </MultiSelectorItem>
                    ))}
                  </MultiSelectorList>
                </MultiSelectorContent>
              </MultiSelector>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
