import { useState, useEffect } from "react";
import {
  Bell,
  Bookmark,
  CircleUser,
  LayoutDashboard,
  LogOut,
  MapPin,
  Search,
  Settings,
  CircleHelp,
  ChartLine,
  Wallet,
  Send,
  BriefcaseBusiness,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "../lib/utils";
import { DashboardSkeleton } from "@/components/dashboard-skeleton";
import { NotificationPanel } from "@/components/notification-panel";
import logo from "@/static/images/logo_colored.png";
import logomin from "@/static/images/logo_min.png";
import sarahicon from "@/static/images/admin-sarah.png";
import kcyimage from "@/static/images/kyc-image.png";
import { NavLink } from "react-router-dom";

const sidebarItems = [
  { icon: <LayoutDashboard />, label: "Dashboard", active: true },
  { icon: <CircleUser />, label: "My Profile" },
  { icon: <Bell />, label: "Notifications" },
  { icon: <BriefcaseBusiness />, label: "Job Listings" },
  { icon: <Send />, label: "My Applications" },
  { icon: <Bookmark />, label: "Saved Jobs" },
  { icon: <Wallet />, label: "My Wallet" },
  { icon: <ChartLine />, label: "Analytics" },
  { icon: <Settings />, label: "Settings" },
  { icon: <CircleHelp />, label: "Help" },
];

const recommendedJobs = [
  {
    id: 1,
    company: "Figma",
    location: "Albany, NY",
    title: "Product designer",
    description:
      "Lorem ipsum dolor sit amet consectetur. Lorem interdum euis ut turpis lorem. An interdum nisl interdum euis ut turpis lorem.",
    type: ["Full time", "On-site"],
    salary: "$32k-$60k",
    views: 30,
    applicants: 2,
    bookmarked: false,
  },
  {
    id: 2,
    company: "Figma",
    location: "Albany, NY",
    title: "Product designer",
    description:
      "Lorem ipsum dolor sit amet consectetur. Lorem interdum euis ut turpis lorem. An interdum nisl interdum euis ut turpis lorem.",
    type: ["Contract", "Hybrid", "On-site"],
    salary: "$45k-$80k",
    views: 30,
    applicants: 0,
    bookmarked: false,
  },
  {
    id: 3,
    company: "Figma",
    location: "Albany, NY",
    title: "Product designer",
    description:
      "Lorem ipsum dolor sit amet consectetur. Lorem interdum euis ut turpis lorem. An interdum nisl interdum euis ut turpis lorem.",
    type: ["Full time", "On-site", "Off-site"],
    salary: "$32k-$60k",
    views: 30,
    applicants: 2,
    bookmarked: false,
  },
  {
    id: 4,
    company: "Figma",
    location: "Albany, NY",
    title: "Product designer",
    description:
      "Lorem ipsum dolor sit amet consectetur. Lorem interdum euis ut turpis lorem. An interdum nisl interdum euis ut turpis lorem.",
    type: ["Full time"],
    salary: "$32k-$60k",
    views: 30,
    applicants: 2,
    bookmarked: false,
  },
];

const nearbyJobs = [
  {
    id: 5,
    company: "Figma",
    location: "Albany, NY",
    title: "Product designer",
    description:
      "Lorem ipsum dolor sit amet consectetur. Lorem interdum euis ut turpis lorem. An interdum nisl interdum euis ut turpis lorem.",
    type: ["Full time", "On-site"],
    salary: "$32k-$60k",
    views: 30,
    applicants: 2,
    bookmarked: false,
  },
  {
    id: 6,
    company: "Figma",
    location: "Albany, NY",
    title: "Product designer",
    description:
      "Lorem ipsum dolor sit amet consectetur. Lorem interdum euis ut turpis lorem. An interdum nisl interdum euis ut turpis lorem.",
    type: ["Contract", "Hybrid", "On-site"],
    salary: "$45k-$80k",
    views: 30,
    applicants: 0,
    bookmarked: false,
  },
  {
    id: 7,
    company: "Figma",
    location: "Albany, NY",
    title: "Product designer",
    description:
      "Lorem ipsum dolor sit amet consectetur. Lorem interdum euis ut turpis lorem. An interdum nisl interdum euis ut turpis lorem.",
    type: ["Full time", "On-site", "Off-site"],
    salary: "$32k-$60k",
    views: 30,
    applicants: 2,
    bookmarked: false,
  },
  {
    id: 8,
    company: "Figma",
    location: "Albany, NY",
    title: "Product designer",
    description:
      "Lorem ipsum dolor sit amet consectetur. Lorem interdum euis ut turpis lorem. An interdum nisl interdum euis ut turpis lorem.",
    type: ["Full time"],
    salary: "$32k-$60k",
    views: 30,
    applicants: 2,
    bookmarked: false,
  },
];

/**
 * Job Card Component
 * @param {Object} props
 * @param {Object} props.job - Job data
 * @param {boolean} props.isBookmarked - Whether the job is bookmarked
 * @param {Function} props.onBookmarkToggle - Function to toggle bookmark
 */
function JobCard({ job, isBookmarked, onBookmarkToggle }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 pb-0 flex flex-row justify-between items-start">
        <div className="flex gap-2">
          <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center text-blue-500">
            {job.company.charAt(0)}
          </div>
          <div>
            <h3 className="font-medium">{job.company}</h3>
            <div className="flex items-center text-xs text-gray-500">
              <MapPin className="h-3 w-3 mr-1" />
              {job.location}
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 border-none"
          onClick={onBookmarkToggle}>
          <div className="flex flex-col items-center">
            <Bookmark
              className={cn(
                "h-10 w-",
                isBookmarked ? "fill-[#0078B4] text-[#0078B4]" : "text-gray-400"
              )}
            />
            <span className="text-xs text-gray-300">
              {isBookmarked ? "saved" : "save"}
            </span>
          </div>
        </Button>
      </CardHeader>
      <CardContent className="p-4">
        <h4 className="font-medium mb-2">{job.title}</h4>
        <p className="text-sm text-gray-600 mb-3 line-clamp-3">
          {job.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          {job.type.map((type) => (
            <Badge
              key={type}
              variant="outline"
              className="font-normal">
              {type}
            </Badge>
          ))}
        </div>
        <div className="font-medium">{job.salary}</div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center border-t">
        <div className="text-xs text-gray-500">
          {job.views} views • {job.applicants} applicants
        </div>
        <Button
          size="sm"
          className="bg-sky-400 border-none hover:bg-[#006699]">
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
}

export function JobDashboard() {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const toggleBookmark = (jobId) => {
    setBookmarkedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <TooltipProvider delayDuration={0}>
      <SidebarProvider>
        <DashboardContent
          bookmarkedJobs={bookmarkedJobs}
          toggleBookmark={toggleBookmark}
        />
      </SidebarProvider>
    </TooltipProvider>
  );
}

function DashboardContent({ bookmarkedJobs, toggleBookmark }) {
  // Now we can safely use useSidebar here
  const sidebar = useSidebar();
  const isCollapsed = sidebar.state === "collapsed";

  return (
    <div className="flex h-screen ">
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

            <div className="mt-4 px-4 flex flex-col items-center">
              <Avatar
                className={cn(
                  "border-2 border-white",
                  isCollapsed ? "h-12 w-12" : "h-20 w-20"
                )}>
                <AvatarImage
                  src={sarahicon}
                  alt="Sarah"
                />
                <AvatarFallback>S</AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <>
                  <h3 className="mt-2 font-semibold text-lg text-gray-100">
                    Sarah
                  </h3>
                  <p className="text-sm text-gray-200">Fashion designer</p>
                </>
              )}
            </div>
          </div>
          <SidebarGroup className="p-5 pt-8">
            <SidebarGroupContent>
              <SidebarMenu className="gap-5">
                {sidebarItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      isActive={item.active}
                      tooltip={item.label}
                      className="text-white hover:bg-white/10 hover:text-white p-5">
                      <a>
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
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
      <SidebarInset>
        {/* Header */}
        <header className="bg-white p-4 flex flex-col items-start border-b">
          <SidebarTrigger className="mr-2 border-none" />
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-800">
                Sarah's Dashboard
              </h1>
            </div>

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
          </div>
        </header>

        {/* Search Section */}
        <div className="p-4 bg-white border-b">
          <p className="text-sm text-gray-500 mb-2">Search for Jobs</p>
          <div className="flex flex-wrap gap-2">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Product Designer"
                className="pl-9"
              />
            </div>

            <div className="relative flex-1 min-w-[200px]">
              <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Location"
                className="pl-9"
              />
            </div>

            <div className="flex-1 min-w-[200px]">
              <Select>
                <SelectTrigger className="hover:bg-gray-100 hover:text-gray-500">
                  <SelectValue placeholder="Type of employment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Volunteer</SelectItem>
                  <SelectItem value="part-time">Contract</SelectItem>
                  <SelectItem value="contract">Part-time</SelectItem>
                  <SelectItem value="freelance">Full-time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <Select>
                <SelectTrigger className="hover:bg-gray-100 hover:text-gray-500">
                  <SelectValue placeholder="Experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entry">Internship</SelectItem>
                  <SelectItem value="mid">Entry level</SelectItem>
                  <SelectItem value="senior">Mid level</SelectItem>
                  <SelectItem value="senior">Senior level</SelectItem>
                  <SelectItem value="senior">Director</SelectItem>
                  <SelectItem value="senior">Executive</SelectItem>
                  <SelectItem value="senior">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="bg-sky-400 hover:bg-[#006699] border-none">
              Search Job
            </Button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">sort by</span>
              <Select defaultValue="relevance">
                <SelectTrigger className="w-[130px] hover:bg-gray-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="date">Popularity</SelectItem>
                  <SelectItem value="salary">Recent</SelectItem>
                  <SelectItem value="salary">Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Profile Completion */}
        <div className="p-4">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-10 flex items-center justify-between">
              <div className="flex-1 min-w-[300px]">
                <h2 className="text-xl font-semibold text-gray-800">
                  Get started by Completing your Profile
                </h2>
                <p className="text-gray-600 mt-1">
                  Stand a better chance of being hired by completing your
                  profile
                </p>
                <Button className="mt-4 bg-sky-400 hover:bg-[#006699] border-none">
                  Complete Profile
                </Button>
              </div>
              <div className="min-w-[300px]">
                <img
                  src={kcyimage}
                  alt="Complete profile illustration"
                  className="object-contain w-44 h-44"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Jobs */}
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800 border-b-2 border-sky-400 pb-1">
              Recommeded Jobs for you
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 border-gray-200 ">
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendedJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isBookmarked={bookmarkedJobs.includes(job.id)}
                onBookmarkToggle={() => toggleBookmark(job.id)}
              />
            ))}
          </div>
        </div>

        {/* Jobs Near You */}
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800 border-b-2 border-sky-400 pb-1">
              Jobs Near You
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 border-gray-200">
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {nearbyJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isBookmarked={bookmarkedJobs.includes(job.id)}
                onBookmarkToggle={() => toggleBookmark(job.id)}
              />
            ))}
          </div>
        </div>
      </SidebarInset>
    </div>
  );
}
