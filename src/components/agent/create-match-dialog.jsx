import { useState } from "react";
import { ChevronDown, CheckCircle2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

export default function CreateMatchDialog({
  open,
  onOpenChange,
  candidatesData,
  employersData,
}) {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedEmployer, setSelectedEmployer] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [candidateCommandOpen, setCandidateCommandOpen] = useState(false);
  const [employerCommandOpen, setEmployerCommandOpen] = useState(false);

  const handleCreateMatch = () => {
    // Logic to create a match would go here
    onOpenChange(false);
    setSelectedCandidate(null);
    setSelectedEmployer(null);
    setJobTitle("");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Match</DialogTitle>
          <DialogDescription>
            Match a candidate with an employer for a specific job.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="candidate">Candidate</Label>
            <Popover
              open={candidateCommandOpen}
              onOpenChange={setCandidateCommandOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="justify-between">
                  {selectedCandidate
                    ? selectedCandidate.name
                    : "Select candidate..."}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="p-0"
                align="start">
                <Command>
                  <CommandInput placeholder="Search candidates..." />
                  <CommandList>
                    <CommandEmpty>No candidates found.</CommandEmpty>
                    <CommandGroup>
                      {candidatesData.map((candidate) => (
                        <CommandItem
                          key={candidate.id}
                          onSelect={() => {
                            setSelectedCandidate(candidate);
                            setCandidateCommandOpen(false);
                          }}>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={candidate.avatar || "/placeholder.svg"}
                                alt={candidate.name}
                              />
                              <AvatarFallback>
                                {candidate.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span>{candidate.name}</span>
                          </div>
                          <CheckCircle2
                            className={`ml-auto h-4 w-4 ${
                              selectedCandidate?.id === candidate.id
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
          <div className="grid gap-2">
            <Label htmlFor="employer">Employer</Label>
            <Popover
              open={employerCommandOpen}
              onOpenChange={setEmployerCommandOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="justify-between">
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
                      {employersData.map((employer) => (
                        <CommandItem
                          key={employer.id}
                          onSelect={() => {
                            setSelectedEmployer(employer);
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
          <div className="grid gap-2">
            <Label htmlFor="job-title">Job Title</Label>
            <Input
              id="job-title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Senior Frontend Developer"
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
            className="border-none bg-sky-500 hover:bg-sky-600"
            onClick={handleCreateMatch}>
            Create Match
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
