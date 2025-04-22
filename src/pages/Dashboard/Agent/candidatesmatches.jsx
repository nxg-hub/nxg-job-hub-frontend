"use client";

import { useState, useEffect } from "react";
import { Search, Filter, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import CandidateDetailsPage from "./agentprofile";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import CandidateDetailSheet from "@/components/agent/candidatedetailsheet";

// Mock data for demonstration
const mockCandidates = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "555-1234",
    status: "Active",
    employer: "Tech Solutions Inc.",
    job: "Software Developer",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "555-5678",
    status: "Active",
    employer: "Digital Innovations",
    job: "UX Designer",
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert@example.com",
    phone: "555-9012",
    status: "Hired",
    employer: "Mr Chalse",
    job: "Plumbing",
  },
  {
    id: 4,
    name: "Robert Johnson",
    email: "robert@example.com",
    phone: "555-9012",
    status: "Pending",
    employer: "Tech Solutions Inc.",
    job: "Project Manager",
  },
  {
    id: 5,
    name: "Emily Davis",
    email: "emily@example.com",
    phone: "555-3456",
    status: "Active",
    employer: "Global Systems",
    job: "Data Analyst",
  },
  {
    id: 6,
    name: "Johnson Maxwell",
    email: "maxwell@example.com",
    phone: "555-9012",
    status: "Rejected",
    employer: "Vox Lexical Limited",
    job: "Electrical",
  },
  {
    id: 7,
    name: "Michael Wilson",
    email: "michael@example.com",
    phone: "555-7890",
    status: "Inactive",
    employer: null,
    job: null,
  },
  {
    id: 8,
    name: "Sarah Brown",
    email: "sarah@example.com",
    phone: "555-2345",
    status: "Active",
    employer: "Digital Innovations",
    job: "Marketing Specialist",
  },
  {
    id: 9,
    name: "David Miller",
    email: "david@example.com",
    phone: "555-6789",
    status: "Active",
    employer: "Global Systems",
    job: "IT Support",
  },
  {
    id: 10,
    name: "Lisa Anderson",
    email: "lisa@example.com",
    phone: "555-0123",
    status: "Pending",
    employer: "Tech Solutions Inc.",
    job: "Business Analyst",
  },
  {
    id: 11,
    name: "Lisa Anderson",
    email: "lisa@example.com",
    phone: "555-0123",
    status: "Pending",
    employer: "Tech Solutions Inc.",
    job: "Business Analyst",
  },
  {
    id: 12,
    name: "Lisa Anderson",
    email: "lisa@example.com",
    phone: "555-0123",
    status: "Pending",
    employer: "Tech Solutions Inc.",
    job: "Business Analyst",
  },
];

const mockEmployers = [
  "Tech Solutions Inc.",
  "Digital Innovations",
  "Global Systems",
  "Vox Lexical Limited",
];

export default function CandidateManagementPage() {
  const [candidates, setCandidates] = useState(mockCandidates);
  const [filteredCandidates, setFilteredCandidates] = useState(mockCandidates);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEmployer, setFilterEmployer] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [releaseDialogOpen, setReleaseDialogOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Apply filters when search term or filters change
  useEffect(() => {
    let result = candidates;

    if (searchTerm) {
      result = result.filter(
        (candidate) =>
          candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          candidate.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterEmployer) {
      result = result.filter(
        (candidate) => candidate.employer === filterEmployer
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
        candidates.map((candidate) =>
          candidate.id === selectedCandidate.id
            ? { ...candidate, employer: null, job: null, status: "Inactive" }
            : candidate
        )
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
    <div className="mx-auto p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">
            Candidate Management
          </CardTitle>
          <Button className="border-none bg-sky-500 hover:bg-sky-600">
            Add New Candidate
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
              <div className="relative w-full md:w-1/3">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search candidates..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

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
                            {mockEmployers.map((employer) => (
                              <SelectItem
                                key={employer}
                                value={employer}>
                                {employer}
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
                          <SelectTrigger className="hover:bg-slate-100">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Inactive">
                              Shortlisted
                            </SelectItem>
                            <SelectItem value="Inactive">
                              Interviewed
                            </SelectItem>
                            <SelectItem value="Inactive">Hired</SelectItem>
                            <SelectItem value="Inactive">Rejected</SelectItem>
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
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}>
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>

            {/* Active filters display */}
            {(filterEmployer || filterStatus) && (
              <div className="flex flex-wrap gap-2">
                {filterEmployer && (
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1">
                    Employer: {filterEmployer}
                  </Badge>
                )}
                {filterStatus && (
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1">
                    Status: {filterStatus}
                  </Badge>
                )}
              </div>
            )}

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Employer</TableHead>
                    <TableHead>Job</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCandidates.length > 0 ? (
                    filteredCandidates.map((candidate) => (
                      <TableRow key={candidate.id}>
                        <TableCell className="font-medium">
                          {candidate.name}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{candidate.email}</span>
                            <span className="text-sm text-muted-foreground">
                              {candidate.phone}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              candidate.status === "Active"
                                ? "default"
                                : candidate.status === "Pending"
                                ? "outline"
                                : "secondary"
                            }>
                            {candidate.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{candidate.employer || "—"}</TableCell>
                        <TableCell>{candidate.job || "—"}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                className=" border-none">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedCandidate(candidate);
                                  setIsSheetOpen(true);
                                }}>
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => alert(`Edit ${candidate.name}`)}>
                                Edit Candidate
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {candidate.employer ? (
                                <DropdownMenuItem
                                  className="text-destructive focus:text-destructive"
                                  onClick={() => {
                                    setSelectedCandidate(candidate);
                                    setReleaseDialogOpen(true);
                                  }}>
                                  Release from Employer
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem
                                  onClick={() =>
                                    alert(`Assign ${candidate.name}`)
                                  }>
                                  Assign to Employer
                                </DropdownMenuItem>
                              )}
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
        </CardContent>
      </Card>

      {/* Release Candidate Dialog */}
      <Dialog
        open={releaseDialogOpen}
        onOpenChange={setReleaseDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Release Candidate</DialogTitle>
            <DialogDescription>
              Are you sure you want to release {selectedCandidate?.name} from{" "}
              {selectedCandidate?.employer}? This will remove their job
              assignment and set their status to inactive.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setReleaseDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleReleaseCandidate}>
              Release Candidate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Candidate details Dialog */}
      <CandidateDetailSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      />
    </div>
  );
}
