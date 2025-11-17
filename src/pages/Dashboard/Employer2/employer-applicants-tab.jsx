import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  useGetAllApplicants,
  useGetAllInterviewCandidates,
} from "@/hooks/useJobs";
import { getStoredKey } from "@/lib/utils";
import ProfileModal from "./ProfileModal";
import ScheduleInterviewModal from "./ScheduleInterviewModal";
import axios from "axios";
import { API_HOST_URL } from "@/utils/api/API_HOST";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { JobCardSkeleton } from "@/components/job-card-skeleton";
import { useQueryClient } from "@tanstack/react-query";
import { useUserData } from "@/store/employer/userDataStorage";

export default function EmployerApplicantsTab() {
  const storedJwtToken = getStoredKey();
  const employer = useUserData((state) => state.userData);
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("allApplicants"); // Track active tab
  const [filter, setFilter] = useState("all"); // For applicant status filter
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [viewProfileOpen, setViewProfileOpen] = useState(false);
  const [scheduleInterviewOpen, setScheduleInterviewOpen] = useState(false);

  // Fetch applicants
  const {
    data: applicants,
    isLoading,
    isError,
    error,
  } = useGetAllApplicants(employer.id, storedJwtToken);
  // Fetch interview candidates
  const {
    data: interviews,
    isLoading: interviewLoader,
    isError: interviewError,
  } = useGetAllInterviewCandidates(employer.id, storedJwtToken);

  // Filter applicants based on status
  const filteredApplicants =
    filter === "all"
      ? applicants
      : applicants?.filter((item) => item.applicationStatus === filter);

  // Combine displayed data based on active tab
  const displayedData =
    activeTab === "interviewCandidates" ? interviews : filteredApplicants;

  const onScheduleInterview = async (payload) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${API_HOST_URL}/api/interviews/employer/${employer.id}/setup`,
        payload,
        {
          headers: {
            authorization: storedJwtToken,
          },
        }
      );
      toast({
        title: `Success 🎉`,
        description: `Interview Info has been sent successfully.`,
      });
      setScheduleInterviewOpen(false);
      queryClient.invalidateQueries(["allApplicants", employer.id]);
      queryClient.invalidateQueries(["allInterviewCandidates", employer.id]);
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: `Failed`,
        description: "Error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "PENDING":
        return <Badge className="bg-amber-300">Pending</Badge>;
      case "APPROVED":
        return <Badge className="bg-green-500 text-white">Approved</Badge>;
      case "REJECTED":
        return <Badge variant="destructive">Rejected</Badge>;
      case "INTERVIEWED":
        return <Badge className="bg-secondary">Interview</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  if (isLoading || interviewLoader) return <JobCardSkeleton />;
  if (isError || interviewError)
    return <p className="p-8">{error?.message || "error fetching data"}</p>;
  return (
    <div className="p-8">
      {/* Tabs */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-start md:items-center">
        <div className="flex gap-2 flex-wrap">
          {/* Applicant Tabs */}
          <Button
            variant={activeTab === "allApplicants" ? "default" : "outline"}
            onClick={() => {
              setActiveTab("allApplicants");
              setFilter("all");
            }}>
            All Applicants
            <span>{applicants?.length}</span>
          </Button>
          <Button
            variant={activeTab === "PENDING" ? "default" : "outline"}
            onClick={() => {
              setActiveTab("PENDING");
              setFilter("PENDING");
            }}>
            Pending
            <span>
              {
                applicants?.filter((app) => {
                  return app.applicationStatus === "PENDING";
                })?.length
              }
            </span>
          </Button>
          <Button
            variant={activeTab === "APPROVED" ? "default" : "outline"}
            onClick={() => {
              setActiveTab("APPROVED");
              setFilter("APPROVED");
            }}>
            Approved
            <span>
              {
                applicants?.filter((app) => {
                  return app.applicationStatus === "APPROVED";
                })?.length
              }
            </span>
          </Button>
          <Button
            variant={activeTab === "REJECTED" ? "default" : "outline"}
            onClick={() => {
              setActiveTab("REJECTED");
              setFilter("REJECTED");
            }}>
            Rejected
            <span>
              {
                applicants?.filter((app) => {
                  return app.applicationStatus === "REJECTED";
                })?.length
              }
            </span>
          </Button>
          <Button
            variant={activeTab === "INTERVIEWED" ? "default" : "outline"}
            onClick={() => {
              setActiveTab("INTERVIEWED");
              setFilter("INTERVIEWED");
            }}>
            Interview
            <span>
              {
                applicants?.filter((app) => {
                  return app.applicationStatus === "INTERVIEWED";
                })?.length
              }
            </span>
          </Button>

          {/* Interview Candidates Tab */}
          <Button
            variant={
              activeTab === "interviewCandidates" ? "default" : "outline"
            }
            onClick={() => setActiveTab("interviewCandidates")}>
            Interview Details
            <span>{interviews?.length}</span>
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant / Candidate</TableHead>
                <TableHead>Job Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>status</TableHead>
                <TableHead>
                  {activeTab === "interviewCandidates" ? "Meeting" : "Score"}
                </TableHead>
                <TableHead>
                  {activeTab === "interviewCandidates" ? "Time" : "action"}
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {displayedData?.length > 0 ? (
                displayedData?.map((item) => {
                  if (activeTab === "interviewCandidates") {
                    // Render interview candidate row
                    return (
                      <TableRow key={item.interviewId}>
                        <TableCell>{item?.talentName}</TableCell>
                        <TableCell>{item?.talentEmail}</TableCell>
                        <TableCell>{item.jobTitle}</TableCell>
                        <TableCell>
                          {new Date(item?.interviewDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <a target="_blank" href={item?.meetingLink}>
                            {item?.meetingLink}
                          </a>
                        </TableCell>
                        <TableCell>{item?.time}</TableCell>
                      </TableRow>
                    );
                  }

                  // Render regular applicant row
                  const app = item.applicant;
                  const tech = item.techTalent;
                  const service = item.serviceProvider;
                  const job = item.jobPosting;

                  return (
                    <TableRow key={item.applicationId}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            {tech?.profilePicture ? (
                              <AvatarImage src={tech.profilePicture} />
                            ) : service?.profilePicture ? (
                              <AvatarImage src={service.profilePicture} />
                            ) : (
                              <AvatarFallback>
                                {app.firstName[0]}
                                {app.lastName[0]}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {app.firstName} {app.lastName}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {app.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{job?.job_title}</TableCell>
                      <TableCell>
                        {new Date(item.timestamp).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(item.applicationStatus)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {item.matchingScore} / 100
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedApplicant(item);
                                  setViewProfileOpen(true);
                                }}>
                                View Profile
                              </DropdownMenuItem>

                              {item.applicationStatus === "APPROVED" && (
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedApplicant(item);
                                    setScheduleInterviewOpen(true);
                                  }}>
                                  Schedule Interview
                                </DropdownMenuItem>
                              )}

                              <DropdownMenuSeparator />
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <p className="text-center p-3">No applicant at the moment.</p>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* ✅ View Profile Modal */}
      <ProfileModal
        selectedApplicant={selectedApplicant}
        viewProfileOpen={viewProfileOpen}
        setViewProfileOpen={setViewProfileOpen}
      />

      {/* ✅ Schedule Interview Modal */}
      <ScheduleInterviewModal
        scheduleInterviewOpen={scheduleInterviewOpen}
        setScheduleInterviewOpen={setScheduleInterviewOpen}
        selectedApplicant={selectedApplicant}
        onScheduleInterview={onScheduleInterview}
        loading={loading}
      />

      <Toaster />
    </div>
  );
}
