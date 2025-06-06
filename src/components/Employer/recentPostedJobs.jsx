import { Eye, MoreHorizontal, Plus, Search, Users } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

// Sample job data
const jobPostings = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    postedDate: "2024-01-15",
    status: "active",
    applications: 24,
    type: "Full-time",
  },
  {
    id: "2",
    title: "Product Manager",
    postedDate: "2024-01-12",
    status: "active",
    applications: 18,
    type: "Full-time",
  },
  {
    id: "3",
    title: "UX Designer",
    postedDate: "2024-01-10",
    status: "draft",
    applications: 0,
    type: "Full-time",
  },

  {
    id: "5",
    title: "Marketing Specialist",
    postedDate: "2024-01-05",
    status: "closed",
    applications: 45,
    type: "Full-time",
  },
];

const getStatusBadge = (status) => {
  switch (status) {
    case "active":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          Active
        </Badge>
      );
    case "draft":
      return <Badge variant="secondary">Draft</Badge>;
    case "closed":
      return <Badge variant="destructive">Closed</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function RecentPostedJobs() {
  return (
    <div className="w-full  mx-auto p-6 space-y-6">
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Job Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Posted Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Applications</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobPostings.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">{job.title}</TableCell>
                <TableCell>
                  <Badge variant="outline">{job.type}</Badge>
                </TableCell>
                <TableCell>{formatDate(job.postedDate)}</TableCell>
                <TableCell>{getStatusBadge(job.status)}</TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{job.applications}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        className="border-transparent"
                        variant="ghost"
                        size="icon"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>Edit Job</DropdownMenuItem>
                      <DropdownMenuItem>View Applications</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate Job</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Close Job
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
