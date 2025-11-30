import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { Toaster } from "@/components/ui/toaster";
import { API_HOST_URL } from "@/utils/api/API_HOST";
import { useQueryClient } from "@tanstack/react-query";
import { useUserData } from "@/store/userDataStorage";
const ProfileModal = ({
  selectedApplicant,
  viewProfileOpen,
  setViewProfileOpen,
}) => {
  const employer = useUserData((state) => state.userData);
  const [showImageModal, setShowImageModal] = useState(false);
  const [activeImage, setActiveImage] = useState("");
  const queryClient = useQueryClient();
  const [act, setAct] = useState("");
  const [actionLoading, setActionLoading] = useState(null);
  const token =
    JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
    JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));

  // ✅ Handle Accept / Reject click
  const handleAction = async (applicationId, action) => {
    setActionLoading(applicationId);
    setAct(action);
    try {
      const response = await axios.post(
        `${API_HOST_URL}/api/employers/${applicationId}/review-applicant/${action}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token.authKey,
          },
        }
      );

      queryClient.invalidateQueries(["allApplicants", employer.id]);
      toast({
        title: `${action} Successful 🎉`,
        description: `Applicant ${
          action === "accept" ? "accepted" : "rejected"
        } successfully!`,
      });
      setViewProfileOpen(false);
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: `${action} failed`,
        description: "Error updating applicant status",
      });
    } finally {
      setActionLoading(null);
      setAct("");
    }
  };

  return (
    <>
      <Dialog open={viewProfileOpen} onOpenChange={setViewProfileOpen}>
        <DialogContent className="max-w-5xl w-full max-h-[90vh] overflow-y-auto rounded-2xl p-6 bg-white shadow-2xl">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-3xl font-bold text-gray-800">
              Applicant Profile
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              Complete details of the applicant's professional profile
            </DialogDescription>
          </DialogHeader>

          {selectedApplicant && (
            <div className="space-y-6">
              {/* Top Section: Avatar + Basic Info + Job Applied */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-gray-50 p-4 rounded-xl shadow-sm">
                <div className="flex-shrink-0">
                  <div className="relative w-28 h-28 rounded-full overflow-hidden ring-4 ring-secondary bg-gray-100">
                    {selectedApplicant?.techTalent?.profilePicture ? (
                      <img
                        src={selectedApplicant.techTalent.profilePicture}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : selectedApplicant?.serviceProvider?.profilePicture ? (
                      <img
                        src={selectedApplicant.serviceProvider.profilePicture}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-secondary font-bold text-2xl">
                        {selectedApplicant?.applicant?.firstName}
                        {selectedApplicant?.applicant?.lastName}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {selectedApplicant.applicant.firstName}{" "}
                    {selectedApplicant.applicant.lastName}
                  </h2>
                  <p className="text-gray-500">
                    {selectedApplicant.applicant.email}
                  </p>
                  <p className="text-gray-500 text-sm flex gap-1">
                    <span>{selectedApplicant.applicant.gender} </span>|
                    <span>{selectedApplicant.applicant.userType}</span>
                  </p>
                  <p className="text-gray-500 text-sm">
                    Phone: {selectedApplicant.applicant.phoneNumber || "N/A"}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Registered on:{" "}
                    {new Date(
                      selectedApplicant.applicant.registrationDate
                    ).toLocaleDateString()}{" "}
                    | Last Login:{" "}
                    {new Date(
                      selectedApplicant.applicant.lastLoginTime
                    ).toLocaleString()}
                  </p>
                  <p className="text-secondary text-sm mt-1">
                    <strong>Job Applied:</strong>{" "}
                    {selectedApplicant.jobPosting?.job_title || "N/A"}
                  </p>
                </div>
              </div>

              {/* TECHTALENT Section */}
              {selectedApplicant.applicant.userType === "TECHTALENT" &&
                selectedApplicant.techTalent && (
                  <div className="bg-gray-100 shadow-lg rounded-xl p-6 space-y-4">
                    <h3 className="text-xl font-semibold border-b border-indigo-200 pb-2 text-secondary">
                      Tech Talent Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                      <div className="space-y-2">
                        <p>
                          <strong>Bio:</strong>
                          {selectedApplicant.techTalent.bio || "N/A"}
                        </p>
                        <p>
                          <strong>Current Job:</strong>
                          {selectedApplicant.techTalent.currentJob || "N/A"}
                        </p>
                        <p>
                          <strong>Job Interest:</strong>
                          {selectedApplicant.techTalent.jobInterest || "N/A"}
                        </p>
                        <p>
                          <strong>Work Mode:</strong>
                          {selectedApplicant.techTalent.workMode || "N/A"}
                        </p>
                        <p>
                          <strong>Experience:</strong>
                          {selectedApplicant.techTalent.experienceLevel ||
                            "N/A"}
                        </p>
                        <p>
                          <strong>Highest Qualification:</strong>
                          {selectedApplicant.techTalent.highestQualification ||
                            "N/A"}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2">
                          {selectedApplicant.techTalent.skills.map(
                            (skill, idx) => (
                              <span
                                key={idx}
                                className="bg-gray-200 text-secondary px-3 py-1 rounded-full text-sm font-medium">
                                {skill}
                              </span>
                            )
                          )}
                        </div>
                        <p>
                          <strong>Resume:</strong>{" "}
                          {selectedApplicant.techTalent.resume ? (
                            <a
                              href={selectedApplicant.techTalent.resume}
                              target="_blank"
                              className="text-secondary hover:underline">
                              View
                            </a>
                          ) : (
                            "N/A"
                          )}
                        </p>
                        <p>
                          <strong>Cover Letter:</strong>
                          {selectedApplicant.techTalent.coverletter ? (
                            <a
                              href={selectedApplicant.techTalent.coverletter}
                              target="_blank"
                              className="text-secondary hover:underline">
                              View
                            </a>
                          ) : (
                            "N/A"
                          )}
                        </p>
                        <p>
                          <strong>Portfolio:</strong>{" "}
                          {selectedApplicant.techTalent.portfolioLink ? (
                            <a
                              href={selectedApplicant.techTalent.portfolioLink}
                              target="_blank"
                              className="text-secondary hover:underline">
                              Visit
                            </a>
                          ) : (
                            "N/A"
                          )}
                        </p>
                        <p>
                          <strong>LinkedIn:</strong>{" "}
                          {selectedApplicant.techTalent.linkedInUrl ? (
                            <a
                              href={selectedApplicant.techTalent.linkedInUrl}
                              target="_blank"
                              className="text-secondary hover:underline">
                              Visit
                            </a>
                          ) : (
                            "N/A"
                          )}
                        </p>
                      </div>
                    </div>
                    <p>
                      <strong>Location:</strong>{" "}
                      {selectedApplicant.techTalent.city},{" "}
                      {selectedApplicant.techTalent.state}
                    </p>
                    <p>
                      <strong>Years of Experience:</strong>{" "}
                      {selectedApplicant.techTalent.yearsOfExperience || 0}
                    </p>
                  </div>
                )}

              {/* SERVICE_PROVIDER Section */}
              {selectedApplicant.applicant.userType === "SERVICE_PROVIDER" &&
                selectedApplicant.serviceProvider && (
                  <div className="bg-gray-50 shadow-lg rounded-xl p-6 space-y-4">
                    <h3 className="text-xl font-semibold border-b border-gray-200 pb-2">
                      Service Provider Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <p>
                          <strong>Bio:</strong>
                          {selectedApplicant.serviceProvider.bio ||
                            selectedApplicant.serviceProvider.additionalInfo ||
                            "N/A"}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedApplicant.serviceProvider.mainSkills.map(
                            (skill, idx) => (
                              <span
                                key={idx}
                                className="bg-gray-300 text-secondary px-3 py-1 rounded-full text-sm font-medium">
                                {skill}
                              </span>
                            )
                          )}
                          {selectedApplicant.serviceProvider.subSkills.map(
                            (sub, idx) => (
                              <span
                                key={idx}
                                className="bg-gray-300 text-secondary px-3 py-1 rounded-full text-sm font-medium">
                                {sub}
                              </span>
                            )
                          )}
                          {selectedApplicant.serviceProvider.interests.map(
                            (interest, idx) => (
                              <span
                                key={idx}
                                className="bg-gray-300 text-secondary px-3 py-1 rounded-full text-sm font-medium">
                                {interest}
                              </span>
                            )
                          )}
                        </div>
                        <p>
                          <strong>Preferred Contact:</strong>{" "}
                          {
                            selectedApplicant.serviceProvider
                              .preferredContactMethod
                          }
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p>
                          <strong>Education:</strong>
                        </p>
                        {selectedApplicant.serviceProvider.education ? (
                          <ul className="ml-4 list-disc text-sm">
                            <li>
                              {
                                selectedApplicant.serviceProvider.education
                                  .highestQualification
                              }{" "}
                              from{" "}
                              {
                                selectedApplicant.serviceProvider.education
                                  .schoolName
                              }{" "}
                              (
                              {
                                selectedApplicant.serviceProvider.education
                                  .schoolYear
                              }
                              )
                            </li>
                            <li>
                              {
                                selectedApplicant.serviceProvider.education
                                  .schoolLocation
                              }
                            </li>
                            <li>
                              {
                                selectedApplicant.serviceProvider.education
                                  .schoolDescription
                              }
                            </li>
                          </ul>
                        ) : (
                          "N/A"
                        )}
                        <p>
                          <strong>Work Experience:</strong>
                        </p>
                        {selectedApplicant.serviceProvider.workExperiences
                          .length > 0 ? (
                          <ul className="ml-4 list-disc text-sm">
                            {selectedApplicant.serviceProvider.workExperiences.map(
                              (exp, idx) => (
                                <li key={idx} className="mb-2">
                                  <span className="font-semibold">
                                    {exp.jobTitle}
                                  </span>{" "}
                                  at{" "}
                                  <span className="italic">
                                    {exp.companyName}
                                  </span>{" "}
                                  ({exp.employmentType})<br />
                                  {exp.startDate} - {exp.endDate || "Present"} |{" "}
                                  {exp.location}
                                  <br />
                                  {exp.description}
                                </li>
                              )
                            )}
                          </ul>
                        ) : (
                          "N/A"
                        )}
                      </div>
                    </div>
                    <div className="w-full">
                      {selectedApplicant.serviceProvider
                        ?.picturesOfPreviousWorkDone?.length > 0 && (
                        <div>
                          <h3 className="font-medium text-gray-800">
                            Previous Works
                          </h3>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                            {selectedApplicant.serviceProvider.picturesOfPreviousWorkDone.map(
                              (img, index) => (
                                <div key={index} className="relative">
                                  <img
                                    src={img}
                                    onClick={() => {
                                      setActiveImage(img);
                                      setShowImageModal(true);
                                    }}
                                    className="w-full h-32 object-cover rounded-lg border cursor-pointer hover:opacity-80 transition"
                                  />
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
            </div>
          )}

          {/* Dialog Footer with Accept / Reject Buttons */}
          {selectedApplicant?.applicationStatus === "PENDING" && (
            <DialogFooter className="flex justify-end gap-3 mt-4">
              <Button
                className="bg-red-200 border-none hover:bg-red-300"
                disabled={actionLoading}
                onClick={() =>
                  handleAction(selectedApplicant?.applicationId, "reject")
                }>
                {actionLoading === selectedApplicant?.applicationId &&
                act === "reject" ? (
                  "Processing..."
                ) : (
                  <>
                    <X className="w-4 h-4 mr-1 text-red-800" />
                    <span className="text-red-800">Reject</span>
                  </>
                )}
              </Button>
              <Button
                disabled={actionLoading}
                className="bg-secondary hover:bg-primary border-none"
                onClick={() =>
                  handleAction(selectedApplicant?.applicationId, "accept")
                }>
                {actionLoading === selectedApplicant?.applicationId &&
                act === "accept" ? (
                  "Processing..."
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-1" /> Accept
                  </>
                )}
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
      {/* 🖼 IMAGE MODAL USING SHADCN DIALOG */}
      <Dialog open={showImageModal} onOpenChange={setShowImageModal}>
        <DialogContent className="max-w-3xl bg-white py-5">
          <img
            src={activeImage}
            className="w-full max-h-[80vh] object-contain rounded-md"
          />
        </DialogContent>
      </Dialog>

      <Toaster />
    </>
  );
};

export default ProfileModal;
