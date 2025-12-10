import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TodayScheduleInterview({ todayInterviews }) {
  const today = new Intl.DateTimeFormat("en-Us", {
    weekday: "long",
    month: "long",
    year: "numeric",
  }).format(new Date(Date.now()));

  const getInitials = (name) => {
    if (!name) return "";
    const splitName = name.split(" ");

    const firstName = splitName[0];
    const lastName = splitName[1];
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
  };

  return (
    <div>
      {todayInterviews?.length > 0 ? (
        <div className="mb-8">
          {/* Main Card */}
          <Card className="w-full bg-secondary p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h2 className="text-base font-medium text-sky-100">
                  Today Scheduled Interview
                </h2>
                <p className="text-teal-100 text-sm">{today}</p>
              </div>

              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                <CheckCircle2 className="w-4 h-4 mr-1" />
                In Progress
              </Badge>
            </div>

            {/* Avatars Row */}
            <div className="flex items-center ml-0">
              {todayInterviews.slice(0, 4).map((interview, index) => (
                <Avatar
                  key={index}
                  className="h-10 w-10 -ml-4 border-2 border-cyan-500 first:ml-0"
                >
                  <AvatarImage src={interview.src || "/placeholder.svg"} />
                  <AvatarFallback className="bg-primary text-white font-medium">
                    {getInitials(interview.talentName)}
                  </AvatarFallback>
                </Avatar>
              ))}
              {todayInterviews.length > 4 && (
                <span className="text-white font-semibold text-base ml-2">
                  + {todayInterviews.length - 4}
                </span>
              )}
            </div>

            {/* Return Button */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="border-transparent bg-primary hover:underline hover:bg-white text-white hover:text-secondary font-bold text-base rounded-full">
                  Show details
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl max-h-[80vh] overflow-auto">
                <DialogHeader>
                  <DialogTitle>Scheduled Interview</DialogTitle>
                  <DialogDescription>
                    List of all today scheduled interview with applicants
                  </DialogDescription>
                </DialogHeader>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Applicant name</TableHead>
                      <TableHead>Email address</TableHead>
                      <TableHead>Job title</TableHead>
                      <TableHead>Interview date/time</TableHead>
                      <TableHead>Mode of interview</TableHead>
                      <TableHead>Meeting</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {todayInterviews?.map((interview, index) => (
                      <TableRow key={index}>
                        <TableCell>{interview?.talentName}</TableCell>
                        <TableCell>{interview?.talentEmail}</TableCell>
                        <TableCell>{interview.jobTitle}</TableCell>
                        <TableCell>
                          {interview?.interviewDate} / {interview?.time}
                        </TableCell>
                        <TableCell>{interview?.modeOfInterview}</TableCell>
                        <TableCell>
                          <a
                            className="hover:underline text-primary"
                            target="_blank"
                            href={interview?.meetingLink}
                          >
                            {interview?.meetingLink}
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </DialogContent>
            </Dialog>
          </Card>
        </div>
      ) : null}
    </div>
  );
}
