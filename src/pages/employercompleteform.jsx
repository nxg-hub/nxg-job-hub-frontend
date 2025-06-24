import { useState, useEffect, useRef } from "react";
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
  CirclePlus,
  Trash,
  Import,
  Loader2,
  CheckCheck,
  Plus,
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
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { cn, getUserUsingAuthKey, updateUserProfile } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { API_HOST_URL } from "@/utils/api/API_HOST";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import pdfIcon from "@/static/icons/pdf.png";
import axios from "axios";
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
} from "@/lib/CLOUDINARY_API";
import { Badge } from "@/components/ui/badge";

const nigerianStates = [
  { value: "Abia", label: "Abia" },
  { value: "Adamawa", label: "Adamawa" },
  { value: "Akwa Ibom", label: "Akwa Ibom" },
  { value: "Anambra", label: "Anambra" },
  { value: "Bauchi", label: "Bauchi" },
  { value: "Bayelsa", label: "Bayelsa" },
  { value: "Benue", label: "Benue" },
  { value: "Borno", label: "Borno" },
  { value: "Cross River", label: "Cross River" },
  { value: "Delta", label: "Delta" },
  { value: "Ebonyi", label: "Ebonyi" },
  { value: "Edo", label: "Edo" },
  { value: "Ekiti", label: "Ekiti" },
  { value: "Enugu", label: "Enugu" },
  { value: "Gombe", label: "Gombe" },
  { value: "Imo", label: "Imo" },
  { value: "Jigawa", label: "Jigawa" },
  { value: "Kaduna", label: "Kaduna" },
  { value: "Kano", label: "Kano" },
  { value: "Katsina", label: "Katsina" },
  { value: "Kebbi", label: "Kebbi" },
  { value: "Kogi", label: "Kogi" },
  { value: "Kwara", label: "Kwara" },
  { value: "Lagos", label: "Lagos" },
  { value: "Nasarawa", label: "Nasarawa" },
  { value: "Niger", label: "Niger" },
  { value: "Ogun", label: "Ogun" },
  { value: "Ondo", label: "Ondo" },
  { value: "Osun", label: "Osun" },
  { value: "Oyo", label: "Oyo" },
  { value: "Plateau", label: "Plateau" },
  { value: "Rivers", label: "Rivers" },
  { value: "Sokoto", label: "Sokoto" },
  { value: "Taraba", label: "Taraba" },
  { value: "Yobe", label: "Yobe" },
  { value: "Zamfara", label: "Zamfara" },
  { value: "FCT", label: "Abuja" },
];

