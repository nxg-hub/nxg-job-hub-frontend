import { Card, CardContent } from "@/components/ui/card";
import { cn, formatStatNumber } from "@/lib/utils";
import { FaFileAlt, FaUserCheck } from "react-icons/fa";
import { RiSendPlaneFill, RiUserStarFill } from "react-icons/ri";
import { useJobsEngagements } from "@/hooks/useJobs";

export default function KPIsBoard({ employerID }) {
  const { isLoading, data } = useJobsEngagements(employerID);

  if (isLoading)
    return (
      <div className="flex gap-4 ">
        {Array.from({ length: 3 }).map((_, index) => (
          <KPISkeleton key={index} className="min-w-[220px] flex-shrink-0" />
        ))}
      </div>
    );

  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      <Card
        className={cn(
          "transition-all hover:shadow-md animate-fade-in-up bg-secondary"
        )}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between text-sky-100">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-sky-100 rounded-lg">
                <RiSendPlaneFill className="h-6 w-6 text-secondary" />
              </div>
              <div className="flex flex-col">
                <p className="text-xs md:text-sm font-medium">Job Post</p>
                <p className="text-2xl font-bold">
                  {formatStatNumber(data?.noOfJobPostings)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Total applicants card */}
      <Card className={cn("transition-all hover:shadow-md animate-fade-in-up")}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-sky-100 rounded-lg">
                {/* <FileSliders className="h-6 w-6 text-secondary" /> */}
                <FaFileAlt className="h-6 w-6 text-secondary" />
              </div>
              <div className="flex flex-col">
                <p className="text-xs md:text-sm font-medium text-muted-foreground">
                  Number of Application
                </p>
                <p className="text-2xl font-bold text-gray-700">
                  {formatStatNumber(data?.noOfApplicants)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* accepted applicant card */}
      <Card className={cn("transition-all hover:shadow-md animate-fade-in-up")}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-sky-100 rounded-lg">
                {/* <UserRoundCheck className="h-6 w-6 text-secondary" /> */}
                <FaUserCheck className="h-6 w-6 text-secondary" />
              </div>
              <div className="flex flex-col">
                <p className="text-xs md:text-sm font-medium text-muted-foreground">
                  Shortlisted Applicants
                </p>
                <p className="text-2xl font-bold text-gray-700">
                  {formatStatNumber(data?.selectedApplications)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className={cn("transition-all hover:shadow-md animate-fade-in-up")}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <RiUserStarFill className="h-6 w-6 text-yellow-700" />
              </div>
              <div className="flex flex-col">
                <p className="text-xs md:text-sm font-medium text-muted-foreground">
                  Interviewed Applicants
                </p>
                <p className="text-2xl font-bold text-gray-700">
                  {formatStatNumber(data?.scheduledForInterviewApplications)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
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
