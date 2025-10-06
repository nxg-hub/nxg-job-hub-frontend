import { useState, useEffect } from "react";
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
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  Sidebar,
  SidebarTrigger,
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
import { cn, getDaysBetween, getStoredKey } from "../lib/utils";
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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import verifiedImageMobile from "@/static/images/verified-mobile.png";
import subscriptionIcon from "@/static/icons/diamond.png";
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
import { useAutoLogin } from "@/hooks/useAutoLogin";
import { useMobile } from "@/hooks/use-mobile";

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
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const storedToken = getStoredKey();

  //Fetch user type from backend, ONLY if key exist
  const {
    data: userData,
    isPending: isUserTypePending,
    isSuccess: isUserTypeSuccess,
    isError: isUserTypeError,
    isFetched: isUserTypeFetched,
    error: userTypeError,
  } = useAutoLogin({
    enabled: !!storedToken,
  });

  // useEffect(() => {
  //   if (!storedToken) {
  //     console.log("ED: 'No key found, redirecting to login.");
  //     navigate("/login", { replace: true });
  //     return;
  //   }

  //   if (isUserTypeFetched) {
  //     if (isUserTypeError) {
  //       console.error(
  //         "ED: User type fetch failed. Redirecting to login. Error:",
  //         userTypeError
  //       );
  //       // Clear invalid token if this error occurred
  //       localStorage.removeItem("NXGJOBHUBLOGINKEYV1");
  //       sessionStorage.removeItem("NXGJOBHUBLOGINKEYV1");
  //       queryClient.invalidateQueries(["userType"]);
  //       navigate("/login", { replace: true });
  //       return;
  //     }

  //     //if user type fetch was successful
  //     if (isUserTypeSuccess && userData) {
  //       const userType = userData.userType;
  //       console.log("ED: UserType found:", userType);
  //       if (userType !== "EMPLOYER") {
  //         //redirect user to their dashboard based on thier type
  //         let redirectPath = "/dashboard";

  //         switch (userType) {
  //           case "AGENT":
  //             redirectPath = "/agent";
  //             break;

  //           case "TALENT":
  //           case "TECHTALENT":
  //             redirectPath = "/talent";
  //             break;

  //           case "SERVICE_PROVIDER":
  //             redirectPath = "/services-provider";
  //             break;

  //           default:
  //             console.warn("Unknown user type:", data.userType);
  //         }
  //         navigate(redirectPath, { replace: true });
  //         return;
  //       }
  //     }
  //   }
  // }, [
  //   storedToken,
  //   isUserTypeFetched,
  //   isUserTypeError,
  //   isUserTypeSuccess,
  //   userData,
  //   navigate,
  //   queryClient,
  // ]);

  //rendering loading state
  if (storedToken && !isUserTypeFetched) {
    return <DashboardSkeleton />;
  }

  if (storedToken && isUserTypeSuccess && userData?.userType === "EMPLOYER") {
    return (
      <TooltipProvider delayDuration={0}>
        <SidebarProvider>
          <DashboardContent notifications={notificationsData} />
        </SidebarProvider>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider delayDuration={0}>
      <SidebarProvider>
        <DashboardContent notifications={notificationsData} />
      </SidebarProvider>
    </TooltipProvider>
  );

  // return null;
}

