import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CheckCircle2, ChevronDown, Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export default function AgentAssignToEmployerDialog({
  candidate,
  open,
  onOpenChange,
  employersData,
  jobsData,
}) {
  const [selectedEmployer, setSelectedEmployer] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [employerCommandOpen, setEmployerCommandOpen] = useState(false);
  const [jobCommandOpen, setJobCommandOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notes, setNotes] = useState("");

  // Filter jobs based on selected employer
  const filteredJobs = selectedEmployer
    ? jobsData?.filter((job) => job.company === selectedEmployer.name)
    : [];

  // Filter employers based on search query
  const filteredEmployers = employersData?.filter((employer) =>
    employer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAssign = () => {
    // Logic to assign candidate to employer would go here
    console.log(
      "Assigning",
      candidate.name,
      "to",
      selectedEmployer?.name,
      "for job",
      selectedJob?.title
    );
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Assign Candidate to Employer</DialogTitle>
          <DialogDescription>
            Assign {candidate?.name} to an employer for a specific job
            opportunity.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={candidate?.avatar || "/placeholder.svg"}
                alt={candidate?.name}
              />
              <AvatarFallback>{candidate?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{candidate?.name}</h3>
              <div className="flex flex-wrap gap-1 mt-1">
                {candidate?.skills?.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="employer-search">Search Employers</Label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="employer-search"
                placeholder="Search by employer name..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="employer">Select Employer</Label>
              <Popover
                open={employerCommandOpen}
                onOpenChange={setEmployerCommandOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="justify-between w-full"
                    disabled={!filteredEmployers?.length}>
                    {selectedEmployer
                      ? selectedEmployer.name
                      : "Select employer..."}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="p-0"
                  align="start">
                  <Command>
                    <CommandInput placeholder="Search employers..." />
                    <CommandList>
                      <CommandEmpty>No employers found.</CommandEmpty>
                      <CommandGroup>
                        {filteredEmployers?.map((employer) => (
                          <CommandItem
                            key={employer.id}
                            onSelect={() => {
                              setSelectedEmployer(employer);
                              setSelectedJob(null);
                              setEmployerCommandOpen(false);
                            }}>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage
                                  src={employer.avatar || "/placeholder.svg"}
                                  alt={employer.name}
                                />
                                <AvatarFallback>
                                  {employer.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span>{employer.name}</span>
                            </div>
                            <CheckCircle2
                              className={`ml-auto h-4 w-4 ${
                                selectedEmployer?.id === employer.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              }`}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="job">Select Job</Label>
              <Popover
                open={jobCommandOpen}
                onOpenChange={setJobCommandOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="justify-between w-full"
                    disabled={!selectedEmployer || !filteredJobs.length}>
                    {selectedJob ? selectedJob.title : "Select job..."}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="p-0"
                  align="start">
                  <Command>
                    <CommandInput placeholder="Search jobs..." />
                    <CommandList>
                      <CommandEmpty>
                        No jobs found for this employer.
                      </CommandEmpty>
                      <CommandGroup>
                        {filteredJobs.map((job) => (
                          <CommandItem
                            key={job.id}
                            onSelect={() => {
                              setSelectedJob(job);
                              setJobCommandOpen(false);
                            }}>
                            <span>{job.title}</span>
                            <CheckCircle2
                              className={`ml-auto h-4 w-4 ${
                                selectedJob?.id === job.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              }`}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any notes about this assignment..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleAssign}
            disabled={!selectedEmployer || !selectedJob}>
            Assign Candidate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
