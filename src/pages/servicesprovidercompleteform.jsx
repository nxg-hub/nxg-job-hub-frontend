import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ChevronLeft, ChevronRight, Check, SkipForward, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import Logo from "@/static/images/logo_colored.png";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

// Form schemas for each step
const skillsSchema = z.object({
  mainSkill: z.string({
    required_error: "Please select your main skill.",
  }),
  subSkills: z
    .array(z.string())
    .min(1, { message: "Please select at least one sub-skill." }),
});

const personalInfoSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
});

const addressSchema = z.object({
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  state: z.string().min(2, { message: "State must be at least 2 characters." }),
  zipCode: z
    .string()
    .min(5, { message: "Zip code must be at least 5 characters." }),
});

const preferencesSchema = z.object({
  preferredContact: z.enum(["email", "phone", "mail"], {
    required_error: "Please select a preferred contact method.",
  }),
  interests: z
    .array(z.string())
    .min(1, { message: "Please select at least one interest." }),
  additionalInfo: z.string().optional(),
});

// Combined schema for the entire form
const formSchema = z.object({
  ...skillsSchema.shape,
  ...personalInfoSchema.shape,
  ...addressSchema.shape,
  ...preferencesSchema.shape,
});

// Add skill options
const mainSkillOptions = [
  { value: "carpentry", label: "Carpentry" },
  { value: "plumbing", label: "Plumbing" },
  { value: "electrical", label: "Electrical" },
  { value: "painting", label: "Painting" },
  { value: "masonry", label: "Masonry" },
  { value: "welding", label: "Welding" },
];

const subSkillsOptions = {
  carpentry: [
    { id: "furniture", label: "Furniture Making" },
    { id: "cabinetry", label: "Cabinetry" },
    { id: "framing", label: "Framing" },
    { id: "finishing", label: "Finishing" },
  ],
  plumbing: [
    { id: "installation", label: "Installation" },
    { id: "repair", label: "Repair" },
    { id: "drainage", label: "Drainage Systems" },
    { id: "fixtures", label: "Fixtures" },
  ],
  electrical: [
    { id: "wiring", label: "Wiring" },
    { id: "lighting", label: "Lighting" },
    { id: "troubleshooting", label: "Troubleshooting" },
    { id: "panels", label: "Panel Installation" },
  ],
  painting: [
    { id: "interior", label: "Interior" },
    { id: "exterior", label: "Exterior" },
    { id: "decorative", label: "Decorative" },
    { id: "spray", label: "Spray Painting" },
  ],
  masonry: [
    { id: "brick", label: "Brick" },
    { id: "stone", label: "Stone" },
    { id: "concrete", label: "Concrete" },
    { id: "tiling", label: "Tiling" },
  ],
  welding: [
    { id: "mig", label: "MIG Welding" },
    { id: "tig", label: "TIG Welding" },
    { id: "arc", label: "Arc Welding" },
    { id: "fabrication", label: "Metal Fabrication" },
  ],
};

