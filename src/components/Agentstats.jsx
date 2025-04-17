import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, CheckCircle, Clock, BarChart } from "lucide-react"

export function AgentStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-blue-500 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Talents Matched</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <Users className="h-6 w-6" />
            <span className="text-3xl font-bold">48</span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-purple-500 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Talents Hired</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <CheckCircle className="h-6 w-6" />
            <span className="text-3xl font-bold">32</span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-orange-500 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <Clock className="h-6 w-6" />
            <span className="text-3xl font-bold">2.4h</span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-green-500 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <BarChart className="h-6 w-6" />
            <span className="text-3xl font-bold">67%</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
