import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray } from "react-hook-form";
import { z } from "zod";

const yearsExperienceOptions = [
  { value: "1-2", label: "1-2 years" },
  { value: "3-5", label: "3-5 years" },
  { value: "6-10", label: "6-10 years" },
  { value: "11-15", label: "11-15 years" },
  { value: "15+", label: "15+ years" },
];

export default function RenderStepFour({ form }) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "achievements",
  });

  return (
    <div className="flex flex-col gap-3">
      <FormField
        control={form.control}
        name="experienceLevel"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Level of Experience</FormLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger className="font-normal">
                  <SelectValue placeholder="Select your level of experience" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {yearsExperienceOptions.map((option) => (
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

      <div className="space-y-4">
        {fields.map((field, index) => (
          <Card key={field.id} className="p-4 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between p-0 mb-4">
              <CardTitle className="text-lg font-semibold ">
                Achievement #{index + 1}
              </CardTitle>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => remove(index)}
                disabled={fields.length === 1}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </CardHeader>
            <CardContent className="p-0 space-y-3">
              <FormField
                control={form.control}
                name={`achievements.${index}.client`}
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Past Client/Company</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Acme Corp" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`achievements.${index}.jobRole`}
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Job Role</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Website Redesign" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`achievements.${index}.successStory`}
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Success Story</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Briefly describe your success on this project (e.g., Increased sales by 30%)."
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() =>
                  append({ client: "", jobRole: "", successStory: "" })
                }
              >
                <Plus className="h-4 w-4 mr-2" /> Add Another Achievement
              </Button>
              {form.formState.errors.achievements?.message && (
                <p className="text-sm font-medium text-red-500 mt-2">
                  {form.formState.errors.achievements.message}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
