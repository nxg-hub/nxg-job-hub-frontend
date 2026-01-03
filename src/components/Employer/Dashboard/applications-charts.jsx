import { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useApplicationOverTime } from "@/hooks/useJobs";
import { Badge } from "@/components/ui/badge";

const generateDailyChartData = (data, year, month) => {
  if (!data) return [];

  return data
    .filter((item) => {
      const date = new Date(item.date);
      return date.getFullYear() === year && date.getMonth() === month;
    })
    .map((item) => ({
      displayDate: new Date(item.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      applications: item.applications,
      rawDate: item.date,
    }))
    .sort((a, b) => new Date(a.rawDate) - new Date(b.rawDate));
};

export function ApplicationsChart({ employerID, setOpenCreateJobDialog }) {
  const { data: applicationOverTime, isLoading } =
    useApplicationOverTime(employerID);
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth());

  const chartData = useMemo(
    () => generateDailyChartData(applicationOverTime, year, month),
    [applicationOverTime, year, month]
  );

  // Calculate the total applications for the selected period
  const totalApplications = useMemo(() => {
    return chartData.reduce((sum, item) => sum + item.applications, 0);
  }, [chartData]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = applicationOverTime
    ? [
        ...new Set(
          applicationOverTime.map((item) => new Date(item.date).getFullYear())
        ),
      ].sort((a, b) => a - b)
    : [];

  if (isLoading) {
    return <ApplicationsChartSkeleton />;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              Applications Over Time
              {chartData.length > 0 && (
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary"
                >
                  {totalApplications} Total
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              Showing specific dates with activity
            </CardDescription>
          </div>
        </div>
        {applicationOverTime?.length > 0 && (
          <div className="flex gap-4 mt-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">
                Month
              </label>
              <select
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {months.map((m, index) => (
                  <option key={index} value={index}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">
                Year
              </label>
              <select
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="min-h-[400px] flex flex-col justify-center">
        {applicationOverTime?.length > 0 ? (
          <>
            {chartData.length > 0 ? (
              <ChartContainer
                config={{
                  applications: {
                    label: "Total Applications",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      dataKey="displayDate"
                      stroke="hsl(var(--muted-foreground))"
                      style={{ fontSize: "0.875rem" }}
                      tickLine={false}
                      axisLine={false}
                      tickMargin={10}
                    />

                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      style={{ fontSize: "0.875rem" }}
                    />

                    <ChartTooltip
                      content={<ChartTooltipContent />}
                      cursor={{ stroke: "hsl(var(--border))" }}
                    />

                    <Line
                      type="monotone"
                      dataKey="applications"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={{ fill: "#1e40af", r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in duration-500">
                {/* Visual Icon */}
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl" />
                  <svg
                    className="relative w-24 h-24 text-muted-foreground/40"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>

                {/* Contextual Messaging */}
                <h3 className="text-lg font-semibold tracking-tight">
                  No activity in {months[month]} {year}
                </h3>
                <p className="text-sm text-muted-foreground max-w-[250px] mt-2">
                  There were no job applications submitted during this specific
                  period.
                </p>

                {/* Action Button */}
                <button
                  onClick={() => {
                    setMonth(new Date().getMonth());
                    setYear(new Date().getFullYear());
                  }}
                  className="mt-6 text-sm font-medium text-primary hover:underline underline-offset-4"
                >
                  View current month
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="w-full py-20 flex flex-col gap-3 justify-center items-center">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl" />
              <svg
                className="relative w-24 h-24 text-secondary/20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div className="text-sm italic text-center text-gray-400">
              <p className="text-sm text-muted-foreground max-w-[250px] mt-2">
                There were no job applications submitted yet.
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
