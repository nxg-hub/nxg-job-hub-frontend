import React, { useEffect } from "react";
import {
  BriefcaseIcon,
  ChevronDown,
  Link,
  Link2,
  Plus,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  messagesData,
  candidatesData,
  employersData,
} from "@/utils/data/agent-mock-data";
import CreateMatchDialog from "@/components/agent/create-match-dialog";
import { useNavigate, useOutletContext } from "react-router-dom";
import { TalentTable } from "@/components/agent/TalentTable";
import { Progress } from "@/components/ui/progress";
import { TimeMetrics } from "@/components/TimeMetrics";

export default function DashboardTab() {
  const { setPageTitle } = useOutletContext();
  const navigate = useNavigate();
  const [matchDialogOpen, setMatchDialogOpen] = React.useState(false);

  const goToAllMessages = () => {
    navigate("/agent/dashboard/chats");
  };

  const goToAllMatch = () => {
    navigate("/agent/dashboard/candidate-matches");
  };

  useEffect(() => {
    setPageTitle("Dashboard");
  }, []);

  return (
    <div className=" p-8 space-y-10">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Matches</CardTitle>
            <Link2 className="h-4 w-4 text-sky-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+5 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Matches
            </CardTitle>
            <Link className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Candidates</CardTitle>
            <Users className="h-4 w-4 text-sky-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">+8 new this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Employers</CardTitle>
            <BriefcaseIcon className="h-4 w-4 text-sky-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">+3 new this month</p>
          </CardContent>
        </Card>
      </div>

      <Card className="col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Response Time Metrics</CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">This Year</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>
        </CardHeader>
        <CardContent>
          <TimeMetrics />
        </CardContent>
      </Card>
      <div className="flex flex-col space-y-5">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Matches</CardTitle>
            <CardDescription>
              Your most recent candidate-employer matches
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TalentTable />
          </CardContent>
        </Card>
        <Button
          className="w-1/6 self-end border-none bg-sky-500 hover:bg-sky-600"
          onClick={() => goToAllMatch()}>
          View All Matches
        </Button>
      </div>

      <div className="flex space-x-10">
        <Card className="w-2/5">
          <CardHeader>
            <CardTitle>Upcoming Interviews</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                title: "Senior Developer",
                date: "17 Jan 2023, 01:45 PM",
                icon: "💻",
              },
              {
                title: "UX Designer",
                date: "17 Jan 2023, 03:45 PM",
                icon: "🎨",
              },
              {
                title: "Product Manager",
                date: "17 Jan 2023, 05:45 PM",
                icon: "📊",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-lg bg-gray-50 p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-xl">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-xs text-gray-500">{item.date}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="w-2/3">
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
            <CardDescription>Your latest communications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {messagesData.map((message) => (
                <div
                  key={message.id}
                  className="flex w-full border-b-2 pb-4">
                  <div className="pr-3 w-[10%]">
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={message.from.avatar || "/placeholder.svg"}
                        alt={message.from.name}
                      />
                      <AvatarFallback>
                        {message.from.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="w-[70%] px-5">
                    <div className="flex items-center justify-stretch">
                      <p className="text-sm font-medium leading-none">
                        {message.from.name}
                      </p>
                      <Badge
                        variant="outline"
                        className="ml-4">
                        {message.from.type}
                      </Badge>
                    </div>
                    <p className="w-2/3 text-xs text-muted-foreground line-clamp-1">
                      {message.preview}
                    </p>
                  </div>
                  <div className="w-[20%] flex space-x-2 items-center">
                    <span className="text-xs text-muted-foreground">
                      {message.time}
                    </span>
                    {message.unread && (
                      <span className="h-2 w-2 rounded-full bg-primary"></span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full border-none bg-sky-500 hover:bg-sky-600"
              onClick={() => goToAllMessages()}>
              View All Messages
            </Button>
          </CardFooter>
        </Card>
      </div>
      {/* Task progress */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Talent Placement Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            {
              title: "Frontend Developers",
              progress: 75,
              tasks: "9/12 placed",
            },
            {
              title: "UX/UI Designers",
              progress: 60,
              tasks: "6/10 placed",
            },
            {
              title: "Data Scientists",
              progress: 90,
              tasks: "9/10 placed",
            },
            {
              title: "Project Managers",
              progress: 45,
              tasks: "5/11 placed",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-xs text-gray-500">{item.tasks}</p>
                </div>
                <span className="text-sm font-medium">{item.progress}%</span>
              </div>
              <Progress
                value={item.progress}
                className="h-2"
              />
            </div>
          ))}
        </CardContent>
      </Card>
      <CreateMatchDialog
        open={matchDialogOpen}
        onOpenChange={setMatchDialogOpen}
        candidatesData={candidatesData}
        employersData={employersData}
      />
    </div>
  );
}
