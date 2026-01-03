import { useState, useEffect } from "react";
import { Bell, OctagonAlert, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
// import { NotificationPanel } from "@/components/notification-panel";
// import logo from "@/static/images/logo_colored.png";
import logo from "../static/images/splash.png";
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
import { useDispatch, useSelector } from "react-redux";
import { resetUserData } from "@/redux/ServiceProviderUserDataSlice";
import { resetAllUserData } from "@/redux/AllUsersSlice";
import { resetAllJobs } from "@/redux/ServiceProviderJobSlice";
import useFetchNotifications from "@/utils/hooks/useFetchNotifications";
import NotificationDropdown from "@/components/agent/notification-dropdown";
import { CustomerCareIcon } from "@/icons/nxg-icons";
// import helpCenterIcon from "@/static/icons/SVG/customer-care.svg";
import { useUserDataQuery } from "@/hooks/useAllUsers";
import { Badge } from "@/components/ui/badge";
import { clearNearbyJobs } from "@/redux/JobSlice";
import { RiLayoutFill, RiServiceFill, RiSettings4Fill } from "react-icons/ri";
import { FaBriefcase, FaUserCircle, FaBell } from "react-icons/fa";
import { TbHelpSquareFilled } from "react-icons/tb";
import { IoIosLogOut } from "react-icons/io";

const sidebarItems = [
  {
    icon: <RiLayoutFill className="w-5 h-5" />,
    iconR: "",
    label: "Dashboard",
    path: "/services-provider",
  },
  {
    icon: <FaUserCircle className="w-5 h-5" />,
    iconR: "",
    label: "Profile",
    path: "profile",
  },
<<<<<<< HEAD
  {
    icon: <FaBriefcase className="w-5 h-5" />,
    iconR: "",
    label: "Job",
    path: "job-tracker",
  },
  {
    icon: <TbHelpSquareFilled className="w-5 h-5" />,
    label: "Help Center",
    path: "help-center",
    iconR: <CustomerCareIcon className="w-6 h-6" />,
  },
  {
    icon: <RiSettings4Fill className="w-5 h-5" />,
    iconR: "",
    label: "Settings",
    path: "/services-provider/setting",
  },
=======
  { icon: <BriefcaseBusiness />, label: "Jobs", path: "job-tracker" },
  { icon: <CircleHelp />, label: "Help", path: "messages" },

  // { icon:  <MessageSquare />, label: "Help", path: "/help" },
  { icon: <Settings />, label: "Settings", path: "/services-provider/setting" },
>>>>>>> 371a1e1febc473b4a14fb529d09ab5356c7d2662
];

export function ServiceProviderDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const notifications = useFetchNotifications();

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
        <DashboardContent notifications={notifications} />
      </SidebarProvider>
    </TooltipProvider>
  );
}

function DashboardContent({ notifications = [] }) {
  const { data } = useUserDataQuery();
  const sidebar = useSidebar();
  const isCollapsed = sidebar.state === "collapsed";
  const location = useLocation();
  const userData = useSelector((state) => state.UserDataReducer.data);
  const [showLogoutNotice, setShowLogoutNotice] = useState(false);

  const closeModal = (e) => {
    if (e.target === e.currentTarget) setShowLogoutNotice(false);
  };
  const [notificationDropdownOpen, setNotificationDropdownOpen] =
    useState(false);

  const unreadNotifications = notifications?.filter(
    (notification) => !notification.seen
  ).length;
  return (
    <div className="flex min-h-screen w-full bg-slate-100 md:pt-3 md:px-5 md:pr-8">
      {/* Sidebar */}
      <Sidebar className="" collapsible="icons" variant="floating">
        <SidebarContent
          className="bg-sky-700 sidebar overflow-y-auto hover:scrollbar-visible 
            scrollbar-hidden md:rounded-lg  !rounded-b-none"
        >
          <div className="px-5 pt-3 flex items-center gap-2">
            <img
              className={cn(
                "object-contain",
                isCollapsed ? "w-12 h-12 mr-5 mt-8 mb-7" : "w-10"
              )}
              src={logo}
              alt=""
            />
            <div className="flex flex-col text-white -space-y-1.5">
              <span className="font-bold text-2xl md:text-3xl">NXG</span>
              <span className="text-xs md:text-xs md:tracking-widest">
                JOB HUB
              </span>
            </div>
          </div>
          <SidebarGroup className="p-5 pt-8">
            <SidebarGroupContent>
              <SidebarMenu className="gap-3">
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
                          <span>{item.iconR}</span>
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
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Logout"
              className="hover:cursor-pointer border-transparent text-red-700 hover:bg-red-700 hover:text-white p-5 bg-red-200"
              onClick={() => setShowLogoutNotice(true)}
            >
              <div>
                <IoIosLogOut className="w-7 h-7" />
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
        <div className="bg-secondary w-full flex fixed top-0 z-50 md:justify-end md:rounded-lg md:bg-white md:static md:p-2">
          <div className="flex mr-auto">
            <SidebarTrigger
              openMenuIcon={<Menu className="w-8 h-8" />}
              className="my-3 ml-2 border-transparent md:hidden "
            />
          </div>
          <div className="w-full ">
            <h1 className="text-2xl">
              Welcome! 👋
              <span className="capitalize font-bold">
                {userData?.serviceProvider?.firstName}
              </span>
            </h1>
          </div>
          <div className="hidden md:flex gap-2">
            <DropdownMenu
              open={notificationDropdownOpen}
              onOpenChange={setNotificationDropdownOpen}
            >
              <DropdownMenuTrigger className="hidden md:block" asChild>
                <Button
                  variant="ghost"
                  className="relative border-none font-bold bg-gray-100 hover:bg-gray-200 text-secondary hover:text-primary"
                >
                  <FaBell className="h-6 w-6" />
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
        </div>
        <div className=" pt-16 md:pt-0">
          {!userData?.serviceProvider?.verified && (
            <>
              {!userData?.serviceProvider?.subSkills ? (
                <>
                  {/* <div className="flex bg-sky-100 rounded-xl p-3 text-base gap-2 item-center mb-3 mt-2 md:hidden">
                    <img
                      src={verifiedImageMobile}
                      alt="Complete profile illustration"
                      className="object-contain w-10 h-10"
                    />
                    <div className="flex flex-col gap-1">
                      <span>Your account is not yet verified</span>
                      <NavLink
                        className="bg-primary text-sky-100 w-fit py-1 px-2 rounded text-sm "
                        to={"complete-profile"}>
                        complete your profile
                      </NavLink>
                    </div>
                  </div> */}
                  <div className=" md:flex w-full bg-sky-100 p-3 px-10 rounded italic font-medium mb-5">
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
                          , stand a better chance of being hired by completing
                          your profile
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className=" md:flex w-full bg-sky-100 p-3 px-10 rounded italic font-medium mb-5">
                  <div className="flex items-center gap-8">
                    <img
                      src={verifiedImageMobile}
                      alt="Complete profile illustration"
                      className="object-contain w-10 h-10"
                    />
                    <div className="flex gap-3 items-center">
                      <span>
                        🎉 Thank you for completing your profile! Your details
                        are under review. You’ll get a notification once an
                        admin verifies your account.
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="h-full ">
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
  const dispatch = useDispatch();
  const handleCancelClick = () => {
    sessionStorage.clear();
    localStorage.clear();
    dispatch(resetUserData());
    dispatch(resetAllUserData());
    dispatch(resetAllJobs());
    dispatch(clearNearbyJobs());
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
