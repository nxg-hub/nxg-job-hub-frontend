import { useEffect } from "react";
import { API_HOST_URL } from "@/utils/api/API_HOST";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useUserData } from "@/store/employer/userDataStorage";

export const useUserDataQuery = () => {
  const setUserData = useUserData((state) => state.setUserData);

  const query = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const storeKey =
        localStorage.getItem("NXGJOBHUBLOGINKEYV1") ||
        sessionStorage.getItem("NXGJOBHUBLOGINKEYV1");

      if (!storeKey) throw new Error("No key stored");

      const authKey = JSON.parse(storeKey)?.authKey;

      const response = await axios.get(`${API_HOST_URL}/api/v1/auth/get-user`, {
        headers: {
          authorization: authKey,
        },
      });
      return response.data;
    },
  });

  useEffect(() => {
    if (query.data) {
      setUserData(query.data);
    }
  }, [query.data, setUserData]);

  return query;
};

export const useUserProfileUpdate = (options = {}) => {
  const updateUserProfile = async ({ url, payload }) => {
    const response = await axios.put(url, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: updateUserProfile,
    ...options,
  });

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};
