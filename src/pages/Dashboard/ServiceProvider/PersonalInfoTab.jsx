import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProfilePhotoUploader from "@/components/ServiceProvider/ProfilePhotoUploader";
import { Mail, MapPin, Phone } from "lucide-react";
const PersonalInfoTab = ({
  isLoading,
  errors,
  formData,
  setFormData,
  handleSaveChanges,
  userData,
  token,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <ProfilePhotoUploader
        userId={userData?.serviceProvider?.serviceProviderId}
        token={token}
        userData={userData?.serviceProvider}
      />

      <div className="flex-1 grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              readOnly
              id="firstName"
              className={"cursor-not-allowed"}
              value={formData.firstName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  firstName: e.target.value,
                })
              }
            />
            {errors?.firstName && (
              <p className="text-red-500 text-xs">{errors.firstName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              className={"cursor-not-allowed"}
              readOnly
              value={formData.lastName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  lastName: e.target.value,
                })
              }
            />
            {errors?.lastName && (
              <p className="text-red-500 text-xs">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="flex">
            <Mail className="mr-2 h-4 w-4 opacity-70 mt-3" />
            <Input
              id="email"
              type="email"
              className={"cursor-not-allowed"}
              readOnly
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
            />
          </div>
          {errors?.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <div className="flex">
            <Phone className="mr-2 h-4 w-4 opacity-70 mt-3" />
            <Input
              id="phone"
              type="tel"
              readOnly
              className={"cursor-not-allowed"}
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value,
                })
              }
            />
            {errors?.phone && (
              <p className="text-red-500 text-xs">{errors.phone}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <div className="flex">
            <MapPin className="mr-2 h-4 w-4 opacity-70 mt-3" />
            <Input
              id="location"
              className={"cursor-not-allowed"}
              readOnly
              value={`${formData.city}, ${formData.state}`}
              onChange={(e) => {
                const [city, state] = e.target.value
                  .split(",")
                  .map((s) => s.trim());
                setFormData({ ...formData, city, state });
              }}
            />
            {errors?.city && (
              <p className="text-red-500 text-xs">{errors.city}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <textarea
            id="bio"
            className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={formData.additionalInfo}
            onChange={(e) =>
              setFormData({
                ...formData,
                additionalInfo: e.target.value,
              })
            }
          />
          {errors?.additionalInfo && (
            <p className="text-red-500 text-xs">{errors.additionalInfo}</p>
          )}
        </div>

        <Button
          className="w-fit bg-sky-500 hover:bg-sky-600 border-none"
          onClick={handleSaveChanges}
          disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};

export default PersonalInfoTab;
