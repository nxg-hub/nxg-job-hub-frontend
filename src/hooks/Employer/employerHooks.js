import { API_HOST_URL } from "@/utils/api/API_HOST";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFeaturedTalent = ({ page, size }) => {
  const fetchTalents = async ({ queryKey }) => {
    const [_key, params] = queryKey;
    const { page, size } = params;

    const response = await axios.get(`${API_HOST_URL}/api/talents/featured`, {
      params: { page, size },
    });
    return response.data;
  };

  const query = useQuery({
    queryKey: ["featuredTalentData", { page, size }],
    queryFn: fetchTalents,
    keepPreviousData: true,
  });

  return {
    talents: query.data?.content ?? [],
    pagination: {
      page: query.data?.number,
      size: query.data?.size,
      totalElements: query.data?.totalElements,
      totalPages: query.data?.totalPages,
      isFirst: query.data?.first,
      isLast: query.data?.last,
    },
    ...query,
  };
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
