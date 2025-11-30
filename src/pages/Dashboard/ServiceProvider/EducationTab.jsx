import React from "react";
import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, GraduationCap } from "lucide-react";
import InstitutionAutocomplete from "@/components/ServiceProvider/InstitutionAutocomplete";
const qualifications = [
  "High School Diploma",
  "Associate Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
  "Professional Certification",
  // "Other",
];
const EducationTab = ({
  userData,
  setEditingEducation,
  setShowEducationForm,
  setEducationForm,
  handleDeleteEducation,
  errors,
  showEducationForm,
  editingEducation,
  handleSaveEducation,
  educationForm,
  isLoading,
}) => {
  return (
    <CardContent>
      {/* Existing Education Display */}
      {userData?.serviceProvider?.education ? (
        <div className="border-b pb-6 last:border-0">
          <div className="flex gap-4">
            <GraduationCap className="h-10 w-10 text-sky-700" />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">
                {userData?.serviceProvider.education.highestQualification}
              </h3>
              <div className="text-sm text-gray-500">
                {userData?.serviceProvider.education.schoolName}
              </div>
              <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                <Calendar className="h-4 w-4" />
                <span>
                  Graduated {userData?.serviceProvider.education.schoolYear}
                </span>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                📍 {userData?.serviceProvider.education.schoolLocation}
              </div>
              <p className="mt-2">
                {userData?.serviceProvider.education.schoolDescription}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditingEducation(true);
                  setShowEducationForm(true);
                  setEducationForm(userData?.serviceProvider.education);
                }}>
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-red-500 hover:text-red-700"
                onClick={() => handleDeleteEducation()}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No education record found.</p>
      )}

      {/* Add/Edit Education Form */}
      {showEducationForm && (
        <div className="mt-6 p-4 border rounded-md bg-gray-50">
          <h3 className="font-semibold mb-4">
            {editingEducation ? "Edit Education" : "Add Education"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Highest Qualification</Label>
              <select
                className="w-full border rounded-md p-2 text-sm bg-white"
                value={educationForm.highestQualification}
                onChange={(e) =>
                  setEducationForm({
                    ...educationForm,
                    highestQualification: e.target.value,
                  })
                }>
                <option value="">Select Qualification</option>
                {qualifications.map((q, index) => (
                  <option key={index} value={q}>
                    {q}
                  </option>
                ))}
              </select>
              {errors?.highestQualification && (
                <p className="text-red-500 text-xs">
                  {errors.highestQualification}
                </p>
              )}
            </div>

            <div>
              <Label>School Name</Label>
              <InstitutionAutocomplete
                value={educationForm.schoolName}
                onChange={(value) =>
                  setEducationForm({
                    ...educationForm,
                    schoolName: value,
                  })
                }
              />
              {errors?.schoolName && (
                <p className="text-red-500 text-xs">{errors.schoolName}</p>
              )}
            </div>

            <div>
              <Label>Graduation Year</Label>
              <Input
                type="text"
                value={educationForm.schoolYear}
                onChange={(e) =>
                  setEducationForm({
                    ...educationForm,
                    schoolYear: e.target.value,
                  })
                }
              />
              {errors?.schoolYear && (
                <p className="text-red-500 text-xs">{errors.schoolYear}</p>
              )}
            </div>

            <div>
              <Label>School Location</Label>
              <Input
                placeholder="Enter school location (City, State/Country)"
                value={educationForm.schoolLocation}
                onChange={(e) =>
                  setEducationForm({
                    ...educationForm,
                    schoolLocation: e.target.value,
                  })
                }
              />
              {errors?.schoolLocation && (
                <p className="text-red-500 text-xs">{errors.schoolLocation}</p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <Label>Description</Label>
            <textarea
              placeholder="Briefly describe your studies, achievements, or relevant coursework"
              className="w-full min-h-[80px] border rounded-md p-2 text-sm"
              value={educationForm.schoolDescription}
              onChange={(e) =>
                setEducationForm({
                  ...educationForm,
                  schoolDescription: e.target.value,
                })
              }
            />
            {errors?.schoolDescription && (
              <p className="text-red-500 text-xs">{errors.schoolDescription}</p>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setShowEducationForm(false)}>
              Cancel
            </Button>
            <Button
              className="bg-sky-700 hover:bg-sky-800 text-white"
              onClick={() => handleSaveEducation()}>
              {/* {editingEducation ? "Update" : "Save"} */}
              {!isLoading && editingEducation
                ? "Update"
                : !isLoading && !editingEducation
                ? "Save"
                : "Processing..."}
            </Button>
          </div>
        </div>
      )}
    </CardContent>
  );
};

export default EducationTab;
