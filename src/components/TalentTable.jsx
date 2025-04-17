import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const talents = [
  {
    name: "Senior Frontend Developer",
    icon: "💻",
    startDate: "27 Jan, 2023",
    status: "Hired",
    progress: "10/10 (100%)",
    duration: "14h 38m 56s",
  },
  {
    name: "UX/UI Designer",
    icon: "🎨",
    startDate: "19 Feb, 2023",
    status: "Interview",
    progress: "26/32 (84%)",
    duration: "16h 40m 50s",
  },
  {
    name: "Data Scientist",
    icon: "📊",
    startDate: "14 Jan, 2023",
    status: "Matched",
    progress: "9/37 (40%)",
    duration: "37h 00m 00s",
  },
  {
    name: "Project Manager",
    icon: "📝",
    startDate: "27 Jan, 2023",
    status: "Hired",
    progress: "14/19 (89%)",
    duration: "13h 20m 00s",
  },
  {
    name: "DevOps Engineer",
    icon: "⚙️",
    startDate: "23 Feb, 2023",
    status: "Matched",
    progress: "40/45 (97%)",
    duration: "36h 30m 00s",
  },
]

export function TalentTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Talent Position</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Process Completed</TableHead>
          <TableHead>Time Spent</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {talents.map((talent) => (
          <TableRow key={talent.name}>
            <TableCell className="font-medium">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100">
                  <span>{talent.icon}</span>
                </div>
                <span>{talent.name}</span>
              </div>
            </TableCell>
            <TableCell>{talent.startDate}</TableCell>
            <TableCell>
              <Badge
                variant={talent.status === "Hired" ? "success" : talent.status === "Interview" ? "warning" : "default"}
                className={
                  talent.status === "Hired"
                    ? "bg-green-100 text-green-800"
                    : talent.status === "Interview"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-blue-100 text-blue-800"
                }
              >
                {talent.status}
              </Badge>
            </TableCell>
            <TableCell>{talent.progress}</TableCell>
            <TableCell>{talent.duration}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
