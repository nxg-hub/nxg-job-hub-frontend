import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";

const industryOptions = [
  { value: "technology", label: "Technology" },
  { value: "healthcare", label: "Healthcare" },
  { value: "finance", label: "Finance" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "retail", label: "Retail" },
  { value: "consulting", label: "Consulting" },
  { value: "other", label: "Other" },
];

const companySizeOptions = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "501-1000", label: "501-1000 employees" },
  { value: "1000+", label: "1000+ employees" },
];

const JOB_BOARD_STATUS = [
  "Yes, we have a job board",
  "No, we use external boards",
];

export default function RenderStepOne() {
  const { control } = useFormContext();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold text-xl text-slate-800">
          Company Profile
        </h1>
        <p className="text-sm text-gray-600">
          Basic information about your organization.
        </p>
      </div>
      <FormField
        control={control}
        name="companyName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-600">Company Name</FormLabel>
            <FormControl>
              <Input placeholder="e.g., Tech Solutions Inc." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="companyDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-600">Company Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Briefly describe your company's mission and services (Min 50 chars)."
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField
          control={control}
          name="industryType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-600">Industry Type</FormLabel>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="font-normal">
                    <SelectValue placeholder="Choose Industry" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {industryOptions.map((option) => (
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
          control={control}
          name="companySize"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-600">Company Size</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="font-normal">
                    <SelectValue placeholder="Choose Size" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {companySizeOptions.map((option) => (
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
      <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
        <FormField
          control={control}
          name="companyWebsite"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-600">Company Website</FormLabel>
              <FormControl>
                <Input placeholder="https://yourcompany.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={control}
          name="jobBoard"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-600">
                Do you have an internal job board?
              </FormLabel>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="font-normal">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {JOB_BOARD_STATUS.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        /> */}
      </div>
    </div>
  );
}
