import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const ProfileFormContext = createContext();

export function useProfileForm() {
  return useContext(ProfileFormContext);
}

export function ProfileFormProvider({ children }) {
  const [formData, setFormData] = useState({
    techId: "686e9c726cf1d4331f1b8c01",
    profilePicture: "",
    countryCode: "",
    state: "",
    city: "",
    zipCode: "",
    residentialAddress: "",
    linkedInUrl: "",
    location: "",
    resume: "",
    coverletter: "",
    bio: "",
    portfolioLink: "",
    jobInterest: "",
    verified: true,

    skills: [],
    highestQualification: "",
    experienceLevel: "",
    yearsOfExperience: 0,
    currentJob: "",
    jobType: "",
    workMode: "",

    professionalCert: "",
  });

  const updatePersonal = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const updateSkills = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const updateCertifications = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const submitProfile = async () => {
    try {
      const payload = {
        ...formData,
      };

      const response = await axios.put(
        `https://nxg-job-hub-backend.onrender.com/api/v1/tech-talent/${formData.techId}`,
        payload
      );

      toast.success("Profile submitted successfully");
    } catch (error) {
      toast.error("Error submitting profile");
      console.error(error);
    }
  };

  return (
    <ProfileFormContext.Provider
      value={{
        formData,
        updatePersonal,
        updateSkills,
        updateCertifications,
        submitProfile,
      }}
    >
      {children}
    </ProfileFormContext.Provider>
  );
}
