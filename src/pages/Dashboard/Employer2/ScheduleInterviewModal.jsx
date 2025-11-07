import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ScheduleInterviewModal = ({
  scheduleInterviewOpen,
  setScheduleInterviewOpen,
  selectedApplicant,
  onScheduleInterview,
  loading,
}) => {
  const [dateTime, setDateTime] = useState("");
  const [description, setDescription] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [modeOfInterview, setModeOfInterview] = useState("REMOTE");
  const [interviewAddress, setInterviewAddress] = useState("");
  const [errors, setErrors] = useState({});

  const handleConfirm = () => {
    const newErrors = {};

    if (!dateTime) newErrors.dateTime = "Please select date and time";

    if (!modeOfInterview)
      newErrors.modeOfInterview = "Please select mode of interview";

    if (modeOfInterview === "PHYSICAL" && !interviewAddress.trim()) {
      newErrors.interviewAddress =
        "Please enter interview address for PHYSICAL mode";
    }

    if (modeOfInterview === "REMOTE" && !meetingLink.trim()) {
      newErrors.meetingLink = "Please enter meeting link for REMOTE mode";
    }

    if (!description.trim()) newErrors.description = "Please enter description";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors if all fields are valid
    setErrors({});

    const dt = new Date(dateTime);
    const payload = {
      jobTitle: selectedApplicant?.jobPosting?.job_title || "",
      talentName: `${selectedApplicant?.applicant?.firstName} ${selectedApplicant?.applicant?.lastName}`,
      talentEmail: selectedApplicant?.applicant?.email || "",
      interviewDate: dt.toISOString().split("T")[0], // YYYY-MM-DD
      time: dt.toTimeString().split(" ")[0], // HH:MM:SS
      description,
      meetingLink,
      modeOfInterview,
      interviewAddress: modeOfInterview === "PHYSICAL" ? interviewAddress : "",
    };

    onScheduleInterview(payload);
  };

  return (
    <Dialog
      open={scheduleInterviewOpen}
      onOpenChange={setScheduleInterviewOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Schedule Interview</DialogTitle>
        </DialogHeader>

        {selectedApplicant && (
          <div className="space-y-4">
            <p className="flex gap-1">
              Scheduling interview for{" "}
              <strong>
                {selectedApplicant?.applicant?.firstName}{" "}
                {selectedApplicant?.applicant?.lastName}
              </strong>
            </p>

            <div>
              <Input
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
              />
              {errors.dateTime && (
                <p className="text-red-500 text-sm mt-1">{errors.dateTime}</p>
              )}
            </div>

            <div>
              <Select
                value={modeOfInterview}
                onValueChange={setModeOfInterview}>
                <SelectTrigger>
                  <SelectValue placeholder="Mode of Interview" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="REMOTE">Remote</SelectItem>
                  <SelectItem value="PHYSICAL">Physical</SelectItem>
                </SelectContent>
              </Select>
              {errors.modeOfInterview && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.modeOfInterview}
                </p>
              )}
            </div>

            {modeOfInterview === "PHYSICAL" && (
              <div>
                <Input
                  placeholder="Interview Address"
                  value={interviewAddress}
                  onChange={(e) => setInterviewAddress(e.target.value)}
                />
                {errors.interviewAddress && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.interviewAddress}
                  </p>
                )}
              </div>
            )}

            {modeOfInterview === "REMOTE" && (
              <div>
                <Input
                  placeholder="Meeting Link"
                  value={meetingLink}
                  onChange={(e) => setMeetingLink(e.target.value)}
                />
                {errors.meetingLink && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.meetingLink}
                  </p>
                )}
              </div>
            )}

            <div>
              <Textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>
          </div>
        )}

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button disabled={loading} onClick={handleConfirm}>
            {loading ? "Processing..." : "Confirm"}
          </Button>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleInterviewModal;
