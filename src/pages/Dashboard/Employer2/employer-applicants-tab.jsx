import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function EmployerApplicantsTab() {
  const [filter, setFilter] = useState("all");

  const applicants = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "+1 (555) 123-4567",
      position: "Senior Frontend Developer",
      applied: "2 days ago",
      status: "review",
      rating: 4,
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.c@example.com",
      phone: "+1 (555) 987-6543",
      position: "UX Designer",
      applied: "5 days ago",
      status: "interview",
      rating: 5,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.r@example.com",
      phone: "+1 (555) 456-7890",
      position: "Product Manager",
      applied: "1 week ago",
      status: "review",
      rating: 3,
    },
    {
      id: 4,
      name: "David Kim",
      email: "david.k@example.com",
      phone: "+1 (555) 234-5678",
      position: "Backend Developer",
      applied: "2 weeks ago",
      status: "rejected",
      rating: 2,
    },
    {
      id: 5,
      name: "Jessica Taylor",
      email: "jessica.t@example.com",
      phone: "+1 (555) 876-5432",
      position: "Senior Frontend Developer",
      applied: "3 days ago",
      status: "hired",
      rating: 5,
    },
  ];

  const filteredApplicants =
    filter === "all"
      ? applicants
      : applicants.filter((applicant) => applicant.status === filter);

  const getStatusBadge = (status) => {
    switch (status) {
      case "review":
        return <Badge variant="outline">Review</Badge>;
      case "interview":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600">Interview</Badge>
        );
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      case "hired":
        return <Badge className="bg-green-500 hover:bg-green-600">Hired</Badge>;
      default:
        return <Badge variant="outline">New</Badge>;
    }
  };

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-start md:items-center">
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            All Applicants
          </Button>
          <Button
            variant={filter === "review" ? "default" : "outline"}
            onClick={() => setFilter("review")}
          >
            In Review
          </Button>
          <Button
            variant={filter === "interview" ? "default" : "outline"}
            onClick={() => setFilter("interview")}
          >
            Interview
          </Button>
          <Button
            variant={filter === "hired" ? "default" : "outline"}
            onClick={() => setFilter("hired")}
          >
            Hired
          </Button>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Input
            placeholder="Search applicants..."
            className="flex-1 md:w-[250px]"
          />
          <Button variant="outline">Filter</Button>
        </div>
      </div>

      <div className="rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant</TableHead>
                <TableHead>Job</TableHead>
                <TableHead>Applied</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplicants.map((applicant) => (
                <TableRow key={applicant.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {applicant.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{applicant.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {applicant.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{applicant.position}</TableCell>
                  <TableCell>{applicant.applied}</TableCell>
                  <TableCell>{getStatusBadge(applicant.status)}</TableCell>
                  <TableCell>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill={i < applicant.rating ? "currentColor" : "none"}
                          stroke={
                            i < applicant.rating ? "none" : "currentColor"
                          }
                          className={`h-4 w-4 ${
                            i < applicant.rating
                              ? "text-yellow-400"
                              : "text-muted-foreground"
                          }`}
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">More</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>View Resume</DropdownMenuItem>
                          <DropdownMenuItem>Send Email</DropdownMenuItem>
                          <DropdownMenuItem>
                            Schedule Interview
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            Reject
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
