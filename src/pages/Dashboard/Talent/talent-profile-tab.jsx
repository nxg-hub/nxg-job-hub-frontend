// "use client";
// import { useState, useEffect } from "react";
// import { Card } from "@/components/ui/card";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useSelector } from "react-redux";
// import { Toaster } from "@/components/ui/toaster";
// import SkillsExperienceTab from "./components/SkillsExperienceTab";
// import PortfolioTab from "./components/PortfolioTab";
// import ProfilePhotoUploader from "@/components/ServiceProvider/ProfilePhotoUploader";
// import PersonalInfoTab from "./components/PersonalInfoTab";
// import CompleteYourProfile from "@/pages/CompleteYourProfile/Agent";

// export default function TalentProfileTab() {
//   const userData = useSelector(
//     (state) => state.TalentUserReducer.LoggedIntalentData
//   );
//   const isProfileComplete = userData?.resume && userData?.profilePicture;
//   // const loading = useSelector((state) => state.TalentUserReducer.loading);
//   const error = useSelector((state) => state.TalentUserReducer.error);
//   const token =
//     JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
//     JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));

//   const [skills, setSkills] = useState([]);

//   useEffect(() => {
//     if (userData?.skills) {
//       setSkills(userData.skills);
//     }
//   }, [userData]);

//   // if (loading) return <p className="text-center py-8">Loading profile...</p>;
//   if (error) return <p className="text-red-500 text-center py-8">{error}</p>;

//   return (
//     <div className="space-y-6 m-10">
//       <Card className="p-6 shadow-sm rounded-2xl md:w-[60%]">
//         <div className="flex flex-col md:flex-row items-start gap-6">
//           <ProfilePhotoUploader
//             userId={userData.techId}
//             token={token}
//             userData={userData}
//           />
//           {!isProfileComplete && (
//             <p className="bg-blue-50 text-blue-900 border border-blue-200 rounded-xl p-4 text-sm md:text-base leading-relaxed shadow-sm">
//               <span className="font-semibold">🔒 Verify Your Account</span> —
//               Upload your
//               <span className="font-medium"> profile photo 📸</span> and
//               <span className="font-medium"> updated resume 📄</span> to
//               complete your verification. This helps us confirm your identity
//               and connect you with top job opportunities faster 🚀
//             </p>
//           )}
//         </div>
//       </Card>
//       <Tabs defaultValue="personal" className="w-full space-y-4">
//         <TabsList className="grid grid-cols-2 md:grid-cols-3 w-full rounded-lg bg-muted mb-10 md:mb-0 md:p-1">
//           <TabsTrigger value="personal">Personal Info</TabsTrigger>
//           <TabsTrigger value="skills">Skills & Experience</TabsTrigger>
//           <TabsTrigger value="portfolio">
//             Portfolio & Certifications
//           </TabsTrigger>
//         </TabsList>
//         {/* personal info */}
//         <PersonalInfoTab userData={userData} token={token} />

//         {/* Skills & Experience */}
//         <SkillsExperienceTab userData={userData} token={token} />

//         {/* Portfolio & Certifications */}
//         <PortfolioTab userData={userData} token={token} />
//       </Tabs>
//       <Toaster />
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSelector } from "react-redux";
import { Toaster } from "@/components/ui/toaster";
import SkillsExperienceTab from "./components/SkillsExperienceTab";
import PortfolioTab from "./components/PortfolioTab";
import PersonalInfoTab from "./components/PersonalInfoTab";
import ProfilePhotoUploader from "@/components/ServiceProvider/ProfilePhotoUploader";

export default function TalentProfileTab() {
  const userData = useSelector(
    (state) => state.TalentUserReducer.LoggedIntalentData
  );
  const error = useSelector((state) => state.TalentUserReducer.error);

  const token =
    JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
    JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));

  const [skills, setSkills] = useState([]);
  const isProfileComplete = userData?.resume && userData?.profilePicture;

  useEffect(() => {
    if (userData?.skills) setSkills(userData.skills);
  }, [userData]);

  if (error) return <p className="text-red-500 text-center py-8">{error}</p>;

  return (
    <div className="space-y-8 mx-auto max-w-5xl p-4 md:p-10">
      {/* Profile Card */}
      <Card className="p-6 shadow-lg rounded-2xl flex flex-col md:flex-row items-start gap-6">
        <ProfilePhotoUploader
          userId={userData?.techId}
          token={token}
          userData={userData}
        />
        {!isProfileComplete && (
          <div className="bg-blue-50 text-blue-900 border border-blue-200 rounded-xl p-4 flex-1 text-sm md:text-base leading-relaxed shadow-sm">
            <span className="font-semibold">🔒 Complete Your Profile</span>
            <p className="mt-1">
              Upload your <span className="font-medium">profile photo 📸</span>{" "}
              and <span className="font-medium">updated resume 📄</span> to
              verify your account. Completing your profile helps us connect you
              with top job opportunities faster 🚀
            </p>
          </div>
        )}
      </Card>

      {/* Tabs Section */}
      <Tabs defaultValue="personal" className="w-full space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full rounded-lg bg-muted p-1">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="skills">Skills & Experience</TabsTrigger>
          <TabsTrigger value="portfolio">
            Portfolio & Certifications
          </TabsTrigger>
        </TabsList>

        {/* Tab Contents */}
        <div className="space-y-6">
          <PersonalInfoTab userData={userData} token={token} />
          <SkillsExperienceTab userData={userData} token={token} />
          <PortfolioTab userData={userData} token={token} />
        </div>
      </Tabs>

      <Toaster />
    </div>
  );
}
