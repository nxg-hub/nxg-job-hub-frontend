import { useState } from "react";
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

// Sample service data for an artisan
const initialServices = [
  {
    id: "1",
    title: "Kitchen Cabinet Installation",
    client: "James Wilson",
    clientContact: "555-123-4567",
    location: "123 Maple Street, Riverside",
    deadline: "2025-05-15",
    status: "new",
    priority: "high",
    serviceType: "carpentry",
    materials: ["Oak wood panels", "Cabinet handles", "Hinges"],
    estimatedCost: 1200,
    description: "Install custom kitchen cabinets with oak finish",
    createdAt: "2025-04-01",
    messages: [
      {
        id: "m1",
        sender: "client",
        text: "Hi, I'm looking forward to the cabinet installation.",
        timestamp: "2025-04-01T10:30:00",
      },
    ],
  },
  {
    id: "2",
    title: "Bathroom Plumbing Repair",
    client: "Sarah Johnson",
    clientContact: "555-987-6543",
    location: "456 Oak Avenue, Downtown",
    deadline: "2025-06-30",
    status: "ongoing",
    priority: "medium",
    serviceType: "plumbing",
    materials: ["PVC pipes", "Sink faucet", "Pipe sealant"],
    estimatedCost: 450,
    actualCost: 480,
    description: "Fix leaking pipes and replace bathroom sink faucet",
    createdAt: "2025-03-15",
    messages: [
      {
        id: "m2",
        sender: "client",
        text: "When can you start the repair?",
        timestamp: "2025-03-15T14:20:00",
      },
      {
        id: "m3",
        sender: "artisan",
        text: "I can come by tomorrow morning around 9am.",
        timestamp: "2025-03-15T15:45:00",
      },
      {
        id: "m4",
        sender: "client",
        text: "That works for me. See you then!",
        timestamp: "2025-03-15T16:10:00",
      },
    ],
  },
  {
    id: "3",
    title: "Living Room Painting",
    client: "Michael Brown",
    clientContact: "555-456-7890",
    location: "789 Pine Road, Hillside",
    deadline: "2025-04-20",
    status: "ongoing",
    priority: "low",
    serviceType: "painting",
    materials: ["Premium wall paint", "Primer", "Painting supplies"],
    estimatedCost: 850,
    actualCost: 800,
    description: "Paint living room walls with client-selected colors",
    createdAt: "2025-03-25",
    messages: [
      {
        id: "m5",
        sender: "artisan",
        text: "I've picked up the paint samples you requested.",
        timestamp: "2025-03-26T09:15:00",
      },
      {
        id: "m6",
        sender: "client",
        text: "Great! Can you bring them by this afternoon?",
        timestamp: "2025-03-26T10:30:00",
      },
    ],
  },
  {
    id: "4",
    title: "Electrical Wiring Installation",
    client: "Emily Davis",
    clientContact: "555-234-5678",
    location: "101 Cedar Lane, Eastside",
    deadline: "2025-04-10",
    status: "completed",
    priority: "high",
    serviceType: "electrical",
    materials: ["Electrical wires", "Outlets", "Circuit breakers"],
    estimatedCost: 650,
    actualCost: 700,
    description: "Install new electrical outlets and fix wiring issues",
    completedAt: "2025-04-08",
    createdAt: "2025-03-01",
    paymentStatus: "paid",
    rating: 5,
    feedback:
      "Excellent work! Very professional and completed ahead of schedule.",
    messages: [
      {
        id: "m7",
        sender: "client",
        text: "The new outlets are working perfectly. Thank you!",
        timestamp: "2025-04-09T11:20:00",
      },
      {
        id: "m8",
        sender: "artisan",
        text: "Glad to hear that! Don't hesitate to reach out if you need anything else.",
        timestamp: "2025-04-09T13:45:00",
      },
    ],
  },
  {
    id: "5",
    title: "Deck Restoration",
    client: "Robert Taylor",
    clientContact: "555-876-5432",
    location: "202 Birch Street, Westside",
    deadline: "2025-05-01",
    status: "new",
    priority: "medium",
    serviceType: "carpentry",
    materials: ["Pressure-treated lumber", "Wood stain", "Deck screws"],
    estimatedCost: 1500,
    description: "Restore outdoor deck with new boards and staining",
    createdAt: "2025-04-05",
    messages: [
      {
        id: "m9",
        sender: "client",
        text: "Do you think we'll need to replace all the boards?",
        timestamp: "2025-04-05T16:30:00",
      },
    ],
  },
  {
    id: "6",
    title: "Roof Repair",
    client: "Jennifer Martinez",
    clientContact: "555-345-6789",
    location: "303 Elm Court, Northside",
    deadline: "2025-04-25",
    status: "completed",
    priority: "medium",
    serviceType: "roofing",
    materials: ["Roof shingles", "Roofing nails", "Waterproof membrane"],
    estimatedCost: 900,
    actualCost: 950,
    description: "Repair damaged roof sections and replace missing shingles",
    completedAt: "2025-04-22",
    createdAt: "2025-03-10",
    paymentStatus: "pending",
    rating: 4,
    feedback:
      "Good job overall. Fixed the issue but left some debris in the yard.",
    messages: [
      {
        id: "m10",
        sender: "artisan",
        text: "I've completed the roof repair. Please let me know if you notice any issues.",
        timestamp: "2025-04-22T15:10:00",
      },
      {
        id: "m11",
        sender: "client",
        text: "Looks good, but there's some debris left in the yard.",
        timestamp: "2025-04-23T09:25:00",
      },
      {
        id: "m12",
        sender: "artisan",
        text: "I apologize for that. I'll come by tomorrow to clean it up.",
        timestamp: "2025-04-23T10:15:00",
      },
    ],
  },
  {
    id: "7",
    title: "Bathroom Renovation",
    client: "David Thompson",
    clientContact: "555-789-1234",
    location: "404 Spruce Avenue, Southside",
    deadline: "2025-05-20",
    status: "declined",
    priority: "high",
    serviceType: "plumbing",
    materials: ["Tiles", "Bathroom fixtures", "Pipes"],
    estimatedCost: 3500,
    description:
      "Complete bathroom renovation including new fixtures and tiling",
    createdAt: "2025-04-02",
    declinedAt: "2025-04-03",
    declineReason:
      "Schedule conflict with other projects during the requested timeframe.",
    messages: [
      {
        id: "m13",
        sender: "client",
        text: "I'm looking for a complete bathroom renovation. Are you available?",
        timestamp: "2025-04-02T11:30:00",
      },
      {
        id: "m14",
        sender: "artisan",
        text: "Unfortunately, I'm fully booked during that timeframe.",
        timestamp: "2025-04-03T09:45:00",
      },
    ],
  },
];

