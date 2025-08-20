"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Upload } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTechTalentProfileFetch } from "./talent-profile-hook";

export default function TalentProfileTab() {
  const { profileData, loading, error } = useTechTalentProfileFetch();
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    if (profileData?.skills) {
      setSkills(profileData.skills);
    }
  }, [profileData]);

  const displayValue = (val) => val ?? "";

  if (loading) return <p className="text-center py-8">Loading profile...</p>;
  if (error) return <p className="text-red-500 text-center py-8">{error}</p>;

  return (
    <div className="space-y-6 m-10">
      <Card className="p-6 shadow-sm rounded-2xl">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <Avatar className="h-28 w-28 border-2 border-primary/20 shadow">
            <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
            <AvatarFallback className="text-xl font-semibold">JD</AvatarFallback>
          </Avatar>
          <div className="space-y-3 flex-1">
            <h3 className="text-lg font-semibold">Profile Picture</h3>
            <p className="text-sm text-muted-foreground">
              Upload a professional photo for your profile
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="personal" className="w-full space-y-4">
        <TabsList className="grid grid-cols-3 w-full rounded-lg bg-muted p-1">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="skills">Skills & Experience</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio & Certifications</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card className="shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">Personal Information</CardTitle>
              <CardDescription>Details about your background</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="col-span-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={displayValue(profileData?.bio)}
                  readOnly
                  rows={4}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Job Interest</Label>
                <Input value={displayValue(profileData?.jobInterest)} readOnly />
              </div>
              <div>
                <Label>LinkedIn URL</Label>
                <Input value={displayValue(profileData?.linkedInUrl)} readOnly />
              </div>
              <div>
                <Label>Verified</Label>
                <Input value={profileData?.verified ? "Yes" : "No"} readOnly />
              </div>
              <div>
                <Label>Country Code</Label>
                <Input value={displayValue(profileData?.countryCode)} readOnly />
              </div>
              <div>
                <Label>State</Label>
                <Input value={displayValue(profileData?.state)} readOnly />
              </div>
              <div>
                <Label>Residential Address</Label>
                <Input value={displayValue(profileData?.residentialAddress)} readOnly />
              </div>
              <div>
                <Label>City</Label>
                <Input value={displayValue(profileData?.city)} readOnly />
              </div>
              <div>
                <Label>Zip Code</Label>
                <Input value={displayValue(profileData?.zipCode)} readOnly />
              </div>
              <div>
                <Label>Location</Label>
                <Input value={displayValue(profileData?.location)} readOnly />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Skills & Experience */}
        <TabsContent value="skills">
          <Card className="shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">Skills & Experience</CardTitle>
              <CardDescription>Your technical and work experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Skills</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {skills.length > 0 ? (
                    skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-primary/10 text-primary font-medium text-sm px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-muted-foreground">No skills listed</span>
                  )}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Highest Qualification</Label>
                  <Input value={displayValue(profileData?.highestQualification)} readOnly />
                </div>
                <div>
                  <Label>Current Job</Label>
                  <Input value={displayValue(profileData?.currentJob)} readOnly />
                </div>
                <div>
                  <Label>Job Type</Label>
                  <Input value={displayValue(profileData?.jobType)} readOnly />
                </div>
                <div>
                  <Label>Years of Experience</Label>
                  <Input value={displayValue(profileData?.yearsOfExperience)} readOnly />
                </div>
                <div>
                  <Label>Experience Level</Label>
                  <Input value={displayValue(profileData?.experienceLevel)} readOnly />
                </div>
                <div>
                  <Label>Work Mode</Label>
                  <Input value={displayValue(profileData?.workMode)} readOnly />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Portfolio & Certifications */}
        <TabsContent value="portfolio">
          <Card className="shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">Portfolio & Certifications</CardTitle>
              <CardDescription>Showcase your work and credentials</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Portfolio Link</Label>
                <Input value={displayValue(profileData?.portfolioLink)} readOnly />
              </div>
              <div>
                <Label>Professional Certification</Label>
                <Input value={displayValue(profileData?.professionalCert)} readOnly />
              </div>
              <div>
                <Label>Resume</Label>
                <Input value={displayValue(profileData?.resume)} readOnly />
              </div>
              <div>
                <Label>Cover Letter</Label>
                <Input value={displayValue(profileData?.coverletter)} readOnly />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
