import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Filter,
  MapPin,
  Briefcase,
  Calendar,
} from "lucide-react";
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
import {
  candidatesData,
  newCandidateRequests,
} from "@/utils/data/agent-mock-data";
import AgentCandidateDetailsDialog from "@/components/agent/agent-candidate-details-dialog";
import AgentAssignToEmployerDialog from "@/components/agent/agent-assign-to-employer-dialog";
import { useOutletContext } from "react-router-dom";

export default function CandidatesTab() {
  const { setPageTitle } = useOutletContext();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("active");

  const filteredActiveCandidates = candidatesData.filter(
    (candidate) =>
      !candidate.isNewRequest &&
      (candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.skills.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        ))
  );

  const filteredNewRequests = newCandidateRequests.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const handleViewDetails = (candidate) => {
    setSelectedCandidate(candidate);
    setDetailsDialogOpen(true);
  };

  const handleAssignToEmployer = (candidate) => {
    setSelectedCandidate(candidate);
    setAssignDialogOpen(true);
  };

  useEffect(() => {
    setPageTitle("Candidates");
  }, []);

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative w-[50%]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search candidates by name, type, or skills..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button className="border-none bg-sky-500 hover:bg-sky-600">
            <Plus className="mr-2 h-4 w-4" />
            Add Candidate
          </Button>
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
              <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>All Types</DropdownMenuItem>
              <DropdownMenuItem>Tech Talent</DropdownMenuItem>
              <DropdownMenuItem>Artisan</DropdownMenuItem>
              <DropdownMenuItem>Service Provider</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs
        defaultValue="active"
        value={activeTab}
        onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            className="border-none data-[state=active]:bg-sky-500 data-[state=active]:text-sky-50 hover:bg-white hover:text-slate-950"
            value="active">
            Active Job Seekers
            <Badge
              variant="secondary"
              className="ml-2">
              {filteredActiveCandidates.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger
            className="border-none data-[state=active]:bg-sky-500 data-[state=active]:text-sky-50 hover:bg-white hover:text-slate-950"
            value="new">
            New Requests
            {filteredNewRequests.length > 0 && (
              <Badge
                variant="destructive"
                className="ml-2">
                {filteredNewRequests.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="active"
          className="mt-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {filteredActiveCandidates.length > 0 ? (
              filteredActiveCandidates.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  onViewDetails={handleViewDetails}
                  onAssignToEmployer={handleAssignToEmployer}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <p className="text-muted-foreground">
                  No candidates found matching your search criteria
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent
          value="new"
          className="mt-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {filteredNewRequests.length > 0 ? (
              filteredNewRequests.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  onViewDetails={handleViewDetails}
                  onAssignToEmployer={handleAssignToEmployer}
                  isNewRequest
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <p className="text-muted-foreground">
                  No new candidate requests
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {selectedCandidate && (
        <>
          <AgentCandidateDetailsDialog
            candidate={selectedCandidate}
            open={detailsDialogOpen}
            onOpenChange={setDetailsDialogOpen}
          />
          <AgentAssignToEmployerDialog
            candidate={selectedCandidate}
            open={assignDialogOpen}
            onOpenChange={setAssignDialogOpen}
          />
        </>
      )}
    </div>
  );
}

const CandidateCard = ({
  candidate,
  onViewDetails,
  onAssignToEmployer,
  isNewRequest = false,
}) => {
  return (
    <Card className={isNewRequest ? "border-2 border-sky-200" : ""}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={candidate.avatar || "/placeholder.svg"}
              alt={candidate.name}
            />
            <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex gap-1">
            <Badge variant="outline">{candidate.type}</Badge>
            {isNewRequest && <Badge variant="destructive">New</Badge>}
          </div>
        </div>
        <CardTitle className="mt-4">{candidate.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {candidate.location && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{candidate.location}</span>
          </div>
        )}
        {candidate.currentRole && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Briefcase className="h-4 w-4" />
            <span>{candidate.currentRole}</span>
          </div>
        )}
        {candidate.availability && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Available: {candidate.availability}</span>
          </div>
        )}
        <div className="flex flex-wrap gap-1 pt-2">
          {candidate.skills.map((skill, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="font-normal">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(candidate)}>
          View Details
        </Button>
        <Button
          className="border-none bg-sky-500 hover:bg-sky-600"
          size="sm"
          onClick={() => onAssignToEmployer(candidate)}>
          Assign
        </Button>
      </CardFooter>
    </Card>
  );
};
