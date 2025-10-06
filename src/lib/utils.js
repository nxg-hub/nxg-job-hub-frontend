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

export const getDaysBetween = (dateString) => {
  const inputDate = new Date(dateString);
  const now = new Date();

  //calculate the difference in milliseconds
  const difDateMs = now - inputDate;

  //return the difference
  return difDateMs;
};

export const getDateAsTextLabel = (dateString) => {
  const jobDateInMs = getDaysBetween(dateString);
  console.log(jobDateInMs);

  const jobPostInSeconds = Math.floor(jobDateInMs / 1000);
  const jobPostInMinutes = Math.floor(jobPostInSeconds / 60);
  const jobPostInHours = Math.floor(jobPostInMinutes / 60);
  const jobPostInDays = Math.floor(jobPostInHours / 24);

  //return seconds , minutes , hours
  if (jobPostInSeconds < 60) return "Just now";
  if (jobPostInMinutes < 60)
    return `${jobPostInMinutes} minutes${jobPostInMinutes > 1 ? "s" : ""} ago`;
  if (jobPostInHours < 24)
    return `${jobPostInHours} hours${jobPostInHours > 1 ? "s" : ""} ago`;

  //return days and beyond
  if (jobPostInDays === 1) return "Yesterday";
  if (jobPostInDays < 7)
    return `${jobPostInDays} day${jobPostInDays > 1 ? "s" : ""} ago`;

  const jobPostInWeeks = Math.floor(jobPostInDays / 7);
  if (jobPostInWeeks < 4)
    return `${jobPostInWeeks} week${jobPostInWeeks > 1 ? "s" : ""} ago`;

  const jobPostInMonths = Math.floor(jobPostInWeeks / 30);
  if (jobPostInMonths < 12)
    return `${jobPostInMonths} month${jobPostInMonths > 1 ? "s" : ""} ago`;

  const jobPostInYears = Math.floor(jobPostInMonths / 365);
  return `${jobPostInYears} year${jobPostInYears > 1 ? "s" : ""} ago`;
};
