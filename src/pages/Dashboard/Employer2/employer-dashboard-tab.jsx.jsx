import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Briefcase, FileText, Users, User } from "lucide-react"
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";

export default function EmployerDashboardTab() {
    const { setPageTitle } = useOutletContext();
    useEffect(() => {
        setPageTitle("Dashboard");
      }, []);
  return (
    <div className="p-8">
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Jobs Posted"
          value="12"
          icon={<Briefcase className="h-8 w-8 text-primary" />}
          change="+2 this month"
        />
        <MetricCard
          title="Total Applications"
          value="248"
          icon={<FileText className="h-8 w-8 text-primary" />}
          change="+18 this week"
        />
        <MetricCard
          title="Interviews Scheduled"
          value="32"
          icon={<Users className="h-8 w-8 text-primary" />}
          change="+5 this week"
        />
        <MetricCard title="Hires" value="8" icon={<User className="h-8 w-8 text-primary" />} change="+2 this month" />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Applications</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 border-b pb-4">
                <Avatar>
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">John Doe</h3>
                  <p className="text-sm text-muted-foreground">Applied for Senior Developer</p>
                </div>
                <div className="ml-auto text-sm text-muted-foreground">2 days ago</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Active Jobs</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 border-b pb-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Senior Developer</h3>
                  <p className="text-sm text-muted-foreground">12 applications</p>
                </div>
                <div className="ml-auto text-sm">
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const MetricCard = ({ title, value, icon, change }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          {icon}
        </div>
        <div className="mt-2">
          <p className="text-3xl font-bold">{value}</p>
          <p className="text-xs text-muted-foreground">{change}</p>
        </div>
      </CardContent>
    </Card>
  )
}
