import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_HOST_URL } from "@/utils/api/API_HOST";

export const useAutoLogin = () => {
  const [token, setToken] = useState(null);

  // Only run on client
  useEffect(() => {
    const getStoredKey = () => {
      const key =
        localStorage.getItem("NXGJOBHUBLOGINKEYV1") ||
        sessionStorage.getItem("NXGJOBHUBLOGINKEYV1");

      if (!key) return null;

      try {
        const parsedKey = JSON.parse(key);
        return parsedKey?.authKey || parsedKey;
      } catch (e) {
        console.error("Failed to parse login key from storage:", e);
        return null;
      }
    };

    const jwt = getStoredKey();
    setToken(jwt);
  }, []);

  return useQuery({
    queryKey: ["userType", token],
    queryFn: async () => {
      if (!token) throw new Error("No valid login token found");

      const response = await axios.get(`${API_HOST_URL}/api/v1/auth/get-user`, {
        headers: {
          authorization: token,
        },
      });

      return response.data;
    },
    enabled: !!token,
    retry: false,
  });
};
