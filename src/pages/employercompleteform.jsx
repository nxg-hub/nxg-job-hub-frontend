import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  ChevronLeft,
  ChevronRight,
  Building2,
  MapPin,
  Briefcase,
  FileText,
  Check,
  SkipForward,
  X,
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
import { useState } from "react";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
            navigate("/services-provider");
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
    { title: "Contact & Location", icon: MapPin },
    { title: "Job Details", icon: Briefcase },
    { title: "Legal Documents", icon: FileText },
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

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name *</Label>
          <Input
            id="companyName"
            value={formData.companyName}
            onChange={(e) => handleInputChange("companyName", e.target.value)}
            placeholder="Enter company name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="position">Position *</Label>
          <Input
            id="position"
            value={formData.position}
            onChange={(e) => handleInputChange("position", e.target.value)}
            placeholder="Enter position/job title"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="companyDescription">Company Description</Label>
        <Textarea
          id="companyDescription"
          value={formData.companyDescription}
          onChange={(e) =>
            handleInputChange("companyDescription", e.target.value)
          }
          placeholder="Describe your company..."
          rows={4}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="industryType">Industry Type</Label>
          <Select
            value={formData.industryType}
            onValueChange={(value) => handleInputChange("industryType", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="manufacturing">Manufacturing</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="companySize">Company Size</Label>
          <Select
            value={formData.companySize}
            onValueChange={(value) => handleInputChange("companySize", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select company size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-10">1-10 employees</SelectItem>
              <SelectItem value="11-50">11-50 employees</SelectItem>
              <SelectItem value="51-200">51-200 employees</SelectItem>
              <SelectItem value="201-500">201-500 employees</SelectItem>
              <SelectItem value="500+">500+ employees</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="companyAddress">Company Address *</Label>
        <Textarea
          id="companyAddress"
          value={formData.companyAddress}
          onChange={(e) => handleInputChange("companyAddress", e.target.value)}
          placeholder="Enter complete company address"
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="companyPhone">Company Phone *</Label>
          <Input
            id="companyPhone"
            value={formData.companyPhone}
            onChange={(e) => handleInputChange("companyPhone", e.target.value)}
            placeholder="Enter phone number"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="companyWebsite">Company Website</Label>
          <Input
            id="companyWebsite"
            value={formData.companyWebsite}
            onChange={(e) =>
              handleInputChange("companyWebsite", e.target.value)
            }
            placeholder="https://www.example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="country">Country *</Label>
          <Select
            value={formData.country}
            onValueChange={(value) => handleInputChange("country", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nigeria">Nigeria</SelectItem>
              <SelectItem value="ghana">Ghana</SelectItem>
              <SelectItem value="kenya">Kenya</SelectItem>
              <SelectItem value="south-africa">South Africa</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State *</Label>
          <Input
            id="state"
            value={formData.state}
            onChange={(e) => handleInputChange("state", e.target.value)}
            placeholder="Enter state"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="zipCode">Zip Code</Label>
          <Input
            id="zipCode"
            value={formData.zipCode}
            onChange={(e) => handleInputChange("zipCode", e.target.value)}
            placeholder="Enter zip code"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="companyZipCode">Company Zip Code</Label>
        <Input
          id="companyZipCode"
          value={formData.companyZipCode}
          onChange={(e) => handleInputChange("companyZipCode", e.target.value)}
          placeholder="Enter company zip code"
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="jobBoard">Job Board</Label>
          <Select
            value={formData.jobBoard}
            onValueChange={(value) => handleInputChange("jobBoard", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select job board" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="indeed">Indeed</SelectItem>
              <SelectItem value="glassdoor">Glassdoor</SelectItem>
              <SelectItem value="company-website">Company Website</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="vacancies">Number of Vacancies</Label>
          <Input
            id="vacancies"
            type="number"
            value={formData.vacancies}
            onChange={(e) => handleInputChange("vacancies", e.target.value)}
            placeholder="Enter number of positions"
            min="1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Job Location Address</Label>
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
          placeholder="Enter job location address"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="nationality">Preferred Nationality</Label>
        <Select
          value={formData.nationality}
          onValueChange={(value) => handleInputChange("nationality", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select nationality preference" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any Nationality</SelectItem>
            <SelectItem value="local">Local Citizens Only</SelectItem>
            <SelectItem value="specific">Specific Nationality</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="tin">Tax Identification Number (TIN) *</Label>
        <Input
          id="tin"
          value={formData.tin}
          onChange={(e) => handleInputChange("tin", e.target.value)}
          placeholder="Enter TIN"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="taxClearanceCertificate">
          Tax Clearance Certificate
        </Label>
        <Input
          id="taxClearanceCertificate"
          type="file"
          onChange={(e) =>
            handleInputChange("taxClearanceCertificate", e.target.files[0])
          }
          accept=".pdf,.jpg,.jpeg,.png"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="caccertificate">CAC Certificate</Label>
        <Input
          id="caccertificate"
          type="file"
          onChange={(e) =>
            handleInputChange("caccertificate", e.target.files[0])
          }
          accept=".pdf,.jpg,.jpeg,.png"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="companyMemorandum">Company Memorandum</Label>
        <Input
          id="companyMemorandum"
          type="file"
          onChange={(e) =>
            handleInputChange("companyMemorandum", e.target.files[0])
          }
          accept=".pdf,.jpg,.jpeg,.png"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="namesOfDirectors">Names of Directors</Label>
        <Textarea
          id="namesOfDirectors"
          value={formData.namesOfDirectors}
          onChange={(e) =>
            handleInputChange("namesOfDirectors", e.target.value)
          }
          placeholder="Enter names of company directors (one per line)"
          rows={4}
        />
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return renderStep1();
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
            <CardTitle>Employer Registration</CardTitle>
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
