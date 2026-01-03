import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useJobsEngagements } from "@/hooks/useJobs";
import emptyPieChartImage from "@/static/icons/SVG/pie.svg";
import { formatStatNumber } from "@/lib/utils";

export default function JobStatisticsChart({
  employerID,
  setOpenCreateJobDialog,
}) {
  const { isLoading, data } = useJobsEngagements(employerID);

  const dataInfo = [
    {
      name: "Job Post",
      value: formatStatNumber(data?.noOfJobPostings),
      fill: "#22c55e",
    },
    {
      name: "Total Application",
      value: formatStatNumber(data?.noOfApplicants),
      fill: "#eab308",
    },
    {
      name: "Selected Application",
      value: formatStatNumber(data?.selectedApplications),
      fill: "#06b6d4",
    },
    {
      name: "Rejected Application",
      value: formatStatNumber(data?.rejectedApplications),
      fill: "#8b5cf6",
    },
    {
      name: "Short Listed",
      value: formatStatNumber(data?.scheduledForInterviewApplications),
      fill: "#ff6b6b",
    },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0];
      return (
        <div className="bg-background border border-border rounded-lg p-2 shadow-lg">
          <p className="text-sm font-medium">{name}</p>
          <p className="text-sm text-foreground">{value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return <ApplicationsChartSkeleton />;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Job Statistics</CardTitle>
        <CardDescription>Application statistics breakdown</CardDescription>
      </CardHeader>
      <CardContent>
        {data?.noOfJobPostings > 0 ? (
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataInfo}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={140}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {dataInfo.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  formatter={(value, entry) => (
                    <span className="text-sm text-foreground">
                      {entry.payload.name}:{" "}
                      <span className="font-semibold">
                        {entry.payload.value?.toLocaleString()}
                      </span>
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="w-full py-20 flex flex-col gap-4 justify-center items-center">
            <img
              className="w-40"
              src={emptyPieChartImage}
              alt="no suggested "
            />
            <div className="text-sm italic text-center text-gray-400">
              <p className="text-sm text-muted-foreground max-w-[250px] mt-2">
                There were no job applications submitted yet.{" "}
                <span
                  onClick={setOpenCreateJobDialog}
                  className="text-primary underline hover:cursor-pointer"
                >
                  Post job
                </span>
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

const ApplicationsChartSkeleton = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            {/* Title Skeleton */}
            <div className="h-6 w-48 bg-muted animate-pulse rounded-md" />
            {/* Description Skeleton */}
            <div className="h-4 w-32 bg-muted/60 animate-pulse rounded-md" />
          </div>
        </div>

        {/* Filter Selectors Skeleton */}
        <div className="flex gap-4 mt-6">
          <div className="flex flex-col gap-2">
            <div className="h-4 w-12 bg-muted/60 animate-pulse rounded-md" />
            <div className="h-9 w-32 bg-muted animate-pulse rounded-md" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-4 w-10 bg-muted/60 animate-pulse rounded-md" />
            <div className="h-9 w-24 bg-muted animate-pulse rounded-md" />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Main Chart Area Skeleton */}
        <div className="h-[400px] w-full flex items-end gap-2 px-2 pb-8 pt-4">
          {/* Faint Grid Lines Simulation */}
          <div className="absolute inset-x-6 top-24 bottom-20 flex flex-col justify-between pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-full h-[1px] bg-muted/20" />
            ))}
          </div>

          {/* Simulated Bars to represent a ghost of a chart */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="flex-1 bg-muted/30 animate-pulse rounded-t-sm"
              style={{ height: `${Math.random() * 60 + 20}%` }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
