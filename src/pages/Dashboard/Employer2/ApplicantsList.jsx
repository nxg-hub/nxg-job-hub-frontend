"use client";
import { useState, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Check, X } from "lucide-react";
import { API_HOST_URL } from "@/utils/api/API_HOST";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

export default function ApplicantsList({ applicants, handleViewApplicants }) {
  const [expanded, setExpanded] = useState(null);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("ALL");
  const [act, setAct] = useState("");
  const [actionLoading, setActionLoading] = useState(null);
  const token =
    JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
    JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));

  const toggleExpand = (id) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  // ✅ Filter applicants based on search and userType
  const filteredApplicants = useMemo(() => {
    return applicants.filter((app) => {
      const applicant = app.applicant || {};
      const fullName = `${applicant.firstName || ""} ${
        applicant.lastName || ""
      }`.toLowerCase();
      const email = applicant.email?.toLowerCase() || "";
      const userType = applicant.userType?.toUpperCase() || "";

      const matchesSearch =
        fullName.includes(search.toLowerCase()) ||
        email.includes(search.toLowerCase());
      const matchesFilter = filterType === "ALL" || userType === filterType;
      return matchesSearch && matchesFilter;
    });
  }, [search, filterType, applicants]);

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

      if (response.status !== 200) throw new Error("Failed to update status");

      toast({
        title: `${action} Successful 🎉`,
        description: `Applicant ${
          action === "accept" ? "accepted" : "rejected"
        } successfully!`,
      });
      handleViewApplicants();
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

  if (!applicants || applicants.length === 0)
    return (
      <p className="text-gray-500 text-center py-10">No applicants found.</p>
    );

  return (
    <div className="space-y-6">
      {/* 🔍 Search & Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2"
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="ALL">All Applicants</option>
          <option value="TECHTALENT">Tech Talents</option>
          <option value="SERVICE_PROVIDER">Service Providers</option>
        </select>
      </div>

      {/* 🧍 Applicants List */}
      <div className="space-y-4">
        {filteredApplicants.length === 0 ? (
          <p className="text-gray-500 text-center py-10">
            No matching applicants found.
          </p>
        ) : (
          filteredApplicants.map((application) => {
            const applicant = application.applicant;
            const techTalent = application.techTalent;
            const serviceProvider = application.serviceProvider;
            const userType = applicant?.userType;
            const applicationId = application.applicationId;

            const name =
              `${applicant?.firstName || serviceProvider?.firstName || ""} ${
                applicant?.lastName || serviceProvider?.lastName || ""
              }`.trim() || applicant?.email;

            return (
              <Card
                key={applicationId}
                className="shadow-sm border border-gray-200 transition hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage
                        src={
                          techTalent?.profilePicture ||
                          serviceProvider?.profilePicture ||
                          undefined
                        }
                        alt="Profile picture"
                      />
                      <AvatarFallback>
                        {techTalent?.firstName?.[0] ||
                          serviceProvider?.firstName?.[0] ||
                          "D"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg font-semibold">
                        {name}
                      </CardTitle>
                      <p className="text-sm text-gray-600">
                        {userType === "TECHTALENT"
                          ? "Tech Talent"
                          : "Service Provider"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {applicant?.email}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full 
    ${
      application.applicationStatus === "APPROVED"
        ? "bg-green-100 text-green-700"
        : application.applicationStatus === "PENDING"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-red-100 text-red-700"
    }
  `}>
                    {application.applicationStatus}
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleExpand(applicationId)}>
                    {expanded === applicationId ? (
                      <>
                        Hide <ChevronUp className="ml-1 w-4 h-4" />
                      </>
                    ) : (
                      <>
                        View More <ChevronDown className="ml-1 w-4 h-4" />
                      </>
                    )}
                  </Button>
                </CardHeader>

                {expanded === applicationId && (
                  <>
                    <CardContent className="pt-2 space-y-3 border-t border-gray-100">
                      {userType === "TECHTALENT" ? (
                        <div className="space-y-3">
                          <Section label="About" value={techTalent?.bio} />
                          <GridInfo
                            data={{
                              "Experience Level": techTalent?.experienceLevel,
                              "Job Type": techTalent?.jobType,
                              "Years of Experience": `${
                                techTalent?.yearsOfExperience || 0
                              } years`,
                              "Current Job": techTalent?.currentJob,
                              "Job Interest": techTalent?.jobInterest,
                              Location: `${techTalent?.city}, ${techTalent?.state}`,
                            }}
                          />

                          {techTalent?.skills?.length > 0 && (
                            <div>
                              <h3 className="font-medium text-gray-800">
                                Skills
                              </h3>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {techTalent.skills.map((skill) => (
                                  <span
                                    key={skill}
                                    className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="flex flex-wrap gap-3 pt-2">
                            {techTalent?.resume && (
                              <a
                                href={techTalent.resume}
                                target="_blank"
                                className="text-blue-600 hover:underline text-sm">
                                📄 View Resume
                              </a>
                            )}
                            {techTalent?.coverletter && (
                              <a
                                href={techTalent.coverletter}
                                target="_blank"
                                className="text-blue-600 hover:underline text-sm">
                                📝 View Cover Letter
                              </a>
                            )}
                            {techTalent?.portfolioLink && (
                              <a
                                href={techTalent.portfolioLink}
                                target="_blank"
                                className="text-blue-600 hover:underline text-sm">
                                💼 View Portfolio
                              </a>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <Section
                            label="About"
                            value={
                              serviceProvider?.additionalInfo ||
                              "No additional information provided."
                            }
                          />
                          <GridInfo
                            data={{
                              "Main Skills":
                                serviceProvider?.mainSkills?.join(", "),
                              "Sub Skills":
                                serviceProvider?.subSkills?.join(", "),
                              City: serviceProvider?.city,
                              State: serviceProvider?.state,
                              "Preferred Contact":
                                serviceProvider?.preferredContactMethod,
                            }}
                          />

                          {serviceProvider?.workExperiences?.length > 0 && (
                            <div>
                              <h3 className="font-medium text-gray-800">
                                Experience
                              </h3>
                              {serviceProvider.workExperiences.map(
                                (work, i) => (
                                  <div
                                    key={i}
                                    className="border rounded-lg p-2 text-sm bg-gray-50 mt-1">
                                    <p className="font-medium">
                                      {work.jobTitle}
                                    </p>
                                    <p className="text-gray-600">
                                      {work.companyName}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {work.location}
                                    </p>
                                    <p className="text-xs mt-1">
                                      {work.description}
                                    </p>
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>

                    {/* ✅ Accept / Reject Buttons */}
                    <CardFooter className="flex justify-end gap-3 border-t border-gray-100 pt-4">
                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={actionLoading === applicationId}
                        onClick={() => handleAction(applicationId, "reject")}>
                        {actionLoading === applicationId && act === "reject" ? (
                          "Processing..."
                        ) : (
                          <>
                            <X className="w-4 h-4 mr-1" /> Reject
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        disabled={actionLoading === applicationId}
                        onClick={() => handleAction(applicationId, "accept")}>
                        {actionLoading === applicationId && act === "accept" ? (
                          "Processing..."
                        ) : (
                          <>
                            <Check className="w-4 h-4 mr-1" /> Accept
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </>
                )}
              </Card>
            );
          })
        )}
      </div>
      <Toaster />
    </div>
  );
}

function Section({ label, value }) {
  if (!value) return null;
  return (
    <div>
      <h3 className="font-medium text-gray-800">{label}</h3>
      <p className="text-sm text-gray-600">{value}</p>
    </div>
  );
}

function GridInfo({ data }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {Object.entries(data).map(
        ([label, value]) =>
          value && (
            <div key={label}>
              <p className="text-xs text-gray-500">{label}</p>
              <p className="text-sm font-medium text-gray-800">{value}</p>
            </div>
          )
      )}
    </div>
  );
}
