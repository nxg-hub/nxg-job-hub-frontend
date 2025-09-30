import { API_HOST_URL } from "@/utils/api/API_HOST";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const usePostJob = () => {
  const postJob = async ({ payload, jwtToken }) => {
    const response = await axios.post(
      `${API_HOST_URL}/api/job-postings/employer-post-job`,
      payload,
      {
        headers: {
          authorization: jwtToken,
        },
      }
    );
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: postJob,
  });

  return {
    mutate: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};

export const useFetchJobs = () => {
  const fetchJobs = async () => {
    const response = await axios.get(`${API_HOST_URL}/api/job-postings/all`);
    return response.data;
  };

  return useQuery({
    queryKey: ["allJobs"],
    queryFn: fetchJobs,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
