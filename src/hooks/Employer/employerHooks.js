import { API_HOST_URL } from "@/utils/api/API_HOST";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFeaturedTalent = () => {
  return useQuery({
    queryKey: ["featuredTalentData"],
    queryFn: async () => {
      const response = await axios.get(`${API_HOST_URL}/api/talents/featured`);
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export const useRequestFeaturedTalent = (options = {}) => {
  return useMutation({
    mutationFn: async (talentId) => {
      const storeKey =
        localStorage.getItem("NXGJOBHUBLOGINKEYV1") ||
        sessionStorage.getItem("NXGJOBHUBLOGINKEYV1");

      if (!storeKey) throw new Error("No key stored");

      const authKey = JSON.parse(storeKey)?.authKey;
      const response = await axios.post(
        `${API_HOST_URL}/api/talents/request/${talentId}`,
        {},
        {
          headers: {
            Authorization: authKey,
          },
        }
      );
      return response.data;
    },
    ...options,
  });
};
