import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, Trash, Camera, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProfilePhotoCard({ profileData }) {
  const { firstName, lastName, userType, location, profilePicture } =
    profileData;
  const [selectedImage, setSelectedImage] = useState(profilePicture);

  const fileInputRef = useRef(null);

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
        {location !== null ? (
          <span className="text-gray-600">
            {location.city}, {location.nationality}
          </span>
        ) : null}
      </div>
      <div className="flex flex-col gap-4 justify-end">
        <div className="flex gap-5">
          <Button
            className="text-sky-600 hover:text-sky-700"
            variant="outline"
            size="sm"
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
    </div>
  );
}
