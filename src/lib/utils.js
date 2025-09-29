import axios from "axios";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getStoredKey = () => {
  let key =
    localStorage.getItem("NXGJOBHUBLOGINKEYV1") ||
    sessionStorage.getItem("NXGJOBHUBLOGINKEYV1");

  if (!key) return null;

  try {
    const parsedKey = JSON.parse(key);
    return parsedKey?.authKey || parsedKey;
  } catch (e) {
    console.error("Failed to parse login key from storage:", e);
    return null;
  }
};

export async function updateUserProfile(url, userId, payload) {
  try {
    const response = await axios.put(`${url}/${userId}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return { data: response.data, status: response.status };
  } catch (error) {
    console.error("Error update user profile", error);
    if (error.response) {
      return { data: error.response.data, status: error.response.status };
    }
    throw error;
  }
}

export const daysBetween = (dateString) => {
  const inputDate = new Date(dateString);
  const now = new Date();

  //calculate the difference in milliseconds
  const difDateMs = now - inputDate;

  //convert milliseconds => days
  const difDays = difDateMs / (1000 * 60 * 60 * 24);

  //return the difference
  return difDays;
};
