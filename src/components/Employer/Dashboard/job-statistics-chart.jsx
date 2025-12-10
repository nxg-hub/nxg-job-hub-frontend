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

export default function JobStatisticsChart() {
  const data = [
    { name: "Job Post", value: 958, fill: "#22c55e" },
    { name: "Total Application", value: 65000, fill: "#eab308" },
    { name: "Selected Application", value: 540, fill: "#06b6d4" },
    { name: "Rejected Application", value: 62500, fill: "#8b5cf6" },
    { name: "Short Listed", value: 7469, fill: "#ff6b6b" },
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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Job Statistics</CardTitle>
        <CardDescription>Application statistics breakdown</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={140}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
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
                      {entry.payload.value.toLocaleString()}
                    </span>
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
