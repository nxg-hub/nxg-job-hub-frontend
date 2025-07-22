import { useEffect, useState } from "react";
import { useEmployerData } from "@/store/employer/employerStore";
import { API_HOST_URL } from "@/utils/api/API_HOST";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useEmployerJobsQuery = (employerID) => {
  return useQuery({
    queryKey: ["employerJobs", employerID],
    queryFn: () =>
      axios
        .get(`${API_HOST_URL}/api/employers/postings/${employerID}`)
        .then((response) => response.data),
  });
};

export const useEmployerDataQuery = () => {
  const setEmployerData = useEmployerData((state) => state.setEmployerData);

  const query = useQuery({
    queryKey: ["employerData"],
    queryFn: async () => {
      const storeKey =
        localStorage.getItem("NXGJOBHUBLOGINKEYV1") ||
        sessionStorage.getItem("NXGJOBHUBLOGINKEYV1");

      if (!storeKey) throw new Error("No key stored");

      const authKey = JSON.parse(storeKey)?.authKey;

      const response = await axios.get(
        `${API_HOST_URL}/api/employers/get-employer`,
        {
          headers: {
            authorization: authKey,
          },
        }
      );
      return response.data;
    },
  });

  useEffect(() => {
    if (query.data) {
      setEmployerData(query.data);
    }
  }, [query.data, setEmployerData]);

  return query;
};

export const useUserProfileUpdate = () => {
  const mutation = useMutation({
    mutationFn: async ({ url, userId, payload }) => {
      const response = await axios.patch(`${url}/${userId}`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
  });

  return {
    updateUserProfile: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};
