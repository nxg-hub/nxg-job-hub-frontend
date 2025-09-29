import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_HOST_URL } from "@/utils/api/API_HOST";
import { getStoredKey } from "@/lib/utils";

export const useAutoLogin = ({ enabled = true } = {}) => {
  //retrieve stored key

  const storeJwtToken = getStoredKey();

  return useQuery({
    queryKey: ["userToken", storeJwtToken],
    queryFn: async ({ queryKey }) => {
      const [_key, tokenFrmQueryKey] = queryKey;
      if (!tokenFrmQueryKey) throw new Error("No valid login token found");

      const response = await axios.get(`${API_HOST_URL}/api/v1/auth/get-user`, {
        headers: {
          authorization: tokenFrmQueryKey,
        },
      });

      return response.data;
    },
    enabled: enabled && !!storeJwtToken,
    retry: false,
  });
};
