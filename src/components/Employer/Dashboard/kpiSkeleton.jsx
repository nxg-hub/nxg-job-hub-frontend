import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function KPISkeleton({ className }) {
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
}
