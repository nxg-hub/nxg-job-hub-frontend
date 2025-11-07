import { useState, useEffect, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  ArrowLeft,
  CircleCheckBig,
  CircleDotDashed,
  Circle,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import Logo from "@/static/images/splash.png";
import { useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { API_HOST_URL } from "@/utils/api/API_HOST";
import { useUserProfileUpdate } from "@/hooks/useAllUsers";
import { Separator } from "@/components/ui/separator";
import RenderStepOne from "@/components/Employer/CompleteForm/renderStepOne";
import RenderStepTwo from "@/components/Employer/CompleteForm/renderStepTwo";
import RenderStepThree from "@/components/Employer/CompleteForm/renderStepThree";
import RenderStepFour from "@/components/Employer/CompleteForm/renderStepFour";
import { useAutoLogin } from "@/hooks/useAutoLogin";
import { useCheckCompleteProfileFlag } from "@/hooks/useCheckCompleteProfileFlag";
import { Progress } from "@/components/ui/progress";
import { Form } from "@/components/ui/form";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMobile } from "@/hooks/use-mobile";
import {
  isValidPhoneNumber,
  parsePhoneNumberWithError,
} from "libphonenumber-js";

const vacancySchema = z.string().min(2, "Vacancy title is too short.");
const directorNameSchema = z.string().min(2, "Director name is too short.");

// Combined schema for the entire form
const formSchema = z.object({
  // Step 1: Company Profile
  companyName: z.string().min(2, "Company Name is required."),
  companyDescription: z
    .string()
    .min(50, "Description must be at least 50 characters."),
  industryType: z.string().min(1, "Industry type is required."),
  companySize: z.string().min(1, "Company size is required."),
  companyWebsite: z
    .string()
    .url("Must be a valid URL (e.g., https://example.com)")
    .or(z.literal("")),

  // Step 2: Location & Contact
  country: z.string().min(1, "Country is required."),
  state: z.string().min(1, "State is required."),
  companyAddress: z.string().min(10, "Company address is required."),
  companyZipCode: z
    .string()
    .regex(/^\d{5,9}$/, "Must be a valid Zip/Postal Code."),
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

  // Step 3: Key Personnel & Vacancies
  // position: z.string().min(2, "Your position at the company is required."),
  vacancies: z
    .array(vacancySchema)
    .min(1, "At least one vacancy must be listed."),
  namesOfDirectors: z
    .array(directorNameSchema)
    .min(1, "At least one director must be named."),

  // Step 4: Legal & Documents
  tin: z.string().min(5, "Tax Identification Number (TIN) is required."),
  taxClearanceCertificate: z
    .string()
    .min(1, "Tax Clearance Certificate document/file is required."),
  CACCertificate: z
    .string()
    .min(1, "CAC Certificate document/file is required."),
  companyMemorandum: z
    .string()
    .min(1, "Company Memorandum document/file is required."),
});

export function EmployerProfileCompleteForm() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const isMobile = useMobile();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      companyDescription: "",
      industryType: "",
      companySize: "",
      companyWebsite: "",
      country: "",
      state: "",
      companyAddress: "",
      companyZipCode: "",
      companyPhone: "",
      tin: "",
      taxClearanceCertificate: "",
      CACCertificate: "",
      companyMemorandum: "",
      companyLogo: "",
      position: "",
      nationality: "",
      address: "",
      zipCode: "",
      vacancies: [],
      namesOfDirectors: [],
    },
    mode: "onBlur",
  });

  //Check the local storage flag
  const {
    data: completeProfileFlag,
    isPending: isFlagPending,
    isFetched: isFlagFetched,
  } = useCheckCompleteProfileFlag();

  //Fetch user type from backend, ONLY if completeProfileFlag is true
  const {
    data: userData,
    isPending: isUserTypePending,
    isSuccess: isUserTypeSuccess,
    isError: isUserTypeError,
    isFetched: isUserTypeFetched,
    error: userTypeError,
  } = useAutoLogin({
    enabled: completeProfileFlag === true,
  });

  const storedToken = (function () {
    let key =
      localStorage.getItem("NXGJOBHUBLOGINKEYV1") ||
      sessionStorage.getItem("NXGJOBHUBLOGINKEYV1");
    try {
      const parsed = key ? JSON.parse(key) : null;
      return parsed?.token || parsed;
    } catch (e) {
      return null;
    }
  })();

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

      setTimeout(() => {
        navigate("/employer");
      }, 3000);
    },
    onError: (err) => {
      console.error("Upload error:", err);
      setFileUploadingDetails((prev) => ({
        ...prev,
        uploadingMessage: "(Failed to upload)",
        uploadStatus: fileUploadingStatus.FAILED,
      }));

      if (axios.isAxiosError(err)) {
        if (err.response) {
          toast({
            className: cn(
              "flex flex-col space-y-5 items-start bottom-10 right-4 flex fixed w-[360px] sm:max-w-[420px]"
            ),
            title: <span className="text-red-900">Server error:</span>,
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

  // Array of Step Components for dynamic rendering
  const StepComponents = [
    RenderStepOne,
    RenderStepTwo,
    RenderStepThree,
    RenderStepFour,
  ];

  const steps = useMemo(
    () => [
      {
        title: "Company Profile",
        description: "Basic information about your organization.",
        fields: [
          "companyName",
          "companyDescription",
          "industryType",
          "companySize",
        ],
      },
      {
        title: "Location & Contact",
        description: "Physical and contact details for official communication.",
        fields: [
          "country",
          "state",
          "companyAddress",
          "companyZipCode",
          "companyPhone",
        ],
      },
      {
        title: "Personnel & Open Roles",
        description: "Your role and the company's current job openings.",
        fields: ["vacancies", "namesOfDirectors"],
      },
      {
        title: "Legal & Documents",
        description:
          "Submission of necessary legal and registration documents.",
        fields: [
          "tin",
          "taxClearanceCertificate",
          "CACCertificate",
          "companyMemorandum",
        ],
      },
    ],
    []
  );

  const totalSteps = steps.length;
  const CurrentStepComponent = StepComponents[currentStep];

  // Handle next step
  const handleNext = async () => {
    const fieldsToValidate = steps[currentStep].fields;
    const isValid = await form.trigger(fieldsToValidate);

    if (isValid && currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else if (!isValid) {
      const errors = form.formState.errors;
      const firstInvalidField = fieldsToValidate.find((field) => errors[field]);
      if (firstInvalidField) {
        form.setFocus(firstInvalidField);
      }
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const isFieldFilled = (value) => {
    if (value === undefined || value === null) {
      return false;
    }

    if (Array.isArray(value)) {
      return value.length > 0;
    }

    if (typeof value === "string") {
      return value.trim().length > 0;
    }

    if (typeof value === "number") {
      return !Number.isNaN(value);
    }
    if (typeof value === "boolean") {
      return value === true;
    }

    return true;
  };

  const { control } = form;

  //check if all fields in a step are filled
  const stepField1 = useWatch({
    control,
    name: steps[0].fields,
  });

  const stepField2 = useWatch({
    control,
    name: steps[1].fields,
  });

  const stepField3 = useWatch({
    control,
    name: steps[2].fields,
  });

  const stepField4 = useWatch({
    control,
    name: steps[3].fields,
  });

  const isCompleteStep1 = useMemo(
    () => stepField1?.every((val) => isFieldFilled(val)),
    [stepField1]
  );

  const isCompleteStep2 = useMemo(
    () => stepField2?.every((val) => isFieldFilled(val)),
    [stepField2]
  );

  const isCompleteStep3 = useMemo(
    () => stepField3?.every((val) => isFieldFilled(val)),
    [stepField3]
  );

  const isCompleteStep4 = useMemo(
    () => stepField4?.every((val) => isFieldFilled(val)),
    [stepField4]
  );

  const completeStepValidation = [
    isCompleteStep1,
    isCompleteStep2,
    isCompleteStep3,
    isCompleteStep4,
  ];

  const onSubmit = async (values) => {
    console.log("--- FINAL SUBMISSION DATA ---");
    const payload = {
      companyName: values.companyName,
      companyDescription: values.companyDescription,
      companyAddress: values.companyAddress,
      companyPhone: values.companyPhone,
      companyWebsite: values.companyWebsite,
      country: values.country,
      companySize: values.companySize,
      industryType: values.industryType,
      state: values.state,
      companyZipCode: values.companyZipCode,
      vacancies: values.vacancies,
      namesOfDirectors: values.namesOfDirectors,
      taxClearanceCertificate: values.taxClearanceCertificate,
      CACCertificate: values.CACCertificate,
      companyMemorandum: values.companyMemorandum,
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
    <div>
      <nav className="flex justify-between items-center w-full bg-sky-600 p-4 fixed top-0 left-0 z-50 sm:static">
        <span
          onClick={handlePrevious}
          className="inline-flex sm:hidden text-white cursor-pointer"
        >
          <ArrowLeft /> Back
        </span>
        <div className="flex items-center gap-2">
          <img className="w-20 sm:w-14" src={Logo} alt="" />
          <div className="flex flex-col text-white -space-y-1.5">
            <span className="font-bold text-3xl">NXG</span>
            <span className="text-xs tracking-widest">JOB HUB</span>
          </div>
        </div>
      </nav>
      <div className="w-full flex items-center justify-center p-20 gap-10">
        <div className="w-2/6">
          <h1 className="mb-4 text-2xl font-semibold text-slate-800">
            Getting Started
          </h1>
          <p className="text-gray-400">
            Complete all steps to register your company and post job
            opportunities
          </p>
          <div className="flex flex-col gap-2">
            <Progress
              value={((currentStep + 1) / totalSteps) * 100}
              className="bg-gray-200 h-2 mt-2"
            />
            <div className="flex justify-between font-medium text-sm">
              <span>Profile Completion</span>
              <span>
                {currentStep + 1} of{" "}
                <span className="text-gray-500">{totalSteps}</span>
              </span>
            </div>
          </div>
          <div className="mt-10 ">
            <div className="flex flex-col gap-3">
              {steps.map((s, index) => (
                <div
                  key={index}
                  className={cn(
                    `${
                      currentStep >= index ? "text-primary" : "text-gray-500"
                    }`,
                    "flex gap-3"
                  )}
                >
                  {currentStep >= index && completeStepValidation[index] ? (
                    <CircleCheckBig className="h-5 w-5" />
                  ) : currentStep === index &&
                    !completeStepValidation[index] ? (
                    <Circle className="h-5 w-5" />
                  ) : (
                    <CircleDotDashed className="h-5 w-5 " />
                  )}
                  <span>{s.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Separator
          orientation="vertical"
          className="w-[1px] h-[500px] my-auto"
        />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/4 px-10">
            <CurrentStepComponent />
            <div className="flex mt-10">
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0 || isPending}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                {currentStep < totalSteps - 1 && (
                  <Button
                    className="bg-sky-500 border-none hover:bg-sky-600"
                    type="button"
                    onClick={handleNext}
                  >
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
              {currentStep === totalSteps - 1 && (
                <Button
                  className="border-transparent ml-auto"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? (
                    <div className="flex items-center space-x-1">
                      <Loader2 className="animate-spin" />
                      <span>Please wait</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <span> Submit</span>
                      <Check className="ml-2 h-4 w-4" />
                    </div>
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
      <Toaster />
    </div>
  );

  // Fallback: This should ideally not be reached if all conditions are handled.
  // If it is, it indicates an unexpected state, so redirect to login.
  console.warn("CP: Unexpected state reached in render. Redirecting to login.");
  navigate("/login", { replace: true });
  // return null;
}
