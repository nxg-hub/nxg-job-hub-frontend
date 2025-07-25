import { API_HOST_URL } from "@/utils/api/API_HOST";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useAutoLogin = ({ enabled = true } = {}) => {
  //retrieve stored key
  const getStoredKey = () => {
    let key =
      localStorage.getItem("NXGJOBHUBLOGINKEYV1") ||
      sessionStorage.getItem("NXGJOBHUBLOGINKEYV1");

    if (!key) {
      return null;
    }

    try {
      const parseKey = JSON.parse(key);
      return parseKey?.authKey || parseKey;
    } catch (e) {
      console.error("Failed to parse login key from storage:", e);
      return null;
    }
  };

  const storeJwtToken = getStoredKey();

  return useQuery({
    queryKey: ["userType", storeJwtToken],
    queryFn: async ({ queryKey }) => {
      const [_key, token] = queryKey;

      if (!token) {
        throw new Error("No valid login token found");
      }

      const response = await axios.get(`${API_HOST_URL}/api/v1/auth/get-user`, {
        headers: {
          authorization: token,
        },
      });
      return response.data;
    },
    enabled: enabled && !!storeJwtToken,
    retry: false,
  });
};
