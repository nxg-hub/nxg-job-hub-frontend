import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  PackagePlus,
  MapPin,
  UserCog,
  BriefcaseBusiness,
  CircleDashed,
  Circle,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Check,
  SkipForward,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Toaster } from "@/components/ui/toaster";
import { useCheckCompleteProfileFlag } from "@/hooks/useCheckCompleteProfileFlag";
import { useAutoLogin } from "@/hooks/useAutoLogin";
import { useUserProfileUpdate } from "@/hooks/useUserProfileUpdate";
import { toast } from "@/hooks/use-toast";
import Logo from "@/static/images/logo_colored.png";
import RenderStepOne from "@/components/agent/CompleteForm/renderStepOne";
import RenderStepTwo from "@/components/agent/CompleteForm/renderStepTwo";
import RenderStepThree from "@/components/agent/CompleteForm/renderStepThree";
import RenderStepFour from "@/components/agent/CompleteForm/renderStepFour";
import { API_HOST_URL } from "@/utils/api/API_HOST";
import axios from "axios";
import {
  isValidPhoneNumber,
  parsePhoneNumberWithError,
} from "libphonenumber-js";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Form } from "@/components/ui/form";

// Form schemas for each step
const agentInfoSchema = z.object({
  agencyName: z.string({
    required_error: "Provide your agency name.",
  }),
  agencySize: z.string({
    required_error: "Agency size missing.",
  }),
  agencyAddress: z
    .string()
    .min(5, { message: "Address must be at least 5 characters." }),
  agencyPhoneNumber: z
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
  agencyEmail: z.string().email(),
  agencyWebsite: z.preprocess((val) => {
    if (typeof val === "string") {
      if (/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(val)) return val;
      return `https://${val}`;
    }
    return val;
  }, z.string().url()),
  bio: z.string(),
});

