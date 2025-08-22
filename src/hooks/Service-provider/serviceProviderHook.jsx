import { useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_HOST_URL || "https://nxg-job-hub-backend.onrender.com";

const getAuthDetails = () => {
  try {
    const session = sessionStorage.getItem("NXGJOBHUBLOGINKEYV1");
    if (!session) return { id: null, token: null };
    const parsed = JSON.parse(session);
    return { id: parsed.id, token: parsed.authKey }; // token includes "Bearer "
  } catch {
    return { id: null, token: null };
  }
};

export const useServiceProviderProfileUpdate = () => {
  const [isLoading, setIsLoading] = useState(false);

  const updateServiceProviderProfile = async (formDataPayload) => {
    setIsLoading(true);

    const { id, token: authToken } = getAuthDetails();

    if (!authToken || !id) {
      throw new Error("Authentication token or Service Provider ID not found. Please login again.");
    }

    try {
      // Remove serviceProviderId from payload — backend only expects it in URL
      const payload = { ...formDataPayload };
      delete payload.serviceProviderId;

      if (import.meta.env.DEV) {
        console.log("Payload to send:", JSON.stringify(payload, null, 2));
      }

      const response = await axios.put(
        `${API_BASE_URL}/api/service-providers/${id}/update-service-provider`,
        payload,
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
      if (error.response) {
        console.error("Backend response status:", error.response.status);
        console.error("Backend response data:", error.response.data);
      } else {
        console.error("Error message:", error.message);
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateServiceProviderProfile, isLoading };
};
