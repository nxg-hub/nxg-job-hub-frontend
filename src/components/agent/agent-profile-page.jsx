import { Pencil, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "react-day-picker";
import { useOutletContext } from "react-router-dom";
import AgentProfileHeader from "./agent-profile-header";
import AgentProfileDetails from "./agent-profile-details";
import AgentProfileMetrics from "./agent-profile-metrics";
import { agentData } from "@/utils/data/agent-mock-data";

export default function AgentProfileEditForm({ profileData, onSave }) {
  const { setPageTitle } = useOutletContext();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(agentData);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = (updatedData) => {
    // In a real app, you would send this data to an API
    setProfileData({ ...profileData, ...updatedData });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    setPageTitle("My Profile");
  }, []);
  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-end">
        {isEditing ? (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCancelEdit}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button
              className="border-none bg-sky-500 hover:bg-sky-600"
              size="sm"
              form="profile-edit-form"
              type="submit"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        ) : (
          <Button
            className="border-none bg-sky-500 hover:bg-sky-600"
            onClick={handleEditToggle}
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        )}
      </div>

      {isEditing ? (
        <AgentProfileEditForm
          profileData={profileData}
          onSave={handleSaveProfile}
        />
      ) : (
        <div className="flex">
          <AgentProfileHeader profileData={profileData} />
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              <AgentProfileDetails profileData={profileData} />
            </div>
            <div>
              <AgentProfileMetrics profileData={profileData} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
