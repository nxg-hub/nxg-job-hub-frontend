import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { useEmployerData } from "@/store/employer/employerStore";
import {
  InputField,
  SelectionField,
  TextareaField,
} from "@/components/formFields";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  Globe,
  Loader2,
  Mail,
  PencilLine,
  Phone,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useUserProfileUpdate } from "@/hooks/useAllUsers";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { API_HOST_URL } from "@/utils/api/API_HOST";
import { Toaster } from "@/components/ui/toaster";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  isValidPhoneNumber,
  parsePhoneNumberWithError,
} from "libphonenumber-js";

const industryOptions = [
  { value: "technology", label: "Technology" },
  { value: "healthcare", label: "Healthcare" },
  { value: "finance", label: "Finance" },
  { value: "retail", label: "Retail" },
  { value: "consulting", label: "Consulting" },
  { value: "manufacturing", label: "Manufacturing" },
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

export default function EmployerCompanyInfoCard({
  industryType,
  companySize,
  vacancies,
  position,
  jobBoard,
  namesOfDirectors,
  companyPhone,
  companyEmail,
  companyWebsite,
}) {
  const [activeTab, setActiveTab] = useState(1);

  return (
    // <div className="flex flex-col p-2 bg-white md:shadow md:rounded-md">
    <div className="flex flex-col p-2 pt-10">
      <div className="w-full flex">
        <div className="grid-cols-2 grid md:grid-cols-4 gap-2 mb-5">
          <Button
            className={cn(
              `${
                activeTab === 1
                  ? "bg-primary text-white border-transparent"
                  : "bg-white border border-gray-300 text-gray-800 hover:bg-slate-50 hover:text-gray-800"
              }`,
              ""
            )}
            onClick={() => setActiveTab(1)}>
            Company details
          </Button>
          <Button
            className={cn(
              `${
                activeTab === 2
                  ? "bg-primary text-white border-transparent"
                  : "bg-white border border-gray-300 text-gray-800 hover:bg-slate-50 hover:text-gray-800"
              }`,
              ""
            )}
            onClick={() => setActiveTab(2)}>
            Vacancies
          </Button>
        </div>
        <div className="ml-auto">
          <EditComapnyInfoCard
            industryType={industryType}
            companySize={companySize}
            vacancies={vacancies}
            position={position}
            jobBoard={jobBoard}
            namesOfDirectors={namesOfDirectors}
            companyPhone={companyPhone}
            companyWebsite={companyWebsite}
          />
        </div>
      </div>
      <Separator />
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-start md:items-center"></div>
      <div>
        {activeTab === 1 && (
          <div className="space-y-5">
            <div className="bg-white rounded-md p-5  md:shadow space-y-5">
              <h2 className="font-bold">Contact info.</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex gap-2 items-center">
                  <div className="flex items-center gap-2">
                    <Phone className="font-light h-5 w-5 text-gray-400" />
                    <span className="text-gray-400 text-sm">Phone:</span>
                  </div>
                  <span className=" text-gray-500 text-sm">{companyPhone}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="flex items-center gap-2">
                    <Mail className="font-light h-5 w-5 text-gray-400" />
                    <span className="text-gray-400 text-sm">Email:</span>
                  </div>
                  <span className="line-clamp-1 text-gray-500 text-sm">
                    {companyEmail}
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="flex items-center gap-2">
                    <Globe className="font-light h-5 w-5 text-gray-400" />
                    <span className="text-gray-400 text-sm">Website:</span>
                  </div>
                  <span className="line-clamp-1 text-gray-500 text-sm">
                    {companyWebsite}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-10 bg-white md:shadow md:rounded-md space-y-5">
              <div className="space-y-4">
                <h2 className="font-bold">Industry type</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 place-content-center gap-4 px-8 ">
                  {industryOptions.map((opt, index) => (
                    <Badge
                      key={index}
                      className={cn(
                        `${
                          opt.value === industryType
                            ? "bg-primary text-white "
                            : "bg-transparent text-gray-400 border border-gray-300 hover:bg-transparent hover:text-gray-400"
                        }`,
                        "w-fit text-sm p-2 font-light "
                      )}>
                      {opt.label}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="font-bold">Company size</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 place-content-center gap-4 px-8 ">
                  {companySizeOptions.map((opt, index) => (
                    <Badge
                      key={index}
                      className={cn(
                        `${
                          opt.value === companySize
                            ? "bg-primary text-white "
                            : "bg-transparent text-gray-400 border border-gray-300 hover:bg-transparent hover:text-gray-400"
                        }`,
                        "w-fit p-2 font-light "
                      )}>
                      {opt.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 2 && (
          <div className="w-full flex flex-col gap-8">
            <div className="flex flex-col bg-white rounded-md p-5 md:flex  md:shadow gap-5">
              <h2 className="font-bold">Available vacancies</h2>

              {vacancies?.length > 0 ? (
                <div className="grid grid-cols-2 place-content-center gap-2 ">
                  {vacancies?.map((vacancy, index) => (
                    <Badge key={index} className="w-fit p-2 font-light">
                      {vacancy}
                    </Badge>
                  ))}
                </div>
              ) : (
                <div className="border-[1px] p-8 rounded text-center text-sm text-gray-400 italic">
                  No Vacancy added yet
                </div>
              )}
            </div>
            <div className="flex flex-col bg-white rounded-md p-5 md:flex  md:shadow gap-5">
              <h2 className="font-bold">Name of Director's</h2>
              {namesOfDirectors.length > 0 ? (
                <div className="grid grid-cols-2 place-content-center gap-8">
                  {namesOfDirectors.map((director, index) => (
                    <div className="space-y-2" key={index}>
                      <Label className="text-gray-500">Name</Label>
                      <Input value={director} disabled />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border-[1px] p-8 rounded text-center text-sm text-gray-400 italic">
                  No Director's added yet
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
}

const EditComapnyInfoCard = ({
  industryType,
  companySize,
  companyPhone,
  companyWebsite,
  vacancies,
  namesOfDirectors,
}) => {
  const vacancySchema = z.string().min(2, "Vacancy title is too short.");
  const directorNameSchema = z.string().min(2, "Director name is too short.");

  const formSchema = z.object({
    industryType: z.string().min(1, "Industry type is required."),
    companySize: z.string().min(1, "Company size is required."),
    companyWebsite: z
      .string()
      .url("Must be a valid URL (e.g., https://example.com)")
      .or(z.literal("")),
    companyPhone: z
      .string()
      .refine((val) => isValidPhoneNumber(val), {
        message: "Invalid phone number",
      })
      .transform((value, ctx) => {
        const phone_num = parsePhoneNumberWithError(value, {
          defaultCountry: "NG",
        });
        if (!phone_num?.isValid()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Invalid phone number",
          });
          return z.NEVER;
        }
        return phone_num.formatInternational();
      }),
    vacancies: z
      .array(vacancySchema)
      .min(1, "At least one vacancy must be listed."),
    namesOfDirectors: z
      .array(directorNameSchema)
      .min(1, "At least one director must be named."),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      industryType: industryType || "",
      companySize: companySize || "",
      companyPhone: companyPhone.replace(/\s+/g, "") || null,
      companyWebsite: companyWebsite || "",
      vacancies: vacancies || [],
      namesOfDirectors: namesOfDirectors || [],
    },
    mode: "onChange",
  });

  const { reset } = form;
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    reset({
      industryType: industryType,
      companySize: companySize,
      companyPhone: companyPhone.replace(/\s+/g, ""),
      companyWebsite: companyWebsite,
      vacancies: vacancies,
      namesOfDirectors: namesOfDirectors,
    });
  }, [
    industryType,
    companySize,
    vacancies,
    namesOfDirectors,
    companyPhone,
    companyWebsite,
    reset,
  ]);

  const handleOpenChange = (newOpenState) => {
    setOpen(newOpenState);

    // If the dialog is CLOSING (newOpenState is false)
    if (!newOpenState) {
      // Reset the form to the LAST SAVED (prop) values
      reset({
        industryType: industryType,
        companySize: companySize,
        companyPhone: companyPhone.replace(/\s+/g, ""),
        companyWebsite: companyWebsite,
        vacancies: vacancies,
        namesOfDirectors: namesOfDirectors,
      });
    }
  };

  const {
    fields: directorFields,
    append: appendDirector,
    remove: removeDirector,
  } = useFieldArray({
    control: form.control,
    name: "namesOfDirectors",
  });

  const {
    fields: vacancyFields,
    append: appendVacancy,
    remove: removeVacancy,
  } = useFieldArray({
    control: form.control,
    name: "vacancies",
  });

  const { mutate: updateEmployerProfile, isPending } = useUserProfileUpdate({
    onSuccess: (data) => {
      console.log(data);
      toast({
        className: cn(
          "bottom-10 right-4 flex fixed max-w-[400px] md:max-w-[420px]"
        ),
        title: "Profile setup completed",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-green-700 p-4">
            <p className="text-white">
              You have successfully setup your profile
            </p>
          </pre>
        ),
        duration: 2500,
      });
      queryClient.invalidateQueries({ queryKey: ["userData"] });
      setOpen(false);
    },
    onError: (err) => {
      console.error("Updating profile error:", err);
      if (axios.isAxiosError(err)) {
        if (err.response) {
          toast({
            className: cn(
              "flex flex-col space-y-5 items-start bottom-10 right-4 flex fixed w-[360px] sm:max-w-[420px]"
            ),
            title: <span className="text-red-900">Error:</span>,
            description: (
              <p className="text-gray-800 rounded-md bg-red-100 p-4 font-mono">
                {err.response.data}
              </p>
            ),
          });
        } else if (err.request) {
          toast({
            className: cn(
              "flex flex-col space-y-5 items-start bottom-10 right-4 flex fixed w-[360px] sm:max-w-[420px]"
            ),
            title: <span className="text-red-900">Network error:</span>,
            description: (
              <p className="text-gray-800 rounded-md bg-red-100 p-4 font-mono">
                Profile setup failed, please check your internet connection.
              </p>
            ),
          });
        }
      } else {
        toast({
          className: cn(
            "flex flex-col space-y-5 items-start bottom-10 right-4 flex fixed w-[360px] sm:max-w-[420px]"
          ),
          title: <span className="text-red-900">Failed:</span>,
          description: (
            <p className="text-gray-800 rounded-md bg-red-100 p-4 font-mono">
              Profile setup failed, please try again.
            </p>
          ),
        });
      }
    },
  });

  const handleEditProfile = async (values) => {
    console.log("--- FINAL SUBMISSION DATA ---");
    const payload = {
      companySize: values.companySize,
      industryType: values.industryType,
      companyPhone: values.companyPhone,
      companyWebsite: values.companyWebsite,
      vacancies: values.vacancies,
      namesOfDirectors: values.namesOfDirectors,
    };
    console.log(payload);

    const storeValueObj =
      localStorage.getItem("NXGJOBHUBLOGINKEYV1") ||
      sessionStorage.getItem("NXGJOBHUBLOGINKEYV1");

    const userId = storeValueObj ? JSON.parse(storeValueObj).id : null;

    updateEmployerProfile({
      url: `${API_HOST_URL}/api/employers/${userId}`,
      payload: payload,
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        className="border-[1px] border-gray-400 text-secondary hover:border-transparent hover:bg-primary hover:text-white"
        asChild // Add asChild for correct button styling
      >
        <Button variant="outline">
          Edit
          <PencilLine className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <Form {...form}>
          <form className="space-y-8 max-w-3xl py-10">
            <DialogHeader>
              <DialogTitle>Edit Profile </DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="companyPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-400">
                      Company Phone
                    </FormLabel>
                    <FormControl className="w-full">
                      <PhoneInput
                        placeholder="+1 555 123 4567"
                        {...field}
                        defaultCountry="NG"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyWebsite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-400">
                      Company Website
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="https://yourcompany.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="industryType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600">
                      Industry Type
                    </FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}>
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
                control={form.control}
                name="companySize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600">
                      Company Size
                    </FormLabel>
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
            <div>
              <h3 className="text-base font-medium border-t pb-1 pt-4">
                Current Vacancies
              </h3>
              <div className="space-y-3">
                {vacancyFields.map((field, index) => (
                  <div key={field.id} className="flex space-x-2 items-start">
                    <FormField
                      control={form.control}
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
                      disabled={vacancyFields.length === 1}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => appendVacancy("")}>
                  <Plus className="h-4 w-4 mr-2" /> Add Vacancy
                </Button>
              </div>
            </div>
            <div>
              <h3 className="text-base font-medium border-t pb-1 pt-4">
                Names of Directors
              </h3>
              <div className="space-y-3">
                {directorFields.map((field, index) => (
                  <div key={field.id} className="flex space-x-2 items-start">
                    <FormField
                      control={form.control}
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
                      disabled={directorFields.length === 1}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => appendDirector("")}>
                  <Plus className="h-4 w-4 mr-2" /> Add Director
                </Button>
              </div>
            </div>

            <DialogFooter className="flex justify-end gap-2">
              <Button
                type="button"
                className="border-none bg-sky-500 hover:bg-sky-600"
                onClick={form.handleSubmit(handleEditProfile)}
                disabled={isPending}>
                {isPending ? (
                  <div className="flex items-center space-x-1">
                    <Loader2 className="animate-spin" />
                    <span>Please wait</span>
                  </div>
                ) : (
                  <span>Update Profile</span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
        <Toaster />
      </DialogContent>
    </Dialog>
  );
};
