import { useState, useMemo, useEffect } from "react";
import { Briefcase, Plus, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  matchesData,
  messagesData,
  candidatesData,
  employersData,
  jobsData,
  industryOptions,
  locationOptions,
  typeOptions,
  agentData,
  newCandidateRequests,
  employerRequests,
  notificationsData,
} from "@/utils/data/agent-mock-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import JobDetailsDialog from "@/components/agent/job-details-dialog";
import JobCard from "@/components/agent/job-card";
import { useOutletContext } from "react-router-dom";
import AgentJobMatchSuggestions from "@/components/agent/agent-jobs-match-suggestions";

export default function JobsTab() {
  const { setPageTitle } = useOutletContext();

  const [jobSearchQuery, setJobSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedType, setSelectedType] = useState("All Types");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobDetailsOpen, setJobDetailsOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredJobs = useMemo(() => {
    return jobsData.filter((job) => {
      if (
        jobSearchQuery &&
        !job.title.toLowerCase().includes(jobSearchQuery.toLowerCase()) &&
        !job.company.toLowerCase().includes(jobSearchQuery.toLowerCase()) &&
        !job.description.toLowerCase().includes(jobSearchQuery.toLowerCase())
      ) {
        return false;
      }

      if (
        selectedIndustry !== "All Industries" &&
        job.industry !== selectedIndustry
      ) {
        return false;
      }

      if (
        selectedLocation !== "All Locations" &&
        job.location !== selectedLocation
      ) {
        return false;
      }

      if (selectedType !== "All Types" && job.type !== selectedType) {
        return false;
      }

      return true;
    });
  }, [
    jobsData,
    jobSearchQuery,
    selectedIndustry,
    selectedLocation,
    selectedType,
  ]);

  const handleViewJobDetails = (job) => {
    setSelectedJob(job);
    setJobDetailsOpen(true);
  };

  const handleFindMatches = (job) => {
    setSelectedJob(job);
    setShowSuggestions(true);
  };

  useEffect(() => {
    setPageTitle("Available Jobs");
  }, []);

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center gap-2 justify-end">
        <Button className="border-none bg-sky-500 hover:bg-sky-600">
          <Plus className="mr-2 h-4 w-4" />
          Add Job
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}>
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filters {showFilters ? "(Hide)" : "(Show)"}
        </Button>
      </div>

      <div className={`space-y-4 ${showFilters ? "block" : "hidden"}`}>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search jobs by title, company, or keywords..."
            className="w-full pl-8"
            value={jobSearchQuery}
            onChange={(e) => setJobSearchQuery(e.target.value)}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="industry-filter">Industry</Label>
            <Select
              value={selectedIndustry}
              onValueChange={setSelectedIndustry}>
              <SelectTrigger
                className="hover:bg-sky-600 hover:text-white"
                id="industry-filter">
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                {industryOptions.map((industry) => (
                  <SelectItem
                    key={industry}
                    value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location-filter">Location</Label>
            <Select
              value={selectedLocation}
              onValueChange={setSelectedLocation}>
              <SelectTrigger
                className="hover:bg-sky-600 hover:text-white"
                id="location-filter">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {locationOptions.map((location) => (
                  <SelectItem
                    key={location}
                    value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="type-filter">Job Type</Label>
            <Select
              value={selectedType}
              onValueChange={setSelectedType}>
              <SelectTrigger
                className="hover:bg-sky-600 hover:text-white"
                id="type-filter">
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                {typeOptions.map((type) => (
                  <SelectItem
                    key={type}
                    value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button
            className="border-none bg-sky-500 hover:bg-sky-600"
            onClick={() => {
              setJobSearchQuery("");
              setSelectedIndustry("All Industries");
              setSelectedLocation("All Locations");
              setSelectedType("All Types");
            }}>
            Reset Filters
          </Button>
        </div>
      </div>

      <div className="flex space-x-5 pr-8">
        <div className="w-[70%]">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onViewDetails={handleViewJobDetails}
                onFindMatches={handleFindMatches}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <Briefcase className="h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-semibold">No jobs found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>

        <div className="w-[20%]">
          {selectedJob ? (
            <AgentJobMatchSuggestions
              job={selectedJob}
              candidates={candidatesData}
              onClose={() => {
                setShowSuggestions(false);
                setSelectedJob(null);
              }}
            />
          ) : (
            <div className="p-8 text-center text-muted-foreground text-sm">
              <p>No matching candidates found</p>
            </div>
          )}
        </div>
      </div>

      <JobDetailsDialog
        job={selectedJob}
        open={jobDetailsOpen}
        onOpenChange={setJobDetailsOpen}
      />
    </div>
  );
}
