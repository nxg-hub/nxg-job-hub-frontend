import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Building2,
  Briefcase,
  FileText,
  Check,
  SkipForward,
  X,
  Phone,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Logo from "@/static/images/logo_colored.png";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { cn, getUserUsingAuthKey, updateUserProfile } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import CompanyInfo from "@/components/Employer/Profile/companyInfo";
import ContactInfo from "@/components/Employer/Profile/contactInfo";
import LegalDocument from "@/components/Employer/Profile/legalDocument";
import Jobs from "@/components/Employer/Profile/jobs";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { API_HOST_URL } from "@/utils/api/API_HOST";

export function EmployerProfileCompletionForm() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [step1FieldsNotCompletelyFilled, setStep1FieldsNotCompletelyFilled] =
    useState(false);
  const [step2FieldsNotCompletelyFilled, setStep2FieldsNotCompletelyFilled] =
    useState(false);
  const [step3FieldsNotCompletelyFilled, setStep3FieldsNotCompletelyFilled] =
    useState(false);
  const [step4FieldsNotCompletelyFilled, setStep4FieldsNotCompletelyFilled] =
    useState(false);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Company Information
    companyName: "",
    companyDescription: "",
    country: "",
    state: "",
    companyZipCode: "",
    industryType: "",
    companySize: "",

    // Company Contact
    companyAddress: "",
    companyPhone: "",
    companyWebsite: "",

    // Job Information
    vacancies: "",
    position: "",
    jobBoard: "",

    // Legal & Compliance
    tin: "",
    taxClearanceCertificate: "",
    taxClearanceCertificateFileName: "",
    caccertificate: "",
    caccertificateFileName: "",
    namesOfDirectors: "",
    companyMemorandum: "",
    companyMemorandumFileName: "",
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const isAuthenticated = useAuthRedirect("NXGJOBHUBLOGINKEYV1", "/login");

  if (!isAuthenticated) {
    return null;
  } else {
    getUserUsingAuthKey(JSON.parse(isAuthenticated).authKey)
      .then((data) => {
        if (!data.userType) {
          return;
        } else {
          navigate(
            data.userType === "EMPLOYER"
              ? "/employer"
              : accountChoice === "AGENT"
              ? "/agent"
              : accountChoice === "TALENT"
              ? "/talent"
              : null
          );
        }
      })
      .catch((error) => {
        console.log(error);
        naviage("/login");
      });
  }

  const updateFormData = (dataField) => {
    setFormData((prev) => ({
      ...prev,
      ...dataField,
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      if (currentStep === 1) {
        if (
          !formData.companyName ||
          !formData.companyDescription ||
          !formData.country ||
          !formData.state ||
          !formData.companyZipCode ||
          !formData.industryType ||
          !formData.companySize
        ) {
          setStep1FieldsNotCompletelyFilled(true);
          return;
        } else {
          setStep1FieldsNotCompletelyFilled(false);
        }
      }

      if (currentStep === 2) {
        if (
          !formData.companyAddress ||
          !formData.companyPhone ||
          !formData.companyWebsite
        ) {
          setStep2FieldsNotCompletelyFilled(true);
          return;
        } else {
          setStep2FieldsNotCompletelyFilled(false);
        }
      }

      if (currentStep === 3) {
        if (!formData.vacancies || !formData.position || !formData.jobBoard) {
          setStep3FieldsNotCompletelyFilled(true);
          return;
        } else {
          setStep3FieldsNotCompletelyFilled(false);
        }
      }

      if (currentStep === 4) {
        if (
          !formData.tin ||
          !formData.taxClearanceCertificate ||
          !formData.caccertificate ||
          !formData.namesOfDirectors ||
          !formData.companyMemorandum
        ) {
          setStep4FieldsNotCompletelyFilled(true);
          return;
        } else {
          setStep4FieldsNotCompletelyFilled(false);
        }
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle skipping the form
  const handleSkip = () => {
    toast({
      className: cn(
        "flex flex-col space-y-5 top-10 right-4 flex fixed max-w-[400px] md:max-w-[420px]"
      ),
      title: "Skip complete profile!",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-red-100 p-4">
          <code>
            Are you sure you want to skip this <br />
            complete profile form?
          </code>
        </pre>
      ),
      action: (
        <ToastAction
          onClick={() => {
            // Handle skip action here, e.g., navigate to another page or show a message
            navigate("/employer");
          }}
          altText="Skip action"
          className="self-start border-transparent text-white bg-cyan-500 hover:bg-cyan-700"
        >
          Skip
        </ToastAction>
      ),
    });
  };

  //extract only non-empty values for payload
  function extractNonEmptyValues(formDataObj) {
    return Object.entries(formDataObj)
      .filter(
        ([key, value]) => value !== "" && value !== null && value !== undefined
      )
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = extractNonEmptyValues(formData);
    try {
      const { data, status } = await updateUserProfile(
        `${API_HOST_URL}/api/employers`,
        getUserUsingAuthKey(JSON.parse(isAuthenticated).id),
        payload
      );
      toast({
        className: cn(
          "top-10 right-4 flex fixed max-w-[400px] md:max-w-[420px]"
        ),
        title: "Successful",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-green-700 p-4">
            <code className="text-white">
              Profile successfully updateFormData
            </code>
          </pre>
        ),
        duration: 2500,
      });
      // Updated the condition to navigate to the appropriate page based on the accountChoice
      setTimeout(() => {
        navigate("/employer");
      }, 3000);
    } catch (error) {
      console.error("Profile update error", error);
    }
  };

  const stepTitles = [
    { title: "Company Information", icon: Building2 },
    { title: "Company Contact", icon: Phone },
    { title: "Job Information", icon: Briefcase },
    { title: "Legal & Compliance", icon: FileText },
  ];

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {stepTitles.map((step, index) => {
          const StepIcon = step.icon;
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div key={stepNumber} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : isCompleted
                    ? "bg-secondary text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <StepIcon className="w-5 h-5" />
              </div>
              <span
                className={`text-sm font-medium ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>

      <Progress value={progress} className="bg-sky-500 h-2 mt-2" />
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            {step1FieldsNotCompletelyFilled ? (
              <p className="w-full rounded p-3 text-red-500 border border-red-500 mb-5">
                Please fill the various field below before proceeding
              </p>
            ) : null}
            <CompanyInfo formData={formData} updateFormData={updateFormData} />
          </div>
        );
      case 2:
        return (
          <div>
            {step2FieldsNotCompletelyFilled ? (
              <p className="w-full rounded p-3 text-red-500 border border-red-500 mb-5">
                Please fill the various field below before proceeding
              </p>
            ) : null}
            <ContactInfo formData={formData} updateFormData={updateFormData} />
          </div>
        );
      case 3:
        return (
          <div>
            {step3FieldsNotCompletelyFilled ? (
              <p className="w-full rounded p-3 text-red-500 border border-red-500 mb-5">
                Please fill the various field below before proceeding
              </p>
            ) : null}
            <Jobs formData={formData} updateFormData={updateFormData} />;
          </div>
        );
      case 4:
        return (
          <div>
            {step4FieldsNotCompletelyFilled ? (
              <p className="w-full rounded p-3 text-red-500 border border-red-500 mb-5">
                Please fill the various field below before proceeding
              </p>
            ) : null}
            <LegalDocument
              formData={formData}
              updateFormData={updateFormData}
            />
          </div>
        );
      default:
        return (
          <div>
            {step1FieldsNotCompletelyFilled ? (
              <p className="w-full rounded p-3 text-red-500 border border-red-500 mb-5">
                Please fill the various field below before proceeding
              </p>
            ) : null}
            <CompanyInfo formData={formData} updateFormData={updateFormData} />
          </div>
        );
    }
  };

  return (
    <div>
      <nav className="flex justify-between items-center w-full bg-sky-600 p-4 mb-16">
        <img className="w-20 sm:w-24" src={Logo} alt="" />
        <Link
          className="self-end sm:hidden text-white sm:mr-5 sm:mt-5"
          to="/login"
          title="Close"
        >
          {" "}
          <X />{" "}
        </Link>
      </nav>
      <div className="max-w-4xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>Employer Profile Complete Form</CardTitle>
            <CardDescription>
              Complete all steps to register your company and post job
              opportunities
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              {renderStepIndicator()}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">
                  Step {currentStep}: {stepTitles[currentStep - 1].title}
                </h3>

                {renderCurrentStep()}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-2">
                <Button
                  className="hover:bg-gray-200"
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
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
                  className="border-transparent bg-green-500 text-gray-50
                  hover:bg-green-600"
                  type="submit"
                >
                  Submit <Check className="ml-2 h-4 w-4" />
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
            </CardFooter>
          </form>
        </Card>
        <Toaster />
      </div>
    </div>
  );
}
