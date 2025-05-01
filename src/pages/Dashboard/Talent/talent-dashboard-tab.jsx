import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Briefcase, Calendar } from "lucide-react"

export default function TalentDashboardTab() {
  return (
    <div className="space-y-6 px-6 ">
      <h1 className="text-3xl font-bold">Welcome back, John!</h1>
      <p className="text-muted-foreground">Here's an overview of your dashboard</p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 bg-500-red ">
        <Card>
          <CardHeader className="pb-2 ">
            <CardTitle className="text-sm font-medium">Profile Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <Progress value={85} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Complete your profile to increase visibility</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Job Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-2">4 pending, 3 interviews, 5 rejected</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium ">Job Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground mt-2">New requests from employers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground mt-2">From 3 different conversations</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="matches">
        <TabsList className="grid w-full grid-cols-2 border-none">
          <TabsTrigger value="matches" className="border-none bg-sky-500 hover:bg-sky-600">Job Matches</TabsTrigger>
          <TabsTrigger value="requests" className="border-none bg-sky-500 hover:bg-sky-600">Recent Requests</TabsTrigger>
          {/* <TabsTrigger value="notifications">Notifications</TabsTrigger> */}
        </TabsList>

        <TabsContent value="matches" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Job Matches</CardTitle>
              <CardDescription>Jobs that match your skills and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((job) => (
                  <div key={job} className="flex items-center gap-4 p-3 border rounded-lg">
                    <Briefcase className="h-10 w-10 text-primary" />
                    <div className="flex-1">
                      <h3 className="font-medium">Senior React Developer</h3>
                      <p className="text-sm text-muted-foreground">TechCorp Inc. • Remote • $120k-$150k</p>
                    </div>
                    <div className="text-sm text-muted-foreground">95% match</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Job Requests</CardTitle>
              <CardDescription>Employers who have requested your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2].map((request) => (
                  <div key={request} className="flex items-center gap-4 p-3 border rounded-lg">
                    <Calendar className="h-10 w-10 text-primary" />
                    <div className="flex-1">
                      <h3 className="font-medium">Frontend Developer Interview Request</h3>
                      <p className="text-sm text-muted-foreground">InnovateTech • 2 days ago</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded-md border-none">
                        Accept
                      </button>
                      <button className="px-3 py-1 text-xs bg-destructive text-destructive-foreground rounded-md border-none">
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* <TabsContent value="notifications" className="space-y-4 mt-4"> */}
          {/* <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>Your latest updates and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((notification) => (
                  <div key={notification} className="flex items-center gap-4 p-3 border rounded-lg">
                    <Bell className="h-10 w-10 text-primary" />
                    <div className="flex-1">
                      <h3 className="font-medium">Your application has been shortlisted</h3>
                      <p className="text-sm text-muted-foreground">TechCorp Inc. • 3 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card> */}
        {/* </TabsContent> */}
      </Tabs>
    </div>
  )
}
