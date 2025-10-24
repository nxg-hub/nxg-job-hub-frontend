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
import { fetchLoggedInUser } from "@/redux/LoggedInUserSlice";
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
  const displayValue = (value) => (value ? value : "—");

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
        description: "  Profile updated successfully!",
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
      <Card className="shadow-sm rounded-2xl">
        <CardHeader className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">Personal Information</CardTitle>
            <CardDescription>Details about your background</CardDescription>
          </div>

          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-[#0659a6] hover:bg-[#054884] text-white">
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
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
                className="border-gray-300">
                Cancel
              </Button>
            </div>
          )}
        </CardHeader>

        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="col-span-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio || ""}
              onChange={handleChange}
              readOnly={!isEditing}
              rows={4}
              className="mt-1"
            />
          </div>

          <div>
            <Label>Job Interest</Label>
            <Input
              id="jobInterest"
              value={formData.jobInterest || ""}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>

          <div>
            <Label>LinkedIn URL</Label>
            <Input
              id="linkedInUrl"
              value={formData.linkedInUrl || ""}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>
          {/* 
          <div>
            <Label>Verified</Label>
            <Input
              id="verified"
              value={formData.verified ? "Yes" : "No"}
              readOnly
            />
          </div>

          <div>
            <Label>Country Code</Label>
            <Input
              id="countryCode"
              value={formData.countryCode || ""}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div> */}

          <div>
            <Label>State</Label>
            <Input
              id="state"
              value={formData.state || ""}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>

          <div>
            <Label>Residential Address</Label>
            <Input
              id="residentialAddress"
              value={formData.residentialAddress || ""}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>

          <div>
            <Label>City</Label>
            <Input
              id="city"
              value={formData.city || ""}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>

          <div>
            <Label>Zip Code</Label>
            <Input
              id="zipCode"
              value={formData.zipCode || ""}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default PersonalInfoTab;
