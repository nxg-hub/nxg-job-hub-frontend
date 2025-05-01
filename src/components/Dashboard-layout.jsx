"use client"

import React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import {
  Bell,
  Briefcase,
  Calendar,
  BadgeIcon as Certificate,
  Clock,
  FileText,
  Home,
  MessageSquare,
  Settings,
  Star,
  User,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRouter, usePathname } from "next/navigation"

export default function DashboardLayout({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const [notifications, setNotifications] = React.useState(3)

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: User, label: "Profile", path: "/dashboard/profile" },
    { icon: Certificate, label: "Certifications", path: "/dashboard/certifications" },
    { icon: Clock, label: "Work Availability", path: "/dashboard/availability" },
    { icon: Briefcase, label: "Job Listings", path: "/dashboard/jobs" },
    { icon: FileText, label: "Applied Jobs", path: "/dashboard/applied" },
    { icon: Calendar, label: "Job Requests", path: "/dashboard/requests" },
    { icon: MessageSquare, label: "Messages", path: "/dashboard/messages" },
    { icon: Star, label: "Rate Employers", path: "/dashboard/ratings" },
    { icon: Settings, label: "Settings", path: "/dashboard/settings" },
  ]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar>
          <SidebarHeader className="flex flex-col items-center justify-center p-4">
            <div className="flex items-center justify-center mb-2">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder.svg?height=64&width=64" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
            <h3 className="text-lg font-semibold">John Doe</h3>
            <p className="text-sm text-muted-foreground">Software Developer</p>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild isActive={pathname === item.path} onClick={() => router.push(item.path)}>
                    <button>
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                      {item.label === "Messages" && (
                        <Badge className="ml-auto" variant="secondary">
                          5
                        </Badge>
                      )}
                      {item.label === "Job Requests" && (
                        <Badge className="ml-auto" variant="secondary">
                          2
                        </Badge>
                      )}
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <Button variant="outline" className="w-full">
              Logout
            </Button>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <div className="flex flex-col w-full">
            <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
              <SidebarTrigger />
              <div className="flex-1" />
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {notifications}
                  </span>
                )}
              </Button>
            </header>
            <main className="flex-1 p-6">{children}</main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
