import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { nigerianStates } from "@/utils/data/location";

export default function EditJobModal({ isOpen, onClose, job, onSave, loader }) {
  const [form, setForm] = useState({ ...job });
  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!form.job_title || form.job_title.trim().length < 3) {
      newErrors.job_title = "Job title must be at least 3 characters.";
    }

    if (!form.job_description || form.job_description.trim().length < 20) {
      newErrors.job_description = "Description must be at least 20 characters.";
    }

    if (!form.salary || isNaN(Number(form.salary))) {
      newErrors.salary = "Salary must be a valid number.";
    }

    if (!form.job_location) {
      newErrors.job_location = "Select a valid job location.";
    }

    if (!form.deadline) {
      newErrors.deadline = "Deadline is required.";
    }

    if (form.deadline) {
      const today = new Date();
      const selected = new Date(form.deadline);
      if (selected < today) {
        newErrors.deadline = "Deadline must be a future date.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    // console.log(form);
    onSave(form);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl rounded-2xl overflow-y-scroll h-[500px] md:h-[600px] shadow-xl border border-gray-200 bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-800">
            Edit Job Posting
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Update the job details below and click save.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Job Title
              </label>
              <Input
                value={form.job_title}
                onChange={(e) => handleChange("job_title", e.target.value)}
                className="mt-1"
              />
              {errors.job_title && (
                <p className="text-xs text-red-500">{errors.job_title}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Salary
              </label>
              <Input
                value={form.salary}
                onChange={(e) => handleChange("salary", e.target.value)}
                className="mt-1"
              />
              {errors.salary && (
                <p className="text-xs text-red-500">{errors.salary}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Job Type
              </label>
              <select
                value={form.job_type}
                onChange={(e) => handleChange("job_type", e.target.value)}
                className="mt-1 w-full border rounded px-3 py-2">
                <option value="full_time">Full Time</option>
                <option value="part_time">Part Time</option>
                {/* <option value="hybrid">Hybrid</option> */}
                <option value="contract">Contract</option>
              </select>
              {errors.job_type && (
                <p className="text-xs text-red-500">{errors.job_type}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Location
              </label>
              <select
                value={form.job_location}
                onChange={(e) => handleChange("job_location", e.target.value)}
                className="mt-1 w-full border rounded px-3 py-2">
                {nigerianStates.map((state) => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </select>
              {errors.job_location && (
                <p className="text-xs text-red-500">{errors.job_location}</p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Deadline
              </label>
              <Input
                type="date"
                value={form.deadline}
                onChange={(e) => handleChange("deadline", e.target.value)}
                className="mt-1"
              />
              {errors.deadline && (
                <p className="text-xs text-red-500">{errors.deadline}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Classification
              </label>
              <select
                value={form.jobClassification}
                onChange={(e) =>
                  handleChange("jobClassification", e.target.value)
                }
                className="mt-1 w-full border rounded px-3 py-2">
                <option value="SERVICE">Service</option>
                <option value="PROFESSIONAL">Professional</option>
              </select>
              {errors.jobClassification && (
                <p className="text-xs text-red-500">
                  {errors.jobClassification}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Tags (comma separated)
              </label>
              <Input
                value={form.tags?.join(", ")}
                onChange={(e) =>
                  handleChange("tags", e.target.value.split(","))
                }
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Full width fields */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Job Description
            </label>
            <Textarea
              rows={4}
              value={form.job_description}
              onChange={(e) => handleChange("job_description", e.target.value)}
              className="mt-1"
            />
            {errors.job_description && (
              <p className="text-xs text-red-500">{errors.job_description}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Requirements
            </label>
            <Textarea
              rows={4}
              value={form.requirements}
              onChange={(e) => handleChange("requirements", e.target.value)}
              className="mt-1"
            />
            {errors.requirements && (
              <p className="text-xs text-red-500">{errors.requirements}</p>
            )}
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="mr-2 border-gray-300 hover:bg-gray-100">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loader}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-md px-6">
            {loader ? "Saving..." : " Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
