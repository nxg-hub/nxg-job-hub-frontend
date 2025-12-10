import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
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

const generateMonthData = (year, month) => {
  const monthIndex = month;
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, monthIndex, 1);
  const weeks = [];

  let currentWeek = 1;
  let weekData = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, monthIndex, day);
    const dayOfWeek = date.getDay();

    const applications = Math.floor(Math.random() * 50) + 20;
    const qualified = Math.floor(applications * 0.65);

    weekData.push({ applications, qualified });

    // Start a new week on Sunday or at the end of the month
    if (dayOfWeek === 6 || day === daysInMonth) {
      weeks.push({
        week: `Week ${currentWeek}`,
        applications: Math.floor(
          weekData.reduce((sum, w) => sum + w.applications, 0) / weekData.length
        ),
        qualified: Math.floor(
          weekData.reduce((sum, w) => sum + w.qualified, 0) / weekData.length
        ),
      });
      weekData = [];
      currentWeek++;
    }
  }

  return weeks;
};

export function ApplicationsChart() {
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth());

  const chartData = generateMonthData(year, month);

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

  const years = Array.from(
    { length: 5 },
    (_, i) => currentDate.getFullYear() - 2 + i
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Applications Over Time</CardTitle>
        <CardDescription>
          Total applications and qualified candidates by week
        </CardDescription>

        <div className="flex gap-4 mt-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">Month</label>
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
            <label className="text-sm font-medium text-foreground">Year</label>
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
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={{
            applications: {
              label: "Total Applications",
              color: "hsl(var(--chart-1))",
            },
            qualified: {
              label: "Qualified Candidates",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="week"
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: "0.875rem" }}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: "0.875rem" }}
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
                cursor={{ stroke: "hsl(var(--border))" }}
              />
              <Legend
                wrapperStyle={{ fontSize: "0.875rem" }}
                verticalAlign="bottom"
                height={36}
              />
              <Line
                type="monotone"
                dataKey="applications"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{
                  fill: "#1e40af",
                  r: 5,
                  strokeWidth: 2,
                  stroke: "#3b82f6",
                }}
                activeDot={{ r: 7, strokeWidth: 2 }}
                isAnimationActive={true}
              />
              <Line
                type="monotone"
                dataKey="qualified"
                stroke="#10b981"
                strokeWidth={3}
                dot={{
                  fill: "#047857",
                  r: 5,
                  strokeWidth: 2,
                  stroke: "#10b981",
                }}
                activeDot={{ r: 7, strokeWidth: 2 }}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
