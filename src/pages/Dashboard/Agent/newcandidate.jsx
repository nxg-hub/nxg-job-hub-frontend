"use client";

import * as React from "react";
import { useState } from "react";
import {
  Search,
  MapPin,
  Briefcase,
  Building,
  Filter,
  X,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

// Sample job data
const jobListings = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    industry: "Technology",
    experience: "5+ years",
    posted: "2 days ago",
    description:
      "We are looking for a Senior Software Engineer to join our team and help build scalable web applications.",
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    applicants: 24,
  },
  {
    id: 2,
    title: "Marketing Manager",
    company: "Brand Solutions",
    location: "New York, NY",
    type: "Full-time",
    salary: "$90,000 - $110,000",
    industry: "Marketing",
    experience: "3-5 years",
    posted: "1 week ago",
    description:
      "Seeking a Marketing Manager to develop and implement marketing strategies across multiple channels.",
    skills: [
      "Digital Marketing",
      "Content Strategy",
      "Analytics",
      "Social Media",
    ],
    applicants: 42,
  },
  {
    id: 3,
    title: "HouseMaid",
    company: "Employer",
    location: "Austin, TX",
    type: "Contract",
    salary: "$70 - $90 per hour",
    industry: "Humanitarian",
    experience: "2+ years",
    posted: "3 days ago",
    description:
      "Looking for a an active, respectful hard working HouseMaid for an Household.",
    skills: ["Neatness", "Attention to details", "Respectful"],
    applicants: 18,
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "DataInsights Co.",
    location: "Remote",
    type: "Full-time",
    salary: "$110,000 - $140,000",
    industry: "Technology",
    experience: "3+ years",
    posted: "5 days ago",
    description:
      "Join our data science team to analyze complex datasets and develop machine learning models.",
    skills: ["Python", "Machine Learning", "SQL", "Data Visualization"],
    applicants: 31,
  },
  {
    id: 5,
    title: "Financial Analyst",
    company: "Global Finance",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$85,000 - $100,000",
    industry: "Finance",
    experience: "2-4 years",
    posted: "1 day ago",
    description:
      "Seeking a Financial Analyst to prepare financial reports and analyze business performance.",
    skills: ["Financial Modeling", "Excel", "Forecasting", "Accounting"],
    applicants: 15,
  },
  {
    id: 6,
    title: "Product Manager",
    company: "InnovateTech",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$115,000 - $135,000",
    industry: "Technology",
    experience: "4+ years",
    posted: "2 weeks ago",
    description:
      "Looking for an experienced Product Manager to lead product development and strategy.",
    skills: ["Product Strategy", "Agile", "User Stories", "Roadmapping"],
    applicants: 38,
  },
  {
    id: 7,
    title: "HR Specialist",
    company: "People First Inc.",
    location: "Denver, CO",
    type: "Part-time",
    salary: "$30 - $40 per hour",
    industry: "Human Resources",
    experience: "1-3 years",
    posted: "4 days ago",
    description:
      "Join our HR team to support recruitment, onboarding, and employee relations.",
    skills: [
      "Recruiting",
      "HRIS",
      "Employee Relations",
      "Benefits Administration",
    ],
    applicants: 12,
  },
  {
    id: 8,
    title: "Sales Representative",
    company: "Growth Sales Co.",
    location: "Miami, FL",
    type: "Full-time",
    salary: "$60,000 + Commission",
    industry: "Sales",
    experience: "1+ years",
    posted: "3 days ago",
    description:
      "Seeking motivated Sales Representatives to expand our client base and drive revenue growth.",
    skills: ["B2B Sales", "CRM", "Negotiation", "Client Relationship"],
    applicants: 27,
  },
];

// Available filter options
const locations = [
  "San Francisco, CA",
  "New York, NY",
  "Austin, TX",
  "Remote",
  "Chicago, IL",
  "Seattle, WA",
  "Denver, CO",
  "Miami, FL",
];
const industries = [
  "Technology",
  "Marketing",
  "Design",
  "Finance",
  "Human Resources",
  "Sales",
];
const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];
const experienceLevels = [
  "Entry Level (0-1 years)",
  "Junior (1-3 years)",
  "Mid-Level (3-5 years)",
  "Senior (5+ years)",
];

