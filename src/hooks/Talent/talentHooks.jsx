import { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_HOST_URL || 'https://nxg-job-hub-backend.onrender.com';

// Get auth token and tech ID from session storage
const getAuthDetails = () => {
  try {
    const session = sessionStorage.getItem("NXGJOBHUBLOGINKEYV1");
    console.log("Hook - Raw session storage:", session); // Debug log
    
    if (!session) {
      console.error("Hook - No session storage found");
      return { techId: null, token: null };
    }

    const parsed = JSON.parse(session);
    console.log("Hook - Parsed session data:", parsed); // Debug log
    
    const token = parsed.authKey; // Already includes "Bearer ..."
    const techId = parsed.id;
    
    console.log("Hook - Extracted token:", token ? "Present" : "Missing");
    console.log("Hook - Extracted techId:", techId);

    return { techId, token };
  } catch (error) {
    console.error('Hook - Failed to parse session storage:', error);
    return { techId: null, token: null };
  }
};

export const useTechTalentProfileUpdate = () => {
  const [isLoading, setIsLoading] = useState(false);

  const updateTechProfile = async (formDataPayload) => {
    setIsLoading(true);

    const { techId, token: authToken } = getAuthDetails();

    if (!authToken || !techId) {
      throw new Error("Authentication token or tech ID not found. Please login again.");
    }

    try {
      // Remove file fields
      const { resume, coverletter, profilePicture, ...profileData } = formDataPayload;

      // Add techId to payload as required by backend
      profileData.techId = techId;

      const response = await axios.put(
        `${API_BASE_URL}/api/v1/tech-talent/${techId}`,
        profileData,
        {
          headers: {
            Authorization: authToken,
            'Content-Type': 'application/json', 
          },
          timeout: 60000,
        }
      );

      return response.data;
    } catch (error) {
      console.error("Profile update error:", error?.response?.data || error.message);

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateTechProfile, isLoading };
};
