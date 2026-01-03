import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
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

export default function PastScheduledInterview({ pastInterviews }) {
  const getInitials = (name) => {
    if (!name) return "";
    const splitName = name.split(" ");

    const firstName = splitName[0];
    const lastName = splitName[1];
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
  };

  return (
    <div className="w-full max-w-md">
      {pastInterviews?.length > 0 ? (
        <Card className="w-full bg-secondary p-6 py-8 space-y-5">
          <h2 className="text-center text-base font-medium text-white">
            Past Scheduled Interview
          </h2>

          {/* Avatars Row */}
          <div className="flex items-center ml-0">
            {pastInterviews.slice(0, 7).map((interview, index) => (
              <Avatar
                key={index}
                className="h-10 w-10 -ml-4 border-2 border-cyan-300 first:ml-0"
              >
                <AvatarImage src={interview.src || "/placeholder.svg"} />
                <AvatarFallback className="bg-primary text-white font-medium">
                  {getInitials(interview.talentName)}
                </AvatarFallback>
              </Avatar>
            ))}
            {pastInterviews.length > 7 && (
              <span className="text-white font-semibold text-base ml-2">
                + {pastInterviews.length - 7}
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
                  List of all past scheduled interview with applicants
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
                  {pastInterviews?.map((interview, index) => (
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
      ) : null}
    </div>
  );
}
