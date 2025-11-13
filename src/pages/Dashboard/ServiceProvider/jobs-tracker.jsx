import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { JobsFilter } from "@/components/jobs-filter";
import { Plus, Search } from "lucide-react";
import { RatingDialog } from "@/components/rating-dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { JobsCard } from "@/components/jobs-card";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllJobs,
  fetchMyJobs,
  fetchSavedJobs,
} from "@/redux/ServiceProviderJobSlice";
import { JobCardSkeleton } from "@/components/job-card-skeleton";
import AppliedJobs from "./AppliedJobs";

// Service types for an artisan
const serviceTypes = [
  // "carpentry",
  // "plumbing",
  // "electrical",
  // "painting",
  // "roofing",
  // "masonry",
  // "flooring",
  // "landscaping",
];

export function JobTracker() {
  const dispatch = useDispatch();
  const allJobs = useSelector(
    (state) => state.ServiceProviderJobReducer.allJobs
  );
  const loading = useSelector(
    (state) => state.ServiceProviderJobReducer.loading
  );
  const error = useSelector((state) => state.ServiceProviderJobReducer.error);
  const savedJobs = useSelector(
    (state) => state.ServiceProviderJobReducer.savedJobs
  );
  const savedLoading = useSelector(
    (state) => state.ServiceProviderJobReducer.savedLoading
  );

  const savedError = useSelector(
    (state) => state.ServiceProviderJobReducer.savedError
  );
  const myJobs = useSelector((state) => state.ServiceProviderJobReducer.myJobs);
  const myLoading = useSelector(
    (state) => state.ServiceProviderJobReducer.myLoading
  );

  const myError = useSelector(
    (state) => state.ServiceProviderJobReducer.myError
  );
  const [services, setServices] = useState(allJobs);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    priority: [],
    state: [],
    client: [],
  });

  const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
  const [declineDialogOpen, setDeclineDialogOpen] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [chatDialogOpen, setChatDialogOpen] = useState(false);
  const [currentChatService, setCurrentChatService] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const token =
    JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
    JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));
  useEffect(() => {
    dispatch(fetchAllJobs({ token: token.authKey }));
    dispatch(fetchSavedJobs({ token: token.authKey }));
    dispatch(fetchMyJobs({ token: token.authKey }));
  }, []);

  const acceptedJobs = allJobs.filter((job) => {
    return job.jobStatus === "ACCEPTED" && job.jobClassification === "SERVICE";
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

    // Service type filter
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

    // Service type filter
    // const matchesServiceType =
    //   activeFilters.serviceType.length === 0 ||
    //   activeFilters.serviceType.includes(service.serviceType);

    // Client filter
    // const matchesClient =
    //   activeFilters.client.length === 0 ||
    //   activeFilters.client.includes(service.client);

    return matchesSearch && matchesPriority;
    //  && matchesPriority && matchesServiceType && matchesClient
  });

  const newServices = filteredServices.filter(
    (service) => service.status === "new"
  );
  const ongoingServices = filteredServices.filter(
    (service) => service.status === "ongoing"
  );
  const completedServices = filteredServices.filter(
    (service) => service.status === "completed"
  );
  const declinedServices = filteredServices.filter(
    (service) => service.status === "declined"
  );

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

  const handleRatingSubmit = (rating, feedback) => {
    if (selectedService) {
      setServices(
        services.map((service) =>
          service.id === selectedService.id
            ? {
                ...service,
                rating,
                feedback,
              }
            : service
        )
      );
    }
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

  // Function to confirm declining a service with a reason
  const confirmDeclineService = () => {
    setServices(
      services.map((service) =>
        service.id === selectedServiceId
          ? {
              ...service,
              status: "declined",
              declinedAt: new Date().toISOString().split("T")[0],
              declineReason: declineReason,
            }
          : service
      )
    );
    setDeclineDialogOpen(false);
    setDeclineReason("");
  };

  // Function to handle messaging a client
  const handleMessageClient = (serviceId) => {
    const service = services.find((s) => s.id === serviceId);
    if (service) {
      setCurrentChatService(service);
      setChatDialogOpen(true);
    }
  };

  // Function to send a message
  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentChatService) return;

    const newMsg = {
      id: `m${Date.now()}`,
      sender: "artisan",
      text: newMessage,
      timestamp: new Date().toISOString(),
    };

    // Update the service with the new message
    setServices(
      services.map((service) =>
        service.id === currentChatService.id
          ? {
              ...service,
              messages: [...(service.messages || []), newMsg],
            }
          : service
      )
    );

    // Update the current chat service
    setCurrentChatService({
      ...currentChatService,
      messages: [...(currentChatService.messages || []), newMsg],
    });

    // Reset the message input
    setNewMessage("");
  };

  // Format message timestamp
  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
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
      <JobsFilter
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
        clients={uniqueClients}
        serviceTypes={serviceTypes}
      />
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
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
                Applied ({myJobs.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="all"
              className="space-y-4 mt-6 grid gap-6 sm:grid-cols-2  w-full">
              {filteredServices.length > 0 ? (
                filteredServices
                  .reverse()
                  .map((service) => (
                    <JobsCard key={service.id} service={service} tab={"all"} />
                  ))
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  No Jobs found matching your criteria
                </div>
              )}
            </TabsContent>
            <TabsContent
              value="saved"
              className="space-y-4 mt-6 grid gap-6 sm:grid-cols-2  w-full">
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
            </TabsContent>
            <TabsContent value="applied" className="space-y-4 mt-6">
              <AppliedJobs applications={myJobs} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {selectedService && (
        <RatingDialog
          open={ratingDialogOpen}
          onOpenChange={setRatingDialogOpen}
          initialRating={selectedService.rating || 0}
          initialFeedback={selectedService.feedback || ""}
          onSubmit={handleRatingSubmit}
          serviceTitle={selectedService.title}
        />
      )}
    </div>
  );
}
