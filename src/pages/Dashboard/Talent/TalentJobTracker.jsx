import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { JobsFilter } from "@/components/jobs-filter";
import { Search } from "lucide-react";
import { JobsCard } from "@/components/jobs-card";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMyTalentJobs,
  fetchTalentSavedJobs,
} from "@/redux/TalentJobSlice";
import { JobCardSkeleton } from "@/components/job-card-skeleton";
import AppliedJobs from "../ServiceProvider/AppliedJobs";
import { fetchAllJobs, fetchNearbyJobs } from "@/redux/JobSlice";

export function TalentJobTracker() {
  const dispatch = useDispatch();

  // Redux states
  const allJobs = useSelector((state) => state.JobsReducer.allJobs);
  const nearbyJobs = useSelector((state) => state.JobsReducer.jobs);
  const loading = useSelector((state) => state.JobsReducer.loading);
  const error = useSelector((state) => state.ServiceProviderJobReducer.error);
  const savedJobs = useSelector((state) => state.TalentReducer.savedJobs);
  const myJobs = useSelector((state) => state.TalentReducer.myJobs);

  const acceptedJobs = allJobs.filter((job) => {
    return job.jobStatus === "ACCEPTED";
  });

  const acceptedNearByJobs = nearbyJobs.filter((job) => {
    return job.jobStatus === "ACCEPTED";
  });

  // Local states
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    priority: [],
    state: [],
    client: [],
  });

  // Pagination
  const [page, setPage] = useState(0);
  const [size] = useState(20);
  const [hasMore, setHasMore] = useState(true);

  const token =
    JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
    JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));

  // Initial load
  useEffect(() => {
    loadJobs(0, true);

    dispatch(fetchTalentSavedJobs({ token: token.authKey }));
    dispatch(fetchMyTalentJobs({ token: token.authKey }));
  }, []);

  // Load jobs function (all or nearby based on state filter)
  const loadJobs = (pageToLoad = 0, reset = false) => {
    const city = activeFilters.state.length > 0 ? activeFilters.state : null;
    const jobType = activeFilters.priority[0] || null;

    if (city) {
      // Fetch nearby jobs
      dispatch(
        fetchNearbyJobs({
          token: token.authKey,
          userCity: city,
          jobType,
          jobLocation: city,
        })
      )
        .unwrap()
        .then(() => {
          setHasMore(false); // Nearby jobs not paginated
          setPage(0);
        });
    } else {
      // Fetch all jobs (paginated)
      dispatch(
        fetchAllJobs({
          token: token.authKey,
          page: pageToLoad,
          size,
          search: searchQuery,
          jobType,
        })
      )
        .unwrap()
        .then((res) => {
          if (res.data.length < page) setHasMore(false);
          else setHasMore(true);
          setPage(reset ? 1 : pageToLoad + 1);
        });
    }
  };

  // Handle search / filter changes
  useEffect(() => {
    setPage(0);
    setHasMore(true);
    loadJobs(0, true);
  }, [activeFilters]);

  // Determine which jobs to display
  const displayedJobs =
    activeFilters?.state?.length > 0 ? acceptedNearByJobs : acceptedJobs;

  // Frontend filtering
  const filteredJobs = displayedJobs?.filter((service) => {
    const matchesSearch =
      service?.job_title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service?.employer_name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      service?.job_description
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      service?.job_location?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPriority =
      activeFilters.priority.length === 0 ||
      activeFilters.priority.includes(service?.job_type);

    return matchesSearch && matchesPriority;
  });

  const filteredSaved = savedJobs.filter((service) => {
    const job = service.jobPosting;
    const matchesSearch =
      job.job_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.employer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.job_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.job_location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPriority =
      activeFilters.priority.length === 0 ||
      activeFilters.priority.includes(job.job_type);

    return matchesSearch && matchesPriority;
  });

  // Load More button click
  const handleLoadMore = () => loadJobs(page);

  // Loading / error states
  if (loading && page === 0) {
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
      <JobsFilter
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
      />

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
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

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-3 w-full bg-[#E6F7FC]">
          <TabsTrigger value="all" className="hover:bg-sky-600 border-none">
            All ({filteredJobs?.length})
          </TabsTrigger>
          <TabsTrigger value="saved" className="hover:bg-sky-600 border-none">
            Saved ({filteredSaved?.length})
          </TabsTrigger>
          <TabsTrigger value="applied" className="hover:bg-sky-600 border-none">
            Applied ({myJobs?.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="all"
          className="space-y-4 mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 w-full">
          {filteredJobs?.length > 0 ? (
            <>
              {filteredJobs?.reverse().map((service) => (
                <JobsCard key={service.jobID} service={service} tab={"all"} />
              ))}
              {hasMore && (
                <div className="col-span-full text-center mt-4">
                  <button
                    onClick={handleLoadMore}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    {loading ? "Loading..." : "Load More"}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              No Jobs found matching your criteria
            </div>
          )}
        </TabsContent>

        <TabsContent
          value="saved"
          className="space-y-4 mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 w-full">
          {filteredSaved.length > 0 ? (
            filteredSaved
              .reverse()
              .map((service) => (
                <JobsCard
                  key={service.jobID}
                  service={service.jobPosting}
                  tab={"saved"}
                />
              ))
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              No saved job found
            </div>
          )}
        </TabsContent>

        <TabsContent value="applied" className="space-y-4 mt-6">
          <AppliedJobs applications={myJobs} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
