import { useState } from "react";
import {
  CalendarClock,
  Clock,
  MapPin,
  Phone,
  PenToolIcon as Tool,
  User,
  MoreHorizontal,
  DollarSign,
  CheckCircle,
  XCircle,
  MessageCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StarRating } from "@/components/star-rating";
import { ConfirmDialog } from "@/components/confirm-dialog";
import JobDetailsModal from "./JobDetailsModal";
import JobCardFooter from "@/pages/Dashboard/ServiceProvider/JobCardFooter";

// Helper function to format dates
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Helper function to calculate days remaining
const getDaysRemaining = (deadline) => {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const diffTime = deadlineDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Helper function to format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
};

export function JobsCard({
  service,
  onStatusChange,
  onRatingChange,
  onOpenRatingDialog,
  onDeclineService,
  onMessageClient,
}) {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const daysRemaining = getDaysRemaining(service.deadline);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  // Determine status color
  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "bg-[#0AACDC]/10 text-[#0AACDC] hover:bg-[#0AACDC]/20";
      case "ongoing":
        return "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20";
      case "completed":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      case "declined":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
    }
  };

  // Determine priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-500/10 text-red-500";
      case "medium":
        return "bg-orange-500/10 text-orange-500";
      case "low":
        return "bg-green-500/10 text-green-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  // Get service type badge style
  const getServiceTypeStyle = (type) => {
    switch (type) {
      case "carpentry":
        return "bg-amber-700/10 text-amber-700";
      case "plumbing":
        return "bg-blue-600/10 text-blue-600";
      case "electrical":
        return "bg-yellow-500/10 text-yellow-600";
      case "painting":
        return "bg-purple-500/10 text-purple-500";
      case "roofing":
        return "bg-red-700/10 text-red-700";
      case "masonry":
        return "bg-stone-500/10 text-stone-500";
      case "flooring":
        return "bg-emerald-500/10 text-emerald-500";
      case "landscaping":
        return "bg-green-600/10 text-green-600";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  // Get payment status badge
  const getPaymentBadge = () => {
    if (service.status !== "completed") return null;

    return service.paymentStatus === "paid" ? (
      <Badge className="bg-green-500/10 text-green-500" variant="secondary">
        Paid
      </Badge>
    ) : (
      <Badge className="bg-red-500/10 text-red-500" variant="secondary">
        Payment Pending
      </Badge>
    );
  };

  // Get available status transitions
  const getAvailableStatusTransitions = () => {
    switch (service.status) {
      case "new":
        return [{ value: "ongoing", label: "Start Work" }];
      case "ongoing":
        return [
          { value: "new", label: "Move to New" },
          { value: "completed", label: "Mark as Completed" },
        ];
      case "completed":
        return [{ value: "ongoing", label: "Reopen Service" }];
      case "declined":
        return [{ value: "new", label: "Reconsider Service" }];
      default:
        return [];
    }
  };

  const handleRatingChange = (newRating) => {
    if (onRatingChange) {
      onRatingChange(service.id, newRating);
    }
  };

  const handleAcceptService = () => {
    onStatusChange(service.id, "ongoing");
  };

  const handleDeclineService = () => {
    setConfirmDialogOpen(true);
  };

  const confirmDecline = () => {
    if (onDeclineService) {
      onDeclineService(service.id);
    }
  };

  const handleMessageClient = () => {
    if (onMessageClient) {
      onMessageClient(service.id);
    } else {
      // Fallback to direct navigation if no handler is provided
      window.location.href = `/chat/${service.id}`;
    }
  };

  return (
    <Card className={service.status === "declined" ? "opacity-75" : ""}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{service.job_title}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <User className="h-3.5 w-3.5 mr-1" />
              {service.employer_name}
            </CardDescription>
          </div>
          {/* <div className="flex flex-wrap gap-2 justify-end">
            <Badge
              className={getServiceTypeStyle(service.serviceType)}
              variant="secondary">
              {service.serviceType.charAt(0).toUpperCase() +
                service.serviceType.slice(1)}
            </Badge>
            <Badge
              className={getPriorityColor(service.priority)}
              variant="secondary">
              {service.priority.charAt(0).toUpperCase() +
                service.priority.slice(1)}{" "}
              Priority
            </Badge>
            <Badge
              className={getStatusColor(service.status)}
              variant="secondary">
              {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
            </Badge>
            {getPaymentBadge()}
          </div> */}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {service.description}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="capitalize">{service.job_location}</span>
          </div>
          <div className="flex items-center">
            <span className="capitalize">{service.job_type}</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center">
            <CalendarClock className="h-4 w-4 mr-1 text-muted-foreground" />
            <span>
              Deadline:
              <span className="font-medium">
                {formatDate(service.deadline)}
              </span>
            </span>
          </div>
          <div className="flex items-center">
            {/* <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" /> */}
            {/* ₦ */}
            <span>
              {service.status === "completed" && service.actualCost
                ? `Actual Cost: ${formatCurrency(service.actualCost)}`
                : `Estimate: ${
                    typeof (service.salary === Number)
                      ? formatCurrency(service.salary)
                      : service.salary
                  }`}
            </span>
          </div>
          {service.status !== "completed" && service.status !== "declined" && (
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>
                {daysRemaining > 0 ? (
                  <span>
                    <span className="font-medium">{daysRemaining}</span> days
                    remaining
                  </span>
                ) : daysRemaining === 0 ? (
                  <span className="text-amber-500 font-medium">Due today</span>
                ) : (
                  <span className="text-red-500 font-medium">
                    {Math.abs(daysRemaining)} days overdue
                  </span>
                )}
              </span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        {/* <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleViewDetails(service)}>
            View Details
          </Button>

          <Button
            variant="secondary"
            size="sm"
            className="border-none gap-1 bg-sky-500 text-white hover:bg-sky-600"
            onClick={handleMessageClient}>
            <MessageCircle className="h-4 w-4" />
            Save
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleViewDetails(service)}>
            Apply
          </Button>
        </div> */}
        <JobCardFooter
          service={service}
          handleViewDetails={handleViewDetails}
        />
      </CardFooter>
      <JobDetailsModal
        job={selectedJob}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <ConfirmDialog
        open={confirmDialogOpen}
        onOpenChange={setConfirmDialogOpen}
        onConfirm={confirmDecline}
        title="Decline Service"
        description="Are you sure you want to decline this service request? This will move it to the declined list."
        confirmText="Decline Service"
        cancelText="Cancel"
      />
    </Card>
  );
}
