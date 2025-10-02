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
  OctagonAlert,
  Menu,
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
import logonamemin from "@/static/images/logo_name_min.png";
import verifiedImageMobile from "@/static/images/verified-mobile.png";

import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
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

const sidebarItems = [
  {
    icon: <LayoutDashboard />,
    label: "Dashboard",
    path: "/services-provider",
  },
  {
    icon: <CircleUser />,
    label: "Profile",
    path: "profile",
  },
  { icon: <BriefcaseBusiness />, label: "Job Tracker", path: "job-tracker" },
  { icon: <MessageSquare />, label: "Messages", path: "messages" },

  { icon: <CircleHelp />, label: "Help", path: "/help" },
];

export function ServiceProviderDashboard() {
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

  const [showLogoutNotice, setShowLogoutNotice] = useState(false);

  const closeModal = (e) => {
    if (e.target === e.currentTarget) setShowLogoutNotice(false);
  };

  return (
    <div className="flex h-screen w-full bg-slate-100 md:pt-3 md:px-5 md:pr-8">
      {/* Sidebar */}
      <Sidebar className="" collapsible="icons" variant="floating">
        <SidebarContent
          className="bg-sky-700 sidebar overflow-y-auto hover:scrollbar-visible 
                      scrollbar-hidden md:rounded-lg"
        >
          <div>
            {isCollapsed ? (
              <img
                // src={isCollapsed ? logomin : logo}
                src={logo}
                alt="Next Gen Hub Logo"
                className={cn(
                  "object-contain mx-auto w-32 h-32"
                  // isCollapsed ? "w-12 h-12 mr-5 mt-8 mb-10" : "w-32 h-32"
                )}
              />
            ) : (
              <div className="flex items-center">
                <img
                  src={logomin}
                  alt="Next Gen Hub Logo"
                  className={cn(
                    "object-contain w-12 h-12 "
                    // isCollapsed ? "w-12 h-12 mr-5 mt-8 mb-10"
                  )}
                />
                <img
                  src={logonamemin}
                  alt="Next Gen Hub Logo"
                  className={cn(
                    "object-contain w-32 h-32 "
                    // isCollapsed ? "w-12 h-12 mr-5 mt-8 mb-10"
                  )}
                />
              </div>
            )}
          </div>
          <SidebarGroup className="p-5 pt-8">
            <SidebarGroupContent>
              <SidebarMenu className="gap-4">
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
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    tooltip="Logout"
                    className="hover:cursor-pointer border-transparent text-white hover:bg-white/10 hover:text-white p-5"
                    onClick={() => setShowLogoutNotice(true)}
                  >
                    <div>
                      <LogOut className="w-7 h-7" />
                      <span>Logout</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Main Content */}
      <SidebarInset className="bg-transparent w-full md:rounded-md space-y-5">
        {/* Header */}
        <header className="bg-white p-4 flex border-b md:justify-end md:rounded-md">
          <SidebarTrigger
            openMenuIcon={<Menu className="w-8 h-8" />}
            className="my-3 ml-2 border-transparent md:hidden "
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative border-none"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                <span className="sr-only">Notifications</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[380px]" align="end">
              <NotificationPanel />
            </PopoverContent>
          </Popover>
        </header>
        <div className=" pt-16 md:pt-0">
          <>
            <div className="flex bg-sky-100 rounded-xl p-3 text-base gap-2 item-center mb-3 mt-2 md:hidden">
              <img
                src={verifiedImageMobile}
                alt="Complete profile illustration"
                className="object-contain w-10 h-10"
              />
              <div className="flex flex-col gap-1">
                <span>Your account is not yet verified</span>
                <NavLink
                  className="bg-primary text-sky-100 w-fit py-1 px-2 rounded text-sm "
                  to={"companyprofile"}
                >
                  complete your profile
                </NavLink>
              </div>
            </div>

            <div className="hidden md:flex w-full bg-sky-100 p-3 px-10 rounded italic font-medium mb-5">
              <div className="flex items-center gap-8">
                <img
                  src={verifiedImageMobile}
                  alt="Complete profile illustration"
                  className="object-contain w-10 h-10"
                />
                <div className="flex gap-3 items-center">
                  <span className="bg-secondary p-1 rounded text-white">
                    Action required:
                  </span>
                  <span>
                    Get started by
                    <NavLink
                      className="underline text-secondary w-fit py-1 px-2 "
                      to={"profile"}
                    >
                      completing your Profile
                    </NavLink>
                    , stand a better chance of being hired by completing your
                    profile
                  </span>
                </div>
              </div>
            </div>
          </>
        </div>

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