function DashboardContent({ notifications = [] }) {
  const {
    data: userData,
    isPending: isUserTypePending,
    isSuccess: isUserTypeSuccess,
    isError: isUserTypeError,
    isFetched: isUserTypeFetched,
    error: userTypeError,
  } = useEmployerDataQuery();

  const employer = useEmployerData((state) => state.employerData);

  const [showLogoutNotice, setShowLogoutNotice] = useState(false);
  const isMobile = useMobile();
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

  const NUMBEROFDAYFORFREESUB =
    getDaysBetween(employer?.employer?.accountCreationDate) /
    (1000 * 60 * 60 * 24);

  return (
    <div className="flex h-screen w-full bg-slate-100 md:pt-3 md:px-5 md:pr-8">
      {/* Sidebar */}
      <Sidebar className="" collapsible="icon" variant="floating">
        <SidebarContent
          className="bg-sky-700 sidebar overflow-y-auto hover:scrollbar-visible 
            scrollbar-hidden md:rounded-lg  !rounded-b-none"
        >
          <div>
            <img
              src={isCollapsed ? logomin : logo}
              alt="Next Gen Hub Logo"
              className={cn(
                "object-contain mx-auto w-32 h-32",
                isCollapsed ? "w-12 h-12 mr-5 mt-8 mb-7" : "w-32 h-32"
              )}
            />
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
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="bg-sky-700 rounded-b-md">
          {/* <SidebarMenuItem className="px-3">
            <SidebarMenuButton
              asChild
              tooltip="Logout"
              className="bg-primary hover:cursor-pointer border-transparent text-white hover:bg-white/10 hover:text-white p-5"
            >
              <NavLink to="/employer/subscription">
                <img
                  src={subscriptionIcon}
                  alt="subscription"
                  className="object-contain w-7 h-7"
                />
                <span>Subscription</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem> */}
          {!isCollapsed && (
            <div className="m-3 rounded-lg border bg-gradient-to-b from-white to-slate-50 p-4 shadow-sm">
              <p className="text-sm text-muted-foreground">Current plan:</p>
              <p
                className={cn(
                  `${NUMBEROFDAYFORFREESUB < 31 ? "" : "text-red-800"}`,
                  "text-sm font-semibold"
                )}
              >
                Free trial
              </p>
              {NUMBEROFDAYFORFREESUB < 31 ? (
                <p className="mt-1 text-xs text-muted-foreground">
                  Upgrade to any of our latest and exclusive features
                </p>
              ) : (
                <p className="mt-1 text-xs text-muted-foreground">
                  Your 1 Month free trial had expired,Upgrade to any of our
                  latest and exclusive features
                </p>
              )}

              <NavLink
                className="border-transparent mt-3 flex w-full items-center justify-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-secondary"
                to="/employer/subscription"
              >
                <img
                  src={subscriptionIcon}
                  alt="subscription"
                  className="object-contain w-6 h-6"
                />
                <span> Upgrade now</span>
              </NavLink>
            </div>
          )}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Logout"
              className="hover:cursor-pointer border-transparent text-red-700 hover:bg-red-700 hover:text-white p-5 bg-red-200"
              onClick={() => setShowLogoutNotice(true)}
            >
              <div>
                <LogOut className="w-7 h-7" />
                <span>Logout</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarFooter>
      </Sidebar>

      {/* Main Content */}
      <SidebarInset
        className={cn(
          "flex flex-col w-full gap-5 md:rounded-md md:bg-slate-100",
          isCollapsed ? "md:pl-40" : ""
        )}
      >
        {/* Header */}
        <div className="bg-secondary w-full flex fixed top-0 z-50 md:justify-end md:rounded-lg md:bg-transparent md:static">
          {/* <h1 className="text-2xl font-bold">Dashboard</h1> */}
          <div className="flex mr-auto">
            <SidebarTrigger
              openMenuIcon={<Menu className="w-8 h-8" />}
              className="my-3 ml-2 border-transparent md:hidden "
            />
            <h1 className="font-medium text-3xl">
              Welcome, {employer?.firstName}
            </h1>
          </div>
          <DropdownMenu
            open={notificationDropdownOpen}
            onOpenChange={setNotificationDropdownOpen}
          >
            <DropdownMenuTrigger className="hidden md:block" asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative border-none bg-slate-200 hover:bg-slate-300"
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
        <div className="px-2 pt-16 md:pt-0">
          {!employer?.employer?.verified && (
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
                    to={"/employer/verified-document"}
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
                      Your account is not yet verified,
                      <NavLink
                        className="underline text-secondary w-fit py-1 px-2 "
                        to={"/employer/verified-document"}
                      >
                        complete your profile
                      </NavLink>
                      to continue using all features
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
          {isCollapsed && (
            <div className="absolute z-50 bottom-10 -left-5 w-[280px] sm:max-w-[420px] m-3 rounded-lg border bg-gradient-to-b from-white to-slate-50 p-4 shadow-sm">
              <p className="text-sm text-muted-foreground">Current plan:</p>
              <p
                className={cn(
                  `${NUMBEROFDAYFORFREESUB < 31 ? "" : "text-red-800"}`,
                  "text-sm font-semibold"
                )}
              >
                Free trial
              </p>
              {NUMBEROFDAYFORFREESUB < 31 ? (
                <p className="mt-1 text-xs text-muted-foreground">
                  Upgrade to any of our latest and exclusive features
                </p>
              ) : (
                <p className="mt-1 text-xs text-muted-foreground">
                  Your 1 Month free trial had expired,Upgrade to any of our
                  latest and exclusive features
                </p>
              )}

              <NavLink
                className="border-transparent mt-3 flex w-full items-center justify-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-secondary"
                to="/employer/subscription"
              >
                <img
                  src={subscriptionIcon}
                  alt="subscription"
                  className="object-contain w-6 h-6"
                />
                <span> Upgrade now</span>
              </NavLink>
            </div>
          )}
          <div className="h-full">
            <Outlet />
          </div>
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
