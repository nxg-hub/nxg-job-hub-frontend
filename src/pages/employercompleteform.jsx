import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Building2,
  Briefcase,
  Check,
  SkipForward,
  ArrowLeft,
  User,
  MapPin,
  CircleDashed,
  Circle,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import Logo from "@/static/images/logo_colored.png";
import { useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { API_HOST_URL } from "@/utils/api/API_HOST";
import { useUserProfileUpdate } from "@/hooks/Employer/employerHooks";
import { Separator } from "@/components/ui/separator";
import RenderStepOne from "@/components/Employer/Profile/renderStepOne";
import RenderStepTwo from "@/components/Employer/Profile/renderStepTwo";
import RenderStepThree from "@/components/Employer/Profile/renderStepThree";
import RenderStepFour from "@/components/Employer/Profile/renderStepFour";
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
import { useAutoLogin } from "@/hooks/autoLogin";

export function EmployerProfileCompleteForm() {
  const navigate = useNavigate();
  const [isSkipButtonClick, setIsSkipButtonClick] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Company Information
    companyName: "",
    companyDescription: "",
    industryType: "",
    companySize: "",
    companyWebsite: "",

    // Company Location
    country: "",
    state: "",
    companyZipCode: "",
    companyAddress: "",
    companyPhone: "",

    //Management details
    namesOfDirectors: [],

    // Job Information
    vacancies: [],
    position: "",
    jobBoard: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [formError, setFormError] = useState(false);

  const { data, fetchStatus, isError, isSuccess, error, isFetched } =
    useAutoLogin();

  const { updateUserProfile, isLoading } = useUserProfileUpdate();

  //if auto-login check has completed(either success or failed)
  const isAutoLoginChecking = fetchStatus === "fatching";

  const storedToken = (function () {
    let key =
      localStorage.getItem("NXGJOBHUBLOGINKEYV1") ||
      sessionStorage.getItem("NXGJOBHUBLOGINKEYV1");

    try {
      const tokenParsed = key ? JSON.parse(key) : null;
      return tokenParsed;
    } catch (e) {
      return null;
    }
  })();

  useEffect(() => {
    if (isAllCurrentStepFieldFilled()) {
      setFormError(false);
    }
  }, [formData]);

  useEffect(() => {
    //if no token found redirect to login page
    if (!storedToken && !isAutoLoginChecking && !isFetched) {
      navigate("/login", { replace: true });
    }

    //if token exist and request to an endpoin is successful/failed
    if (isFetched && !isAutoLoginChecking) {
      //request failed
      if (isError) {
        console.error(
          "Employer complete profile form: Auto-login failed while checking:",
          error.message
        );
        navigate("/login", { replace: true });
        return;
      }

      //request successful
      if (isSuccess) {
        const { userType, employer } = data;

        const empCPValue = JSON.parse(localStorage.getItem("NXGJOBHUBEmpCP"));

        if (
          userType === "EMPLOYER" &&
          employer.verified === false &&
          empCPValue === false
        ) {
          console.log("Employer complete profile form render");
        } else if (
          userType === "EMPLOYER" &&
          employer.verified === false &&
          empCPValue
        ) {
          navigate("/employer", { replace: true });
        } else if (userType === "EMPLOYER" && employer.verified) {
          navigate("/employer", { replace: true });
        } else {
          console.log("User not an employer");
          if (userType === "TECHTALENT" || userType === "TALENT") {
            navigate("/talent", { replace: true });
          } else if (userType === "AGENT") {
            navigate("/agent", { replace: true });
          } else if (userType === "SERVICES-PROVIDER") {
            navigate("/services-provider", { replace: true });
          } else if (userType === null) {
            navigate("/create", { replace: true });
          }
        }
      }
    }
  }, [
    isAutoLoginChecking,
    isSuccess,
    isError,
    data,
    error,
    storedToken,
    isFetched,
    navigate,
  ]);

  const stepFields = {
    1: [
      "companyName",
      "companyDescription",
      "industryType",
      "companySize",
      "companyWebsite",
    ],
    2: ["country", "state", "companyZipCode", "companyAddress", "companyPhone"],
    3: ["namesOfDirectors"],
    4: ["vacancies", "position", "jobBoard"],
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

  const handleSubmit = async () => {
    const payload = {
      companyName: formData.companyName,
      companyDescription: formData.companyDescription,
      country: formData.country,
      state: formData.state,
      companyZipCode: formData.companyZipCode,
      industryType: formData.industryType,
      companySize: formData.companySize,
      companyAddress: formData.companyAddress,
      companyPhone: formData.companyPhone,
      companyWebsite: formData.companyWebsite,
      vacancies: formData.vacancies,
      position: formData.position,
      jobBoard: formData.jobBoard,
      namesOfDirectors: formData.namesOfDirectors,
    };

    const storeValueObj =
      localStorage.getItem("NXGJOBHUBLOGINKEYV1") ||
      sessionStorage.getItem("NXGJOBHUBLOGINKEYV1");

    const userId = storeValueObj ? JSON.parse(storeValueObj).id : null;

    try {
      const data = await updateUserProfile({
        url: `${API_HOST_URL}/api/employers`,
        userId,
        payload,
      });

      toast({
        className: cn(
          "top-10 right-4 flex fixed max-w-[400px] md:max-w-[420px]"
        ),
        title: "Profile completed",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-green-700 p-4">
            <p className="text-white">
              You have successfully complete your profile
            </p>
          </pre>
        ),
        duration: 2500,
      });
      window.localStorage.setItem(
        "NXGJOBEMPLOYERCOMPLETEPROFILE",
        JSON.stringify(true)
      );

      setTimeout(() => {
        navigate("/employer");
      }, 3000);
      console.log("Form submitted successfully");
    } catch (err) {
      if (err.response) {
        toast({
          className: cn(
            "flex flex-col space-y-5 items-start top-10 right-4 flex fixed max-w-[400px] md:max-w-[420px]"
          ),
          title: "Failed to login",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-red-700 p-4">
              <p className="text-white">Complete profile form failed</p>
            </pre>
          ),
        });
      }

      if (!err.response) {
        toast({
          className: cn(
            "flex flex-col gap-5 top-10 right-4 fixed max-w-[400px] md:max-w-[420px]"
          ),
          title: <p className="text-red-700">Network error</p>,
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-gray-100 p-4 text-red-700">
              <code>
                Failed to submit form, please check your
                <br />
                internet connection.
              </code>
            </pre>
          ),
          action: (
            <ToastAction
              onClick={handleSubmit}
              className="bg-primary text-white   hover:bg-sky-700 hover:text-white self-start border-transparent"
              altText="Try again"
            >
              Try again
            </ToastAction>
          ),
        });

        setTimeout(() => {
          setLoginLoading(false);
        }, 3000);
      }
      console.error(
        "Profile update error",
        err?.response?.data?.message || err.message
      );
    }
  };

  const stepTitles = [
    { title: "Company Information", icon: Building2 },
    { title: "Company Location", icon: MapPin },
    { title: "Management Details", icon: User },
    { title: "Job Posting Details", icon: Briefcase },
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
            <RenderStepOne formData={formData} setFormData={setFormData} />
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
            <RenderStepTwo formData={formData} setFormData={setFormData} />
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

  if (isAutoLoginChecking || (!isFetched && !storedToken))
    return <div>Loading...</div>;

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
            <h1 className="font-semibold text-2xl"> Profile Complete</h1>
            <p className="text-gray-500 text-base">
              Complete all steps to register your company and post job
              opportunities
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
          {isSkipButtonClick && (
            <SkipFormDialog isOpen={isSkipButtonClick} onClose={closeModal} />
          )}
          <Toaster />
        </div>
      </div>
    </div>
  );
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
            <Building2 className="w-5 h-5" />
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
            <User className="w-5 h-5" />
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
            <Briefcase className="w-5 h-5" />
          </div>
        </div>
        <div className="flex justify-center gap-14">
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
            Company Information
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
            Company Location
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
            Management Details
          </p>
          <p
            className={cn(
              `${activeTab === 4 ? "text-primary" : "text-gray-400"}`,
              "text-sm"
            )}
          >
            Job Details
          </p>
        </div>
      </div>
    </div>
  );
};

const SkipFormDialog = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const handleSkipClick = () => {
    // Handle skip action here, e.g., navigate to another page or show a message
    window.localStorage.setItem("NXGJOBHUBEmpCP", JSON.stringify(true));
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
