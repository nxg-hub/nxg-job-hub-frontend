import { useState, useEffect, useContext } from "react";
import {
  Bell,
  LayoutDashboard,
  LogOut,
  CircleHelp,
  Link2,
  MessageSquare,
  X,
  Building,
  Settings,
  Users,
  OctagonAlert,
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
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { cn } from "../lib/utils";
import { DashboardSkeleton } from "@/components/dashboard-skeleton";
import logo from "@/static/images/logo_colored.png";
import logomin from "@/static/images/logo_min.png";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { notificationsData } from "@/utils/data/agent-mock-data";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NotificationDropdown from "@/components/agent/notification-dropdown";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_HOST_URL } from "@/utils/api/API_HOST";
import kcyimage from "@/static/images/kyc-image.png";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useEmployerDataQuery } from "@/hooks/Employer/employerHooks";
import { useEmployerData } from "@/store/employer/employerStore";

const sidebarItems = [
  {
    icon: <LayoutDashboard />,
    label: "Dashboard",
    path: "/employer",
  },
  {
    icon: <Building />,
    label: "Company Profile",
    path: "companyprofile",
  },

  { icon: <LayoutDashboard />, label: "Jobs", path: "jobs" },
  { icon: <Users />, label: "Applicants", path: "applicants" },
  {
    icon: <Link2 />,
    label: "Matches",
    path: "candidate-matches",
  },
  { icon: <MessageSquare />, label: "Messages", path: "messages" },
  // { icon: <BarChart />, label: "Analytics", path: "analytics" },
  { icon: <Settings />, label: "Setting", path: "setting" },
  { icon: <CircleHelp />, label: "Help", path: "/help" },
];

export function EmployerDashboard() {
  // const isAuthenticated = useAuthRedirect("NXGJOBHUBLOGINKEYV1", "/login");

  const employer = useEmployerData((state) => state.employerData);
  const { isLoading, isError } = useEmployerDataQuery();

  // useEffect(() => {
  //   // Simulate loading delay
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, []);

  // if (!isAuthenticated) {
  //   return null;
  // }

  if (isLoading) {
    return <DashboardSkeleton />;
  }
  if (isError) return <p>Erorr:</p>;

  return (
    <TooltipProvider delayDuration={0}>
      <SidebarProvider>
        <DashboardContent notifications={notificationsData} />
      </SidebarProvider>
    </TooltipProvider>
  );
}

function DashboardContent({ notifications = [] }) {
  const employer = useEmployerData((state) => state.employerData);
  const [showLogoutNotice, setShowLogoutNotice] = useState(false);
  const sidebar = useSidebar();
  const isCollapsed = sidebar.state === "collapsed";
  const location = useLocation();
  const navigate = useNavigate();

  const [notificationDropdownOpen, setNotificationDropdownOpen] =
    useState(false);

  const unreadNotifications = notifications.filter(
    (notification) => !notification.read
  ).length;

  const closeModal = (e) => {
    if (e.target === e.currentTarget) setShowLogoutNotice(false);
  };

  return (
    <div className="flex h-screen w-full p-8">
      {/* Sidebar */}
      <Sidebar collapsible="icon">
        <SidebarContent
          className="bg-sky-700 sidebar overflow-y-auto hover:scrollbar-visible 
            scrollbar-hidden"
        >
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
                        className="text-white hover:bg-white/10 hover:text-white p-5"
                      >
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
          <SidebarMenuButton
            tooltip="Logout"
            className="text-primary border-transparent hover:text-red-400"
            onClick={() => setShowLogoutNotice(true)}
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </SidebarMenuButton>
        </SidebarFooter>
      </Sidebar>

      {/* Main Content */}
      <SidebarInset className="flex flex-col w-full gap-5">
        {/* Header */}
        <div className="w-full flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          {/* <SidebarTrigger className="m-0 p-0 border-transparent" /> */}

          <DropdownMenu
            open={notificationDropdownOpen}
            onOpenChange={setNotificationDropdownOpen}
          >
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative border-none "
              >
                <Bell className="h-5 w-5" />
                {unreadNotifications > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]"
                  >
                    {unreadNotifications}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <NotificationDropdown notifications={notifications} />
          </DropdownMenu>
        </div>
        {!employer?.user?.profileVerified && (
          <div className="w-full bg-secondary flex text-yellow-700 border p-3 px-5 rounded italic font-medium text-sm items-center justify-between ">
            <div className="w-9/12 flex items-center justify-between">
              <div className="flex gap-3 items-center">
                <span className="bg-black p-1 rounded text-white">
                  Action required:
                </span>
                <span className="text-white">
                  Your account is not yet verified,{" "}
                  <NavLink
                    className="underline hover:cursor-pointer hover:text-sky-300 "
                    to={"companyprofile"}
                  >
                    {" "}
                    complete your profile
                  </NavLink>{" "}
                  to continue using all features
                </span>
              </div>
              {/* <Button className="border-transparent bg-gray-950 hover:underline hover:bg-black">
              Complete Profile
            </Button> */}
            </div>
            <div className="absolute right-10 w-[200px]">
              <img
                src={kcyimage}
                alt="Complete profile illustration"
                className="object-contain w-44 h-44"
              />
            </div>
            <X className="relative bottom-3 left-3 text-white w-4 h-4" />
          </div>
        )}
        <div className="h-full">
          <Outlet />
        </div>
      </SidebarInset>
      {showLogoutNotice && (
        <ShowLogOutDialogue isOpen={showLogoutNotice} onClose={closeModal} />
      )}
    </div>
  );
}

const ShowLogOutDialogue = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const handleCancelClick = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="flex flex-col items-center">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex flex-col items-center" asChild>
            <div className="flex flex-col gap-5">
              <OctagonAlert size={60} className="text-gray-400" />
              <h1 className="text-2xl">Are you sure you want to logout?</h1>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription
            asChild
            className="flex flex-col items-center py-6 space-y-8"
          >
            <div>
              <p className="text-center text-sm px-5">
                You'll need to log in again to access your account. Make sure
                you've saved your work before proceeding.
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="w-full">
          <AlertDialogCancel onClick={onClose} className="sm:w-1/2">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleCancelClick}
            className="sm:w-1/2 bg-sky-600 border-0 hover:bg-sky-700"
          >
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
