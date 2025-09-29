import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { X, Plus, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AgentProfileEditForm({ profileData, onSave }) {
  const [formData, setFormData] = useState(profileData);
  const [newSkill, setNewSkill] = useState("");
  const [newExpertise, setNewExpertise] = useState("");
  const [newIndustry, setNewIndustry] = useState("");
  const [newLanguage, setNewLanguage] = useState({
    language: "",
    proficiency: "Fluent",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value,
      },
    }));
  };

  const handleAvailabilityChange = (checked) => {
    setFormData((prev) => ({
      ...prev,
      availableForNewClients: checked,
    }));
  };

  const handleAddSkill = () => {
  if (newSkill.trim() && typeof newSkill === "string") {
    setFormData({
      ...formData,
      skills: [...formData.skills, newSkill.trim()],
    });
    setNewSkill("");
  }
};

  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleAddExpertise = () => {
    if (newExpertise.trim()) {
      setFormData((prev) => ({
        ...prev,
        expertiseAreas: [...prev.expertiseAreas, newExpertise.trim()],
      }));
      setNewExpertise("");
    }
  };

  const handleRemoveExpertise = (expertiseToRemove) => {
    setFormData((prev) => ({
      ...prev,
      expertiseAreas: prev.expertiseAreas.filter(
        (expertise) => expertise !== expertiseToRemove
      ),
    }));
  };

  const handleAddIndustry = () => {
    if (newIndustry.trim()) {
      setFormData((prev) => ({
        ...prev,
        preferredIndustries: [...prev.preferredIndustries, newIndustry.trim()],
      }));
      setNewIndustry("");
    }
  };

  const handleRemoveIndustry = (industryToRemove) => {
    setFormData((prev) => ({
      ...prev,
      preferredIndustries: prev.preferredIndustries.filter(
        (industry) => industry !== industryToRemove
      ),
    }));
  };

  const handleAddLanguage = () => {
    if (newLanguage.language.trim()) {
      setFormData((prev) => ({
        ...prev,
        languages: [...prev.languages, { ...newLanguage }],
      }));
      setNewLanguage({ language: "", proficiency: "Fluent" });
    }
  };

  const handleRemoveLanguage = (languageToRemove) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.filter(
        (lang) => lang.language !== languageToRemove.language
      ),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form
      id="profile-edit-form"
      onSubmit={handleSubmit}
      className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-background">
                <AvatarImage
                  src={formData.avatar || "/placeholder.svg"}
                  alt={formData.name}
                />
                <AvatarFallback className="text-2xl">
                  {formData.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <Button
                type="button"
                size="icon"
                variant="outline"
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-background">
                <Upload className="h-4 w-4" />
                <span className="sr-only">Upload photo</span>
              </Button>
            </div>

            <div className="grid w-full gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Job Title</Label>
                <Input
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="Your job title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email address"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, Country"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Input
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  placeholder="Your current status"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="availableForNewClients">
                Available for new clients
              </Label>
              <Switch
                id="availableForNewClients"
                checked={formData.availableForNewClients}
                onCheckedChange={handleAvailabilityChange}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="bio">About Me</Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Write a short bio about yourself"
              rows={5}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                name="linkedin"
                value={formData.socialLinks?.linkedin || ""}
                onChange={handleSocialLinkChange}
                placeholder="LinkedIn URL"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter</Label>
              <Input
                id="twitter"
                name="twitter"
                value={formData.socialLinks?.twitter || ""}
                onChange={handleSocialLinkChange}
                placeholder="Twitter URL"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                name="website"
                value={formData.socialLinks?.website || ""}
                onChange={handleSocialLinkChange}
                placeholder="Website URL"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expertise & Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Expertise Areas</Label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {formData.expertiseAreas.map((expertise, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="pl-2 pr-1 py-1 gap-1">
                  {expertise}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="border-none bg-sky-500 hover:bg-red-600 text-white hover:text-sky-50 h-4 w-4 rounded-full"
                    onClick={() => handleRemoveExpertise(expertise)}>
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {expertise}</span>
                  </Button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newExpertise}
                onChange={(e) => setNewExpertise(e.target.value)}
                placeholder="Add expertise area"
                className="flex-1"
              />
              <Button
                className="border-none bg-sky-500 hover:bg-sky-600"
                type="button"
                onClick={handleAddExpertise}
                size="sm">
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Preferred Industries</Label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {formData.preferredIndustries.map((industry, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="pl-2 pr-1 py-1 gap-1">
                  {industry}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="border-none bg-sky-500 hover:bg-red-600 text-white hover:text-sky-50 h-4 w-4 rounded-full"
                    onClick={() => handleRemoveIndustry(industry)}>
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {industry}</span>
                  </Button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newIndustry}
                onChange={(e) => setNewIndustry(e.target.value)}
                placeholder="Add preferred industry"
                className="flex-1"
              />
              <Button
                className="border-none bg-sky-500 hover:bg-sky-600"
                type="button"
                onClick={handleAddIndustry}
                size="sm">
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Skills</Label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {formData.skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="pl-2 pr-1 py-1 gap-1">
                  {skill}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="border-none bg-sky-500 hover:bg-red-600 text-white hover:text-sky-50 h-4 w-4 rounded-full"
                    onClick={() => handleRemoveSkill(skill)}>
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {skill}</span>
                  </Button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add skill"
                className="flex-1"
              />
              <Button
                className="border-none bg-sky-500 hover:bg-sky-600"
                type="button"
                onClick={handleAddSkill}
                size="sm">
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Languages</Label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {formData.languages.map((lang, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="pl-2 pr-1 py-1 gap-1">
                  {lang.language} ({lang.proficiency})
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="border-none bg-sky-500 hover:bg-red-600 text-white hover:text-sky-50 h-4 w-4 rounded-full"
                    onClick={() => handleRemoveLanguage(lang)}>
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {lang.language}</span>
                  </Button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newLanguage.language}
                onChange={(e) =>
                  setNewLanguage({ ...newLanguage, language: e.target.value })
                }
                placeholder="Language"
                className="flex-1"
              />
              <select
                value={newLanguage.proficiency}
                onChange={(e) =>
                  setNewLanguage({
                    ...newLanguage,
                    proficiency: e.target.value,
                  })
                }
                className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                <option>Fluent</option>
                <option>Advanced</option>
                <option>Intermediate</option>
                <option>Basic</option>
              </select>
              <Button
                className="border-none bg-sky-500 hover:bg-sky-600"
                type="button"
                onClick={handleAddLanguage}
                size="sm">
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
