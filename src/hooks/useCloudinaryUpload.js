import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
} from "@/lib/CLOUDINARY_API";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const cloudinary_preset = CLOUDINARY_UPLOAD_PRESET;
const cloudinary_name = CLOUDINARY_CLOUD_NAME;

export const useCloudinaryUpload = () => {
  const [progress, setProgress] = useState(0);

  const uploadFileToCloudinary = async (file) => {
    if (!file) throw new Error("No file provided");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", cloudinary_preset);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudinary_name}/auto/upload`, // 'auto' detects file type (image/video/raw)
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Axios handles this for FormData, but explicit for clarity
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      }
    );
    return response.data; // Cloudinary response contains secure_url, url, public_id, etc.
  };

  const mutation = useMutation({
    mutationFn: uploadFileToCloudinary,
  });

  // Return the mutation states and data
  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
    progress,
  };
};
