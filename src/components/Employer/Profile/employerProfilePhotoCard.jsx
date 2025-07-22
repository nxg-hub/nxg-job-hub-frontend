import { useRef, useState } from "react";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, Trash, Camera, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { cn, updateUserProfile } from "@/lib/utils";
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
} from "@/lib/CLOUDINARY_API";

export default function EmployerProfilePhotoCard({
  userId,
  firstName,
  lastName,
  userType,
  country,
  profilePicture,
}) {
  const queryClient = useQueryClient();
  const [selectedImage, setSelectedImage] = useState(profilePicture);

  const fileInputRef = useRef(null);

  const cloudinary_preset = CLOUDINARY_UPLOAD_PRESET;
  const cloudinary_name = CLOUDINARY_CLOUD_NAME;

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check if the file is an image
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage(e.target?.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please select a valid image file.");
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSaveProfileImage = async () => {
    if (!selectedImage) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedImage);
      formData.append("upload_preset", cloudinary_preset);

      //storing profile image into cloudinary and get the file url path
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinary_name}/image/upload`,
        formData
      );

      const { secure_url } = response.data;
      console.log(`Cloudinary upload successful for profile image`, secure_url);
      if (secure_url) {
        const payload = {
          profilePicture: secure_url,
        };
        //update employer profile by adding the cloudinary url path
        const { data, status } = await updateUserProfile(
          `${API_HOST_URL}/api/employers`,
          userId,
          JSON.stringify(payload)
        );
        queryClient.invalidateQueries({ queryKey: ["employerData"] });
        if (status === 200) {
          toast({
            className: cn(
              "bg-gray-100 top-1/2 left-1/2 fixed max-w-[100px] md:max-w-[280px]"
            ),

            description: "Profile picture saved successfully",
            duration: 2500,
          });
        }
      }
    } catch (error) {
      console.log("failed to save image url", error);
    }
  };

  return (
    <div className="flex gap-10 item-center bg-white shadow rounded-md p-5">
      <div className="relative">
        <Avatar
          onClick={triggerFileInput}
          className="hover:cursor-pointer w-24 h-24 border-4 border-gray-200"
        >
          <AvatarImage
            src={selectedImage || undefined}
            alt="Profile picture"
            className="object-cover"
          />
          <AvatarFallback className="bg-gray-100">
            <User className="w-12 h-12 text-gray-400" />
          </AvatarFallback>
        </Avatar>

        {/* Upload button positioned at bottom right of avatar */}
        <Button
          type="button"
          onClick={triggerFileInput}
          className="border-none bg-cyan-500 hover:bg-cyan-500 absolute -bottom-1 -right-1 rounded-full w-7 h-7 p-0 shadow-lg"
        >
          <Camera className="w-4 h-4" />
        </Button>
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      <div className="flex flex-col justify-center font-medium mr-auto">
        <span className="text-sky-600">
          {firstName} {lastName}
        </span>
        <span className="text-gray-600">{userType}</span>
        <span className="text-gray-600">{country}</span>
      </div>
      <div className="flex flex-col gap-4 justify-end">
        <div className="flex gap-5">
          <Button
            type="button"
            className="text-sky-600 hover:text-sky-700"
            variant="outline"
            size="sm"
            onClick={handleSaveProfileImage}
          >
            <Upload className="h-4 w-4" />
            Upload picture
          </Button>
          <Button
            onClick={removeImage}
            className="bg-red-50 hover:bg-red-400 text-red-500 hover:text-white gap-2 border-none"
            size="sm"
          >
            <Trash className="h-4 w-4" />
            Remove picture
          </Button>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
