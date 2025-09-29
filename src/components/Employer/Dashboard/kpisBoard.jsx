import { useEffect, useState } from "react";
import {
  Users,
  TrendingUp,
  Eye,
  Target,
  Clock,
  Star,
  BriefcaseBusiness,
  UserRoundCheck,
  UserRoundMinus,
} from "lucide-react";
import KPISkeleton from "./kpiSkeleton";
import KPICard from "./kpiCard";

const kpiData = [
  {
    title: "Total Jobs Post",
    value: "0",
    change: 12.5,
    changeLabel: "",
    icon: BriefcaseBusiness,
    trend: "",
  },
  {
    title: "Number of Applicants",
    value: "0",
    change: 8.2,
    changeLabel: "",
    icon: Users,
    trend: "",
  },
  {
    title: "Accepted Applicants",
    value: "0",
    change: -2.4,
    changeLabel: "",
    icon: UserRoundCheck,
    trend: "",
  },
  {
    title: "Rejected Applicants",
    value: "0",
    change: 5.1,
    changeLabel: "",
    icon: UserRoundMinus,
    trend: "",
  },
  {
    title: "Page Views",
    value: "12,543",
    change: 15.3,
    changeLabel: "from last week",
    icon: Eye,
    trend: "up",
  },
  {
    title: "Goal Completion",
    value: "89.2%",
    change: 3.7,
    changeLabel: "from last quarter",
    icon: Target,
    trend: "up",
  },
  {
    title: "Avg. Session Duration",
    value: "4m 32s",
    change: -1.2,
    changeLabel: "from last week",
    icon: Clock,
    trend: "down",
  },
  {
    title: "Customer Rating",
    value: "4.8",
    change: 0.3,
    changeLabel: "from last month",
    icon: Star,
    trend: "up",
  },
];

export default function KPIBoard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex gap-4 overflow-x-auto pb-2">
        {isLoading
          ? // Show skeleton placeholders
            Array.from({ length: 4 }).map((_, index) => (
              <KPISkeleton
                key={`skeleton-${index}`}
                className="min-w-[280px] flex-shrink-0"
              />
            ))
          : // Show actual KPI cards with animations
            kpiData
              .slice(0, 4)
              .map((kpi, index) => (
                <KPICard
                  key={index}
                  title={kpi.title}
                  value={kpi.value}
                  change={kpi.change}
                  changeLabel={kpi.changeLabel}
                  icon={kpi.icon}
                  trend={kpi.trend}
                  className="min-w-[280px] flex-shrink-0"
                  animationDelay={index * 150}
                />
              ))}
      </div>
    </div>
  );
}
