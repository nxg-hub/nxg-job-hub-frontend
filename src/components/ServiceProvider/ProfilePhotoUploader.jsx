// import { useState, useRef } from "react";
// import axios from "axios";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { CircleUser } from "lucide-react";
// import sarahicon from "@/static/images/admin-sarah.png";

// export default function ProfilePhotoUploader({ onFileChange, initialUrl }) {
//   const [url, setUrl] = useState(initialUrl || "");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const fileInputRef = useRef(null);

//   const uploadImage = async (file) => {
//     if (!file) return;
//     setLoading(true);
//     setError(false);

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "tin4r1lt"); // your Cloudinary preset

//     try {
//       const res = await axios.post(
//         "https://api.cloudinary.com/v1_1/dildznazt/image/upload",
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );

//       const imageUrl = res.data.secure_url;
//       setUrl(imageUrl);
//       if (onFileChange) onFileChange(imageUrl);

//       console.log("✅ Uploaded:", imageUrl);
//     } catch (err) {
//       console.error("❌ Upload failed:", err.message);
//       setError(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFileSelect = (event) => {
//     const file = event.target.files[0];
//     if (file) uploadImage(file);
//   };

//   return (
//     <div className="flex flex-col items-center gap-3">
//       <Avatar className="h-32 w-32 mb-2 border-none">
//         <AvatarImage src={url || sarahicon} alt="Profile" />
//         <AvatarFallback>
//           <CircleUser className="h-12 w-12 border-none" />
//         </AvatarFallback>
//       </Avatar>

//       <input
//         type="file"
//         accept="image/*"
//         ref={fileInputRef}
//         className="hidden"
//         onChange={handleFileSelect}
//       />

//       <Button
//         className="bg-sky-500 border-none hover:bg-sky-600 w-full"
//         onClick={() => fileInputRef.current?.click()}
//         disabled={loading}>
//         {loading ? "Uploading..." : "Change Photo"}
//       </Button>

//       {error && (
//         <p className="text-red-500 text-sm mt-1">
//           Upload failed. Please try again.
//         </p>
//       )}
//     </div>
//   );
// }

import { useState, useRef } from "react";
import sarahicon from "@/static/images/admin-sarah.png";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CircleUser } from "lucide-react";
import { API_HOST_URL } from "@/utils/api/API_HOST";
import { toast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import { getUserData } from "@/redux/UserDataSlice";

export default function ProfilePhotoUploader({ userId, token, onUpdate }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  // 🔹 Cloudinary Upload
  const uploadImage = async (file) => {
    if (!file) return;
    setLoading(true);
    setError(false);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "tin4r1lt"); // your Cloudinary preset

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dildznazt/image/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const imageUrl = res.data.secure_url;
      setUrl(imageUrl);

      // 🔹 Now update the profile picture in your backend
      await updateProfilePicture(imageUrl);
    } catch (err) {
      console.error("❌ Upload failed:", err.message);
      setError(true);
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  // 🔹 PUT request to update profile picture in backend
  const updateProfilePicture = async (imageUrl) => {
    try {
      const response = await axios.put(
        `${API_HOST_URL}/api/service-providers/${userId}/update-service-provider`,
        { profilePicture: imageUrl },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );

      toast({
        title: "Profile Updated",
        description: "Your profile picture has been updated successfully!",
      });
      dispatch(getUserData({ token: token.authKey, id: userId }));
    } catch (error) {
      console.error("❌ Backend update failed:", error.message);
      toast({
        variant: "destructive",
        title: "Profile Update Failed",
        description: "Could not save your new profile picture.",
      });
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) uploadImage(file);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <Avatar className="h-32 w-32 mb-2 border-none">
        <AvatarImage src={url || sarahicon} alt="Profile" />
        <AvatarFallback>
          <CircleUser className="h-12 w-12 border-none" />
        </AvatarFallback>
      </Avatar>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileSelect}
      />

      <Button
        className="bg-sky-500 border-none hover:bg-sky-600 w-full"
        onClick={() => fileInputRef.current?.click()}
        disabled={loading}>
        {loading ? "Uploading..." : "Change Photo"}
      </Button>

      {error && (
        <p className="text-red-500 text-sm mt-1">
          Upload failed. Please try again.
        </p>
      )}
    </div>
  );
}
