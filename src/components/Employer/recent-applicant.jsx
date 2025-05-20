import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"

export function RecentApplicants() {
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
  ]

  return (
    <div className="space-y-4">
      {applicants.map((applicant) => (
        <div key={applicant.id} className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={applicant.avatar || "/placeholder.svg"} alt={applicant.name} />
            <AvatarFallback>{applicant.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{applicant.name}</p>
            <p className="text-xs text-muted-foreground">{applicant.position}</p>
            <p className="text-xs text-muted-foreground">Applied {applicant.applied}</p>
          </div>
          <div className="flex gap-2">
            <Button size="icon" variant="outline" className="h-8 w-8">
              <Check className="h-4 w-4" />
              <span className="sr-only">Approve</span>
            </Button>
            <Button size="icon" variant="outline" className="h-8 w-8">
              <X className="h-4 w-4" />
              <span className="sr-only">Reject</span>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
