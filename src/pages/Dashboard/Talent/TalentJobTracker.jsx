import { useEffect, useRef, useState } from "react";
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
import {
  fetchAllJobs,
  fetchNearbyJobs,
  resetAllJobs,
  clearNearbyJobs,
} from "@/redux/JobSlice";

export function TalentJobTracker() {
  const dispatch = useDispatch();
  const observerRef = useRef(null);

  const {
    allJobs,
    nearbyJobs,
    loading,
    allJobsPage,
    nearbyPage,
    allJobsHasMore,
    nearbyHasMore,
  } = useSelector((state) => state.JobsReducer);

  const savedJobs = useSelector((state) => state.TalentReducer.savedJobs);
  const myJobs = useSelector((state) => state.TalentReducer.myJobs);

  const token =
    JSON.parse(localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
    JSON.parse(sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    priority: [],
    state: [],
    client: [],
  });

  const isNearby = activeFilters.state.length > 0;

  /* ================= INITIAL LOAD ================= */
  useEffect(() => {
    dispatch(fetchTalentSavedJobs({ token: token.authKey }));
    dispatch(fetchMyTalentJobs({ token: token.authKey }));
  }, []);

  /* ================= RESET + FIRST FETCH ================= */
  useEffect(() => {
    if (isNearby) {
      dispatch(clearNearbyJobs());
      dispatch(
        fetchNearbyJobs({
          token: token.authKey,
          userCity: activeFilters.state,
          page: 0,
        })
      );
    } else {
      dispatch(resetAllJobs());
      dispatch(
        fetchAllJobs({
          token: token.authKey,
          page: 0,
          search: searchQuery,
          jobType: activeFilters.priority[0],
        })
      );
    }
  }, [activeFilters.state]);

  /* ================= INFINITE SCROLL ================= */
  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        if (isNearby && nearbyHasMore) {
          dispatch(
            fetchNearbyJobs({
              token: token.authKey,
              userCity: activeFilters.state,
              page: nearbyPage + 1,
            })
          );
        }

        if (!isNearby && allJobsHasMore) {
          dispatch(
            fetchAllJobs({
              token: token.authKey,
              page: allJobsPage + 1,
              search: searchQuery,
              jobType: activeFilters.priority[0],
            })
          );
        }
      },
      { rootMargin: "200px" } // prefetch before reaching bottom
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [
    loading,
    isNearby,
    nearbyHasMore,
    allJobsHasMore,
    nearbyPage,
    allJobsPage,
  ]);

  /* ================= FILTERING ================= */
  const jobsToRender = isNearby ? nearbyJobs : allJobs;

  const filteredJobs = jobsToRender
    .filter((job) => job.jobStatus === "ACCEPTED")
    .filter((job) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        job.job_title?.toLowerCase().includes(q) ||
        job.job_description?.toLowerCase().includes(q) ||
        job.job_location?.toLowerCase().includes(q);

      const matchesJobType =
        activeFilters.priority.length === 0 ||
        activeFilters.priority.includes(job?.job_type);

      return matchesSearch && matchesJobType;
    });

  //   const filteredSaved = savedJobs.filter((service) => {
  //     const job = service.jobPosting;
  //     const matchesSearch =
  //       job.job_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       job.employer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       job.job_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       job.job_location.toLowerCase().includes(searchQuery.toLowerCase());

  //     const matchesPriority =
  //       activeFilters.priority.length === 0 ||
  //       activeFilters.priority.includes(job.job_type);

  //     return matchesSearch && matchesPriority;
  //   });

  /* ================= INITIAL LOADING ================= */
  if (loading && jobsToRender.length === 0) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <JobCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="mx-auto px-6 py-6 space-y-6">
      <JobsFilter
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
      />

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search jobs..."
          className="pl-9"
        />
      </div>

      <Tabs defaultValue="all">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="all">All ({filteredJobs?.length})</TabsTrigger>
          <TabsTrigger value="saved">Saved ({savedJobs.length})</TabsTrigger>
          <TabsTrigger value="applied">Applied({myJobs.length})</TabsTrigger>
        </TabsList>

        {/* ================= ALL JOBS ================= */}
        <TabsContent
          value="all"
          className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 mt-6">
          {filteredJobs.map((job) => (
            <JobsCard key={job.jobID} service={job} tab="all" />
          ))}

          {/* Loading more skeletons */}
          {loading && jobsToRender.length > 0 && (
            <>
              {Array.from({ length: 3 }).map((_, i) => (
                <JobCardSkeleton key={`loader-${i}`} />
              ))}
            </>
          )}

          {/* Intersection Observer target */}
          <div ref={observerRef} className="col-span-full h-10" />

          {!loading && filteredJobs.length === 0 && (
            <p className="text-center col-span-full text-muted-foreground">
              No jobs found
            </p>
          )}

          {!loading && !allJobsHasMore && !isNearby && (
            <p className="text-center col-span-full text-muted-foreground text-sm">
              You’ve reached the end 🎉
            </p>
          )}
        </TabsContent>

        {/* ================= SAVED ================= */}
        <TabsContent value="saved">
          {savedJobs.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 mt-6">
              {savedJobs.map((job) => (
                <JobsCard
                  key={job.jobID}
                  service={job.jobPosting}
                  tab="saved"
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground mt-6">
              No saved jobs
            </p>
          )}
        </TabsContent>

        {/* ================= APPLIED ================= */}
        <TabsContent value="applied">
          <AppliedJobs applications={myJobs} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
