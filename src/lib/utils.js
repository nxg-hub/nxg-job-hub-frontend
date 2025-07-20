import axios from "axios";
import { API_HOST_URL } from "@/utils/api/API_HOST";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getUserUsingAuthKey(authKey) {
  const finalKey = authKey.startsWith("Bearer ") ? authKey : `Bearer ${authKey}`;

  return axios
    .get(`${API_HOST_URL}/api/v1/auth/get-user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: finalKey,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error getting user data", error);
      throw error;
    });
}

// export function getUserUsingAuthKey(authKey) {
//   return axios
//     .get(`${API_HOST_URL}/api/v1/auth/get-user`, {
//       headers: {
//         "Content-Type": "application/json",
//         authorization: authKey,
//       },
//     })
//     .then((response) => response.data)
//     .catch((error) => {
//       console.error("Error getting user data", error);
//       throw error;
//     });
// }

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
