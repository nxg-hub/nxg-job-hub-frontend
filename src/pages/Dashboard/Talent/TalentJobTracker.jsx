import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { JobsFilter } from "@/components/jobs-filter";
import { Search } from "lucide-react";
import { JobsCard } from "@/components/jobs-card";
import { useDispatch, useSelector } from "react-redux";
import { JobCardSkeleton } from "@/components/job-card-skeleton";
import {
  fetchAllTalentJobs,
  fetchMyTalentJobs,
  fetchTalentSavedJobs,
} from "@/redux/TalentJobSlice";
import AppliedJobs from "../ServiceProvider/AppliedJobs";

export function TalentJobTracker() {
  const dispatch = useDispatch();
  const allJobs = useSelector((state) => state.TalentReducer.allJobs);
  const loading = useSelector((state) => state.TalentReducer.loading);
  const error = useSelector((state) => state.TalentReducer.error);
  const savedJobs = useSelector((state) => state.TalentReducer.savedJobs);
  // const savedLoading = useSelector((state) => state.TalentReducer.savedLoading);
  // const savedError = useSelector((state) => state.TalentReducer.savedError);
  const myJob = useSelector((state) => state.TalentReducer.myJobs);
  // const myLoading = useSelector((state) => state.TalentReducer.myLoading);
  // const myError = useSelector((state) => state.TalentReducer.myError);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    priority: [],
    state: [],
    client: [],
  });

  const token =
    JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
    JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));
  useEffect(() => {
    dispatch(fetchAllTalentJobs({ token: token.authKey }));
    dispatch(fetchTalentSavedJobs({ token: token.authKey }));
    dispatch(fetchMyTalentJobs({ token: token.authKey }));
  }, []);

  const acceptedJobs = allJobs.filter((job) => {
    return job.jobStatus === "ACCEPTED";
  });
  // Filter services based on search query and active filters
  const filteredServices = acceptedJobs.filter((service) => {
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

    // State type filter
    const matchesState =
      activeFilters.state.length === 0 ||
      activeFilters.state.includes(service.job_location);

    // Client filter
    // const matchesClient =
    //   activeFilters.client.length === 0 ||
    //   activeFilters.client.includes(service.client);

    return matchesSearch && matchesPriority && matchesState;
    //  && matchesPriority  && matchesClient
  });
  const filteredSaved = savedJobs.filter((service) => {
    // Search filter
    const matchesSearch =
      service.jobPosting.job_title
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      service.jobPosting.employer_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      service.jobPosting.job_description
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      service.jobPosting.job_location
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    // Priority filter
    const matchesPriority =
      activeFilters.priority.length === 0 ||
      activeFilters.priority.includes(service.jobPosting.job_type);

    return matchesSearch && matchesPriority;
    //  && matchesPriority && matchesServiceType && matchesClient
  });

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <JobCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!loading && error) {
    return (
      <p className="text-center text-red-500 mt-6">Failed to fetch jobs</p>
    );
  }

  return (
    <div className="mx-auto px-6 py-6 space-y-6">
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
      <div className="grid grid-cols-1 md:grid-cols-1  w-full gap-6">
        <div className="space-y-6">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-3 w-full bg-[#E6F7FC]">
              <TabsTrigger value="all" className="hover:bg-sky-600 border-none">
                All ({filteredServices.length})
              </TabsTrigger>
              <TabsTrigger
                value="saved"
                className="hover:bg-sky-600 border-none">
                Saved ({filteredSaved.length})
              </TabsTrigger>
              <TabsTrigger
                value="applied"
                className="hover:bg-sky-600 border-none">
                Applied ({myJob.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-2">
                {filteredServices.length > 0 ? (
                  filteredServices
                    .reverse()
                    .map((service) => (
                      <JobsCard
                        key={service.id}
                        service={service}
                        tab={"all"}
                      />
                    ))
                ) : (
                  <div className="text-center py-10 text-muted-foreground">
                    No services found matching your criteria
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="saved" className=" ">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-2">
                {filteredSaved.length > 0 ? (
                  filteredSaved
                    .reverse()
                    .map((service) => (
                      <JobsCard
                        key={service.id}
                        service={service.jobPosting}
                        tab={"saved"}
                      />
                    ))
                ) : (
                  <div className="text-center py-10 text-muted-foreground">
                    No saved job found
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="applied">
              <AppliedJobs applications={myJob} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
