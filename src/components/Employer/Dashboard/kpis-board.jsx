import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { FaFileAlt, FaUserCheck } from "react-icons/fa";
import { RiSendPlaneFill, RiUserStarFill } from "react-icons/ri";

export default function KPIsBoard({
  jobPost,
  totalApplication,
  shortListed,
  totalInterview,
}) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {/* Total jobs posted card */}
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
                <p className="text-2xl font-bold">{jobPost}</p>
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
                  {totalApplication}
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
                  {shortListed}
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
                  {totalInterview}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
