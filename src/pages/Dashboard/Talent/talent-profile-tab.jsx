"use client";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedInUser } from "@/redux/LoggedInUserSlice";
import { Toaster } from "@/components/ui/toaster";
import SkillsExperienceTab from "./SkillsExperienceTab";
import PortfolioTab from "./PortfolioTab";
import ProfilePhotoUploader from "@/components/ServiceProvider/ProfilePhotoUploader";
import PersonalInfoTab from "./PersonalInfoTab";

export default function TalentProfileTab() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.LoggedInUserSlice.loggedInUser);
  const success = useSelector((state) => state.LoggedInUserSlice.success);
  // const loading = useSelector((state) => state.LoggedInUserSlice.loading);
  const error = useSelector((state) => state.LoggedInUserSlice.error);
  const token =
    JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
    JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));

  const [skills, setSkills] = useState([]);
  useEffect(() => {
    if (success) {
      return;
    }
    dispatch(fetchLoggedInUser("/api/v1/tech-talent/get-user"));
  }, []);

  useEffect(() => {
    if (userData?.skills) {
      setSkills(userData.skills);
    }
  }, [userData]);

  // if (loading) return <p className="text-center py-8">Loading profile...</p>;
  if (error) return <p className="text-red-500 text-center py-8">{error}</p>;

  return (
    <div className="space-y-6 m-10">
      <Card className="p-6 shadow-sm rounded-2xl">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <ProfilePhotoUploader
            userId={userData.techId}
            token={token.authKey}
            userData={userData}
          />
        </div>
      </Card>

      <Tabs defaultValue="personal" className="w-full space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-3 w-full rounded-lg bg-muted mb-10 md:mb-0 md:p-1">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="skills">Skills & Experience</TabsTrigger>
          <TabsTrigger value="portfolio">
            Portfolio & Certifications
          </TabsTrigger>
        </TabsList>
        {/* personal info */}
        <PersonalInfoTab userData={userData} token={token.authKey} />

        {/* Skills & Experience */}
        <SkillsExperienceTab userData={userData} token={token.authKey} />

        {/* Portfolio & Certifications */}
        <PortfolioTab userData={userData} token={token.authKey} />
      </Tabs>
      <Toaster />
    </div>
  );
}
