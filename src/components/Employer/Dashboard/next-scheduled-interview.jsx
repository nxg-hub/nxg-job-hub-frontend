import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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

export default function NextScheduledInterview({ nextInterviews }) {
  return (
    <div className="w-full max-w-md">
      {nextInterviews?.length > 0 ? (
        <div className="mb-10">
          <Card className="p-6 bg-white">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-base font-medium text-gray-700">
                Scheduled Interview
              </h2>
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                Coming next
              </Badge>
            </div>

            <div className="space-y-0">
              {nextInterviews?.map((interview, index) => (
                <div key={index} className="flex gap-4 pb-6">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center mb-2 bg-gray-100 text-gray-600">
                      <Calendar className="w-5 h-5 text-secondary" />
                    </div>

                    {/* Vertical Line */}
                    {index < nextInterviews?.length - 1 && (
                      <div className="w-0.5 h-12 bg-gray-200"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">
                          {interview.talentName}
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {interview.modeOfInterview}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap pl-2">
                        {interview.interviewDate}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Rate Button */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full mt-6 bg-secondary text-white  hover:bg-primary hover:text-white font-medium"
                >
                  Show all
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl max-h-[80vh] overflow-auto">
                <DialogHeader>
                  <DialogTitle>Scheduled Interview</DialogTitle>
                  <DialogDescription>
                    List of all your upcoming scheduled interview with
                    applicants
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
                    {nextInterviews?.map((interview, index) => (
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
