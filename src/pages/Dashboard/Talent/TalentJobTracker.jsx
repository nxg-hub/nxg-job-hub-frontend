import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { JobsFilter } from "@/components/jobs-filter";
import { Plus, Search } from "lucide-react";
import { RatingDialog } from "@/components/rating-dialog";
import { Textarea } from "@/components/ui/textarea";

import { JobsCard } from "@/components/jobs-card";
import { useDispatch, useSelector } from "react-redux";
import { JobCardSkeleton } from "@/components/job-card-skeleton";
import {
  fetchAllTalentJobs,
  fetchMyTalentJobs,
  fetchTalentSavedJobs,
} from "@/redux/TalentJobSlice";
import AppliedJobs from "../ServiceProvider/AppliedJobs";

// Service types for an artisan
const serviceTypes = [
  //   "carpentry",
  //   "plumbing",
  //   "electrical",
  //   "painting",
  //   "roofing",
  //   "masonry",
  //   "flooring",
  //   "landscaping",
];

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
  const [services, setServices] = useState(allJobs);
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
    return (
      job.jobStatus === "ACCEPTED" && job.jobClassification === "PROFESSIONAL"
    );
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

  // Update service status
  const updateServiceStatus = (serviceId, newStatus) => {
    setServices(
      services.map((service) =>
        service.id === serviceId
          ? {
              ...service,
              status: newStatus,
              ...(newStatus === "completed"
                ? { completedAt: new Date().toISOString().split("T")[0] }
                : {}),
            }
          : service
      )
    );
  };

  // Add a function to update service rating
  const updateServiceRating = (serviceId, rating) => {
    setServices(
      services.map((service) =>
        service.id === serviceId
          ? {
              ...service,
              rating,
            }
          : service
      )
    );
  };

  // Add this function to open the rating dialog
  const openRatingDialog = (service) => {
    setSelectedService(service);
    setRatingDialogOpen(true);
  };

  // Function to decline a service
  const declineService = (serviceId) => {
    setSelectedServiceId(serviceId);
    setDeclineDialogOpen(true);
  };

  // Function to handle messaging a client
  const handleMessageClient = (serviceId) => {
    const service = services.find((s) => s.id === serviceId);
    if (service) {
      setCurrentChatService(service);
      setChatDialogOpen(true);
    }
  };

  // Get unique clients for filter
  const uniqueClients = [...new Set(services.map((service) => service.client))];

  if (loading) {
    return <JobCardSkeleton />;
  }

  if (!loading && error) {
    return (
      <p className="text-center text-red-500 mt-6">Failed to fetch jobs</p>
    );
  }

  return (
    <div className="mx-auto px-6 py-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-6">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
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
            <TabsContent value="all" className="space-y-4 mt-6">
              {filteredServices.length > 0 ? (
                filteredServices
                  .reverse()
                  .map((service) => (
                    <JobsCard
                      key={service.id}
                      service={service}
                      onStatusChange={updateServiceStatus}
                      onRatingChange={updateServiceRating}
                      onOpenRatingDialog={openRatingDialog}
                      onDeclineService={declineService}
                      onMessageClient={handleMessageClient}
                      tab={"all"}
                    />
                  ))
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  No services found matching your criteria
                </div>
              )}
            </TabsContent>
            <TabsContent value="saved" className="space-y-4 mt-6">
              {filteredSaved.length > 0 ? (
                filteredSaved
                  .reverse()
                  .map((service) => (
                    <JobsCard
                      key={service.id}
                      service={service.jobPosting}
                      onStatusChange={updateServiceStatus}
                      onRatingChange={updateServiceRating}
                      onOpenRatingDialog={openRatingDialog}
                      onDeclineService={declineService}
                      onMessageClient={handleMessageClient}
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
              <AppliedJobs applications={myJob} />
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <JobsFilter
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
            clients={uniqueClients}
            serviceTypes={serviceTypes}
          />
        </div>
      </div>
    </div>
  );
}
