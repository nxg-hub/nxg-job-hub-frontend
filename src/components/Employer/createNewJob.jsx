import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Plus, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "../ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DatePicker } from "../ui/date-picker";
import { Badge } from "../ui/badge";
import { usePostJob } from "@/hooks/useJobs";
import { toast } from "@/hooks/use-toast";
import { cn, getStoredKey } from "@/lib/utils";
import { nigerianStates } from "@/utils/data/location";
import { isAfter, startOfDay } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  title: z.string().min(1, "Job title required"),
  description: z.string().min(1, "Job description is required"),
  location: z.string().min(1, "Select job location"),
  jobType: z.string().min(1, "Select job type"),
  salary: z.string().min(1, "Salary is required"),
  deadline: z
    .date({ required_error: "Deadline is requied" })
    .refine((d) => d >= startOfDay(new Date()), {
      message: "Deadline must be in the future",
    }),
  requirements: z.array(z.string().min(1, "Job requirement cannot be empty")),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
});

export default function CreateNewJob({
  companyBio,
  companyName,
  country,
  industryType,
  companySize,
  employerID,
  companyLogo,
  isOpenDialog,
  openDialog,
  closeDialog,
}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: uploadJob, isLoading } = usePostJob();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      jobType: "",
      salary: "",
      deadline: new Date(),
      requirements: [""],
      tags: [],
    },
    mode: "onChange",
  });

  const requirementsArray = useFieldArray({
    control: form.control,
    name: "requirements",
  });

  const combineRequirements = (requirements) => {
    if (!Array.isArray(requirements)) {
      return "";
    }
    return requirements.join("\n");
  };

  const handlePreview = (formData) => {
    const preview = {
      companyName: companyName,
      country: country,
      title: formData.title,
      description: formData.description,
      companyBio: companyBio,
      salary: formData.salary,
      job_location: formData.location,
      job_type: formData.jobType,
      deadline: formData.deadline.toDateString(),
      requirements: formData.requirements,
      tags: formData.tags,
      industryType: industryType,
      companySize: companySize,
      employerID: employerID,
    };
    sessionStorage.setItem("jobPreview", JSON.stringify(preview));
    window.open("/job/preview", "_blank");
  };

  const handlePostJob = async (formData) => {
    const storedJwtToken = getStoredKey();
    //Create new job object
    const payload = {
      job_title: formData.title,
      job_description: formData.description,
      company_bio: companyBio,
      salary: formData.salary,
      job_location: formData.location,
      job_type: formData.jobType,
      deadline: new Intl.DateTimeFormat("en-CA").format(formData.deadline),
      requirements: combineRequirements(formData.requirements),
      tags: formData.tags,
      employer_profile_pic: companyLogo,
      employer_name: companyName,
      employerID: employerID,
    };

    if (storedJwtToken) {
      uploadJob(
        { payload, storedJwtToken },
        {
          onSuccess: (data) => {
            console.log(data);
            toast({
              className: cn(
                "bottom-10 right-4 flex fixed max-w-[400px] md:max-w-[420px]"
              ),
              title: "Job Post",
              description: (
                <pre className="mt-2 w-[340px] rounded-md bg-green-700 p-4">
                  <p className="text-white">
                    Your job have been posted successfully
                  </p>
                </pre>
              ),
            });
            queryClient.invalidateQueries({ queryKey: ["employerJobs"] });
            queryClient.invalidateQueries({ queryKey: ["jobsEngagements"] });
            form.reset();
            closeDialog();
          },
          onError: (err) => {
            console.error("Job posting failed", err);
            toast({
              className: cn(
                "flex flex-col space-y-5 items-start top-10 right-4 flex fixed max-w-[400px] md:max-w-[420px]"
              ),
              title: <span className="text-red-900">Failed:</span>,
              description: (
                <p className="text-gray-800 rounded-md bg-red-100 p-4 font-mono">
                  Form unable to submit, failed to update your profile
                </p>
              ),
            });
            //   if (!err.response) {
            //   toast({
            //     className: cn(
            //       "flex flex-col gap-5 top-10 right-4 fixed max-w-[400px] md:max-w-[420px]"
            //     ),
            //     title: <p className="text-red-900">Network error:</p>,
            //     description: (
            //       <p className="text-gray-800 rounded-md bg-red-100 p-4 font-mono">
            //         Failed to submit form, please check your internet connection.
            //       </p>
            //     ),
            //     action: (
            //       <ToastAction
            //         // onClick={handlePostJob}
            //         className="bg-primary text-white   hover:bg-sky-700 hover:text-white self-start border-transparent"
            //         altText="Try again"
            //       >
            //         Try again
            //       </ToastAction>
            //     ),
            //   });
            // }
          },
        }
      );
    } else {
      console.log("Login is required");
      navigate("/login", { replace: true });
    }
  };

  return (
    <Dialog
      open={isOpenDialog}
      onOpenChange={(isOpenDialog) => !isOpenDialog && closeDialog()}
    >
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <Form {...form}>
          <form className="space-y-8 max-w-3xl py-10">
            <DialogHeader>
              <DialogTitle>Create New Job</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>

            <div className="space-y-7 ">
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Senior Frontend Developer"
                          type=""
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="jobType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Type</FormLabel>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select job type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="full-time">Full time</SelectItem>
                          <SelectItem value="part-time">Part time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="e.g Lagos or Abuja" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {nigerianStates.map((state) => (
                            <SelectItem key={state.value} value={state.value}>
                              {state.label}
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
                  name="salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salary Range</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. #200,000 - #820,000"
                          type=""
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Application Deadline</FormLabel>
                    <FormControl>
                      <DatePicker
                        date={field.value}
                        setDate={field.onChange}
                        placeholder="Choose your date"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
                        className="resize-none maxn-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {form.formState.errors.requirements && (
                      <p className="text-sm font-medium text-red-500">
                        {form.formState.errors.requirements?.[0]?.message?.toString()}
                      </p>
                    )}
                    {requirementsArray.fields.map((field, index) => (
                      <FormField
                        key={field.id}
                        control={form.control}
                        name={`requirements.${index}`}
                        render={({ field }) => (
                          <FormItem className="flex flex-col gap-2">
                            <div className="flex justify-center gap-2">
                              <FormControl>
                                <Input
                                  placeholder={`Requirement ${index + 1}`}
                                  type=""
                                  {...field}
                                />
                              </FormControl>
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => requirementsArray.remove(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => requirementsArray.append("")}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Requirement
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tags</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {form.formState.errors.tags && (
                    <p className="text-sm font-medium text-red-500">
                      {form.formState.errors.tags.message?.toString()}
                    </p>
                  )}
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <TagsInput
                            tags={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
            <DialogFooter className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={form.handleSubmit(handlePreview)}
              >
                Preview
              </Button>

              <Button
                type="button"
                className="border-none bg-sky-500 hover:bg-sky-600"
                onClick={form.handleSubmit(handlePostJob)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-1">
                    <Loader2 className="animate-spin" />
                    <span>Please wait</span>
                  </div>
                ) : (
                  <span>Post Job</span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

const TagsInput = ({ tags, onChange }) => {
  const [tag, setTag] = useState("");

  const addTag = () => {
    if (tag.trim() !== "" && !tags.includes(tag.trim())) {
      onChange([...tags, tag.trim()]);
      setTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    onChange(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <Input
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Add a skill or tag"
          onKeyPress={(e) =>
            e.key === "Enter" && (e.preventDefault(), addTag())
          }
        />
        <Button
          className="border-transparent bg-secondary"
          type="button"
          onClick={addTag}
        >
          Add
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <Badge
            key={index}
            className="px-3 py-1 text-sm flex items-center gap-2"
          >
            {tag}
            <Button
              type="button"
              size="sm"
              className="border-transparent h-4 w-4 p-0 hover:bg-transparent"
              onClick={() => removeTag(tag)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  );
};
