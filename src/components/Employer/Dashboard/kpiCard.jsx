import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDownIcon, ArrowUpIcon, Badge } from "lucide-react";

export default function KPICard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  trend = "neutral",
  className,
  animationDelay = 0,
}) {
  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-green-600 bg-green-50";
      case "down":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <ArrowUpIcon className="h-3 w-3" />;
      case "down":
        return <ArrowDownIcon className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <Card
      className={cn(
        "transition-all hover:shadow-md animate-fade-in-up",
        className
      )}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-muted rounded-lg">
              <Icon className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-medium text-muted-foreground">
                {title}
              </p>
              <p className="text-2xl font-bold">{value}</p>
            </div>
          </div>
          {change !== undefined && (
            <div className="flex flex-col items-end space-y-1">
              <Badge
                variant="secondary"
                className={cn(
                  "flex items-center space-x-1 text-xs",
                  getTrendColor()
                )}
              >
                {getTrendIcon()}
                <span>{Math.abs(change)}%</span>
              </Badge>
              {changeLabel && (
                <span className="text-xs text-muted-foreground text-right">
                  {changeLabel}
                </span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