export function EmployerProfileCompletionForm() {
  const isAuthenticated = useAuthRedirect("NXGJOBHUBLOGINKEYV1", "/login");
  const navigate = useNavigate();
  const [vacancyInput, setVacancyInput] = useState("");
  const [directorNameInput, setDirectorNameInput] = useState("");
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
    vacancies: [],
    position: "",
    jobBoard: "",

    // Legal & Compliance
    tin: "",
    taxClearanceCertificate: null,
    caccertificate: null,
    namesOfDirectors: [],
    companyMemorandum: null,
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  useEffect(() => {
    const authKey = JSON.parse(isAuthenticated)?.authKey;
    if (authKey) {
      getUserUsingAuthKey(authKey)
        .then((data) => {
          if (data.userType && data.userType === "EMPLOYER" && !data.verified) {
            return;
          } else {
            navigate("/login");
          }
        })
        .catch((error) => {
          console.log(error);
          // navigate("/employer");
        });
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return null;
  }

  const updateFormData = (dataField) => {
    setFormData((prev) => ({
      ...prev,
      ...dataField,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleSelectedChange = (name, value) => {
    updateFormData({ [name]: value });
  };

  const handleAddVacancy = (newVacancy) => {
    setFormData((prev) => ({
      ...prev,
      vacancies: [...prev.vacancies, newVacancy],
    }));
  };

  const handleRemoveVacancy = (vacancyToRemove) => {
    setFormData((prev) => ({
      ...prev,
      vacancies: prev.vacancies.filter(
        (_, vacancy) => vacancy !== vacancyToRemove
      ),
    }));
  };

  const handleAddDirector = (director) => {
    setFormData((prev) => ({
      ...prev,
      namesOfDirectors: [...prev.namesOfDirectors, director],
    }));
  };

  const handleRemoveDirector = (directorRemove) => {
    setFormData((prev) => ({
      ...prev,
      namesOfDirectors: prev.namesOfDirectors.filter(
        (_, director) => director !== directorRemove
      ),
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
      title: <p className="text-red-600">Profile not completed!</p>,
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
          Yes
        </ToastAction>
      ),
    });
  };

  const verifyFormFilledCompletely = () => {
    return (
      !formData.companyName ||
      !formData.companyDescription ||
      !formData.country ||
      !formData.state ||
      !formData.companyZipCode ||
      !formData.industryType ||
      !formData.companySize ||
      !formData.companyAddress ||
      !formData.companyPhone ||
      !formData.companyWebsite ||
      !formData.vacancies ||
      !formData.position ||
      !formData.jobBoard ||
      !formData.tin ||
      !formData.taxClearanceCertificate ||
      !formData.caccertificate ||
      !formData.namesOfDirectors ||
      !formData.companyMemorandum
    );
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
      // tin: formData.tin,
      taxClearanceCertificate: formData.taxClearanceCertificate,
      caccertificate: formData.caccertificate,
      namesOfDirectors: formData.namesOfDirectors,
      companyMemorandum: formData.companyMemorandum,
    };

    console.log(
      "Submitting.....",
      JSON.stringify(extractNonEmptyValues(payload))
    );

    if (verifyFormFilledCompletely) {
      console.log(
        "Submitting.....",
        JSON.stringify(extractNonEmptyValues(payload))
      );

      const storeValueObj =
        localStorage.getItem("NXGJOBHUBLOGINKEYV1") ||
        sessionStorage.getItem("NXGJOBHUBLOGINKEYV1");

      const userId = JSON.parse(storeValueObj)?.id;

      try {
        const { data, status } = await updateUserProfile(
          `${API_HOST_URL}/api/employers`,
          userId,
          JSON.stringify(extractNonEmptyValues(payload))
        );
        console.log(`Responses => ${data} - ${status}`);
        toast({
          className: cn(
            "top-10 right-4 flex fixed max-w-[400px] md:max-w-[420px]"
          ),
          title: "Profile completed",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-green-700 p-4">
              <code className="text-white">
                You have successfully complete your profile
              </code>
            </pre>
          ),
          duration: 2500,
        });

        setTimeout(() => {
          // navigate("/employer");
        }, 3000);
      } catch (error) {
        console.error("Profile update error", error);
      }
    } else {
      setStep4FieldsNotCompletelyFilled(true);
      return;
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

  const renderStep1 = () => (
    <div>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name:</Label>
          <Input
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            placeholder="Enter company name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="companyDescription">Company Description:</Label>
          <Textarea
            id="companyDescription"
            name="companyDescription"
            value={formData.companyDescription}
            onChange={handleInputChange}
            placeholder="Describe your company, its mission, and values..."
            className="min-h-[120px]"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="country">Country:</Label>
            <Select
              value={formData.country}
              onValueChange={(value) => handleSelectedChange("country", value)}
            >
              <SelectTrigger className="font-normal">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ng">Nigeria</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State:</Label>
            <Select
              value={formData.state}
              onValueChange={(value) => handleSelectedChange("state", value)}
            >
              <SelectTrigger className="font-normal">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                {nigerianStates.map((state) => (
                  <SelectItem key={state.value} value={state.value}>
                    {state.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyZipCode">Company Zip Code:</Label>
            <Input
              id="companyZipCode"
              name="companyZipCode"
              value={formData.companyZipCode}
              onChange={handleInputChange}
              placeholder="12345"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="industryType">Industry Type:</Label>
            <Select
              value={formData.industryType}
              onValueChange={(value) =>
                handleSelectedChange("industryType", value)
              }
            >
              <SelectTrigger className="font-normal">
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="consulting">Consulting</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="companySize">Company Size:</Label>
            <Select
              value={formData.companySize}
              onValueChange={(value) =>
                handleSelectedChange("companySize", value)
              }
            >
              <SelectTrigger className="font-normal">
                <SelectValue placeholder="Select company size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-10">1-10 employees</SelectItem>
                <SelectItem value="11-50">11-50 employees</SelectItem>
                <SelectItem value="51-200">51-200 employees</SelectItem>
                <SelectItem value="201-500">201-500 employees</SelectItem>
                <SelectItem value="501-1000">501-1000 employees</SelectItem>
                <SelectItem value="1000+">1000+ employees</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="companyAddress">Company Address</Label>
          <Textarea
            id="companyAddress"
            name="companyAddress"
            value={formData.companyAddress}
            onChange={handleInputChange}
            placeholder="Enter complete company address"
            className="min-h-[80px]"
          />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="companyPhone">Company Phone</Label>
            <Input
              id="companyPhone"
              name="companyPhone"
              value={formData.companyPhone}
              onChange={handleInputChange}
              placeholder="+1 (555) 123-4567"
              type="tel"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyWebsite">Company Website</Label>
            <Input
              id="companyWebsite"
              name="companyWebsite"
              value={formData.companyWebsite}
              onChange={handleInputChange}
              placeholder="https://www.company.com"
              type="url"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="vacancies">Vacancies</Label>
          <div className="flex gap-5">
            <Input
              id="vacancies"
              name="vacancies"
              value={vacancyInput}
              onChange={(e) => setVacancyInput(e.target.value)}
              placeholder="Enter available vacancy"
            />
            <Button
              className="border-transparent bg-gray-200 text-gray-800"
              onClick={(e) => {
                e.preventDefault();
                if (vacancyInput.trim() !== "") {
                  handleAddVacancy(vacancyInput.trim());
                  setVacancyInput("");
                }
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {/* Display available vacancies */}
          {formData.vacancies.length > 0 ? (
            <div className="border-[1px] py-4 px-8 rounded space-y-2">
              <Label>Available vacancies</Label>
              <div className="flex flex-wrap gap-2">
                {formData.vacancies.map((vacancy, index) => (
                  <Badge
                    key={index}
                    className="px-3 py-1 text-sm flex items-center gap-2"
                  >
                    {vacancy}
                    <Button
                      size="sm"
                      className="border-transparent h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => handleRemoveVacancy(index)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {vacancy}</span>
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          ) : (
            <div className="border-[1px] p-8 rounded text-center text-sm text-gray-400 italic">
              No Vacancy added yet
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="position">Position *</Label>
            <Input
              id="position"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              placeholder="Enter position/job title"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="jobBoard">Preferred Job Board</Label>
            <Input
              id="jobBoard"
              name="jobBoard"
              value={formData.jobBoard}
              onChange={handleInputChange}
              placeholder="Enter position/job title"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="tin">Tax Clearance Number(TIN)</Label>
        <Input
          id="tin"
          name="tin"
          value={formData.tin}
          onChange={handleInputChange}
          placeholder="CAC registration number"
        />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FileInput
          id="taxClearanceCertificate"
          label="Tax Clearance Certificate"
          description="TIN certificate file"
          file_secure_url={formData.taxClearanceCertificate}
        />
        <FileInput
          id="caccertificate"
          label="CAC Certificate"
          description="CAC certificate file"
          file_secure_url={formData.caccertificate}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="namesOfDirectors">Name of Directors</Label>
        <div className="w-full flex gap-5">
          <Input
            id="directorName"
            value={directorNameInput}
            onChange={(e) => setDirectorNameInput(e.target.value)}
            placeholder="Enter director's name"
          />
          <Button
            className="border-transparent bg-gray-200 text-gray-800"
            onClick={(e) => {
              e.preventDefault();
              if (directorNameInput.trim() !== "") {
                handleAddDirector(directorNameInput.trim());
                setDirectorNameInput("");
              }
            }}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {formData.namesOfDirectors.length > 0 ? (
          <div className="border-[1px] py-4 px-8 rounded space-y-2">
            <p className="italic text-gray-70 text-sm">Name of Director's</p>
            <div className="flex flex-wrap gap-2">
              {formData.namesOfDirectors.map((director, index) => (
                <div
                  key={index}
                  className="shadow px-3 pr-6 py-2 text-sm flex items-center gap-10 rounded-sm"
                >
                  <div className="flex flex-col gap-20 px-5">
                    <div className="flex flex-col">
                      {" "}
                      <p className="text-gray-400 text-xs ml-10 mb-0">Name</p>
                      <p>{director}</p>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    className="border-transparent h-4 w-4 p-0 bg-red-400 hover:bg-red-500"
                    onClick={() => handleRemoveDirector(index)}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {director.name}</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="border-[1px] p-8 rounded text-center text-sm text-gray-400 italic">
            No Director's added yet
          </div>
        )}
      </div>
      <FileInput
        id="companyMemorandum"
        label="Company memorandum file"
        description="Memorandum file"
        file_secure_url={formData.companyMemorandum}
      />
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
            {renderStep1()}
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
            {renderStep2()}
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
            {renderStep3()}
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
            {renderStep4()}
          </div>
        );
      default:
        return null;
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

const FileInput = ({ id, label, description, file_secure_url }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadToCloudSuccessful, setUploadToCloudSuccessful] = useState(false);
  const fileInputRef = useRef(null);
  const cloudinary_preset = CLOUDINARY_UPLOAD_PRESET;
  const cloudinary_name = CLOUDINARY_CLOUD_NAME;

  const storeValueObj =
    localStorage.getItem("NXGJOBHUBLOGINKEYV1") ||
    sessionStorage.getItem("NXGJOBHUBLOGINKEYV1");

  const userId = JSON.parse(storeValueObj)?.id;

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleRemoveClick = () => {
    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleSaveTocloud = async () => {
    if (!selectedFile) {
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", cloudinary_preset);

      //storing file into cloudinary and get the file url path
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinary_name}/raw/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/formdata",
          },
        }
      );

      const { secure_url } = response.data;
      console.log(`Cloudinary upload successful for ${id}`, secure_url);
      if (secure_url) {
        setUploadToCloudSuccessful(true);
        file_secure_url = secure_url;
      }

      const payload = {
        [id]: secure_url,
      };

      console.log(JSON.stringify(payload));

      //update employer profile by adding the cloudinary url path
      const { data, status } = await updateUserProfile(
        `${API_HOST_URL}/api/employers`,
        userId,
        JSON.stringify(payload)
      );

      if (status === 200) {
        toast({
          className: cn(
            "top-10 right-4 flex fixed max-w-[400px] md:max-w-[420px]"
          ),
          title: <p className="text-green-600">Saved</p>,
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-green-100 p-4">
              <code className="text-gray-800">File saved successfully</code>
            </pre>
          ),
          duration: 2500,
        });
        console.log(data);
      }
    } catch (error) {
      if (!error.response) {
        toast({
          className: cn(
            "flex flex-col space-y-5 items-start top-10 right-4 flex fixed max-w-[400px] md:max-w-[420px]"
          ),
          title: <p className="text-red-700">Failed to save</p>,
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-red-100 p-4">
              <code className="text-gray-800">
                {error?.message || "Unknown error"}
              </code>
            </pre>
          ),
        });
      }
      if (error.response) {
        toast({
          className: cn(
            "flex flex-col space-y-5 items-start top-10 right-4 flex fixed max-w-[400px] md:max-w-[420px]"
          ),
          title: <p className="text-red-700">Failed to save</p>,
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-red-100 p-4">
              <code className="text-gray-800">
                {error.response?.data?.error?.message || "Unknown error"}
              </code>
            </pre>
          ),
        });
      }

      console.error(`Error uploading file ${id} to cloudinary :`, error);
    }
    setTimeout(() => {
      setIsUploading(false);
    }, 3000);
  };
  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      <div className="flex flex-col gap-5 border-[1px] shadow-sm rounded p-8">
        <div className="flex flex-col items-center gap-1">
          <Label className="cursor-pointer" htmlFor={id}>
            <CirclePlus className="h-8 w-8 text-gray-400" />
          </Label>
          <div className=" font-medium text-sm text-gray-500 italic">
            <Label
              className="cursor-pointer text-primary hover:underline "
              htmlFor={id}
            >
              Click here to choose your
            </Label>{" "}
            {description}
          </div>
          <p className=" text-xs text-gray-400">
            (Only PDF file format not more than 10MB is required)
          </p>
        </div>
        {selectedFile && !uploadToCloudSuccessful && (
          <div className="w-full flex flex-col items-center justify-between  gap-4 ">
            <div className="flex">
              <img className="w-8 h-8" src={pdfIcon} alt="" />
              <span className="truncate">{selectedFile?.name}</span>
            </div>
            <div className="flex gap-10">
              <Button
                type="button"
                onClick={handleSaveTocloud}
                className="flex  gap-2  border-transparent bg-primary text-white px-6 py-2 text-sm hover:bg-secondary"
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Import className="h-8 w-8" />
                    Save
                  </>
                )}
              </Button>
              <Button
                disabled={isUploading}
                type="button"
                onClick={handleRemoveClick}
                className=" text-sm border-transparent text-red-600 bg-red-100 hover:bg-red-200 hover:text-red-600"
              >
                <Trash className="h-8 w-8" />
                Remove
              </Button>
            </div>
          </div>
        )}
        {uploadToCloudSuccessful && (
          <div className="w-full flex  items-center justify-center  gap-4 ">
            <div className="flex">
              <img className="w-5 h-5" src={pdfIcon} alt="" />
              <span className="w-[200px] truncate">{selectedFile?.name}</span>
              <Badge className=" space-x-2">
                <span className="text-xs"> Saved</span>
                <CheckCheck className="w-4 h-4" />
              </Badge>
            </div>
          </div>
        )}
        <Input
          ref={fileInputRef}
          id={id}
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
};
