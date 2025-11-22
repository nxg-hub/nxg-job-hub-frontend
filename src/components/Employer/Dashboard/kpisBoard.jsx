import {
  BriefcaseBusiness,
  UserRoundCheck,
  UserRoundMinus,
  Users,
} from "lucide-react";
import {
  useGetAllInterviewCandidates,
  useJobsEngagements,
} from "@/hooks/useJobs";
import { Card, CardContent } from "@/components/ui/card";
import { cn, getStoredKey } from "@/lib/utils";
import { useUserData } from "@/store/employer/userDataStorage";
import { useState } from "react";
import { useUserDataQuery } from "@/hooks/useAllUsers";

export default function KPIBoard({ employerID }) {
  const { isLoading, isError, data } = useJobsEngagements(employerID);

  if (isLoading)
    return (
      <div className="flex gap-4 ">
        {Array.from({ length: 4 }).map((_, index) => (
          <KPISkeleton key={index} className="min-w-[280px] flex-shrink-0" />
        ))}
      </div>
    );

  if (isError) return <div>.... error</div>;
  return (
    <div className="space-y-6 md:flex">
      <div className="flex flex-col gap-4 overflow-x-auto pb-2">
        {/* Total jobs posted card */}
        <Card
          className={cn("transition-all hover:shadow-md animate-fade-in-up")}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-sky-100 rounded-lg">
                  <BriefcaseBusiness className="h-6 w-6 text-secondary" />
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Jobs Post
                  </p>
                  <p className="text-2xl font-bold text-gray-700">
                    {data?.noOfJobPostings}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Total applicants card */}
        <Card
          className={cn("transition-all hover:shadow-md animate-fade-in-up")}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-sky-100 rounded-lg">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-medium text-muted-foreground">
                    Number of Applicants
                  </p>
                  <p className="text-2xl font-bold text-gray-700">
                    {data?.noOfApplicants}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* accepted applicant card */}
        <Card
          className={cn("transition-all hover:shadow-md animate-fade-in-up")}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-sky-100 rounded-lg">
                  <UserRoundCheck className="h-6 w-6 text-secondary" />
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-medium text-muted-foreground">
                    Accepted Applications
                  </p>
                  <p className="text-2xl font-bold text-gray-700">
                    {data?.noOfApprovedApplications}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="w-full md:!mt-[-30px]">
        <Interviews />
      </div>
    </div>
  );
}

const KPISkeleton = ({ className }) => {
  return (
    <Card className={cn("animate-pulse", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-muted rounded-lg">
              <div className="h-6 w-6 bg-gray-300 rounded animate-shimmer" />
            </div>
            <div className="flex flex-col space-y-2">
              <div className="h-4 w-24 bg-gray-300 rounded animate-shimmer" />
              <div className="h-8 w-20 bg-gray-300 rounded animate-shimmer" />
            </div>
          </div>
          <div className="flex flex-col items-end space-y-1">
            <div className="h-6 w-16 bg-gray-300 rounded-full animate-shimmer" />
            <div className="h-3 w-20 bg-gray-300 rounded animate-shimmer" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Interviews = () => {
  const { data: userData } = useUserDataQuery();
  const storedJwtToken = getStoredKey();
  const employer = useUserData((state) => state.userData);
  const {
    data,
    isLoading,
    isError: interviewError,
  } = useGetAllInterviewCandidates(employer?.id, storedJwtToken);

  const [activeTab, setActiveTab] = useState("new");

  const date = new Date();
  const pad = (n) => n.toString().padStart(2, "0");
  const currentDate = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}`;
  const today = new Date(currentDate);

  const handleActiveTabChange = (tab) => setActiveTab(tab);

  const newInterviews = data?.filter(
    (task) => new Date(task.interviewDate) > today
  );
  const todaysInterviews = data?.filter(
    (task) =>
      new Date(task.interviewDate).toDateString() === today.toDateString()
  );
  const completedInterviews = data?.filter(
    (task) => new Date(task.interviewDate) < today
  );

  let filteredInterviews = [];
  if (activeTab === "new") filteredInterviews = newInterviews;
  else if (activeTab === "delayed") filteredInterviews = todaysInterviews;
  else if (activeTab === "completed") filteredInterviews = completedInterviews;

  return (
    <div className="w-[95%] md:w-[70%] lg:w-[50%] mx-auto">
      <h2 className="text-secondary font-extrabold py-4 text-center text-2xl md:text-3xl">
        Interviews
      </h2>

      {/* Tabs */}

      <div className="bg-gray-100 w-full flex justify-around font-semibold rounded-lg mb-4 shadow-inner">
        {["new", "delayed", "completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => handleActiveTabChange(tab)}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              activeTab === tab
                ? "bg-secondary text-white shadow-md"
                : "text-gray-700 hover:bg-blue-100 hover:text-black"
            }`}>
            {tab === "new" ? "New" : tab === "delayed" ? "Today" : "Completed"}
          </button>
        ))}
      </div>

      {/* Interview List */}

      <div className="h-[350px] overflow-y-auto bg-gray-50 p-4 rounded-xl shadow-inner">
        {isLoading ? (
          <p className="text-center py-10 text-gray-500 font-medium">
            Loading...
          </p>
        ) : filteredInterviews?.length === 0 ? (
          <p className="text-center py-10 text-gray-500 font-medium">
            No interviews found
          </p>
        ) : (
          filteredInterviews?.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-xl shadow-md p-4 mb-3 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
              <p className="font-bold text-blue-700 text-lg">
                {task.talentName}
              </p>
              <p className="text-sm text-gray-600 mt-1">Job: {task.jobTitle}</p>
              <p className="text-sm text-gray-600">
                Company: {task.employerName}
              </p>
              <p className="text-sm text-gray-600">
                Date: {task.interviewDate} | Time: {task.time}
              </p>
              <p className="text-sm text-gray-600">
                Mode: {task.modeOfInterview}
              </p>
              {task.modeOfInterview === "REMOTE" && task.meetingLink && (
                <p className="text-sm text-green-600 mt-1">
                  Meeting Link:
                  <a
                    href={task.meetingLink}
                    target="_blank"
                    className="underline hover:text-green-800">
                    {task.meetingLink}
                  </a>
                </p>
              )}
              {task.modeOfInterview === "PHYSICAL" && task.interviewAddress && (
                <p className="text-sm text-green-600 mt-1">
                  Location: {task.interviewAddress}
                </p>
              )}
              {task.description && (
                <p className="text-sm mt-2 text-gray-800 italic">
                  {task.description}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
