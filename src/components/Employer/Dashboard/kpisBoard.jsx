import {
  BriefcaseBusiness,
  UserRoundCheck,
  UserRoundMinus,
  Users,
} from "lucide-react";
import { useJobsEngagements } from "@/hooks/useJobs";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
    <div className="space-y-6">
      <div className="flex gap-4 overflow-x-auto pb-2">
        {/* Total jobs posted card */}
        <Card
          className={cn("transition-all hover:shadow-md animate-fade-in-up")}
        >
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
          className={cn("transition-all hover:shadow-md animate-fade-in-up")}
        >
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
          className={cn("transition-all hover:shadow-md animate-fade-in-up")}
        >
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
        {/* rejected applicants */}
        {/* <Card
          className={cn("transition-all hover:shadow-md animate-fade-in-up")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-sky-100 rounded-lg">
                  <UserRoundMinus className="h-6 w-6 text-secondary" />
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-medium text-muted-foreground">
                    Rejected Applicants
                  </p>
                  <p className="text-2xl font-bold text-gray-700">
                    {data.totalJobsRejected}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card> */}
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
