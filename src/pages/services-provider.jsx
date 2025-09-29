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





  // import { Button } from "@/components/ui/button";
  // import { Input } from "@/components/ui/input";
  // import {
  //   Select,
  //   SelectContent,
  //   SelectItem,
  //   SelectTrigger,
  //   SelectValue,
  // } from "@/components/ui/select";
  // import { Bookmark, MapPin, Search } from "lucide-react";
  // import kcyimage from "@/static/images/kyc-image.png";
  // import driver from "@/static/images/driver.png";
  // import {
  //   Card,
  //   CardContent,
  //   CardFooter,
  //   CardHeader,
  // } from "@/components/ui/card";
  // import { Badge } from "@/components/ui/badge";
  // import { cn } from "@/lib/utils";
  // import { useState, useEffect } from "react";


  // // const recommendedJobs = [
  // //   {
  // //     id: 1,
  // //     company: "Employer",
  // //     location: "Lagos, Nigeria",
  // //     title: "Skilled Driver",
  // //     description: "I need a skilled Driver with 3 years of Experience.",
  // //     type: ["Full time", "On-site"],
  // //     salary: "$32k-$60k",
  // //     views: 30,
  // //     applicants: 2,
  // //     bookmarked: false,
  // //   },
  // //   {
  // //     id: 2,
  // //     company: "Agency",
  // //     location: "Albany, NY",
  // //     title: "Housemaid Needed",
  // //     description:
  // //       "Professional Housemaid needed urgently. Lorem interdum euis ut turpis lorem. An interdum nisl interdum euis ut turpis lorem.",
  // //     type: ["Contract", "Full time"],
  // //     salary: "$45k-$80k",
  // //     views: 30,
  // //     applicants: 0,
  // //     bookmarked: false,
  // //   },
  // //   {
  // //     id: 3,
  // //     company: "Employer",
  // //     location: "Abuja, Nigeria",
  // //     title: "Experience Nurse",
  // //     description:
  // //       "I need an experience nurse that can treate. Lorem interdum euis ut turpis lorem. An interdum nisl interdum euis ut turpis lorem.",
  // //     type: ["Full time", "On-site", "Off-site"],
  // //     salary: "$32k-$60k",
  // //     views: 30,
  // //     applicants: 2,
  // //     bookmarked: false,
  // //   },
  // //   {
  // //     id: 4,
  // //     company: "Agency",
  // //     location: "Albany, NY",
  // //     title: "Housemaid Needed",
  // //     description:
  // //       "Professional Housemaid needed urgently. Lorem interdum euis ut turpis lorem. An interdum nisl interdum euis ut turpis lorem.",
  // //     type: ["Contract", "Full time"],
  // //     salary: "$45k-$80k",
  // //     views: 30,
  // //     applicants: 0,
  // //     bookmarked: false,
  // //   },
  // // ];

  // const nearbyJobs = [
  //   {
  //     id: 5,
  //     company: "Employer",
  //     location: "Kano, Nigeria",
  //     title: "Skilled Driver",
  //     description: "I need a skilled Driver with 3 years of Experience.",
  //     type: ["Full time", "On-site"],
  //     salary: "$32k-$60k",
  //     views: 30,
  //     applicants: 2,
  //     bookmarked: false,
  //   },
  //   {
  //     id: 6,
  //     company: "Agency",
  //     location: "Albany, NY",
  //     title: "Housemaid Needed",
  //     description:
  //       "Professional Housemaid needed urgently. Lorem interdum euis ut turpis lorem. An interdum nisl interdum euis ut turpis lorem.",
  //     type: ["Contract", "Full time"],
  //     salary: "$45k-$80k",
  //     views: 30,
  //     applicants: 0,
  //     bookmarked: false,
  //   },
  //   {
  //     id: 7,
  //     company: "Employer",
  //     location: "Abuja, Nigeria",
  //     title: "Experience Nurse",
  //     description:
  //       "I need an experience nurse that can treate. Lorem interdum euis ut turpis lorem. An interdum nisl interdum euis ut turpis lorem.",
  //     type: ["Full time", "On-site", "Off-site"],
  //     salary: "$32k-$60k",
  //     views: 30,
  //     applicants: 2,
  //     bookmarked: false,
  //   },
  //   {
  //     id: 8,
  //     company: "Employer",
  //     location: "Lagos, Nigeria",
  //     title: "Skilled Driver",
  //     description: "I need a skilled Driver with 3 years of Experience.",
  //     type: ["Full time", "On-site"],
  //     salary: "$32k-$60k",
  //     views: 30,
  //     applicants: 2,
  //     bookmarked: false,
  //   },
  //   {
  //     id: 9,
  //     company: "Employer",
  //     location: "Kano, Nigeria",
  //     title: "Skilled Driver",
  //     description: "I need a skilled Driver with 3 years of Experience.",
  //     type: ["Full time", "On-site"],
  //     salary: "$32k-$60k",
  //     views: 30,
  //     applicants: 2,
  //     bookmarked: false,
  //   },
  //   {
  //     id: 10,
  //     company: "Agency",
  //     location: "Albany, NY",
  //     title: "Housemaid Needed",
  //     description:
  //       "Professional Housemaid needed urgently. Lorem interdum euis ut turpis lorem. An interdum nisl interdum euis ut turpis lorem.",
  //     type: ["Contract", "Full time"],
  //     salary: "$45k-$80k",
  //     views: 30,
  //     applicants: 0,
  //     bookmarked: false,
  //   },
  //   {
  //     id: 11,
  //     company: "Employer",
  //     location: "Abuja, Nigeria",
  //     title: "Experience Nurse",
  //     description:
  //       "I need an experience nurse that can treate. Lorem interdum euis ut turpis lorem. An interdum nisl interdum euis ut turpis lorem.",
  //     type: ["Full time", "On-site", "Off-site"],
  //     salary: "$32k-$60k",
  //     views: 30,
  //     applicants: 2,
  //     bookmarked: false,
  //   },
  //   {
  //     id: 12,
  //     company: "Employer",
  //     location: "Lagos, Nigeria",
  //     title: "Skilled Driver",
  //     description: "I need a skilled Driver with 3 years of Experience.",
  //     type: ["Full time", "On-site"],
  //     salary: "$32k-$60k",
  //     views: 30,
  //     applicants: 2,
  //     bookmarked: false,
  //   },
  // ];

  //   /**
  //  * Job Card Component
  //  * @param {Object} props
  //  * @param {Object} props.job - Job data
  //  * @param {boolean} props.isBookmarked - Whether the job is bookmarked
  //  * @param {Function} props.onBookmarkToggle - Function to toggle bookmark
  //  */

  // function JobCard({ job, isBookmarked, onBookmarkToggle }) {
  //   return (
  //     <Card className="overflow-hidden">
  //       <CardHeader className="p-4 pb-0 flex flex-col justify-between items-start">
  //       <img src={driver} alt="" />
  //         {/* Employer/bookmark */}
  //       <div className="flex justify-between w-full">
  //         <div className="flex gap-2">
  //           <div className="flex-col">
  //             <h3 className="font-medium">{job.company}</h3>
  //             <div className="flex items-center text-xs text-gray-500">
  //               <MapPin className="h-3 w-3 mr-1" />
  //               {job.location}
  //             </div>
  //           </div>
  //         </div>
  //         <Button 
  //           variant="ghost"
  //           size="icon"
  //           className="h-8 w-8 border-none self-end"
  //           onClick={onBookmarkToggle}>
  //           <div className="flex flex-col items-center">
  //             <Bookmark
  //               className={cn(
  //                 "h-10 w-",
  //                 isBookmarked ? "fill-[#0078B4] text-[#0078B4]" : "text-gray-400"
  //               )}
  //             />
  //             {/* <span className="text-xs text-gray-300">
  //               {isBookmarked ? "saved" : "save"}
  //             </span> */}
  //           </div>
  //         </Button>
  //         {/* <img
  //           src={driver}
  //           alt=""
  //         /> */}
  //         {/* Employer/bookmark */}
  //         <div className="flex justify-between w-full">
  //           <div className="flex gap-2">
  //             {/* <div className="flex-col">
  //               <h3 className="font-medium">{job.company}</h3>
  //               <div className="flex items-center text-xs text-gray-500">
  //                 <MapPin className="h-3 w-3 mr-1" />
  //                 {job.location}
  //               </div>
  //             </div> */}
  //           </div>
  //         </div>
  //       </div>
  //       </CardHeader>
  //       <CardContent className="p-4">
  //         <h4 className="font-medium mb-2">{job.title}</h4>
  //         <p className="text-sm text-gray-600 mb-3 line-clamp-3">
  //           {job.description}
  //         </p>
  //         <div className="flex flex-wrap gap-2 mb-3">
  //           {job.type.map((type) => (
  //             <Badge
  //               key={type}
  //               variant="outline"
  //               className="font-normal">
  //               {type}
  //             </Badge>
  //           ))}
  //         </div>
  //         <div className="font-medium">{job.salary}</div>
  //       </CardContent>
  //       <CardFooter className="p-4 flex justify-between items-center border-t">
  //         <div className="text-xs text-gray-500">
  //           {job.views} views • {job.applicants} applicants
  //         </div>
  //         <Button
  //           size="sm"
  //           className="bg-sky-400 border-none hover:bg-[#006699]">
  //           Apply Now
  //         </Button>
  //       </CardFooter>
  //     </Card>
  //   );
  // }

  // export function ServicesProviderHomePage() {
  //   const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  //   const [recommendedJobs, setRecommendedJobs] = useState([]);

  // useEffect(() => {
  //   const fetchJobs = async () => {
  //       try {
  //       const response = await fetch(
  //         "https://nxg-job-hub-backend.onrender.com/api/job-postings/recent-job-postings"
  //       );
  //       const data = await response.json();
  //       setRecommendedJobs(data.content || []); // depends on your backend response structure
  //     } catch (error) {
  //       console.error("Error fetching jobs:", error);
  //     }
  //   };

  //   fetchJobs();
  // }, []);

  //   const toggleBookmark = (jobId) => {
  //     setBookmarkedJobs((prev) =>
  //       prev.includes(jobId)
  //         ? prev.filter((id) => id !== jobId)
  //         : [...prev, jobId]
  //     );
  //   };
  //   return (
  //     <div>
  //       {/* Search Section */}
  //       <div className="p-4 bg-white border-b">
  //         <p className="text-sm text-gray-500 mb-2">Search for Jobs</p>
  //         <div className="flex flex-wrap gap-2">
  //           <div className="relative flex-1 min-w-[200px]">
  //             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
  //             <Input
  //               type="text"
  //               placeholder="Nurse/Driver"
  //               className="pl-9"
  //             />
  //           </div>

  //           <div className="relative flex-1 min-w-[200px]">
  //             <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
  //             <Input
  //               type="text"
  //               placeholder="Location"
  //               className="pl-9"
  //             />
  //           </div>

  //           <div className="flex-1 min-w-[200px]">
  //             <Select>
  //               <SelectTrigger className="hover:bg-gray-100 hover:text-gray-500">
  //                 <SelectValue placeholder="Type of employment" />
  //               </SelectTrigger>
  //               <SelectContent>
  //                 <SelectItem value="full-time">Volunteer</SelectItem>
  //                 <SelectItem value="part-time">Contract</SelectItem>
  //                 <SelectItem value="contract">Part-time</SelectItem>
  //                 <SelectItem value="freelance">Full-time</SelectItem>
  //               </SelectContent>
  //             </Select>
  //           </div>

  //           <div className="flex-1 min-w-[200px]">
  //             <Select>
  //               <SelectTrigger className="hover:bg-gray-100 hover:text-gray-500">
  //                 <SelectValue placeholder="Experience level" />
  //               </SelectTrigger>
  //               <SelectContent>
  //                 <SelectItem value="entry">Internship</SelectItem>
  //                 <SelectItem value="mid">Entry level</SelectItem>
  //                 <SelectItem value="senior">Mid level</SelectItem>
  //                 <SelectItem value="senior">Senior level</SelectItem>
  //                 <SelectItem value="senior">Director</SelectItem>
  //                 <SelectItem value="senior">Executive</SelectItem>
  //                 <SelectItem value="senior">Others</SelectItem>
  //               </SelectContent>
  //             </Select>
  //           </div>

  //           <Button className="bg-sky-400 hover:bg-[#006699] border-none">
  //             Search Job
  //           </Button>

  //           <div className="flex items-center gap-2">
  //             <span className="text-sm text-gray-500">sort by</span>
  //             <Select defaultValue="relevance">
  //               <SelectTrigger className="w-[130px] hover:bg-gray-100">
  //                 <SelectValue />
  //               </SelectTrigger>
  //               <SelectContent>
  //                 <SelectItem value="relevance">Relevance</SelectItem>
  //                 <SelectItem value="date">Popularity</SelectItem>
  //                 <SelectItem value="salary">Recent</SelectItem>
  //                 <SelectItem value="salary">Oldest</SelectItem>
  //               </SelectContent>
  //             </Select>
  //           </div>
  //         </div>
  //       </div>
  //       {/* end of search setion */}
  //       {/* Profile Completion */}
  //       <div className="p-4">
  //         <div className="bg-white rounded-lg shadow-sm overflow-hidden">
  //           <div className="px-10 flex items-center justify-between">
  //             <div className="flex-1 min-w-[300px]">
  //               <h2 className="text-xl font-semibold text-gray-800">
  //                 Get started by Completing your Profile
  //               </h2>
  //               <p className="text-gray-600 mt-1">
  //                 Stand a better chance of being hired by completing your profile
  //               </p>
  //               <Button className="mt-4 bg-sky-400 hover:bg-[#006699] border-none">
  //                 Complete Profile
  //               </Button>
  //             </div>
  //             <div className="min-w-[300px]">
  //               <img
  //                 src={kcyimage}
  //                 alt="Complete profile illustration"
  //                 className="object-contain w-44 h-44"
  //               />
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       {/* end of complete profile */}
  //       {/* Recommended Jobs */}
  //       <div className="p-4">
  //         <div className="flex justify-between items-center mb-4">
  //           <h2 className="text-lg font-semibold text-gray-800 border-b-2 border-sky-400 pb-1">
  //             Recent Jobs for you
  //           </h2>
  //           <Button
  //             variant="ghost"
  //             size="sm"
  //             className="text-gray-500 border-gray-200 ">
  //             View All
  //           </Button>
  //         </div>

  //         <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
  //           {recommendedJobs.length > 0 ? (
  //             recommendedJobs.map((job) => (
  //               <div key={job.id} className="min-w-[280px] md:min-w-[320px]">
  //                 <JobCard
  //                   job={job}
  //                   isBookmarked={bookmarkedJobs.includes(job.id)}
  //                   onBookmarkToggle={() => toggleBookmark(job.id)}
  //                 />
  //               </div>
  //             ))
  //           ) : (
  //             <p>No recommended jobs found.</p>
  //           )}
  //         </div>
  //       </div>

  //       {/* Jobs Near You */}
  //       <div className="p-4"> 
  //         <div className="flex justify-between items-center mb-4">
  //           <h2 className="text-lg font-semibold text-gray-800 border-b-2 border-sky-400 pb-1">
  //             Jobs Near You
  //           </h2>
  //           <Button
  //             variant="ghost"
  //             size="sm"
  //             className="text-gray-500 border-gray-200">
  //             View All
  //           </Button>
  //         </div>

          

  //       <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
  //           {nearbyJobs.length > 0 ? (
  //             nearbyJobs.map((job) => (
  //               <div key={job.id} className="min-w-[280px] md:min-w-[320px]">
  //                 <JobCard
  //                   key={job.id}
  //                   job={job}
  //                   isBookmarked={bookmarkedJobs.includes(job.id)}
  //                   onBookmarkToggle={() => toggleBookmark(job.id)}
  //                 />
  //               </div>
  //             ))
  //           ) : (
  //             <p>No recent jobs found.</p>
  //           )}
  //         </div>
  //       </div>

      
  //     </div>  
  //   );
  // }
