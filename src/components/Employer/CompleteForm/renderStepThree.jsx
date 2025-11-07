import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function RenderStepThree() {
  const form = useFormContext();
  const { control } = form;

  const {
    fields: vacancyFields,
    append: appendVacancy,
    remove: removeVacancy,
  } = useFieldArray({
    control,
    name: "vacancies",
  });

  const {
    fields: directorFields,
    append: appendDirector,
    remove: removeDirector,
  } = useFieldArray({
    control,
    name: "namesOfDirectors",
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold text-xl text-slate-800">
          Personnel & Open Roles
        </h1>
        <p className="text-sm text-gray-600">
          Your role and the company's current job openings.
        </p>
      </div>
      <h3 className="text-base font-medium border-t pb-1 pt-4">
        Names of Directors
      </h3>
      <div className="space-y-3">
        {directorFields.map((field, index) => (
          <div key={field.id} className="flex space-x-2 items-start">
            <FormField
              control={control}
              name={`namesOfDirectors.${index}`}
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormControl>
                    <Input
                      placeholder={`Director Name ${index + 1}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="border-transparent"
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => removeDirector(index)}
              disabled={directorFields.length === 1}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => appendDirector("")}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Director
        </Button>
      </div>

      <h3 className="text-base font-medium border-t pb-1 pt-4">
        Current Vacancies
      </h3>
      <div className="space-y-3">
        {vacancyFields.map((field, index) => (
          <div key={field.id} className="flex space-x-2 items-start">
            <FormField
              control={control}
              name={`vacancies.${index}`}
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormControl>
                    <Input
                      placeholder={`Vacancy Title ${index + 1}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="border-transparent"
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => removeVacancy(index)}
              disabled={vacancyFields.length === 1}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => appendVacancy("")}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Vacancy
        </Button>
      </div>

      {(form.formState.errors.vacancies ||
        form.formState.errors.namesOfDirectors) && (
        <div className="text-red-500 text-sm mt-4 p-2 border border-red-300 bg-red-50 rounded-lg">
          <p>{form.formState.errors.vacancies?.message}</p>
          <p>{form.formState.errors.namesOfDirectors?.message}</p>
        </div>
      )}
    </div>
  );
}
