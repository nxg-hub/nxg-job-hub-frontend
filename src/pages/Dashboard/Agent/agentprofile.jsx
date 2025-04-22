import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import AgentProfileHeader from "@/components/agent/profileheader";
import AgentBio from "@/components/agent/agentbio";
import AgentContactInfo from "@/components/agent/contactinfo";
import AgentExpertise from "@/components/agent/agentexpertise";
import AgentEditProfileForm from "@/components/agent/editprofile";

export default function AgentProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Alex Johnson",
    title: "Senior Talent Acquisition Specialist",
    photo: "/agent-avatar.jpg",
    location: "San Francisco, CA",
    bio: "Experienced recruitment agent with over 8 years in connecting top talent with leading companies across tech, healthcare, and finance sectors. Specialized in executive placements and technical roles.",
    email: "alex.johnson@talentconnect.com",
    phone: "+1 (415) 555-9876",
    linkedin: "linkedin.com/in/alexjohnson-recruiter",
    experience: "8 years",
    employersSupported: "120+",
    candidatesPlaced: "350+",
    expertiseAreas: [
      "Technical Recruitment",
      "Executive Search",
      "Healthcare Staffing",
    ],
    preferredIndustries: ["Technology", "Healthcare", "Finance", "Biotech"],
    languages: ["English", "Spanish"],
    certifications: ["Certified Recruitment Professional (CRP)", "SHRM-CP"],
  });

  const handleSave = (updatedData) => {
    setProfileData(updatedData);
    setIsEditing(false);
  };

  return (
    <div className="mx-auto px-4 py-8 max-w-6xl">
      {isEditing ? (
        <AgentEditProfileForm
          profileData={profileData}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <AgentProfileHeader
            name={profileData.name}
            title={profileData.title}
            photo={profileData.photo}
            location={profileData.location}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="md:col-span-2 space-y-6">
              <AgentBio bio={profileData.bio} />

              <Card>
                <CardHeader>
                  <CardTitle>Placement Statistics</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Experience</p>
                    <p className="text-xl font-semibold">
                      {profileData.experience}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Employers Supported
                    </p>
                    <p className="text-xl font-semibold">
                      {profileData.employersSupported}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Candidates Placed
                    </p>
                    <p className="text-xl font-semibold">
                      {profileData.candidatesPlaced}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <AgentContactInfo
                email={profileData.email}
                phone={profileData.phone}
                linkedin={profileData.linkedin}
              />

              <AgentExpertise
                expertiseAreas={profileData.expertiseAreas}
                preferredIndustries={profileData.preferredIndustries}
                languages={profileData.languages}
                certifications={profileData.certifications}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              className="border-none bg-sky-500 hover:bg-sky-600"
              onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
