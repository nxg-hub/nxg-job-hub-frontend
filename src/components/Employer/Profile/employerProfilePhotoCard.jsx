import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, Trash, Camera, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
} from "@/lib/CLOUDINARY_API";
import { API_HOST_URL } from "@/utils/api/API_HOST";
import { useUserProfileUpdate } from "@/hooks/useAllUsers";
// import { useUserProfileUpdate } from "@/hooks/Employer/employerHooks";

export default function EmployerProfilePhotoCard({
  userId,
  firstName,
  lastName,
  userType,
  country,
  profilePicture,
  companyName,
}) {
  const queryClient = useQueryClient();
  const { updateUserProfile, isSuccess } = useUserProfileUpdate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(profilePicture || null);

  const fileInputRef = useRef(null);

  const cloudinary_preset = CLOUDINARY_UPLOAD_PRESET;
  const cloudinary_name = CLOUDINARY_CLOUD_NAME;

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
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
    // "https://res.cloudinary.com/dildznazt/image/upload/v1753749441/craagzeoi7fkprrvkaeb.jpg"
    if (!selectedImage) {
      throw new console.error("No image file provided");
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
          companyLogo: secure_url,
        };
        //update employer profile by adding the cloudinary url path
        await updateUserProfile({
          url: `${API_HOST_URL}/api/employers`,
          userId,
          payload,
        });

        if (isSuccess) {
          queryClient.invalidateQueries({ queryKey: ["employerData"] });
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

  useEffect(() => {
    if (profilePicture) {
      setPreview(profilePicture);
    }
  }, [profilePicture]);

  return (
    <>
      <div className="hidden w-full mflex mflex-col gap-10 item-center bg-white rounded-md p-5 md:flex  md:shadow">
        <div className="flex gap-5">
          <div className="relative">
            <Avatar
              onClick={triggerFileInput}
              className="hover:cursor-pointer w-24 h-24 border-4 border-gray-200"
            >
              <AvatarImage
                src={preview || undefined}
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
            <span className="text-sky-600">{companyName || ""}</span>
            <span className="text-gray-600">{userType}</span>
            <span className="text-gray-600">{country}</span>
          </div>
        </div>
        <div className="flex gap-5 md:self-end md:ml-auto">
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
      {/* mobile view */}
      <div className="border-slate-300 border-[1px] flex flex-col items-center py-10 mx-3 rounded-xl gap-3 shadow md:hidden">
        <div className="relative">
          <Avatar
            onClick={triggerFileInput}
            className="hover:cursor-pointer w-32 h-32 border-4 border-gray-200"
          >
            <AvatarImage
              src={preview || undefined}
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
            className="border-none bg-cyan-500 hover:bg-cyan-500 absolute -bottom-1 right-3 rounded-full w-7 h-7 p-0 shadow-lg"
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
        <div className="flex flex-col items-center justify-center font-medium text-center gap-1">
          <span className="text-sky-600 capitalize font-semibold">
            {companyName || ""}
          </span>
          <span className="text-gray-400">{userType}</span>
        </div>
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
      </div>
      {/* <div className="flex flex-col gap-10 item-center rounded-md p-5 md:hidden md:flex-row md:shadow">
        <div className="flex gap-5"></div>
        <div className="flex flex-col gap-5">
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
      </div> */}
      <Toaster />
    </>
  );
}
