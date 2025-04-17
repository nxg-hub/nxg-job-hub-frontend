
"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Search, ChevronDown, BarChart3, MessageSquare, Users, Settings, FileText, Home } from "lucide-react"
import { AgentStats } from "../../../components/Agentstats"
import { TimeMetrics } from "../../../components/TimeMetrics"
import { TalentTable } from "../../../components/TalentTable"
// import { ProfileForm } from "@/components/profile-form"

export default function Dashboardhome() {
  const [date, setDate] = useState(new Date())

  return (
    <div className="flex min-h-screen bg-background">
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="flex h-16 items-center justify-between border-b px-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search here..."
                className="rounded-full border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <button className="relative">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                3
              </span>
            </button>

            <div className="flex items-center gap-2">
              <img
                src="/placeholder.svg?height=32&width=32"
                alt="User avatar"
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="text-sm font-medium">Jaka Pekik</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        </header>

        <main className="p-6">
          <Tabs defaultValue="overview">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Stats cards */}
              <AgentStats />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {/* Time metrics chart */}
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

                {/* Calendar */}
                <Card>
                  <CardHeader>
                    <CardTitle>Jan 2023</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
                  </CardContent>
                </Card>
              </div>

              {/* Upcoming interviews */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Upcoming Interviews</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { title: "Senior Developer", date: "17 Jan 2023, 01:45 PM", icon: "💻" },
                      { title: "UX Designer", date: "17 Jan 2023, 03:45 PM", icon: "🎨" },
                      { title: "Product Manager", date: "17 Jan 2023, 05:45 PM", icon: "📊" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3 rounded-lg bg-gray-50 p-3">
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

                {/* Task progress */}
                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle>Talent Placement Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { title: "Frontend Developers", progress: 75, tasks: "9/12 placed" },
                      { title: "UX/UI Designers", progress: 60, tasks: "6/10 placed" },
                      { title: "Data Scientists", progress: 90, tasks: "9/10 placed" },
                      { title: "Project Managers", progress: 45, tasks: "5/11 placed" },
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{item.title}</h3>
                            <p className="text-xs text-gray-500">{item.tasks}</p>
                          </div>
                          <span className="text-sm font-medium">{item.progress}%</span>
                        </div>
                        <Progress value={item.progress} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Talent table */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Talent Matches</CardTitle>
                </CardHeader>
                <CardContent>
                  <TalentTable />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile">
              {/* <ProfileForm /> */}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
