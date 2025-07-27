import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Loader2,
} from "lucide-react";
import { toast } from "../hooks/use-toast";
import { Button } from "../components/ui/button";
import { Toaster } from "../components/ui/toaster";
import { useTechTalentProfileUpdate } from "../hooks/Talent/talentHooks";
import RenderStepOneTalent from "../components/Talent/renderStepOneTalent";
import RenderStepTwoTalent from "../components/Talent/renderStepTwoTalent";
import RenderStepThreeTalent from "../components/Talent/renderStepThreeTalent";
import RenderStepFourTalent from "../components/Talent/renderStepFourTalent";

export function TechTalentProfileCompleteForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    techId: "", // Make sure to set this from props or useParams/useLocation
    skills: [],
    bio: "",
    highestQualification: "",
    experienceLevel: "",
    jobType: "",
    workMode: "",
    countryCode: "",
    resume: "",
    coverletter: "",
    state: "",
    professionalCert: "",
    linkedInUrl: "",
    residentialAddress: "",
    city: "",
    zipCode: "",
    location: "",
    currentJob: "",
    yearsOfExperience: 0,
    profilePicture: "",
    portfolioLink: "",
    jobInterest: "",
    verified: false,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [formError, setFormError] = useState(false);

  const { updateTechProfile, isLoading } = useTechTalentProfileUpdate();

  const stepFields = {
    1: ["bio", "skills", "jobInterest", "currentJob", "yearsOfExperience", "experienceLevel"],
    2: ["highestQualification", "professionalCert", "jobType", "workMode", "portfolioLink", "linkedInUrl"],
    3: ["residentialAddress", "city", "state", "zipCode", "countryCode", "location"],
    4: ["resume", "coverletter", "profilePicture"],
  };

  const totalSteps = 4;

  const isAllCurrentStepFieldFilled = () =>
    stepFields[currentStep].every((field) => {
      const value = formData[field];
      return Array.isArray(value)
        ? value.length > 0
        : value?.toString().trim() !== "";
    });

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

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (!formData.techId) {
      toast({
       title: "Error",
       description: "Tech ID is required to submit profile.",
       variant: "destructive",
      });
      return;
    }

    try {
      await updateTechProfile({
        techId: formData.techId,
        payload: formData,
      });

      toast({
       title: "Success",
       description: "Tech Talent profile updated successfully!",
      });
      navigate("/dashboard"); // optional redirect
    } catch (error) {
      toast({
       title: "Error", 
       description: "Failed to update Tech Talent profile.",
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

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-1">Complete Your Profile</h1>
      <p className="text-sm text-muted-foreground mb-6">
        All steps must be completed to activate your profile.
      </p>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg">
            Step {currentStep} of {totalSteps}
          </h2>
          <div className="text-xs text-gray-500">
            {((currentStep / totalSteps) * 100).toFixed(0)}% completed
          </div>
        </div>
        {renderCurrentStep()}
        {formError && (
          <p className="text-red-500 text-sm mt-2">
            Please fill in all required fields before proceeding.
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
        {currentStep > 1 && (
          <Button variant="outline" onClick={prevStep} className="w-full sm:w-auto">
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
        )}

        {currentStep < totalSteps ? (
          <Button onClick={nextStep} className="w-full sm:w-auto">
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin w-4 h-4" /> Submitting...
              </span>
            ) : (
              <span className="flex items-center">
                Submit <Check className="ml-2 w-4 h-4" />
              </span>
            )}
          </Button>
        )}
      </div>

      <Toaster />
    </div>
  );
}
