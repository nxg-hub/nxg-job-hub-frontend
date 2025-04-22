import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/utils/data/agent-mock-data";

export default function EmployerRequestCard({ request }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-3 pb-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">
            {request.requestType}
          </CardTitle>
          <Badge
            variant={
              request.priority === "High"
                ? "destructive"
                : request.priority === "Medium"
                ? "default"
                : "outline"
            }
            className="text-xs">
            {request.priority} Priority
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-1">
        <p className="text-xs text-muted-foreground">{request.description}</p>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 p-2 flex justify-between items-center">
        <span className="text-xs text-muted-foreground">
          Added {formatDate(request.date)}
        </span>
        <Badge
          variant="outline"
          className="text-xs">
          {request.status}
        </Badge>
      </CardFooter>
    </Card>
  );
}
