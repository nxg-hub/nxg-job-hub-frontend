import { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Trash2, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function CandidateManagementPage() {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();

  // Fetch candidates data
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));
        const mockData = [
          {
            id: "1",
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "555-123-4567",
            skills: ["React", "TypeScript", "Node.js"],
            status: "assigned",
            assignedTo: {
              employer: "TechCorp",
              jobTitle: "Frontend Developer",
              jobId: "job-123",
            },
          },
          {
            id: "2",
            name: "Jane Smith",
            email: "jane.smith@example.com",
            phone: "555-987-6543",
            skills: ["Python", "Django", "AWS"],
            status: "available",
            assignedTo: null,
          },
          {
            id: "3",
            name: "Alex Johnson",
            email: "alex.j@example.com",
            phone: "555-456-7890",
            skills: ["Java", "Spring", "SQL"],
            status: "assigned",
            assignedTo: {
              employer: "DataSystems",
              jobTitle: "Backend Engineer",
              jobId: "job-456",
            },
          },
          {
            id: "4",
            name: "Maria Garcia",
            email: "maria.g@example.com",
            phone: "555-789-0123",
            skills: ["JavaScript", "Angular", "RxJS"],
            status: "available",
            assignedTo: null,
          },
        ];
        setCandidates(mockData);
        setFilteredCandidates(mockData);
      } catch (error) {
        console.error("Failed to fetch candidates:", error);
        toast({
          title: "Error",
          description: "Failed to load candidates",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidates();
  }, [toast]);

  // Apply filters
  useEffect(() => {
    let results = candidates;

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        (candidate) =>
          candidate.name.toLowerCase().includes(term) ||
          candidate.email.toLowerCase().includes(term) ||
          candidate.phone.includes(term) ||
          candidate.skills.some((skill) =>
            skill.toLowerCase().includes(term)
          ) ||
          (candidate.assignedTo &&
            (candidate.assignedTo.employer.toLowerCase().includes(term) ||
              candidate.assignedTo.jobTitle.toLowerCase().includes(term)))
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      results = results.filter(
        (candidate) => candidate.status === statusFilter
      );
    }

    setFilteredCandidates(results);
  }, [searchTerm, statusFilter, candidates]);

  const handleReleaseCandidate = (candidateId) => {
    setCandidates((prev) =>
      prev.map((candidate) =>
        candidate.id === candidateId
          ? { ...candidate, status: "available", assignedTo: null }
          : candidate
      )
    );
    toast({
      title: "Success",
      description: "Candidate has been released",
    });
  };

  const handleRefresh = () => {
    setIsLoading(true);
    // In a real app, this would re-fetch data from the server
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Candidate Management</h1>
        <Button
          variant="outline"
          onClick={handleRefresh}
          disabled={isLoading}>
          <RefreshCw
            className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="Search candidates by name, email, skills, or employer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {statusFilter === "all"
                ? "All Statuses"
                : statusFilter === "assigned"
                ? "Assigned"
                : "Available"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setStatusFilter("all")}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("assigned")}>
              Assigned
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("available")}>
              Available
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Skills</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8">
                  Loading candidates...
                </TableCell>
              </TableRow>
            ) : filteredCandidates.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8">
                  No candidates found matching your criteria
                </TableCell>
              </TableRow>
            ) : (
              filteredCandidates.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell className="font-medium">
                    {candidate.name}
                  </TableCell>
                  <TableCell>
                    <div>{candidate.email}</div>
                    <div className="text-sm text-gray-500">
                      {candidate.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {candidate.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        candidate.status === "assigned"
                          ? "default"
                          : "secondary"
                      }>
                      {candidate.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {candidate.assignedTo ? (
                      <div>
                        <div className="font-medium">
                          {candidate.assignedTo.employer}
                        </div>
                        <div className="text-sm text-gray-500">
                          {candidate.assignedTo.jobTitle}
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-400">Not assigned</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {candidate.status === "assigned" && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() => handleReleaseCandidate(candidate.id)}
                            className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Release Candidate
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
