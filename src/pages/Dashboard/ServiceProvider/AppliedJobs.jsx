import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, CalendarDays, MapPin, DollarSign } from "lucide-react";

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
  ACCEPTED: "bg-green-100 text-green-800 border-green-200",
  REJECTED: "bg-red-100 text-red-800 border-red-200",
  REVIEWING: "bg-blue-100 text-blue-800 border-blue-200",
};

export default function AppliedJobs({ applications }) {
  if (!applications || applications.length === 0) {
    return (
      <div className="text-center py-10 text-sm text-muted-foreground">
        You haven’t applied for any jobs yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {applications.map((app) => {
        const job = app.jobPosting;
        const employer = job.employer;

        return (
          <Card
            key={app.applicationId}
            className="shadow-sm hover:shadow-md transition rounded-xl border border-gray-100">
            <CardContent className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Left section */}
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
                  {employer?.companyLogo ? (
                    <img
                      src={employer.companyLogo}
                      alt={employer.companyName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Briefcase className="text-gray-400" />
                  )}
                </div>

                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    {job.job_title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {employer.companyName}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {job.job_location || "Remote"}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5" />₦
                      {Number(job.salary).toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <CalendarDays className="w-3.5 h-3.5" />
                      Applied on {new Date(app.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right section */}
              <div className="flex flex-col items-end gap-2">
                <Badge
                  className={`text-xs px-3 py-1 font-semibold border ${
                    statusColors[app.applicationStatus] ||
                    "bg-gray-100 text-gray-700"
                  }`}>
                  {app.applicationStatus}
                </Badge>

                {/* <Button variant="outline" size="sm" className="text-xs">
                  View Details
                </Button> */}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