export default function JobListingDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState(jobListings);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Apply filters
  React.useEffect(() => {
    let filtered = jobListings;

    // Search term filter
    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Location filter
    if (selectedLocations.length > 0) {
      filtered = filtered.filter((job) =>
        selectedLocations.includes(job.location)
      );
    }

    // Industry filter
    if (selectedIndustries.length > 0) {
      filtered = filtered.filter((job) =>
        selectedIndustries.includes(job.industry)
      );
    }

    // Job type filter
    if (selectedTypes.length > 0) {
      filtered = filtered.filter((job) => selectedTypes.includes(job.type));
    }

    // Experience level filter
    if (selectedExperience.length > 0) {
      filtered = filtered.filter((job) => {
        if (
          selectedExperience.includes("Entry Level (0-1 years)") &&
          job.experience.includes("0-1")
        )
          return true;
        if (
          selectedExperience.includes("Junior (1-3 years)") &&
          job.experience.includes("1-3")
        )
          return true;
        if (
          selectedExperience.includes("Mid-Level (3-5 years)") &&
          job.experience.includes("3-5")
        )
          return true;
        if (
          selectedExperience.includes("Senior (5+ years)") &&
          job.experience.includes("5+")
        )
          return true;
        return false;
      });
    }

    setFilteredJobs(filtered);

    // Count active filters
    let count = 0;
    if (selectedLocations.length > 0) count++;
    if (selectedIndustries.length > 0) count++;
    if (selectedTypes.length > 0) count++;
    if (selectedExperience.length > 0) count++;
    setActiveFiltersCount(count);
  }, [
    searchTerm,
    selectedLocations,
    selectedIndustries,
    selectedTypes,
    selectedExperience,
  ]);

  // Toggle location filter
  const toggleLocation = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((loc) => loc !== location)
        : [...prev, location]
    );
  };

  // Toggle industry filter
  const toggleIndustry = (industry) => {
    setSelectedIndustries((prev) =>
      prev.includes(industry)
        ? prev.filter((ind) => ind !== industry)
        : [...prev, industry]
    );
  };

  // Toggle job type filter
  const toggleJobType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  // Toggle experience level filter
  const toggleExperience = (experience) => {
    setSelectedExperience((prev) =>
      prev.includes(experience)
        ? prev.filter((exp) => exp !== experience)
        : [...prev, experience]
    );
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedLocations([]);
    setSelectedIndustries([]);
    setSelectedTypes([]);
    setSelectedExperience([]);
  };

  // Filter section component
  const FilterSection = ({ title, options, selectedValues, toggleFn }) => (
    <div className="space-y-2">
      <div className="font-medium text-sm flex items-center justify-between">
        <span>{title}</span>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="space-y-1">
        {options.map((option) => (
          <div
            key={option}
            className="flex items-center space-x-2">
            <Checkbox
              id={option.replace(/\s+/g, "-").toLowerCase()}
              checked={selectedValues.includes(option)}
              onCheckedChange={() => toggleFn(option)}
            />
            <label
              htmlFor={option.replace(/\s+/g, "-").toLowerCase()}
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-background border-b px-2 py-4">
          <div className="w-full flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between ">
            <h1 className="text-2xl font-bold">Job Listings</h1>

            <div className="flex items-center space-x-2">
              {/* Filter button - now for all screen sizes */}
              <Sheet
                open={isFilterOpen}
                onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <Badge
                        variant="secondary"
                        className="ml-2">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                      Narrow down job listings based on your preferences.
                    </SheetDescription>
                  </SheetHeader>
                  <ScrollArea className="h-[calc(100vh-120px)] pr-4">
                    <div className="py-4 space-y-6">
                      <FilterSection
                        title="Location"
                        options={locations}
                        selectedValues={selectedLocations}
                        toggleFn={toggleLocation}
                      />

                      <Separator />

                      <FilterSection
                        title="Industry"
                        options={industries}
                        selectedValues={selectedIndustries}
                        toggleFn={toggleIndustry}
                      />

                      <Separator />

                      <FilterSection
                        title="Job Type"
                        options={jobTypes}
                        selectedValues={selectedTypes}
                        toggleFn={toggleJobType}
                      />

                      <Separator />

                      <FilterSection
                        title="Experience Level"
                        options={experienceLevels}
                        selectedValues={selectedExperience}
                        toggleFn={toggleExperience}
                      />
                    </div>
                    {activeFiltersCount > 0 && (
                      <Button
                        variant="outline"
                        onClick={clearAllFilters}
                        className="mt-4 mb-6">
                        Clear all filters
                      </Button>
                    )}
                  </ScrollArea>
                </SheetContent>
              </Sheet>

              {/* Search input */}
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search jobs..."
                  className="w-full md:w-[300px] pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-9 w-9 p-0"
                    onClick={() => setSearchTerm("")}>
                    <X className="h-4 w-4" />
                    <span className="sr-only">Clear search</span>
                  </Button>
                )}
              </div>

              {/* Sort dropdown */}
              <Select defaultValue="newest">
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="salary-high">
                    Salary: High to Low
                  </SelectItem>
                  <SelectItem value="salary-low">
                    Salary: Low to High
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active filters display */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedLocations.map((location) => (
                <Badge
                  key={location}
                  variant="secondary"
                  className="flex items-center gap-1">
                  {location}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => toggleLocation(location)}
                  />
                </Badge>
              ))}
              {selectedIndustries.map((industry) => (
                <Badge
                  key={industry}
                  variant="secondary"
                  className="flex items-center gap-1">
                  {industry}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => toggleIndustry(industry)}
                  />
                </Badge>
              ))}
              {selectedTypes.map((type) => (
                <Badge
                  key={type}
                  variant="secondary"
                  className="flex items-center gap-1">
                  {type}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => toggleJobType(type)}
                  />
                </Badge>
              ))}
              {selectedExperience.map((exp) => (
                <Badge
                  key={exp}
                  variant="secondary"
                  className="flex items-center gap-1">
                  {exp}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => toggleExperience(exp)}
                  />
                </Badge>
              ))}
            </div>
          )}
        </header>

        {/* Job Listings */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4">
            {filteredJobs.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground">
                  Showing {filteredJobs.length} of {jobListings.length} jobs
                </p>

                {filteredJobs.map((job) => (
                  <Card
                    key={job.id}
                    className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{job.title}</CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <Building className="h-3.5 w-3.5 mr-1" />
                            {job.company}
                          </CardDescription>
                        </div>
                        <Badge>{job.type}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="grid gap-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Briefcase className="h-3.5 w-3.5 mr-1" />
                          {job.experience} • {job.industry}
                        </div>
                        <div className="text-sm font-medium mt-1">
                          {job.salary}
                        </div>
                        <p className="text-sm mt-2">{job.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {job.skills.map((skill) => (
                            <Badge
                              key={skill}
                              variant="outline"
                              className="font-normal">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-3 text-xs text-muted-foreground">
                      <div>
                        Posted {job.posted} • {job.applicants} applicants
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline">
                          Save
                        </Button>
                        <Button size="sm">Match Candidates</Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-3 mb-4">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No jobs found</h3>
                <p className="text-muted-foreground mt-1 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button onClick={clearAllFilters}>Clear all filters</Button>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
