import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
} from "@/lib/CLOUDINARY_API";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const cloudinary_preset = CLOUDINARY_UPLOAD_PRESET;
const cloudinary_name = CLOUDINARY_CLOUD_NAME;

export const useCloudinaryUpload = (options = {}) => {
  const uploadFileToCloudinary = async ({ file, onProgress }) => {
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
          if (onProgress) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(percentCompleted);
          }
        },
      }
    );
    return response.data; // Cloudinary response contains secure_url, url, public_id, etc.
  };

  // Use useMutation to manage the async upload operation
  const mutation = useMutation({
    mutationFn: uploadFileToCloudinary,
    ...options, // Spread any additional options passed to the hook
  });

  // Return the mutation states and data
  return {
    mutate: mutation.mutate,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data, // This will be the Cloudinary response object
  };
};
