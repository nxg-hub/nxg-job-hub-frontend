import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useUserProfileUpdate = (options = {}) => {
  const updateUserProfile = async ({ url, userId, payload }) => {
    const response = await axios.patch(`${url}/${userId}`, payload, {
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
