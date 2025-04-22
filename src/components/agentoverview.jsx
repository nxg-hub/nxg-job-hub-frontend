import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Briefcase,
  HandshakeIcon,
  Clock,
} from "lucide-react";

export function AgentOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Employers</CardTitle>
          <Briefcase className="h-4 w-4 text-[#2596be]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">142</div>
          <p className="text-xs text-muted-foreground flex items-center">
            <span className="text-green-500 flex items-center mr-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              12%
            </span>
            from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Service Providers
          </CardTitle>
          <Users className="h-4 w-4 text-[#2596be]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">387</div>
          <p className="text-xs text-muted-foreground flex items-center">
            <span className="text-green-500 flex items-center mr-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              8%
            </span>
            from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Successful Matches
          </CardTitle>
          <HandshakeIcon className="h-4 w-4 text-[#2596be]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">89</div>
          <p className="text-xs text-muted-foreground flex items-center">
            <span className="text-red-500 flex items-center mr-1">
              <ArrowDownRight className="h-3 w-3 mr-1" />
              3%
            </span>
            from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Matches</CardTitle>
          <Clock className="h-4 w-4 text-[#2596be]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">24</div>
          <p className="text-xs text-muted-foreground flex items-center">
            <span className="text-green-500 flex items-center mr-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              18%
            </span>
            from last month
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
