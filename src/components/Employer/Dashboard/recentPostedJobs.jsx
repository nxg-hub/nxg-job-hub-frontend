import { Eye, MoreHorizontal, RefreshCw, Users } from "lucide-react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import emptySuggestedImage from "@/static/images/empty-suggest.svg";
import emptyRecentPostImage from "@/static/images/empty-employer-table.svg";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "../../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import {
  useFetchJobs,
  useFetchJobApplicants,
  useDeletePostedJob,
} from "@/hooks/useJobs";
import { Skeleton } from "../../ui/skeleton";
import { cn, getDateAsTextLabel } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

const getJobTypeBadge = (status) => {
  switch (status) {
    case "full-time":
      return (
        <Badge className="bg-secondary text-white hover:bg-secondary">
          Full time
        </Badge>
      );
    case "part-time":
      return (
        <Badge className="bg-yellow-800 text-white hover:bg-yellow-800">
          Part time
        </Badge>
      );
    case "contract":
      return (
        <Badge className="bg-neutral-600 text-white hover:bg-neutral-600">
          Contract
        </Badge>
      );
    case "hybrid":
      return (
        <Badge
          variant="secondary"
          className="bg-cyan-500 text-white hover:bg-cyan-500"
        >
          Hybrid
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getStatusBadge = (status) => {
  switch (status) {
    case "ACCEPTED":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          {status}
        </Badge>
      );
    case "PENDING":
      return (
        <Badge
          variant="secondary"
          className="bg-secondary text-white hover:bg-secondary"
        >
          {status}
        </Badge>
      );
    case "REJECTED":
      return <Badge variant="destructive">{status}</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function RecentPostedJobs({
  setOpenCreateJobDialog,
  employerID,
}) {
  const { data, isLoading, isError } = useFetchJobs(employerID);

  if (isLoading) return <TableSkeleton />;
  if (isError)
    return (
      <div className="w-full py-20 flex flex-col gap-2 justify-center items-center border rounded-lg">
        <h1 className="font-medium text-lg">Error!</h1>
        <p className="text-sm italic text-center text-gray-400">
          Something went wrong, Please try again
        </p>
        <Button
          size="sm"
          className="border-none bg-sky-500 text-white hover:bg-sky-600"
        >
          Refresh
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>
    );

  return (
    <div className="w-2/3  space-y-6">
      <div className="bg-white border rounded-lg p-4">
        {data?.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Job Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Posted Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Applications</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data
                .sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))
                .slice(0, 4)
                .map((job) => (
                  <JobRow key={job.jobID} job={job} />
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="bg-white text-secondary text-center"
                >
                  <NavLink to="/employer/jobs">view all</NavLink>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        ) : (
          <div className="w-full py-20 flex flex-col gap-3 justify-center items-center">
            <img
              className="w-40"
              src={emptyRecentPostImage}
              alt="no suggested "
            />
            <div className="text-sm italic text-center text-gray-400">
              <p>It looks a little empty here...</p>
              <p>
                Start{" "}
                <span
                  onClick={setOpenCreateJobDialog}
                  className="text-primary underline hover:cursor-pointer"
                >
                  posting jobs
                </span>{" "}
                to see them appear here
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const JobRow = ({ job }) => {
  const jobID = job?.jobID;
  const { data, isLoading, isError, error } = useFetchJobApplicants({ jobID });
  const queryClient = useQueryClient();
  const { mutate: deleteJob } = useDeletePostedJob();

  const handleDeleteJob = (jobId) => {
    if (jobId) {
      deleteJob(jobId, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["employerJobs"] });
          queryClient.invalidateQueries({ queryKey: ["jobsEngagements"] });
          toast({
            className: cn(
              "bottom-10 right-4 flex fixed max-w-[400px] md:max-w-[420px]"
            ),
            title: <p className="text-red-800">Job Deleted</p>,
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-red-200 p-4">
                <p>The job has been permanently deleted</p>
              </pre>
            ),
          });
        },
      });
    }
  };

  return (
    <TableRow className="odd:bg-white even:bg-gray-50" key={job?.jobID}>
      <TableCell className="font-medium">{job?.job_title}</TableCell>
      <TableCell>{getJobTypeBadge(job?.job_type)}</TableCell>
      <TableCell>{getDateAsTextLabel(job?.createdAt)}</TableCell>
      <TableCell>{getStatusBadge(job?.jobStatus)}</TableCell>
      <TableCell className="text-center">
        <div className="relative flex items-center justify-center space-x-1">
          <Users className="w-4 h-4 text-muted-foreground" />

          <Badge
            variant="secondary"
            className="text-white font-medium absolute right-1 -top-1 h-5 w-5 rounded-full p-2 flex items-center justify-center text-[10px]"
          >
            {isLoading && "..."}
            {isError && "0"}
            {data}
          </Badge>
        </div>
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="border-transparent" variant="ghost" size="icon">
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
            <DropdownMenuItem>Tag agent</DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => handleDeleteJob(jobID)}
            >
              Delete Job
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

const TableSkeleton = ({ rows = 5, columns = 4, showHeader = true }) => {
  return (
    <div className="w-full bg-white p-4 border rounded-lg">
      <Table>
        {showHeader && (
          <TableHeader>
            <TableRow>
              {Array.from({ length: columns }).map((_, index) => (
                <TableHead key={index}>
                  <Skeleton className="h-4 w-[100px]" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
        )}
        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <TableCell key={colIndex}>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
