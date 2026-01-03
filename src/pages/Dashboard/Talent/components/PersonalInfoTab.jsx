import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { API_HOST_URL } from "@/utils/api/API_HOST";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import { fetchTalentData } from "@/redux/TalentUserDataSlice";

const PersonalInfoTab = ({ userData, token }) => {
  const [formData, setFormData] = useState(userData || {});
  const [isEditing, setIsEditing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      const payload = {
        techId: formData.techId || "",
        bio: formData.bio || "",
        countryCode: formData.countryCode || "",
        state: formData.state || "",
        linkedInUrl: formData.linkedInUrl || "",
        residentialAddress: formData.residentialAddress || "",
        city: formData.city || "",
        zipCode: formData.zipCode || "",
        jobInterest: formData.jobInterest || "",
        verified: formData.verified || false,
      };

      await axios.put(
        `${API_HOST_URL}/api/v1/tech-talent/${userData.techId}`,
        payload,
        {
          headers: { Authorization: `${token.authKey}` },
        }
      );

      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });

      dispatch(fetchTalentData({ token: token.authKey }));
      setIsEditing(false);
    } catch (error) {
      console.error("Update failed:", error);
      toast({
        title: "Update Failed",
        description:
          error?.response?.data?.message ||
          error?.message ||
          "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  return (
    <TabsContent value="personal">
      <Card className="shadow-lg rounded-2xl border border-gray-100">
        <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-800">
              Personal Information
            </CardTitle>
            <CardDescription className="text-gray-500 mt-1">
              Details about your background
            </CardDescription>
          </div>

          <div className="flex gap-2">
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white">
                Edit
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleUpdate}
                  disabled={updating}
                  className="bg-green-600 hover:bg-green-700 text-white">
                  {updating ? "Updating..." : "Update"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setFormData(userData);
                    setIsEditing(false);
                  }}
                  className="border-gray-300 hover:bg-gray-50">
                  Cancel
                </Button>
              </>
            )}
          </div>
        </CardHeader>

        <CardContent className="grid gap-6 md:grid-cols-2 mt-2">
          <div className="col-span-2">
            <Label htmlFor="bio" className="font-medium">
              Bio
            </Label>
            <Textarea
              id="bio"
              value={formData.bio || ""}
              onChange={handleChange}
              readOnly={!isEditing}
              rows={4}
              className="mt-1 resize-none border-gray-200"
              placeholder="Write a short bio..."
            />
          </div>

          <div>
            <Label htmlFor="jobInterest" className="font-medium">
              Job Interest
            </Label>
            <Input
              id="jobInterest"
              value={formData.jobInterest || ""}
              onChange={handleChange}
              readOnly={!isEditing}
              placeholder="Your job interests"
            />
          </div>

          <div>
            <Label htmlFor="linkedInUrl" className="font-medium">
              LinkedIn URL
            </Label>
            <Input
              id="linkedInUrl"
              value={formData.linkedInUrl || ""}
              onChange={handleChange}
              readOnly={!isEditing}
              placeholder="https://linkedin.com/in/username"
            />
          </div>

          <div>
            <Label htmlFor="state" className="font-medium">
              State
            </Label>
            <Input
              id="state"
              value={formData.state || ""}
              onChange={handleChange}
              readOnly={!isEditing}
              placeholder="Enter your state"
            />
          </div>

          <div>
            <Label htmlFor="residentialAddress" className="font-medium">
              Residential Address
            </Label>
            <Input
              id="residentialAddress"
              value={formData.residentialAddress || ""}
              onChange={handleChange}
              readOnly={!isEditing}
              placeholder="Street, Area, etc."
            />
          </div>

          <div>
            <Label htmlFor="city" className="font-medium">
              City
            </Label>
            <Input
              id="city"
              value={formData.city || ""}
              onChange={handleChange}
              readOnly={!isEditing}
              placeholder="Enter your city"
            />
          </div>

          <div>
            <Label htmlFor="zipCode" className="font-medium">
              Zip Code
            </Label>
            <Input
              id="zipCode"
              value={formData.zipCode || ""}
              onChange={handleChange}
              readOnly={!isEditing}
              placeholder="Enter zip code"
            />
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default PersonalInfoTab;
