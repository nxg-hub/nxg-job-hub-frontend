import { useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_HOST_URL || "https://nxg-job-hub-backend.onrender.com";

const getAuthDetails = () => {
  try {
    const session = sessionStorage.getItem("NXGJOBHUBLOGINKEYV1");
    if (!session) return { id: null, token: null };
    const parsed = JSON.parse(session);
    return { id: parsed.id, token: parsed.authKey };
  } catch {
    return { id: null, token: null };
  }
};

export const useServiceProviderProfileUpdate = () => {
  const [isLoading, setIsLoading] = useState(false);

  const updateServiceProviderProfile = async (apiPayload) => {
    setIsLoading(true);

    const { id, token: authToken } = getAuthDetails();

    if (!authToken || !id) {
      throw new Error("Authentication token or Service Provider ID not found. Please login again.");
    }

    try {
      // The payload is already cleaned and API-ready from the form component
      console.log("Sending API payload:", JSON.stringify(apiPayload, null, 2));
      
      const response = await axios.put(
        `${API_BASE_URL}/api/service-providers/${id}/update-service-provider`,
        apiPayload,
        {
          headers: {
            Authorization: authToken,
            "Content-Type": "application/json",
          },
          timeout: 60000,
        }
      );

      return response.data;
    } catch (error) {
      // Enhanced error logging
      if (error.response) {
        console.error("API Error Details:");
        console.error("Status:", error.response.status);
        console.error("Response Data:", error.response.data);
        console.error("Request URL:", error.config?.url);
        console.error("Payload sent:", JSON.stringify(apiPayload, null, 2));
      } else if (error.request) {
        console.error("Network Error - No response received:", error.request);
      } else {
        console.error("Error:", error.message);
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateServiceProviderProfile, isLoading };
};