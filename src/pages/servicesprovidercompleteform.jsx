import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Check, Loader2 } from "lucide-react";
import { toast } from "../hooks/use-toast";
import { Button } from "../components/ui/button";
import { Toaster } from "../components/ui/toaster";

import ServiceProviderStepOne from "../components/ServiceProvider/renderStepOne";
import ServiceProviderStepTwo from "../components/ServiceProvider/renderStepTwo";
import ServiceProviderStepThree from "../components/ServiceProvider/renderStepThree";

import { useServiceProviderProfileUpdate } from "../hooks/Service-provider/serviceProviderHook";

export function ServiceProviderProfileCompleteForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mainSkill: "", // required
    subSkills: [],
    education: {
      highestQualification: "",
      schoolName: "",
      schoolYear: "",
      schoolLocation: "",
      schoolDescription: "",
    },
    workExperiences: [],
    additionalInfo: "",
    preferredContact: "",
    interests: [],
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [formError, setFormError] = useState(false);
  const [debugMode, setDebugMode] = useState(true); // Enable debug mode for testing

  const { updateServiceProviderProfile, isLoading } =
    useServiceProviderProfileUpdate();

  useEffect(() => {
    const session = sessionStorage.getItem("NXGJOBHUBLOGINKEYV1");
    if (!session) {
      toast({
        title: "Authentication Required",
        description: "Please login to complete your profile.",
        variant: "destructive",
      });
      return;
    }
    try {
      const parsed = JSON.parse(session);
      const id = parsed.id;
      const email = "";
      if (!id) {
        toast({
          title: "Session Error",
          description: "Unable to retrieve user ID. Please login again.",
          variant: "destructive",
        });
        return;
      }
      setFormData((prev) => ({ ...prev, serviceProviderId: id, email }));
    } catch {
      toast({
        title: "Session Error",
        description: "Invalid session data. Please login again.",
        variant: "destructive",
      });
    }
  }, []);

  // Updated stepFields to use flattened education properties
  const stepFields = {
    1: ["mainSkill", "subSkills"],
    2: [
      "preferredContact",
      "education.highestQualification",
      "education.schoolName",
      "education.schoolYear",
      "education.schoolLocation",
      "education.schoolDescription",
      "interests",
      "additionalInfo",
    ],
    3: ["workExperiences", "address", "city", "state", "zipCode"],
  };

  const getValueByPath = (obj, path) => {
    return path
      .split(".")
      .reduce((acc, key) => (acc ? acc[key] : undefined), obj);
  };

  const isAllCurrentStepFieldFilled = () => {
    // In debug mode, skip validation for step navigation
    if (debugMode) return true;

    const fields = stepFields[currentStep];
    return fields.every((field) => {
      const value = getValueByPath(formData, field);
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return (
        value !== undefined && value !== null && value.toString().trim() !== ""
      );
    });
  };

  const validateAllSteps = () => {
    // In debug mode, skip validation for submission
    if (debugMode) {
      return { isValid: true };
    }

    for (let step = 1; step <= 3; step++) {
      const fields = stepFields[step];
      const isValid = fields.every((field) => {
        const value = getValueByPath(formData, field);
        if (Array.isArray(value)) {
          return value.length > 0;
        }
        return (
          value !== undefined &&
          value !== null &&
          value.toString().trim() !== ""
        );
      });
      if (!isValid) {
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
        description:
          "Make sure you've completed all mandatory inputs for this step.",
        variant: "destructive",
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setFormError(false);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!formData.serviceProviderId) {
      toast({
        title: "Error",
        description: "Service Provider ID missing. Please login again.",
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
        description: `Please complete all required fields in Step ${validation.invalidStep} before submitting.`,
        variant: "destructive",
      });
      return;
    }

    try {
      // Log the payload for debugging
      console.log("Submitting payload:", JSON.stringify(formData, null, 2));

      await updateServiceProviderProfile(formData);
      toast({
        title: "Success",
        description: "Service Provider profile updated successfully!",
      });
      setFormError(false);
      setTimeout(() => navigate("/services-provider"), 1500);
    } catch (error) {
      // Enhanced error logging for debugging
      console.error("Submission error:", error);
      console.error("Error response:", error?.response?.data);
      console.error("Error message:", error?.message);

      toast({
        title: "Update Failed",
        description:
          error?.response?.data?.message ||
          error?.message ||
          "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderCurrentStep = () => {
    const props = { formData, setFormData, formError };

    switch (currentStep) {
      case 1:
        return <ServiceProviderStepOne {...props} />;
      case 2:
        return <ServiceProviderStepTwo {...props} />;
      case 3:
        return <ServiceProviderStepThree {...props} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-1">
        Complete Your Service Provider Profile
      </h1>
      <p className="text-sm text-muted-foreground mb-6">
        Please complete all steps to activate your profile.
      </p>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg">Step {currentStep} of 3</h2>
          <div className="text-xs text-gray-500">
            {((currentStep / 3) * 100).toFixed(0)}% completed
          </div>
        </div>

        {renderCurrentStep()}

        {formError && !debugMode && (
          <p className="text-red-500 text-sm mt-2">
            Please fill in all required fields before proceeding.
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
        {currentStep > 1 && (
          <Button
            variant="outline"
            onClick={prevStep}
            className="w-full sm:w-auto"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
        )}

        <div className="flex-1" />

        {currentStep < 3 ? (
          <Button onClick={nextStep} className="w-full sm:w-auto">
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !formData.serviceProviderId}
            className="w-full sm:w-auto"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin w-4 h-4" /> Submitting...
              </span>
            ) : (
              <span className="flex items-center">
                {debugMode ? "Test Submit" : "Submit"}{" "}
                <Check className="ml-2 w-4 h-4" />
              </span>
            )}
          </Button>
        )}
      </div>

      <Toaster />
    </div>
  );
}

("use client");

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Check, Loader2 } from "lucide-react";
import { toast } from "../hooks/use-toast";
import { Button } from "../components/ui/button";
import { Toaster } from "../components/ui/toaster";

import ServiceProviderStepOne from "../components/ServiceProvider/renderStepOne";
import ServiceProviderStepTwo from "../components/ServiceProvider/renderStepTwo";
import ServiceProviderStepThree from "../components/ServiceProvider/renderStepThree";

import { useServiceProviderProfileUpdate } from "../hooks/Service-provider/serviceProviderHook";

export function ServiceProviderProfileCompleteForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mainSkill: "", // required
    subSkills: [],
    education: {
      highestQualification: "",
      schoolName: "",
      schoolYear: "",
      schoolLocation: "",
      schoolDescription: "",
    },
    workExperiences: [],
    additionalInfo: "",
    preferredContact: "",
    interests: [],
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [formError, setFormError] = useState(false);
  const [debugMode, setDebugMode] = useState(true); // Enable debug mode for testing

  const { updateServiceProviderProfile, isLoading } =
    useServiceProviderProfileUpdate();

  useEffect(() => {
    const session = sessionStorage.getItem("NXGJOBHUBLOGINKEYV1");
    if (!session) {
      toast({
        title: "Authentication Required",
        description: "Please login to complete your profile.",
        variant: "destructive",
      });
      return;
    }
    try {
      const parsed = JSON.parse(session);
      const id = parsed.id;
      const email = "";
      if (!id) {
        toast({
          title: "Session Error",
          description: "Unable to retrieve user ID. Please login again.",
          variant: "destructive",
        });
        return;
      }
      setFormData((prev) => ({ ...prev, serviceProviderId: id, email }));
    } catch {
      toast({
        title: "Session Error",
        description: "Invalid session data. Please login again.",
        variant: "destructive",
      });
    }
  }, []);

  // Updated stepFields to use flattened education properties
  const stepFields = {
    1: ["mainSkill", "subSkills"],
    2: [
      "preferredContact",
      "education.highestQualification",
      "education.schoolName",
      "education.schoolYear",
      "education.schoolLocation",
      "education.schoolDescription",
      "interests",
      "additionalInfo",
    ],
    3: ["workExperiences", "address", "city", "state", "zipCode"],
  };

  const getValueByPath = (obj, path) => {
    return path
      .split(".")
      .reduce((acc, key) => (acc ? acc[key] : undefined), obj);
  };

  const isAllCurrentStepFieldFilled = () => {
    // In debug mode, skip validation for step navigation
    if (debugMode) return true;

    const fields = stepFields[currentStep];
    return fields.every((field) => {
      const value = getValueByPath(formData, field);
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return (
        value !== undefined && value !== null && value.toString().trim() !== ""
      );
    });
  };

  const validateAllSteps = () => {
    // In debug mode, skip validation for submission
    if (debugMode) {
      return { isValid: true };
    }

    for (let step = 1; step <= 3; step++) {
      const fields = stepFields[step];
      const isValid = fields.every((field) => {
        const value = getValueByPath(formData, field);
        if (Array.isArray(value)) {
          return value.length > 0;
        }
        return (
          value !== undefined &&
          value !== null &&
          value.toString().trim() !== ""
        );
      });
      if (!isValid) {
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
        description:
          "Make sure you've completed all mandatory inputs for this step.",
        variant: "destructive",
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setFormError(false);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!formData.serviceProviderId) {
      toast({
        title: "Error",
        description: "Service Provider ID missing. Please login again.",
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
        description: `Please complete all required fields in Step ${validation.invalidStep} before submitting.`,
        variant: "destructive",
      });
      return;
    }

    try {
      // Log the payload for debugging
      console.log("Submitting payload:", JSON.stringify(formData, null, 2));

      await updateServiceProviderProfile(formData);
      toast({
        title: "Success",
        description: "Service Provider profile updated successfully!",
      });
      setFormError(false);
      setTimeout(() => navigate("/services-provider"), 1500);
    } catch (error) {
      // Enhanced error logging for debugging
      console.error("Submission error:", error);
      console.error("Error response:", error?.response?.data);
      console.error("Error message:", error?.message);

      toast({
        title: "Update Failed",
        description:
          error?.response?.data?.message ||
          error?.message ||
          "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderCurrentStep = () => {
    const props = { formData, setFormData, formError };

    switch (currentStep) {
      case 1:
        return <ServiceProviderStepOne {...props} />;
      case 2:
        return <ServiceProviderStepTwo {...props} />;
      case 3:
        return <ServiceProviderStepThree {...props} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-1">
        Complete Your Service Provider Profile
      </h1>
      <p className="text-sm text-muted-foreground mb-6">
        Please complete all steps to activate your profile.
      </p>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg">Step {currentStep} of 3</h2>
          <div className="text-xs text-gray-500">
            {((currentStep / 3) * 100).toFixed(0)}% completed
          </div>
        </div>

        {renderCurrentStep()}

        {formError && !debugMode && (
          <p className="text-red-500 text-sm mt-2">
            Please fill in all required fields before proceeding.
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
        {currentStep > 1 && (
          <Button
            variant="outline"
            onClick={prevStep}
            className="w-full sm:w-auto"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
        )}

        <div className="flex-1" />

        {currentStep < 3 ? (
          <Button onClick={nextStep} className="w-full sm:w-auto">
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !formData.serviceProviderId}
            className="w-full sm:w-auto"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin w-4 h-4" /> Submitting...
              </span>
            ) : (
              <span className="flex items-center">
                {debugMode ? "Test Submit" : "Submit"}{" "}
                <Check className="ml-2 w-4 h-4" />
              </span>
            )}
          </Button>
        )}
      </div>

      <Toaster />
    </div>
  );
}
