import { useEffect, useState } from "react";
import { agentData } from "@/utils/data/agent-mock-data";
import AgentProfileHeader from "../../../components/agent/agent-profile-header";
import {
  AgentPersonInfoCard,
  EditAgentPersonInfoCard,
  AgentBioCard,
  EditAgentBioCard,
  AgentExpertisePreferencesCard,
  EditAgentExpertisePreferencesCard,
  AgentAddressCard,
  EditAgentAddressCard,
} from "@/components/agent/agent-personal-info";

export default function ProfileTab() {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditPersonalInfo, setEditPersonalInfo] = useState(false);
  const [isEditAddress, setEditAddress] = useState(false);
  const [isEditExpertisePreferences, setEditExpertisePreferences] =
    useState(false);
  const [isEditBio, setEditBio] = useState(false);
  const [profileData, setProfileData] = useState(agentData);

  const toggleEditPersonalInfo = () => {
    setEditPersonalInfo((prev) => !prev);
  };

  const toggleEditAddress = () => {
    setEditAddress((prev) => !prev);
  };

  const toggleEditExpertisePreferences = () => {
    setEditExpertisePreferences((prev) => !prev);
  };

  const toggleEditBio = () => {
    setEditBio((prev) => !prev);
  };
  //old
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = (updatedData) => {
    // In a real app, you would send this data to an API
    setProfileData({ ...profileData, ...updatedData });
    setIsEditing(false);
    setEditPersonalInfo(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  useEffect(() => {}, []);

  return (
    <div className="flex flex-col p-10 gap-10">
      <div className="text-lg text-sky-600 font-medium">My Profile</div>
      <AgentProfileHeader profileData={profileData} />
      {isEditPersonalInfo ? (
        <EditAgentPersonInfoCard
          onCancleClick={toggleEditPersonalInfo}
          profileData={profileData}
          onSave={handleSaveProfile}
        />
      ) : (
        <AgentPersonInfoCard
          profileData={profileData}
          onEditClick={toggleEditPersonalInfo}
        />
      )}
      {profileData.location ? (
        isEditAddress ? (
          <EditAgentAddressCard
            onCancleClick={toggleEditAddress}
            profileData={profileData}
            onSave={handleSaveProfile}
          />
        ) : (
          <AgentAddressCard
            profileData={profileData}
            onEditClick={toggleEditAddress}
          />
        )
      ) : undefined}

      <div className="flex">
        {isEditBio ? (
          <EditAgentBioCard
            onCancleClick={toggleEditBio}
            profileData={profileData}
            onSave={handleSaveProfile}
          />
        ) : (
          <AgentBioCard profileData={profileData} onEditClick={toggleEditBio} />
        )}
      </div>
    </div>
  );
}

// export default function ProfileTab() {
//   const { setPageTitle } = useOutletContext();
//   const [isEditing, setIsEditing] = useState(false);
//   const [isEditPersonalInfo, setEditPersonalInfo] = useState(false);
//   const [isEditExpertisePreferences, setEditExpertisePreferences] =
//     useState(false);
//   const [isEditBio, setEditBio] = useState(false);
//   const [profileData, setProfileData] = useState(agentData);

//   const toggleEditPersonalInfo = () => {
//     setEditPersonalInfo((prev) => !prev);
//   };

//   const toggleEditExpertisePreferences = () => {
//     setEditExpertisePreferences((prev) => !prev);
//   };

//   const toggleEditBio = () => {
//     setEditBio((prev) => !prev);
//   };
//   //old
//   const handleEditToggle = () => {
//     setIsEditing(!isEditing);
//   };

//   const handleSaveProfile = (updatedData) => {
//     // In a real app, you would send this data to an API
//     setProfileData({ ...profileData, ...updatedData });
//     setIsEditing(false);
//     setEditPersonalInfo(false);
//   };

//   const handleCancelEdit = () => {
//     setIsEditing(false);
//   };

//   useEffect(() => {
//     setPageTitle("My Profile");
//   }, []);

//   return (
//     <div className="p-8 space-y-6">
//       <div className="flex justify-end">
//         {isEditing ? (
//           <div className="flex gap-2">
//             <Button variant="outline" size="sm" onClick={handleCancelEdit}>
//               <X className="mr-2 h-4 w-4" />
//               Cancel
//             </Button>
//             <Button
//               className="border-none bg-sky-500 hover:bg-sky-600"
//               size="sm"
//               form="profile-edit-form"
//               type="submit"
//             >
//               <Save className="mr-2 h-4 w-4" />
//               Save Changes
//             </Button>
//           </div>
//         ) : (
//           <Button
//             className="border-none bg-sky-500 hover:bg-sky-600"
//             onClick={handleEditToggle}
//           >
//             <Pencil className="mr-2 h-4 w-4" />
//             Edit Profile
//           </Button>
//         )}
//       </div>

//       {isEditing ? (
//         <AgentProfileEditForm
// profileData={profileData}
// onSave={handleSaveProfile}
//         />
//       ) : (
//         <div className="flex ">
//           <div className="w-2/3 shadow-md rounded-md p-4 space-y-10">
//             <AgentPhotoUpload />
//             {isEditPersonalInfo ? (
// <EditAgentPersonInfoCard
//   onCancleClick={toggleEditPersonalInfo}
//   profileData={profileData}
//   onSave={handleSaveProfile}
// />
//             ) : (
//               <AgentPersonInfoCard
//                 onEditClick={toggleEditPersonalInfo}
//                 profileData={profileData}
//               />
//             )}

//             {isEditBio ? (
//               <EditAgentBioCard
//                 onCancleClick={toggleEditBio}
//                 profileData={profileData}
//                 onSave={handleSaveProfile}
//               />
//             ) : (
//               <AgentBioCard
//                 onEditClick={toggleEditBio}
//                 profileData={profileData}
//               />
//             )}

//             {isEditExpertisePreferences ? (
//               <EditAgentExpertisePreferencesCard
//                 onCancleClick={toggleEditExpertisePreferences}
//                 profileData={profileData}
//                 onSave={handleSaveProfile}
//               />
//             ) : (
//               <AgentExpertisePreferencesCard
//                 onEditClick={toggleEditExpertisePreferences}
//                 profileData={profileData}
//               />
//             )}
//           </div>
//           {/* <AgentProfileMetrics profileData={profileData} /> */}
//           {/* <AgentProfileDetails profileData={profileData} /> */}
//         </div>
//       )}
//     </div>
//   );
// }
