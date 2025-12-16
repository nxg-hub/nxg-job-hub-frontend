import { JobCardSkeleton } from "@/components/job-card-skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMyTalentJobs,
  fetchTalentNearByJobs,
  fetchTalentRecentJobs,
} from "@/redux/TalentJobSlice";
import { fetchAllJobs } from "@/redux/JobSlice";
import { Toaster } from "@/components/ui/toaster";
import { Link } from "react-router-dom";
import { JobsCard } from "@/components/jobs-card";
import { JobsFilter } from "@/components/jobs-filter";
import { Input } from "@/components/ui/input";

export default function TalentDashboardTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    priority: [],
    state: [],
    client: [],
  });
  const { allJobs } = useSelector((state) => state.JobsReducer);
  const loading = useSelector((state) => state.TalentReducer.loading);
  const nearError = useSelector((state) => state.TalentReducer.nearError);
  const recentJobs = useSelector((state) => state.TalentReducer.recentJobs);
  const nearByJobs = useSelector((state) => state.TalentReducer.nearByJobs);
  const acceptedRecentJobs = recentJobs.filter((job) => {
    return job.jobStatus === "ACCEPTED";
  });
  const acceptedJobs = allJobs.filter((job) => {
    return job.jobStatus === "ACCEPTED";
  });

  const dispayed =
    acceptedRecentJobs.length > 0 ? acceptedRecentJobs : acceptedJobs;
  const acceptedNearJobs = nearByJobs.filter((job) => {
    return job.jobStatus === "ACCEPTED";
  });
  const token =
    JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
    JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTalentRecentJobs({ token: token.authKey }));
    dispatch(fetchTalentNearByJobs({ token: token.authKey }));
    dispatch(fetchMyTalentJobs({ token: token.authKey }));
    dispatch(
      fetchAllJobs({
        token: token.authKey,
        page: 0,
        size: 10, // limit recent jobs to 10
        jobType: activeFilters.priority,
        search: searchQuery,
      })
    );
  }, []);
  // Filter services based on search query and active filters
  const filteredRecent = dispayed.filter((service) => {
    // Search filter
    const matchesSearch =
      service?.job_title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service?.employer_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      service?.job_description
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      service?.job_location.toLowerCase().includes(searchQuery.toLowerCase());

    // Priority filter
    const matchesPriority =
      activeFilters.priority.length === 0 ||
      activeFilters.priority.includes(service?.job_type);

    // State type filter
    const matchesState =
      activeFilters.state.length === 0 ||
      activeFilters.state.includes(service?.job_location);

    return matchesSearch && matchesPriority && matchesState;
    //  && matchesPriority  && matchesClient
  });
  const filteredNear = acceptedNearJobs.filter((service) => {
    // Search filter
    const matchesSearch =
      service.job_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.employer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.job_description
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      service.job_location.toLowerCase().includes(searchQuery.toLowerCase());

    // Priority filter
    const matchesPriority =
      activeFilters.priority.length === 0 ||
      activeFilters.priority.includes(service.job_type);

    return matchesSearch && matchesPriority;
    //  && matchesPriority && matchesServiceType && matchesClient
  });
  if (loading)
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <JobCardSkeleton key={i} />
        ))}
      </div>
    );

  return (
    <div className="space-y-6 px-6">
      <div className="flex flex-col gap-4 sticky top-0 z-30 bg-white">
        <JobsFilter
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
        />
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search Jobs..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <Tabs defaultValue="matches">
        <TabsList className="grid w-full grid-cols-2 border-none">
          <TabsTrigger
            value="matches"
            className="border-none hover:bg-white hover:text-black">
            Job Matches
          </TabsTrigger>
          <TabsTrigger
            value="near"
            className="border-none hover:bg-white hover:text-black">
            Nearby Jobs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="matches" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Posted Jobs</CardTitle>
              <CardDescription>
                <Link to={"/talent/jobs"}>View All</Link>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 py-4">
                {!loading && nearError ? (
                  <p className="text-red-500 col-span-full text-center">
                    Failed to fetch
                  </p>
                ) : filteredRecent.length > 0 ? (
                  filteredRecent.map((job) => (
                    <JobsCard key={job.id} service={job} />
                  ))
                ) : (
                  <p className="col-span-full text-center text-gray-500">
                    No recent jobs
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="near" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Nearby Jobs</CardTitle>
              <CardDescription>
                <Link to={"/talent/jobs"}>View All</Link>
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 py-4">
                {!loading && nearError ? (
                  <p className="text-red-500">Failed to fetch</p>
                ) : filteredNear.length > 0 ? (
                  filteredNear.map((job) => (
                    <JobsCard key={job.id} service={job} />
                  ))
                ) : (
                  <p>No nearby jobs at the moment</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Toaster />
    </div>
  );
}
