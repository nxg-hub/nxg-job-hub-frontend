import { useState, useEffect } from "react";
import {
  Bell,
  LayoutDashboard,
  LogOut,
  CircleHelp,
  BriefcaseBusiness,
  Link2,
  MessageSquare,
  User,
  CircleUser,
  Menu,
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
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { cn, getStoredKey } from "../lib/utils";
import { DashboardSkeleton } from "@/components/dashboard-skeleton";
import logo from "@/static/images/logo_colored.png";
import logomin from "@/static/images/logo_min.png";
import logonamemin from "@/static/images/logo_name_min.png";
import verifiedImageMobile from "@/static/images/verified-mobile.png";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
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
import { useAutoLogin } from "@/hooks/useAutoLogin";
import { useQueryClient } from "@tanstack/react-query";
import { useUserData } from "@/store/employer/userDataStorage";
import { useUserDataQuery } from "@/hooks/useAllUsers";
import { Toaster } from "@/components/ui/toaster";

const sidebarItems = [
  {
    icon: <LayoutDashboard />,
    label: "Dashboard",
    path: "/agent",
  },
  {
    icon: <User />,
    label: "Profile",
    path: "profile",
  },
  // { icon: <BriefcaseBusiness />, label: "Employers", path: "employers" },
  // { icon: <CircleUser />, label: "Candidates", path: "candidates" },
  // { icon: <LayoutDashboard />, label: "Jobs", path: "jobs" },
  // {
  //   icon: <Link2 />,
  //   label: "Matches",
  //   path: "candidate-matches",
  // },
  { icon: <MessageSquare />, label: "Messages", path: "chats" },
  // { icon: <CircleHelp />, label: "Help", path: "/help" },
];

export function AgentDashboard() {
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  //rendering loading state
  // if (storedToken && !isUserTypeFetched) {
  //   return <DashboardSkeleton />;
  // }

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
  const {
    data: userData,
    isPending: isUserTypePending,
    isSuccess: isUserTypeSuccess,
    isError: isUserTypeError,
    isFetched: isUserTypeFetched,
    error: userTypeError,
  } = useUserDataQuery();

  const agent = useUserData((state) => state.userData);

  const sidebar = useSidebar();
  const isCollapsed = sidebar.state === "collapsed";
  const location = useLocation();
  const [showLogoutNotice, setShowLogoutNotice] = useState(false);

  const closeModal = (e) => {
    if (e.target === e.currentTarget) setShowLogoutNotice(false);
  };

  const [notificationDropdownOpen, setNotificationDropdownOpen] =
    useState(false);

  const unreadNotifications = notifications.filter(
    (notification) => !notification.read
  ).length;

  return (
    <div className="flex h-screen w-full bg-slate-100 md:pt-3 md:px-5 md:pr-8">
      {/* Sidebar */}
      <Sidebar className="" collapsible="icons" variant="floating">
        <SidebarContent
          className="bg-sky-700 sidebar overflow-y-auto hover:scrollbar-visible 
            scrollbar-hidden md:rounded-lg  !rounded-b-none"
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
          {/* {!isCollapsed && (
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
                  )} */}
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
      <SidebarInset className="bg-transparent w-full md:rounded-md space-y-5">
        {/* Header */}
        <header className="bg-white p-4 flex border-b md:justify-end md:rounded-md">
          <div className="flex mr-auto">
            <SidebarTrigger
              openMenuIcon={<Menu className="w-8 h-8" />}
              className="my-3 ml-2 border-transparent md:hidden "
            />
            <h1 className="font-medium text-3xl">
              Welcome, {agent?.firstName}
            </h1>
          </div>
          <div className="flex items-center gap-4 bg-background w-1/12">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="Avatar" />
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
        </header>

        <div className=" pt-16 md:pt-0">
          {!agent?.agent?.verified && (
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
          )}
        </div>
        <div className="h-full">
          <Outlet />
          <Toaster />
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
