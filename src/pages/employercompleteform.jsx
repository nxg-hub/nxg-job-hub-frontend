import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { cn, getUserUsingAuthKey } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useState } from "react";

import CompanyInfo from "@/components/Employer/Profile/companyInfo";
import ContactInfo from "@/components/Employer/Profile/contactInfo";
import LegalDocument from "@/components/Employer/Profile/legalDocument";
import Jobs from "@/components/Employer/Profile/jobs";
import userAuthRedirect from "@/hooks/useAuthRedirect";

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

export function EmployerProfileCompletionForm() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Company Information
    companyName: "",
    companyDescription: "",
    position: "",
    industryType: "",
    companySize: "",

    // Contact & Location
    companyAddress: "",
    companyPhone: "",
    companyWebsite: "",
    country: "",
    state: "",
    zipCode: "",
    companyZipCode: "",

    // Job Details
    jobBoard: "",
    address: "",
    nationality: "",
    vacancies: "",

    // Legal Documents
    taxClearanceCertificate: "",
    namesOfDirectors: "",
    companyMemorandum: "",
    caccertificate: "",
    tin: "",
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const isAuthenticated = userAuthRedirect("NXGJOBHUBLOGINKEYV1", "/login");

  if (!isAuthenticated) {
    return null;
  }
  if (isAuthenticated) {
    getUserUsingAuthKey(isAuthenticated.authKey)
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

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
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
            navigate("/employer");
          }}
          altText="Skip action"
          className="border-none bg-red-500 hover:bg-red-700"
        >
          Skip
        </ToastAction>
      ),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
    alert("Employer registration submitted successfully!");
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
                    ? "bg-green-500 text-white"
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
        return <CompanyInfo />;
      case 2:
        return <ContactInfo />;
      case 3:
        return <Jobs />;
      case 4:
        return <LegalDocument />;
      default:
        return <CompanyInfo />;
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
        </Card>
        <Toaster />
      </div>
    </div>
  );
}
