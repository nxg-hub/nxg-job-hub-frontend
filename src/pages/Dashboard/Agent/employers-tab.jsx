import { useEffect, useState } from "react";
import { Plus, Search, Filter, MapPin, Phone, Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { employersData, employerRequests } from "@/utils/data/agent-mock-data";
import AgentEmployerRequestDetailsDialog from "@/components/agent/agent-employer-request-details-dialog";
import { useOutletContext } from "react-router-dom";

export default function EmployersTab() {
  const { setPageTitle } = useOutletContext();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("employers");

  const filteredEmployers = employersData.filter(
    (employer) =>
      employer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employer.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRequests = employerRequests.filter(
    (request) =>
      request.employer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const newRequests = filteredRequests.filter(
    (request) => request.status === "New"
  );
  const activeRequests = filteredRequests.filter(
    (request) => request.status === "Active"
  );

  const handleViewRequestDetails = (request) => {
    setSelectedRequest(request);
    setDetailsDialogOpen(true);
  };

  useEffect(() => {
    setPageTitle("Employers");
  }, []);

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between">
        <div className="relative w-2/3">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search employers or requests..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Industry</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>All Industries</DropdownMenuItem>
              <DropdownMenuItem>Technology</DropdownMenuItem>
              <DropdownMenuItem>Construction</DropdownMenuItem>
              <DropdownMenuItem>Services</DropdownMenuItem>
              <DropdownMenuItem>Design</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="border-none bg-sky-500 hover:bg-sky-600 ">
            <Plus className="mr-2 h-4 w-4" />
            Add Employer
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="employers"
        value={activeTab}
        onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger
            className="border-none data-[state=active]:bg-sky-500 data-[state=active]:text-sky-50 hover:bg-white hover:text-slate-950"
            value="employers">
            All Employers
            <Badge
              variant="secondary"
              className="ml-2">
              {filteredEmployers.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger
            className="border-none data-[state=active]:bg-sky-500 data-[state=active]:text-sky-50 hover:bg-white hover:text-slate-950"
            value="new-requests">
            New Requests
            {newRequests.length > 0 && (
              <Badge
                variant="destructive"
                className="ml-2">
                {newRequests.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger
            className="border-none data-[state=active]:bg-sky-500 data-[state=active]:text-sky-50 hover:bg-white hover:text-slate-950"
            value="active-requests">
            Active Requests
            <Badge
              variant="secondary"
              className="ml-2">
              {activeRequests.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="employers"
          className="mt-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {filteredEmployers.length > 0 ? (
              filteredEmployers.map((employer) => (
                <EmployerCard
                  key={employer.id}
                  employer={employer}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <p className="text-muted-foreground">
                  No employers found matching your search criteria
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent
          value="new-requests"
          className="mt-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {newRequests.length > 0 ? (
              newRequests.map((request) => (
                <EmployerRequestCard
                  key={request.id}
                  request={request}
                  onViewDetails={handleViewRequestDetails}
                  isNew
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <p className="text-muted-foreground">
                  No new employer requests
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent
          value="active-requests"
          className="mt-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activeRequests.length > 0 ? (
              activeRequests.map((request) => (
                <EmployerRequestCard
                  key={request.id}
                  request={request}
                  onViewDetails={handleViewRequestDetails}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <p className="text-muted-foreground">
                  No active employer requests
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {selectedRequest && (
        <AgentEmployerRequestDetailsDialog
          request={selectedRequest}
          open={detailsDialogOpen}
          onOpenChange={setDetailsDialogOpen}
        />
      )}
    </div>
  );
}

const EmployerCard = ({ employer }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={employer.avatar || "/placeholder.svg"}
              alt={employer.name}
            />
            <AvatarFallback>{employer.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <Badge variant="outline">{employer.industry}</Badge>
        </div>
        <CardTitle className="mt-4">{employer.name}</CardTitle>
      </CardHeader>
      <CardContent>
        {employer.description ? (
          <p className="text-sm text-muted-foreground">
            {employer.description}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Looking for qualified candidates in{" "}
            {employer.industry.toLowerCase()} sector.
          </p>
        )}
        {employer.location && (
          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{employer.location}</span>
          </div>
        )}
        {employer.contactPerson && (
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>{employer.contactPerson}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          size="sm">
          View Profile
        </Button>
        <Button
          className="border-none bg-sky-500 hover:bg-sky-600"
          size="sm">
          Find Candidates
        </Button>
      </CardFooter>
    </Card>
  );
};

const EmployerRequestCard = ({ request, onViewDetails, isNew = false }) => {
  return (
    <Card className={isNew ? "border-2 border-sky-200" : ""}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between ">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={request.employer.avatar || "/placeholder.svg"}
              alt={request.employer.name}
            />
            <AvatarFallback>{request.employer.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex gap-1">
            <Badge variant="outline">{request.industry}</Badge>
            {isNew && <Badge variant="destructive">New</Badge>}
          </div>
        </div>
        <CardTitle className="mt-20 text-base">{request.jobTitle}</CardTitle>
        <p className="text-sm text-muted-foreground">{request.employer.name}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{request.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Posted: {request.datePosted}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {request.description}
        </p>
        <div className="flex flex-wrap gap-1 pt-1">
          {request.requiredSkills.slice(0, 3).map((skill, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="font-normal">
              {skill}
            </Badge>
          ))}
          {request.requiredSkills.length > 3 && (
            <Badge
              variant="secondary"
              className="font-normal">
              +{request.requiredSkills.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(request)}>
          View Details
        </Button>
        <Button
          className="border-none bg-sky-500 hover:bg-sky-600"
          size="sm">
          Find Matches
        </Button>
      </CardFooter>
    </Card>
  );
};