// Service types for an artisan
const serviceTypes = [
  "carpentry",
  "plumbing",
  "electrical",
  "painting",
  "roofing",
  "masonry",
  "flooring",
  "landscaping",
];

export function JobTracker() {
  const [services, setServices] = useState(initialServices);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    priority: [],
    serviceType: [],
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

  // Filter services based on search query and active filters
  const filteredServices = services.filter((service) => {
    // Search filter
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.location.toLowerCase().includes(searchQuery.toLowerCase());

    // Priority filter
    const matchesPriority =
      activeFilters.priority.length === 0 ||
      activeFilters.priority.includes(service.priority);

    // Service type filter
    const matchesServiceType =
      activeFilters.serviceType.length === 0 ||
      activeFilters.serviceType.includes(service.serviceType);

    // Client filter
    const matchesClient =
      activeFilters.client.length === 0 ||
      activeFilters.client.includes(service.client);

    return (
      matchesSearch && matchesPriority && matchesServiceType && matchesClient
    );
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

  return (
    <div className="mx-auto px-6 py-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-6">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search services, clients, or locations..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs
            defaultValue="all"
            className="w-full">
            <TabsList className="grid grid-cols-5 w-full bg-[#E6F7FC]">
              <TabsTrigger
                value="all"
                className="hover:bg-sky-600 border-none">
                All ({filteredServices.length})
              </TabsTrigger>
              <TabsTrigger
                value="new"
                className="hover:bg-sky-600 border-none">
                New ({newServices.length})
              </TabsTrigger>
              <TabsTrigger
                value="ongoing"
                className="hover:bg-sky-600 border-none">
                Ongoing ({ongoingServices.length})
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="hover:bg-sky-600 border-none">
                Completed ({completedServices.length})
              </TabsTrigger>
              <TabsTrigger
                value="declined"
                className="hover:bg-sky-600 border-none">
                Declined ({declinedServices.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="all"
              className="space-y-4 mt-6">
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <JobsCard
                    key={service.id}
                    service={service}
                    onStatusChange={updateServiceStatus}
                    onRatingChange={updateServiceRating}
                    onOpenRatingDialog={openRatingDialog}
                    onDeclineService={declineService}
                    onMessageClient={handleMessageClient}
                  />
                ))
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  No services found matching your criteria
                </div>
              )}
            </TabsContent>
            <TabsContent
              value="new"
              className="space-y-4 mt-6">
              {newServices.length > 0 ? (
                newServices.map((service) => (
                  <JobsCard
                    key={service.id}
                    service={service}
                    onStatusChange={updateServiceStatus}
                    onRatingChange={updateServiceRating}
                    onOpenRatingDialog={openRatingDialog}
                    onDeclineService={declineService}
                    onMessageClient={handleMessageClient}
                  />
                ))
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  No new service requests found
                </div>
              )}
            </TabsContent>
            <TabsContent
              value="ongoing"
              className="space-y-4 mt-6">
              {ongoingServices.length > 0 ? (
                ongoingServices.map((service) => (
                  <JobsCard
                    key={service.id}
                    service={service}
                    onStatusChange={updateServiceStatus}
                    onRatingChange={updateServiceRating}
                    onOpenRatingDialog={openRatingDialog}
                    onDeclineService={declineService}
                    onMessageClient={handleMessageClient}
                  />
                ))
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  No ongoing services found
                </div>
              )}
            </TabsContent>
            <TabsContent
              value="completed"
              className="space-y-4 mt-6">
              {completedServices.length > 0 ? (
                completedServices.map((service) => (
                  <JobsCard
                    key={service.id}
                    service={service}
                    onStatusChange={updateServiceStatus}
                    onRatingChange={updateServiceRating}
                    onOpenRatingDialog={openRatingDialog}
                    onDeclineService={declineService}
                    onMessageClient={handleMessageClient}
                  />
                ))
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  No completed services found
                </div>
              )}
            </TabsContent>
            <TabsContent
              value="declined"
              className="space-y-4 mt-6">
              {declinedServices.length > 0 ? (
                declinedServices.map((service) => (
                  <JobsCard
                    key={service.id}
                    service={service}
                    onStatusChange={updateServiceStatus}
                    onRatingChange={updateServiceRating}
                    onOpenRatingDialog={openRatingDialog}
                    onDeclineService={declineService}
                    onMessageClient={handleMessageClient}
                  />
                ))
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  No declined services found
                </div>
              )}
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

      <Dialog
        open={declineDialogOpen}
        onOpenChange={setDeclineDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Decline Service</DialogTitle>
            <DialogDescription>
              Please provide a reason for declining this service request.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label
                htmlFor="decline-reason"
                className="text-sm font-medium">
                Reason
              </label>
              <Textarea
                id="decline-reason"
                placeholder="Enter reason for declining..."
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeclineDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDeclineService}
              disabled={!declineReason.trim()}>
              Decline Service
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Chat Dialog */}
      {currentChatService && (
        <Dialog
          open={chatDialogOpen}
          onOpenChange={setChatDialogOpen}>
          <DialogContent className="sm:max-w-[500px] p-0 h-[550px] flex flex-col">
            <DialogHeader className="brand-gradient text-white p-4 rounded-t-lg">
              <DialogTitle>Chat with {currentChatService.client}</DialogTitle>
              <DialogDescription className="text-white/80">
                Service: {currentChatService.title}
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentChatService.messages &&
              currentChatService.messages.length > 0 ? (
                currentChatService.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "artisan"
                        ? "justify-end"
                        : "justify-start"
                    }`}>
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === "artisan"
                          ? "bg-[#0AACDC] text-white rounded-tr-none"
                          : "bg-gray-100 rounded-tl-none"
                      }`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-xs ${
                            message.sender === "artisan"
                              ? "text-white/80"
                              : "text-gray-500"
                          }`}>
                          {message.sender === "client"
                            ? currentChatService.client
                            : "You"}{" "}
                          • {formatMessageTime(message.timestamp)}
                        </span>
                      </div>
                      <p>{message.text}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">
                    No messages yet. Start the conversation!
                  </p>
                </div>
              )}
            </div>

            <div className="p-4 border-t mt-auto">
              <form
                onSubmit={sendMessage}
                className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 border-[#0AACDC] focus-visible:ring-[#0AACDC]"
                />
                <Button
                  type="submit"
                  className="bg-[#0AACDC] hover:bg-[#077FA5]">
                  Send
                </Button>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
