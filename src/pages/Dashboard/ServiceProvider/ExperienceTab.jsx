import React from "react";
import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Briefcase, Calendar, MapPin } from "lucide-react";
const ExperienceTab = ({
  userData,
  setEditingExperience,
  setShowExperienceForm,
  handleDeleteExperience,
  showExperienceForm,
  editingExperience,
  setExperienceForm,
  experienceForm,
  isLoading,
  handleSaveExperience,
  errors,
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  const employmentTypes = [
    "Full-time",
    "Part-time",
    "Contract",
    "Freelance",
    "Internship",
    "Apprenticeship",
    "Temporary",
    "Self-employed",
  ];
  return (
    <CardContent>
      <div className="space-y-6">
        {userData?.serviceProvider?.workExperiences?.length > 0 ? (
          userData?.serviceProvider.workExperiences.map((item, i) => (
            <div key={i} className="border-b pb-6 last:border-0">
              <div className="flex gap-4">
                <Briefcase className="h-10 w-10 text-sky-700" />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.jobTitle}</h3>
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <span>{item.companyName}</span>
                    <span>•</span>
                    <span>{item.employmentType}</span>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                    <Calendar className="h-4 w-4" />
                    <span>{`${formatDate(item.startDate)} - ${
                      item.endDate ? formatDate(item.endDate) : "Present"
                    }`}</span>
                    <span>•</span>
                    <MapPin className="h-4 w-4" />
                    <span>{item.location}</span>
                  </div>
                  <p className="mt-2">{item.description}</p>
                </div>
                <div className="flex-col md:flex gap-2 ">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingExperience(item);
                      setShowExperienceForm(true);
                    }}>
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={isLoading}
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteExperience(i)}>
                    {"Delete"}
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No work experience added yet.</p>
        )}
      </div>

      {/* Experience Form */}
      {showExperienceForm && (
        <div className="mt-6 p-4 border rounded-md bg-gray-50">
          <h3 className="text-md font-semibold mb-4">
            {editingExperience ? "Edit Experience" : "Add Experience"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Job Title</Label>
              <Input
                value={experienceForm.jobTitle}
                placeholder={`e.g., Senior ${
                  userData.workExperiences
                    ? userData.workExperiences[0]?.jobTitle
                    : "Plumber"
                }`}
                onChange={(e) =>
                  setExperienceForm({
                    ...experienceForm,
                    jobTitle: e.target.value,
                  })
                }
              />
              {errors?.jobTitle && (
                <p className="text-red-500 text-xs">{errors.jobTitle}</p>
              )}
            </div>
            <div>
              <Label>Company Name</Label>
              <Input
                placeholder="e.g., ABC Construction"
                value={experienceForm.companyName}
                onChange={(e) =>
                  setExperienceForm({
                    ...experienceForm,
                    companyName: e.target.value,
                  })
                }
              />
              {errors?.companyName && (
                <p className="text-red-500 text-xs">{errors.companyName}</p>
              )}
            </div>

            <div>
              <Label>Employment Type</Label>
              <select
                className="w-full border rounded-md p-2 text-sm bg-background"
                value={experienceForm.employmentType}
                onChange={(e) =>
                  setExperienceForm({
                    ...experienceForm,
                    employmentType: e.target.value,
                  })
                }>
                <option value="">Select Employment Type</option>
                {employmentTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors?.employmentType && (
                <p className="text-red-500 text-xs">{errors.employmentType}</p>
              )}
            </div>
            <div>
              <Label>Location</Label>
              <Input
                placeholder="e.g., Lagos, Nigeria"
                value={experienceForm.location}
                onChange={(e) =>
                  setExperienceForm({
                    ...experienceForm,
                    location: e.target.value,
                  })
                }
              />
              {errors?.location && (
                <p className="text-red-500 text-xs">{errors.location}</p>
              )}
            </div>
            <div>
              <Label>Start Date</Label>
              <Input
                type="date"
                value={experienceForm.startDate}
                onChange={(e) =>
                  setExperienceForm({
                    ...experienceForm,
                    startDate: e.target.value,
                  })
                }
              />
              {errors?.startDate && (
                <p className="text-red-500 text-xs">{errors.startDate}</p>
              )}
            </div>
            <div>
              <Label>End Date</Label>
              <Input
                type="date"
                value={experienceForm.endDate}
                onChange={(e) =>
                  setExperienceForm({
                    ...experienceForm,
                    endDate: e.target.value,
                  })
                }
              />
              {errors?.endDate && (
                <p className="text-red-500 text-xs">{errors.endDate}</p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <Label>Description</Label>
            <textarea
              className="w-full min-h-[80px] border rounded-md p-2 text-sm"
              value={experienceForm.description}
              onChange={(e) =>
                setExperienceForm({
                  ...experienceForm,
                  description: e.target.value,
                })
              }
            />
            {errors?.description && (
              <p className="text-red-500 text-xs">{errors.description}</p>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <Button
              variant="outline"
              onClick={() => {
                setShowExperienceForm(false);
                setEditingExperience(null);
              }}>
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              className="bg-sky-600 hover:bg-sky-700 text-white"
              onClick={handleSaveExperience}>
              {!isLoading && editingExperience
                ? "Update"
                : !isLoading && !editingExperience
                ? "Save"
                : "Processing..."}
            </Button>
          </div>
        </div>
      )}
    </CardContent>
  );
};

export default ExperienceTab;
