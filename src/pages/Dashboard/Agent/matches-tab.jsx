import { useEffect, useState } from "react";
import { Filter, MoreHorizontal, Plus, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  matchesData,
  messagesData,
  candidatesData,
  employersData,
  jobsData,
  industryOptions,
  locationOptions,
  typeOptions,
  agentData,
} from "@/utils/data/agent-mock-data";
import { Progress } from "@/components/ui/progress";
import { getStatusColor } from "@/utils/data/agent-mock-data";
import CreateMatchDialog from "@/components/agent/create-match-dialog";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function MatchesTab() {
  const [matchDialogOpen, setMatchDialogOpen] = useState(false);
  const { setPageTitle } = useOutletContext();
  const navigate = useNavigate();

  const [candidates, setCandidates] = useState(matchesData);
  const [filteredCandidates, setFilteredCandidates] = useState(matchesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEmployer, setFilterEmployer] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [releaseDialogOpen, setReleaseDialogOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    setPageTitle("Candidate Management");
  }, []);

  // Apply filters when search term or filters change
  useEffect(() => {
    let result = candidates;

    if (searchTerm) {
      result = result.filter(
        (candidate) =>
          candidate.candidate.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          candidate.job.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterEmployer) {
      result = result.filter(
        (candidate) => candidate.employer.name === filterEmployer
      );
    }

    if (filterStatus) {
      result = result.filter((candidate) => candidate.status === filterStatus);
    }

    setFilteredCandidates(result);
  }, [searchTerm, filterEmployer, filterStatus, candidates]);

  // Handle releasing a candidate from an employer
  const handleReleaseCandidate = () => {
    if (selectedCandidate) {
      setCandidates(
        candidates.filter((candidate) => candidate.id !== selectedCandidate.id)
      );
      setReleaseDialogOpen(false);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setFilterEmployer("");
    setFilterStatus("");
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search candidates..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            className="border-none bg-sky-500 hover:bg-sky-600"
            onClick={() => setMatchDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Match
          </Button>
          <div className="flex items-center space-x-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Candidates</SheetTitle>
                  <SheetDescription>
                    Apply filters to narrow down the candidate list
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Employer</h4>
                    <Select
                      value={filterEmployer}
                      onValueChange={setFilterEmployer}>
                      <SelectTrigger className="hover:bg-slate-100">
                        <SelectValue placeholder="Select employer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Employers</SelectItem>
                        {matchesData.map((match) => (
                          <SelectItem
                            key={match.id}
                            value={match.employer.name}>
                            {match.employer.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Status</h4>
                    <Select
                      value={filterStatus}
                      onValueChange={setFilterStatus}>
                      <SelectTrigger className="hover:bg-slate-100 hover:text-slate-600">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="ShortListed">Shortlisted</SelectItem>
                        <SelectItem value="Interviewed">Interviewed</SelectItem>
                        <SelectItem value="Hired">Hired</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Matched">Matched</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    onClick={resetFilters}
                    variant="outline"
                    className="mt-4 bg-sky-500 text-slate-100 hover:bg-sky-600 hover:text-white">
                    Reset Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            {(filterEmployer || filterStatus) && (
              <Button
                className="border-none bg-red-500 hover:bg-red-600"
                size="sm"
                onClick={resetFilters}>
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="rounded-md border">
        <div className="relative w-full overflow-auto">
          <Table className="w-full caption-bottom text-sm">
            <TableHeader className="[&_tr]:border-b">
              <TableRow className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <TableHead className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Candidate
                </TableHead>
                <TableHead className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Employer
                </TableHead>
                <TableHead className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Job
                </TableHead>
                <TableHead className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Status
                </TableHead>
                <TableHead className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Progress
                </TableHead>
                <TableHead className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Date
                </TableHead>
                <TableHead className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="[&_tr:last-child]:border-0">
              {filteredCandidates.length > 0 ? (
                filteredCandidates.map((match) => (
                  <TableRow
                    key={match.id}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <TableCell className="p-4 align-middle">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={match.candidate.avatar || "/placeholder.svg"}
                            alt={match.candidate.name}
                          />
                          <AvatarFallback>
                            {match.candidate.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{match.candidate.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {match.candidate.type}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="p-4 align-middle">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={match.employer.avatar || "/placeholder.svg"}
                            alt={match.employer.name}
                          />
                          <AvatarFallback>
                            {match.employer.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <p className="font-medium">{match.employer.name}</p>
                      </div>
                    </TableCell>
                    <TableCell className="p-4 align-middle">
                      {match.job}
                    </TableCell>
                    <TableCell className="p-4 align-middle">
                      <Badge
                        variant="outline"
                        className="font-normal">
                        <span
                          className={`mr-1 h-2 w-2 rounded-full ${getStatusColor(
                            match.status
                          )}`}></span>
                        {match.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="p-4 align-middle">
                      <div className="flex items-center gap-2">
                        <Progress
                          value={match.progress}
                          className="h-2 w-[60px]"
                        />
                        <span className="text-xs text-muted-foreground">
                          {match.progress}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="p-4 align-middle">
                      {match.date}
                    </TableCell>
                    <TableCell className="p-4 align-middle">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            className="border-none"
                            variant="ghost"
                            size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Update Status</DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              navigate("/agent/dashboard/chats");
                            }}>
                            Send Message
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedCandidate(match);
                              setReleaseDialogOpen(true);
                            }}
                            className="text-red-500">
                            Release from Employer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-24 text-center">
                    No candidates found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <CreateMatchDialog
        open={matchDialogOpen}
        onOpenChange={setMatchDialogOpen}
        candidatesData={candidatesData}
        employersData={employersData}
      />
      {/* Release Candidate Dialog */}
      <Dialog
        open={releaseDialogOpen}
        onOpenChange={setReleaseDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Release Candidate</DialogTitle>
            <DialogDescription>
              Are you sure you want to release{" "}
              {selectedCandidate?.candidate.name} from{" "}
              {selectedCandidate?.employer.name}? This will remove their job
              assignment and set their status to inactive.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              className=""
              variant="outline"
              onClick={() => setReleaseDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="border-none"
              variant="destructive"
              onClick={handleReleaseCandidate}>
              Release Candidate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
