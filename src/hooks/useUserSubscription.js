import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useCreateSubscription = () => {
  const createSubscription = async ({ url, payload }) => {
    const response = await axios.post(`${url}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: createSubscription,
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

export const useSubscribe = () => {
  const subscribe = async ({ url, payload }) => {
    const response = await axios.post(`${url}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: subscribe,
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
