import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Loader2,
  ArrowLeft,
  UserCog,
  Contact,
  BriefcaseBusiness,
  SkipForward,
  CircleDashed,
  Circle,
  User,
  GraduationCap,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "../hooks/use-toast";
import { Button } from "../components/ui/button";
import { Toaster } from "../components/ui/toaster";
import Logo from "@/static/images/logo_colored.png";
import { useTechTalentProfileUpdate } from "../hooks/Talent/talentHooks";
import RenderStepOneTalent from "../components/Talent/renderStepOneTalent";
import RenderStepTwoTalent from "../components/Talent/renderStepTwoTalent";
import RenderStepThreeTalent from "../components/Talent/renderStepThreeTalent";
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
import { cn } from "@/lib/utils";
import RenderStepFourTalent from "@/components/Talent/renderStepFourTalent";

export function TechTalentProfileCompleteForm() {
  const navigate = useNavigate();
  const [isSkipButtonClick, setIsSkipButtonClick] = useState(false);
  const [formData, setFormData] = useState({
    bio: "",
    linkedInUrl: "",
    portfolioLink: "",
    residentialAddress: "",
    city: "",
    state: "",
    countryCode: "",
    zipCode: "",
    location: "",
    currentJob: "",
    yearsOfExperience: 0,
    experienceLevel: "",
    skills: [],
    highestQualification: "",
    professionalCert: "",
    jobType: "",
    workMode: "",
    jobInterest: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [formError, setFormError] = useState(false);

  const { updateTechProfile, isLoading } = useTechTalentProfileUpdate();

  useEffect(() => {
    const storedSession = sessionStorage.getItem("NXGJOBHUBLOGINKEYV1");

    if (storedSession) {
      try {
        const parsed = JSON.parse(storedSession);
        const techId = parsed?.id;
        if (techId && techId.trim() !== "") {
          setFormData((prev) => ({ ...prev, techId }));
        } else {
          toast({
            title: "Session Error",
            description: "Unable to retrieve user ID. Please login again.",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Session Error",
          description: "Invalid session data. Please login again.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Authentication Required",
        description: "Please login to complete your profile.",
        variant: "destructive",
      });
    }
  }, [navigate]);

  const stepFields = {
    1: [
      "bio",
      "linkedInUrl",
      "portfolioLink",
      "residentialAddress",
      "countryCode",
      "state",
      "city",
      "zipCode",
      "location",
    ],
    2: ["skills", "currentJob", "yearsOfExperience", "experienceLevel"],
    3: ["highestQualification", "professionalCert"],

    4: ["jobInterest", "jobType", "workMode"],
  };

  const totalSteps = 4;

  const isAllCurrentStepFieldFilled = () =>
    stepFields[currentStep].every((field) => {
      const value = formData[field];
      return Array.isArray(value)
        ? value.length > 0
        : value?.toString().trim() !== "";
    });

  const validateAllSteps = () => {
    for (let step = 1; step <= totalSteps; step++) {
      const isStepValid = stepFields[step].every((field) => {
        const value = formData[field];
        return Array.isArray(value)
          ? value.length > 0
          : value?.toString().trim() !== "";
      });

      if (!isStepValid) {
        return { isValid: false, invalidStep: step };
      }
    }
    return { isValid: true };
  };

  const nextStep = () => {
    if (isAllCurrentStepFieldFilled()) {
      setFormError(false);
      setCurrentStep((prev) => prev + 1);
    } else {
      setFormError(true);
      toast({
        title: "Please fill all required fields",
        description: "Make sure you've completed all the mandatory inputs.",
        variant: "destructive",
      });
    }
  };

  // Handle skipping the form
  const handleSkip = () => {
    setIsSkipButtonClick(true);
  };

  // const prevStep = () => {
  //   if (currentStep === 1) return;
  //   setCurrentStep((prev) => prev - 1);
  // };

  const prevStep = () => {
    if (currentStep > 1) {
      setFormError(false);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!formData.techId) {
      toast({
        title: "Error",
        description:
          "Tech ID is required to submit profile. Please login again.",
        variant: "destructive",
      });
      return;
    }

    const validation = validateAllSteps();
    if (!validation.isValid) {
      setCurrentStep(validation.invalidStep);
      setFormError(true);
      toast({
        title: "Incomplete Form",
        description: `Please complete all fields in Step ${validation.invalidStep} before submitting.`,
        variant: "destructive",
      });
      return;
    }

    const { ...payload } = formData;

    try {
      await updateTechProfile(payload);

      toast({
        title: "Success",
        description: "Tech Talent profile updated successfully!",
      });

      setFormError(false);
      setTimeout(() => navigate("/talent"), 1500);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update Tech Talent profile. Please try again.";

      toast({
        title: "Update Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const renderCurrentStep = () => {
    const props = { formData, setFormData, formError };

    switch (currentStep) {
      case 1:
        return <RenderStepOneTalent {...props} />;
      case 2:
        return <RenderStepTwoTalent {...props} />;
      case 3:
        return <RenderStepThreeTalent {...props} />;
      case 4:
        return <RenderStepFourTalent {...props} />;
      default:
        return null;
    }
  };

  const isSubmitDisabled = isLoading || !formData.techId;

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
        <div className="w-full border-transparent px-4 py-3 sm:w-1/2 sm:my-10 sm:p-8 sm:border-[1px] sm:border-gray-300 sm:rounded-md">
          <div className="">
            <h1 className="font-semibold text-2xl"> Complete Your Profile</h1>
            <p className="text-gray-500 text-base">
              All steps must be completed to activate your profile.
            </p>
          </div>
          <RenderStepIndicator activeTab={currentStep} />
          <div className="space-y-5">
            <div>
              <div>
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">
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
                    disabled={isLoading}
                    className="border-transparent bg-green-500 text-gray-50
                  hover:bg-green-600"
                    type="button"
                    onClick={handleSubmit}
                  >
                    {isLoading ? (
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

              {/* mobile form navigator */}

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
                    disabled={isLoading}
                    type="button"
                    className="border-transparent bg-green-500 text-gray-50
                  hover:bg-green-600"
                    onClick={handleSubmit}
                  >
                    {isLoading ? (
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
          </div>
        </div>

        <Toaster />
      </div>
    </div>
  );
}
const stepTitles = [
  { title: "Personal Information", icon: UserCog },
  { title: "Experience & Skills", icon: Contact },
  { title: "Education & Qualifications", icon: BriefcaseBusiness },
  { title: "Job Preferences", icon: BriefcaseBusiness },
];

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
                  : " text-gray-400"
              }`,
              "p-2 rounded-full"
            )}
          >
            <User className="w-5 h-5" />
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
                  : " text-gray-400"
              }`,
              "p-2 rounded-full"
            )}
          >
            <Contact className="w-5 h-5" />
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
                  : " text-gray-400"
              }`,
              "p-2 rounded-full"
            )}
          >
            <GraduationCap className="w-5 h-5" />
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
                  : " text-gray-400"
              }`,
              "p-2 rounded-full"
            )}
          >
            <BriefcaseBusiness className="w-5 h-5" />
          </div>
        </div>
        <div className="flex justify-center gap-10">
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
            Personal Information
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
            Experience & Skills
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
            Education & Qualifications
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
            Job Preferences
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
