import axios from "axios";
import { API_HOST_URL } from "@/utils/api/API_HOST";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getUserUsingAuthKey(authKey) {
  return axios
    .get(`${API_HOST_URL}/api/v1/auth/get-user`, {
      headers: {
        "Content-Type": "application/json",
        authorization: authKey,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error getting user data", error);
      throw error;
    });
}