const locationSchema = z.object({
  //Location details
  country: z.string({
    required_error: "Select your agency country.",
  }),
  state: z.string({
    required_error: "Select your agency state.",
  }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  zipCode: z
    .string()
    .min(5, { message: "Zip code must be at least 5 characters." }),
});

const professionalDetailsSchema = z.object({
  //Professional Details
  jobType: z.string({
    required_error: "Select your agency job type.",
  }),
  industryType: z.string({
    required_error: "Select your agency industry type.",
  }),
  preferredIndustries: z
    .array(z.string())
    .min(1, { message: "Please select at least one preferred industry." }),
  areaOfSpecialization: z
    .array(z.string())
    .min(1, { message: "Please select at least one area of specialization." }),
});

const achivementSchema = z.object({
  client: z
    .string()
    .min(2, { message: "Client/Company name must be at least 2 characters." }),
  jobRole: z.string().min(2, { message: "Job role be at least 2 characters." }),
  successStory: z
    .string()
    .min(10, { message: "Success story must be at least 10 characters long." }),
});

const achievementsSchema = z.object({
  //Expertise & Achievements
  experienceLevel: z.string().optional(),
  achievements: z.array(achivementSchema).min(1, {
    message: "Please enter at least one success achievement record.",
  }),
});

// Combined schema for the entire form
const formSchema = z.object({
  ...agentInfoSchema.shape,
  ...locationSchema.shape,
  ...professionalDetailsSchema.shape,
  ...achievementsSchema.shape,
});

export default function AgentCompleteProfileForm() {
  //Check the local storage flag
  const {
    data: completeProfileFlag,
    isPending: isFlagPending,
    isFetched: isFlagFetched,
    isSuccess: isFlagCheck,
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

  const [step, setStep] = useState(1);
  const totalStep = 5;

  const navigate = useNavigate();
  const [isSkipButtonClick, setIsSkipButtonClick] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);
  const [formError, setFormError] = useState(false);

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

  // Initialize form with default values
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // Agency Information
      agencyName: "",
      agencySize: "",
      agencyAddress: "",
      agencyPhoneNumber: "",
      agencyEmail: "",
      agencyWebsite: "",
      bio: "",

      //Location details
      country: "",
      state: "",
      city: "",
      zipCode: "",

      //Professional Details
      jobType: "",
      industryType: "",
      preferredIndustries: [],
      areaOfSpecialization: [],

      //Expertise & Achievements
      experienceLevel: "",
      achievements: [
        {
          client: "",
          jobRole: "",
          successStory: "",
        },
      ],
    },
    mode: "onChange",
  });

  // Get current schema based on step
  const getCurrentSchema = () => {
    switch (step) {
      case 1:
        return agentInfoSchema;
      case 2:
        return locationSchema;
      case 3:
        return professionalDetailsSchema;
      case 4:
        return achievementsSchema;
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
      setStep((prev) => Math.min(prev + 1, totalStep));
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const [formData, setFormData] = useState({
    // Agency Information
    agencyName: "",
    agencySize: "",
    agencyAddress: "",
    agencyPhoneNumber: "",
    agencyEmail: "",
    agencyWebsite: "",
    bio: "",

    //Location details
    country: "",
    state: "",
    city: "",
    zipCode: "",

    //Professional Details
    jobType: "",
    industryType: "",
    preferredIndustries: [],
    areaOfSpecialization: [],

    //Expertise & Achievements
    experienceLevel: "",
    achievements: [],
  });

  const { mutate: updateAgentProfile, isPending: isSubmittingProfile } =
    useUserProfileUpdate();

  // useEffect(() => {
  //   if (!storedToken) {
  //     console.log("CP: No login token found, redirecting to login.");
  //     navigate("/login", { replace: true });
  //     return;
  //   }

  //   if (isFlagFetched && !isFlagPending) {
  //     if (completeProfileFlag === null) {
  //       console.log(
  //         "CP: 'complete-profile' flag not found, redirecting to login."
  //       );
  //       navigate("/login", { replace: true });
  //       return;
  //     }

  //     if (completeProfileFlag === true) {
  //       if (isUserTypeFetched && !isUserTypePending) {
  //         // If userType fetch failed (e.g., network error, invalid token)
  //         if (isUserTypeError) {
  //           console.error(
  //             "CP: UserType fetch failed for completed profile, redirecting to login:",
  //             userTypeError.message
  //           );
  //           // Clear invalid token if this error occurred
  //           localStorage.removeItem("NXGJOBHUBLOGINKEYV1");
  //           sessionStorage.removeItem("NXGJOBHUBLOGINKEYV1");
  //           navigate("/login", { replace: true });
  //           return;
  //         }

  //         // If userType fetch succeeded
  //         if (isUserTypeSuccess && userData?.userType) {
  //           console.log(
  //             "CP: Profile complete, userType found. Redirecting to dashboard:",
  //             userData.userType
  //           );
  //           // Redirect based on user type
  //           if (userData.userType === "EMPLOYER") {
  //             navigate("/employer", { replace: true });
  //           } else if (userData.userType === "AGENT") {
  //             navigate("/agent", { replace: true });
  //           } else if (userData.userType === "TALENT") {
  //             navigate("/talent", { replace: true });
  //           } else if (userData.userType === "TECHTALENT") {
  //             navigate("/talent", { replace: true });
  //           } else if (data.userType === "SERVICE_PROVIDER") {
  //             navigate("/services-provider", { replace: true });
  //           } else {
  //             console.warn(
  //               "CP: Unknown user type, redirecting to general dashboard:",
  //               userData.userType
  //             );
  //           }
  //           return;
  //         }
  //       }
  //     }
  //   }
  // }, [
  //   navigate,
  //   storedToken,
  //   completeProfileFlag,
  //   isFlagPending,
  //   isFlagFetched,
  //   userData,
  //   isUserTypePending,
  //   isUserTypeSuccess,
  //   isUserTypeError,
  //   isUserTypeFetched,
  //   userTypeError,
  // ]);

  const stepFields = {
    // Agency Information
    1: [
      "agencyName",
      "agencySize",
      "agencyAddress",
      "agencyPhoneNumber",
      "agencyEmail",
      "agencyWebsite",
      "bio",
    ],

    //Location details
    2: ["country", "state", "city", "zipCode"],

    //Professional Details
    3: [
      "jobType",
      "industryType",
      "preferredIndustries",
      "areaOfSpecialization",
    ],

    //Expertise & Achievements
    4: ["experienceLevel", "certifications", "achievements"],
  };

  const totalSteps = 4;

  const closeModal = (e) => {
    if (e.target === e.currentTarget) setIsSkipButtonClick(false);
  };

  const isAllCurrentStepFieldFilled = () =>
    stepFields[currentStep].every((field) => {
      const value = formData[field];

      if (Array.isArray(value)) {
        return value.length > 0;
      }

      if (typeof value === "string") {
        return value.trim() !== "";
      }

      return Boolean(value);
    });

  const nextStep = () => {
    if (isAllCurrentStepFieldFilled()) {
      setFormError(false);
      setCurrentStep((prev) => prev + 1);
    } else {
      setFormError(true);
    }
  };

  const prevStep = () => {
    if (currentStep === 1) return;
    setCurrentStep((prev) => prev - 1);
  };

  // Handle skipping the form
  const handleSkip = () => {
    setIsSkipButtonClick(true);
  };

  useEffect(() => {
    if (isAllCurrentStepFieldFilled()) {
      setFormError(false);
    }
  }, [formData]);

  const handleSubmit = async () => {
    const payload = {
      // Agency Information
      agencyName: formData.agencyName,
      agencySize: formData.agencySize,
      agencyAddress: formData.agencyAddress,
      agencyPhoneNumber: formData.agencyPhoneNumber,
      agencyEmail: formData.agencyEmail,
      agencyWebsite: formData.agencyWebsite,
      bio: formData.bio,

      //Location details
      country: formData.agencyName,
      state: formData.agencyName,
      city: formData.agencyName,
      zipCode: formData.agencyName,

      //Professional Details
      jobType: formData.jobType,
      industryType: formData.industryType,
      preferredIndustries: formData.preferredIndustries,
      areaOfSpecialization: formData.areaOfSpecialization,

      //Expertise & Achievements
      experienceLevel: formData.experienceLevel,
      certifications: formData.certifications,
      achievements: formData.achievements,
    };

    const storeValueObj =
      localStorage.getItem("NXGJOBHUBLOGINKEYV1") ||
      sessionStorage.getItem("NXGJOBHUBLOGINKEYV1");

    const userId = storeValueObj ? JSON.parse(storeValueObj).id : null;

    if (userId) {
      updateAgentProfile(
        {
          url: `${API_HOST_URL}/api/v1/agents`,
          userId,
          payload: payload,
        },
        {
          onSuccess: (data) => {
            window.localStorage.setItem(
              "NXGJOBHUBComPro",
              JSON.stringify(true)
            );
            toast({
              className: cn(
                "bottom-10 right-4 flex fixed max-w-[400px] md:max-w-[420px]"
              ),
              title: <p className="tex-green-700">Profile setup</p>,
              description: (
                <p className="text-gray-800 rounded-md bg-green-100 p-4 font-mono">
                  Your have successfully setup your agent profile
                </p>
              ),
            });

            navigate("/agent", { replace: true });
          },
          onError: (err) => {
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
                      Account creation failed, please check your internet
                      connection.
                    </p>
                  ),
                });
              }
            } else {
              toast({
                className: cn(
                  "bottom-10 right-4 flex fixed max-w-[400px] md:max-w-[420px]"
                ),
                title: <p className="text-red-700">Profile setup failed</p>,
                description: (
                  <p className="text-gray-800 rounded-md bg-red-100 p-4 font-mono">
                    Failed to upload your file
                  </p>
                ),
              });
            }
          },
        }
      );
    } else {
      navigate("/login", { replace: true });
    }
  };

  const stepTitles = [
    { title: "Agency Information", icon: UserCog },
    { title: "Location Details", icon: MapPin },
    { title: "Professional Details", icon: BriefcaseBusiness },
    { title: "Expertise & Achievements", icon: PackagePlus },
  ];

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            {formError && (
              <p className="w-full rounded p-3 text-red-500 border border-red-500 mb-5">
                Please fill the various field below before proceeding
              </p>
            )}
            {/* <RenderStepOne
              form={form}
              formData={formData}
              setFormData={setFormData}
            /> */}
          </div>
        );
      case 2:
        return (
          <div>
            {formError && (
              <p className="w-full rounded p-3 text-red-500 border border-red-500 mb-5">
                Please fill the various field below before proceeding
              </p>
            )}
            <div>
              {/* <RenderStepTwo formData={formData} setFormData={setFormData} /> */}
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            {formError && (
              <p className="w-full rounded p-3 text-red-500 border border-red-500 mb-5">
                Please fill the various field below before proceeding
              </p>
            )}
            <RenderStepThree formData={formData} setFormData={setFormData} />
          </div>
        );
      case 4:
        return (
          <div>
            {formError && (
              <p className="w-full rounded p-3 text-red-500 border border-red-500 mb-5">
                Please fill the various field below before proceeding
              </p>
            )}
            <RenderStepFour formData={formData} setFormData={setFormData} />
          </div>
        );
      default:
        return null;
    }
  };

  // if (
  //   isFlagPending ||
  //   (completeProfileFlag === true && isUserTypePending) ||
  //   (isUserTypeSuccess && userData?.userType)
  // ) {
  //   return (
  //     <div style={{ padding: "20px", textAlign: "center" }}>
  //       <p>Checking profile status...</p>
  //       <div className="spinner"></div> {/* Your spinner */}
  //     </div>
  //   );
  // }

  // if (completeProfileFlag === false && storedToken) {
  return (
    <div>
      <nav className="flex justify-between items-center w-full bg-sky-600 p-4 fixed top-0 left-0 z-50 sm:static">
        <span
          onClick={prevStep}
          className="inline-flex sm:hidden text-white cursor-pointer"
        >
          <ArrowLeft /> Back
        </span>
        <img className="w-20 sm:w-24" src={Logo} alt="" />
      </nav>
      <div className="flex items-center justify-center pt-20 sm:pt-0">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Complete agent profile</CardTitle>
            <CardDescription>
              Complete your profile helps build trust, improves your visibility,
              and unlocks access to employer's and talents. Step {step} of{" "}
              {totalStep}
            </CardDescription>
            <Progress
              value={(step / totalStep) * 100}
              className="bg-sky-500 h-2 mt-2"
            />
          </CardHeader>
          <Form {...form}>
            <form>
              <CardContent>
                {step === 1 && <RenderStepOne form={form} />}
                {step === 2 && <RenderStepTwo form={form} />}
                {step === 3 && <RenderStepThree form={form} />}
                {step === 4 && <RenderStepFour form={form} />}
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={step === 1}
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                  </Button>
                  {step < totalSteps && (
                    <Button
                      className="bg-sky-500 border-none hover:bg-sky-600"
                      type="button"
                      onClick={handleNext}
                    >
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
                    onClick={handleSkip}
                  >
                    Skip <SkipForward className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </CardFooter>
            </form>
          </Form>
        </Card>

        {/* <RenderStepIndicator activeTab={currentStep} /> */}

        {/* <div className="space-y-5">
            <div>
              <div>
                <div className="mb-8">
                  <h3 className="text-gray-800 text-lg font-semibold mb-4">
                    Step {currentStep}: {stepTitles[currentStep - 1].title}
                  </h3>

                  {renderCurrentStep()}
                </div>
              </div>
              <div className="hidden sm:flex sm:justify-between">
                <div className="flex gap-2">
                  {currentStep > 1 && (
                    <Button
                      className="hover:bg-gray-200 "
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                    </Button>
                  )}

                  {currentStep < totalSteps && (
                    <Button
                      className="bg-sky-500 border-none hover:bg-sky-600"
                      type="button"
                      onClick={nextStep}
                    >
                      Next <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
                {currentStep === totalSteps ? (
                  <Button
                    disabled={isSubmittingProfile}
                    className="border-transparent bg-green-500 text-gray-50
                  hover:bg-green-600"
                    type="button"
                    onClick={handleSubmit}
                  >
                    {isSubmittingProfile ? (
                      <div className="flex items-center space-x-1">
                        <Loader2 className="animate-spin" />
                        <span>Profile form submitting...</span>
                      </div>
                    ) : (
                      <span className="flex">
                        {" "}
                        Submit <Check className="ml-2 h-4 w-4" />
                      </span>
                    )}
                  </Button>
                ) : (
                  <Button
                    className="border-transparent bg-red-600 text-gray-50 hover:bg-red-700"
                    type="button"
                    variant="secondary"
                    onClick={handleSkip}
                  >
                    Skip <SkipForward className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>

             

              <div className="flex flex-col gap-3 sm:hidden">
                {currentStep < 4 ? (
                  <Button
                    className="bg-sky-500 border-none hover:bg-sky-600"
                    type="button"
                    onClick={nextStep}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    disabled={isSubmittingProfile}
                    type="button"
                    className="border-transparent bg-green-500 text-gray-50
                  hover:bg-green-600"
                    onClick={handleSubmit}
                  >
                    {isSubmittingProfile ? (
                      <div className="flex items-center space-x-1">
                        <Loader2 className="animate-spin" />
                        <span>Profile form submitting...</span>
                      </div>
                    ) : (
                      <span>Submit</span>
                    )}
                  </Button>
                )}

                <Button
                  className="border-transparent bg-red-100 text-red-900"
                  type="button"
                  variant="secondary"
                  onClick={handleSkip}
                >
                  Skip
                </Button>
              </div>
            </div>
          </div> */}
        {isSkipButtonClick && (
          <SkipFormDialog isOpen={isSkipButtonClick} onClose={closeModal} />
        )}
        <Toaster />
      </div>
    </div>
  );
  // }

  // Fallback: This should ideally not be reached if all conditions are handled.
  // If it is, it indicates an unexpected state, so redirect to login.
  console.warn("CP: Unexpected state reached in render. Redirecting to login.");
  navigate("/login", { replace: true });
  // return null;
}

const RenderStepIndicator = ({ activeTab }) => {
  return (
    <div className="max-w-full overflow-x-hidden my-5">
      <div className="sm:hidden">
        <div className="flex items-center justify-center">
          <div
            className={cn(
              `${
                activeTab === 1
                  ? "bg-primary text-white p-1"
                  : activeTab > 1
                  ? "bg-secondary text-white p-1"
                  : "bg-secondary text-primary p-1"
              }`,
              "rounded-full"
            )}
          >
            {activeTab === 1 ? (
              <CircleDashed className="w-5 h-5" />
            ) : activeTab > 1 ? (
              <Circle className="w-3 h-3" />
            ) : null}
          </div>
          <Separator
            className={cn(
              `${activeTab >= 2 ? "bg-primary" : "bg-gray-300"}`,
              "w-14 mx-1 h-[2px]"
            )}
          />
          <div
            className={cn(
              `${
                activeTab === 2
                  ? "bg-primary text-white p-1"
                  : activeTab > 2
                  ? "bg-secondary text-white p-1"
                  : "bg-gray-100 text-gray-400 p-2"
              }`,
              "rounded-full"
            )}
          >
            {activeTab === 2 ? (
              <CircleDashed className="w-5 h-5" />
            ) : activeTab > 2 ? (
              <Circle className="w-3 h-3" />
            ) : null}
          </div>
          <Separator
            className={cn(
              `${activeTab >= 3 ? "bg-primary" : "bg-gray-300"}`,
              "w-14 mx-1 h-[2px]"
            )}
          />
          <div
            className={cn(
              `${
                activeTab === 3
                  ? "bg-primary text-white p-1"
                  : activeTab > 3
                  ? "bg-secondary text-white p-1"
                  : "bg-gray-100 text-gray-400 p-2"
              }`,
              "rounded-full"
            )}
          >
            {activeTab === 3 ? (
              <CircleDashed className="w-5 h-5" />
            ) : activeTab > 3 ? (
              <Circle className="w-3 h-3" />
            ) : null}
          </div>
          <Separator
            className={cn(
              `${activeTab >= 4 ? "bg-primary" : "bg-gray-300"}`,
              "w-14 mx-1 h-[2px]"
            )}
          />

          <div
            className={cn(
              `${
                activeTab === 4
                  ? "bg-primary text-white p-1"
                  : activeTab > 4
                  ? "bg-secondary text-white p-1"
                  : "bg-gray-100 text-gray-400 p-2"
              }`,
              "p-2 rounded-full"
            )}
          >
            {activeTab === 4 ? (
              <CircleDashed className="w-5 h-5" />
            ) : activeTab > 4 ? (
              <Circle className="w-3 h-3" />
            ) : null}
          </div>
        </div>
      </div>
      {/* indicator for desktop view */}
      <div className="hidden sm:block space-y-2">
        <div className=" flex items-center justify-center">
          <div
            className={cn(
              `${
                activeTab === 1
                  ? "bg-primary text-white"
                  : activeTab > 1
                  ? "bg-secondary text-white"
                  : ""
              }`,
              "p-2 rounded-full"
            )}
          >
            <UserCog className="w-5 h-5" />
          </div>
          <Separator
            className={cn(
              `${activeTab > 1 ? "bg-primary" : "bg-gray-300"}`,
              "w-32 h-[2px]  mx-3  "
            )}
          />
          <div
            className={cn(
              `${
                activeTab === 2
                  ? "bg-primary text-white"
                  : activeTab > 2
                  ? "bg-secondary text-white"
                  : ""
              }`,
              "p-2 rounded-full"
            )}
          >
            <MapPin className="w-5 h-5" />
          </div>
          <Separator
            className={cn(
              `${activeTab > 2 ? "bg-primary" : "bg-gray-300"}`,
              "w-32 h-[2px]  mx-3  "
            )}
          />
          <div
            className={cn(
              `${
                activeTab === 3
                  ? "bg-primary text-white"
                  : activeTab > 3
                  ? "bg-secondary text-white"
                  : ""
              }`,
              "p-2 rounded-full"
            )}
          >
            <BriefcaseBusiness className="w-5 h-5" />
          </div>
          <Separator
            className={cn(
              `${activeTab > 3 ? "bg-primary" : "bg-gray-300"}`,
              "w-32 h-[2px]  mx-3  "
            )}
          />
          <div
            className={cn(
              `${
                activeTab === 4
                  ? "bg-primary text-white"
                  : activeTab > 4
                  ? "bg-secondary text-white"
                  : ""
              }`,
              "p-2 rounded-full"
            )}
          >
            <PackagePlus className="w-5 h-5" />
          </div>
        </div>
        <div className="flex justify-center gap-12">
          <p
            className={cn(
              `${
                activeTab === 1
                  ? "text-primary"
                  : activeTab > 1
                  ? "text-secondary"
                  : "text-gray-400"
              }`,
              "text-sm"
            )}
          >
            Agency Information
          </p>
          <p
            className={cn(
              `${
                activeTab === 2
                  ? "text-primary"
                  : activeTab > 2
                  ? "text-secondary"
                  : "text-gray-400"
              }`,
              "text-sm"
            )}
          >
            Location Details
          </p>
          <p
            className={cn(
              `${
                activeTab === 3
                  ? "text-primary"
                  : activeTab > 3
                  ? "text-secondary"
                  : "text-gray-400"
              }`,
              "text-sm"
            )}
          >
            Professional Details
          </p>
          <p
            className={cn(
              `${
                activeTab === 4
                  ? "text-primary"
                  : activeTab > 4
                  ? "text-secondary"
                  : "text-gray-400"
              }`,
              "text-sm"
            )}
          >
            Expertise & Achivements
          </p>
        </div>
      </div>
    </div>
  );
};

const SkipFormDialog = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const handleSkipClick = () => {
    localStorage.setItem("NXGJOBHUBComPro", JSON.stringify(true));
    navigate("/employer");
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="flex flex-col items-center w-[330px] sm:w-full">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex flex-col items-center" asChild>
            <h1 className="text-2xl">Before you skip...</h1>
          </AlertDialogTitle>
          <AlertDialogDescription
            asChild
            className="flex flex-col items-center py-6 space-y-8"
          >
            <p className="text-center text-sm">
              Are you sure you want to skip this complete profile form? You can
              always complete your profile on your dashboard
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="w-full">
          <AlertDialogAction
            onClick={handleSkipClick}
            className="border-transparent bg-red-100 text-red-900 hover:bg-red-300 sm:w-1/2 "
          >
            Skip anyway
          </AlertDialogAction>
          <AlertDialogCancel className="bg-primary hover:bg-secondary text-white hover:text-white sm:w-1/2">
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