export function ServiceProviderFormCompletion() {
  const [step, setStep] = React.useState(1);
  const totalSteps = 5; // Now we have 5 steps
  const [selectedMainSkill, setSelectedMainSkill] = React.useState(undefined);
  const navigate = useNavigate();

  // Initialize form with default values
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mainSkill: "",
      subSkills: [],
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      preferredContact: "email",
      interests: [],
      additionalInfo: "",
    },
    mode: "onChange",
  });

  // Watch for main skill changes to update sub-skills options
  React.useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "mainSkill") {
        setSelectedMainSkill(value.mainSkill);
        // Reset sub-skills when main skill changes
        form.setValue("subSkills", []);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Get current schema based on step
  const getCurrentSchema = () => {
    switch (step) {
      case 1:
        return skillsSchema;
      case 2:
        return personalInfoSchema;
      case 3:
        return addressSchema;
      case 4:
        return preferencesSchema;
      default:
        return formSchema;
    }
  };

  // Handle next step
  const handleNext = async () => {
    const currentSchema = getCurrentSchema();

    // Get only the fields for the current step
    const fieldsToValidate = Object.keys(currentSchema.shape);

    // Validate only the current step fields
    const result = await form.trigger(fieldsToValidate);

    if (result) {
      setStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // Handle skipping the form
  const handleSkip = () => {
    toast({
      className: cn(
        "flex flex-col space-y-5 items-start top-10 right-4 flex fixed max-w-[400px] md:max-w-[420px]"
      ),
      title: "Registration process skipped!",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-red-700 p-4">
          <code className="text-white">
            Are you sure you want to skip the <br />
            registration process?
          </code>
        </pre>
      ),
      action: (
        <ToastAction
          onClick={() => {
            // Handle skip action here, e.g., navigate to another page or show a message
            navigate("/services-provider");
          }}
          altText="Skip action"
          className="border-none bg-red-500 hover:bg-red-700">
          Skip
        </ToastAction>
      ),
    });
  };

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    // Here you would typically send the data to your server
    alert("Form submitted successfully!");
  };

  return (
    <div>
      <nav className="flex justify-between items-center w-full bg-sky-600 p-4 mb-16">
        <img
          className="w-20 sm:w-24"
          src={Logo}
          alt=""
        />
        <Link
          className="self-end sm:hidden text-white sm:mr-5 sm:mt-5"
          to="/login"
          title="Close">
          {" "}
          <X />{" "}
        </Link>
      </nav>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Form Completion</CardTitle>
          <CardDescription>
            Please complete all steps to register as an artisan. Step {step} of{" "}
            {totalSteps}
          </CardDescription>
          <Progress
            value={(step / totalSteps) * 100}
            className="bg-sky-500 h-2 mt-2"
          />
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              {step === 1 && (
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="mainSkill"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Main Skill</FormLabel>
                        <FormDescription>
                          Select your primary area of expertise
                        </FormDescription>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => {
                              field.onChange(value);
                              setSelectedMainSkill(value);
                            }}
                            value={field.value}
                            className="grid grid-cols-2 gap-4">
                            {mainSkillOptions.map((option) => (
                              <FormItem
                                key={option.value}
                                className="flex items-center space-x-3 space-y-0 rounded-md border p-4 hover:bg-muted/50 hover:cursor-pointer">
                                <FormControl>
                                  <RadioGroupItem
                                    className="p-0 hover:cursor-pointer"
                                    value={option.value}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  {option.label}
                                </FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {selectedMainSkill && (
                    <FormField
                      control={form.control}
                      name="subSkills"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel className="text-base">
                              Sub-Skills
                            </FormLabel>
                            <FormDescription>
                              Select the specific areas you are skilled in.
                            </FormDescription>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {subSkillsOptions[selectedMainSkill]?.map(
                              (item) => (
                                <FormField
                                  key={item.id}
                                  control={form.control}
                                  name="subSkills"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={item.id}
                                        className="flex flex-row items-start space-x-3 space-y-0">
                                        <FormControl>
                                          <Checkbox
                                            className="p-0"
                                            checked={field.value?.includes(
                                              item.id
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...field.value,
                                                    item.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== item.id
                                                    )
                                                  );
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                          {item.label}
                                        </FormLabel>
                                      </FormItem>
                                    );
                                  }}
                                />
                              )
                            )}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Doe"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="john.doe@example.com"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="123 Main St"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="New York"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="NY"
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
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zip Code</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="10001"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="preferredContact"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Preferred Contact Method</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1">
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem
                                  className="p-0"
                                  value="email"
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Email
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem
                                  className="p-0"
                                  value="phone"
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Phone
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem
                                  className="p-0"
                                  value="mail"
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Mail
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="additionalInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Information</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us anything else you'd like us to know"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 5 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    Review Your Information
                  </h3>
                  <div className="rounded-md border p-4 space-y-4">
                    <div>
                      <h4 className="font-medium text-sm">Skills</h4>
                      <p>
                        Main Skill:{" "}
                        {
                          mainSkillOptions.find(
                            (skill) =>
                              skill.value === form.getValues("mainSkill")
                          )?.label
                        }
                      </p>
                      <p>
                        Sub-Skills:{" "}
                        {form
                          .getValues("subSkills")
                          .map((skill) => {
                            const mainSkill = form.getValues("mainSkill");
                            const subSkillLabel = subSkillsOptions[
                              mainSkill
                            ]?.find((s) => s.id === skill)?.label;
                            return subSkillLabel;
                          })
                          .join(", ")}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-sm">
                          Personal Information
                        </h4>
                        <p>
                          Name: {form.getValues("firstName")}{" "}
                          {form.getValues("lastName")}
                        </p>
                        <p>Email: {form.getValues("email")}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Address</h4>
                        <p>{form.getValues("address")}</p>
                        <p>
                          {form.getValues("city")}, {form.getValues("state")}{" "}
                          {form.getValues("zipCode")}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Preferences</h4>
                      <p>
                        Preferred Contact: {form.getValues("preferredContact")}
                      </p>
                      <p>Interests: {form.getValues("interests").join(", ")}</p>
                      {form.getValues("additionalInfo") && (
                        <div>
                          <h4 className="font-medium text-sm mt-2">
                            Additional Information
                          </h4>
                          <p>{form.getValues("additionalInfo")}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={step === 1}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                {step < totalSteps && (
                  <Button
                    className="bg-sky-500 border-none hover:bg-sky-600"
                    type="button"
                    onClick={handleNext}>
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
              {step === totalSteps ? (
                <Button type="submit">
                  Submit <Check className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  className="border-none bg-red-600 text-gray-50 hover:bg-red-700"
                  type="button"
                  variant="secondary"
                  onClick={handleSkip}>
                  Skip <SkipForward className="ml-2 h-4 w-4" />
                </Button>
              )}
            </CardFooter>
          </form>
        </Form>
      </Card>
      <Toaster />
    </div>
  );
}
