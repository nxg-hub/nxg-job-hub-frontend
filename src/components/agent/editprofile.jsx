import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function AgentEditProfileForm({
  profileData,
  onSave,
  onCancel,
}) {
  const [formData, setFormData] = useState(profileData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={formData.photo} />
              <AvatarFallback>{formData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button
              variant="outline"
              size="sm">
              Change Photo
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Professional Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn Profile</Label>
              <Input
                id="linkedin"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="employersSupported">Employers Supported</Label>
              <Input
                id="employersSupported"
                name="employersSupported"
                value={formData.employersSupported}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="candidatesPlaced">Candidates Placed</Label>
              <Input
                id="candidatesPlaced"
                name="candidatesPlaced"
                value={formData.candidatesPlaced}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expertiseAreas">
                Areas of Expertise (comma separated)
              </Label>
              <Input
                id="expertiseAreas"
                value={formData.expertiseAreas.join(", ")}
                onChange={(e) =>
                  handleArrayChange("expertiseAreas", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferredIndustries">
                Preferred Industries (comma separated)
              </Label>
              <Input
                id="preferredIndustries"
                value={formData.preferredIndustries.join(", ")}
                onChange={(e) =>
                  handleArrayChange("preferredIndustries", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="languages">Languages (comma separated)</Label>
              <Input
                id="languages"
                value={formData.languages.join(", ")}
                onChange={(e) => handleArrayChange("languages", e.target.value)}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="certifications">
                Certifications (one per line)
              </Label>
              <Textarea
                id="certifications"
                value={formData.certifications.join("\n")}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    certifications: e.target.value
                      .split("\n")
                      .map((item) => item.trim()),
                  }))
                }
                rows={4}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
