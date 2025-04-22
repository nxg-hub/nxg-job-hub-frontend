import { useState, useEffect } from "react";
import {
  Bell,
  Bookmark,
  CircleUser,
  LayoutDashboard,
  LogOut,
  Settings,
  CircleHelp,
  ChartLine,
  Wallet,
  Send,
  BriefcaseBusiness,
  MessageSquare,
  MessageCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "../lib/utils";
import { DashboardSkeleton } from "@/components/dashboard-skeleton";
import { NotificationPanel } from "@/components/notification-panel";
import logo from "@/static/images/logo_colored.png";
import logomin from "@/static/images/logo_min.png";

import { NavLink, Outlet, useLocation } from "react-router-dom";

const sidebarItems = [
  {
    icon: <LayoutDashboard />,
    label: "Dashboard",
    path: "/agent/dashboard",
  },
  {
    icon: <CircleUser />,
    label: "Profile",
    path: "profile",
  },
  { icon: <BriefcaseBusiness />, label: "Employers2", path: "employers2" },
  { icon: <CircleUser />, label: "Candidates", path: "candidates" },
  { icon: <LayoutDashboard />, label: "Jobs", path: "jobs" },
  {
    icon: <LayoutDashboard />,
    label: "Job Matches",
    path: "candidate-matches",
  },
  { icon: <MessageCircle />, label: "Chats", path: "chats" },
  {
    icon: <LayoutDashboard />,
    label: "Job Recommendations",
    path: "recommendations",
  },
  { icon: <ChartLine />, label: "Analytics", path: "/analytics" },
  { icon: <Settings />, label: "Settings", path: "/settings" },
  { icon: <CircleHelp />, label: "Help", path: "/help" },
];

export function AgentDashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <TooltipProvider delayDuration={0}>
      <SidebarProvider>
        <DashboardContent />
      </SidebarProvider>
    </TooltipProvider>
  );
}

function DashboardContent() {
  const sidebar = useSidebar();
  const isCollapsed = sidebar.state === "collapsed";
  const location = useLocation();

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <Sidebar collapsible="icon">
        <SidebarContent
          className="bg-sky-700 sidebar overflow-y-auto hover:scrollbar-visible 
            scrollbar-hidden">
          <div>
            <img
              src={isCollapsed ? logomin : logo}
              alt="Next Gen Hub Logo"
              className={cn(
                "object-contain mx-auto",
                isCollapsed ? "w-12 h-12 mr-5 mt-8 mb-10" : "w-32 h-32"
              )}
            />
          </div>
          <SidebarGroup className="p-5 pt-8">
            <SidebarGroupContent>
              <SidebarMenu className="gap-5">
                {sidebarItems.map((item) => {
                  const isActive =
                    location.pathname === item.path ||
                    location.pathname.substring(
                      location.pathname.lastIndexOf("/") + 1
                    ) === item.path;
                  return (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.label}
                        className="text-white hover:bg-white/10 hover:text-white p-5">
                        <NavLink to={item.path}>
                          <span>{item.icon}</span>
                          <span>{item.label}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Logout"
                className="text-sky-700 hover:bg-white/10 hover:text-white border-none">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      {/* Main Content */}
      <SidebarInset className="flex flex-col w-full">
        {/* Header */}
        <header className="bg-white p-4 flex border-b">
          <SidebarTrigger className="mr-2 border-none" />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative border-none">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                <span className="sr-only">Notifications</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="p-0 w-[380px]"
              align="end">
              <NotificationPanel />
            </PopoverContent>
          </Popover>
        </header>
        <div className="h-full">
          <Outlet />
        </div>
      </SidebarInset>
    </div>
  );
}
