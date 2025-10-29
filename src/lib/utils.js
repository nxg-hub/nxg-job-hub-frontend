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

export const nigerianStates = [
  { value: "Abia", label: "Abia" },
  { value: "Adamawa", label: "Adamawa" },
  { value: "Akwa Ibom", label: "Akwa Ibom" },
  { value: "Anambra", label: "Anambra" },
  { value: "Bauchi", label: "Bauchi" },
  { value: "Bayelsa", label: "Bayelsa" },
  { value: "Benue", label: "Benue" },
  { value: "Borno", label: "Borno" },
  { value: "Cross River", label: "Cross River" },
  { value: "Delta", label: "Delta" },
  { value: "Ebonyi", label: "Ebonyi" },
  { value: "Edo", label: "Edo" },
  { value: "Ekiti", label: "Ekiti" },
  { value: "Enugu", label: "Enugu" },
  { value: "Gombe", label: "Gombe" },
  { value: "Imo", label: "Imo" },
  { value: "Jigawa", label: "Jigawa" },
  { value: "Kaduna", label: "Kaduna" },
  { value: "Kano", label: "Kano" },
  { value: "Katsina", label: "Katsina" },
  { value: "Kebbi", label: "Kebbi" },
  { value: "Kogi", label: "Kogi" },
  { value: "Kwara", label: "Kwara" },
  { value: "Lagos", label: "Lagos" },
  { value: "Nasarawa", label: "Nasarawa" },
  { value: "Niger", label: "Niger" },
  { value: "Ogun", label: "Ogun" },
  { value: "Ondo", label: "Ondo" },
  { value: "Osun", label: "Osun" },
  { value: "Oyo", label: "Oyo" },
  { value: "Plateau", label: "Plateau" },
  { value: "Rivers", label: "Rivers" },
  { value: "Sokoto", label: "Sokoto" },
  { value: "Taraba", label: "Taraba" },
  { value: "Yobe", label: "Yobe" },
  { value: "Zamfara", label: "Zamfara" },
  { value: "FCT", label: "Abuja" },
];

export const countryOptions = [
  { label: "Nigeria", value: "Nigeria" },
  { label: "Others", value: "Others" },
];
