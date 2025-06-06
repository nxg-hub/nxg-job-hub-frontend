import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Check, Eye, MoreHorizontal, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

export default function NewApplicants() {
  const applicants = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      position: "Senior Frontend Developer",
      applied: "2 hours ago",
      avatar: "/placeholder.svg",
      initials: "SJ",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.c@example.com",
      position: "UX Designer",
      applied: "5 hours ago",
      avatar: "/placeholder.svg",
      initials: "MC",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.r@example.com",
      position: "Product Manager",
      applied: "1 day ago",
      avatar: "/placeholder.svg",
      initials: "ER",
    },
    {
      id: 4,
      name: "David Kim",
      email: "david.k@example.com",
      position: "Backend Developer",
      applied: "2 days ago",
      avatar: "/placeholder.svg",
      initials: "DK",
    },
  ];

  return (
    <div className="bg-white shadow-md flex flex-col p-8 rounded-md space-y-4">
      <div className="flex justify-between">
        <h1 className="font-medium">New Applicants</h1>
        <Badge variant="secondary" className="ml-2 bg-cyan-500 text-white">
          2
        </Badge>
      </div>
      <Separator className="my-8" />
      {applicants.map((applicant) => (
        <div key={applicant.id} className="flex items-center gap-4">
          <Avatar>
            <AvatarImage
              src={applicant.avatar || "/placeholder.svg"}
              alt={applicant.name}
            />
            <AvatarFallback>{applicant.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{applicant.name}</p>
            <p className="text-xs text-muted-foreground">
              {applicant.position}
            </p>
          </div>
          <div className="flex gap-2">
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
                <DropdownMenuItem>
                  <Check className="h-4 w-4" />
                  Approve
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <X className="h-4 w-4" />
                  Reject
                </DropdownMenuItem>
                <Separator />
                <p className="p-3 text-xs text-muted-foreground">
                  Applied {applicant.applied}
                </p>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  );
}
