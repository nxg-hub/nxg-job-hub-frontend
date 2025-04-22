import { useState, useEffect } from "react";
import {
  Bell,
  LayoutDashboard,
  LogOut,
  Settings,
  CircleHelp,
  BriefcaseBusiness,
  Link2,
  BriefcaseIcon,
  Users,
  MessageSquare,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";
import { cn } from "../lib/utils";
import { DashboardSkeleton } from "@/components/dashboard-skeleton";
import logo from "@/static/images/logo_colored.png";
import logomin from "@/static/images/logo_min.png";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { notificationsData } from "@/utils/data/agent-mock-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NotificationDropdown from "@/components/agent/notification-dropdown";

const sidebarItems = [
  {
    icon: <LayoutDashboard />,
    label: "Dashboard",
    path: "/agent/dashboard",
  },
  {
    icon: <LayoutDashboard />,
    label: "Dashboard2",
    path: "dashboard2",
  },
  {
    icon: <User />,
    label: "Profile",
    path: "profile",
  },
  {
    icon: <Link2 />,
    label: "Matches",
    path: "candidate-matches",
  },
  {
    icon: <Link2 />,
    label: "Matches2",
    path: "candidate-matches2",
  },
  { icon: <BriefcaseIcon />, label: "Jobs", path: "jobs" },
  { icon: <BriefcaseIcon />, label: "Jobs2", path: "jobs2" },
  { icon: <Users />, label: "Candidates", path: "candidates" },
  { icon: <Users />, label: "Candidates2", path: "candidates2" },
  { icon: <BriefcaseBusiness />, label: "Employers", path: "employers" },
  { icon: <MessageSquare />, label: "Messages", path: "chats" },

  // { icon: <ChartLine />, label: "Analytics", path: "/analytics" },
  { icon: <Settings />, label: "Settings", path: "/settings" },
  { icon: <CircleHelp />, label: "Help", path: "/help" },
];

export function AgentDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [pageTitle, setPageTitle] = useState("Dashboard");

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
        <DashboardContent notifications={notificationsData} />
      </SidebarProvider>
    </TooltipProvider>
  );
}

function DashboardContent({ notifications = [] }) {
  const sidebar = useSidebar();
  const isCollapsed = sidebar.state === "collapsed";
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("");

  const [notificationDropdownOpen, setNotificationDropdownOpen] =
    useState(false);

  const unreadNotifications = notifications.filter(
    (notification) => !notification.read
  ).length;

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
        <header className="bg-white p-4 flex border-b justify-between w-full">
          <div className="flex items-center space-x-2">
            <SidebarTrigger className="mr-2 border-none" />
            <h1 className="text-2xl font-bold tracking-tight">{pageTitle}</h1>
          </div>
          <div className="flex items-center gap-4 bg-background w-1/12">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="/placeholder.svg"
                      alt="Avatar"
                    />
                    <AvatarFallback>AG</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu
              open={notificationDropdownOpen}
              onOpenChange={setNotificationDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative border-none ">
                  <Bell className="h-5 w-5" />
                  {unreadNotifications > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]">
                      {unreadNotifications}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <NotificationDropdown notifications={notifications} />
            </DropdownMenu>
          </div>
        </header>
        <div className="h-full">
          <Outlet context={{ setPageTitle }} />
        </div>
      </SidebarInset>
    </div>
  );
}
