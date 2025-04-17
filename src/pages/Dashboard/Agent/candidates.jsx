import { useEffect, useState } from "react";
import { candidatesData } from "@/utils/data/candidates";
import { CandidateList } from "@/components/Candidates/candidate-list";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CandidateDetails } from "@/components/Candidates/candidate-details";
import { SearchFilters } from "@/components/Candidates/search-filters";

export default function CandidatesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [availableJobs, setAvailableJobs] = useState([]);
  const [searchParams, setSearchParams] = useState({
    query: "",
    skills: [],
    location: "",
    experience: "",
    jobType: "",
  });

  const handleSearch = (params) => {
    setSearchParams(params);

    // Filter candidates based on search parameters
    let filtered = [...candidatesData];

    if (params.query) {
      const query = params.query.toLowerCase();
      filtered = filtered.filter(
        (candidate) =>
          candidate.name.toLowerCase().includes(query) ||
          candidate.title.toLowerCase().includes(query) ||
          candidate.bio.toLowerCase().includes(query)
      );
    }

    if (params.skills.length > 0) {
      filtered = filtered.filter((candidate) =>
        params.skills.some((skill) =>
          candidate.skills
            .map((s) => s.toLowerCase())
            .includes(skill.toLowerCase())
        )
      );
    }

    if (params.location) {
      filtered = filtered.filter((candidate) =>
        candidate.location.toLowerCase().includes(params.location.toLowerCase())
      );
    }

    if (params.experience) {
      const minYears = Number.parseInt(params.experience);
      filtered = filtered.filter(
        (candidate) => candidate.yearsOfExperience >= minYears
      );
    }

    if (params.jobType) {
      filtered = filtered.filter(
        (candidate) =>
          candidate.preferredJobType.toLowerCase() ===
          params.jobType.toLowerCase()
      );
    }

    setCandidates(filtered);
    if (filtered.length > 0) {
      setSelectedCandidate(filtered[0]);
    }
  };

  const handleSelectCandidate = (candidate) => {
    setSelectedCandidate(candidate);
  };

  useEffect(() => {
    // Simulate API fetch for available jobs
    const mockJobs = [
      {
        id: "j1",
        title: "Frontend Developer",
        company: "Tech Solutions Inc.",
      },
      { id: "j2", title: "UX Designer", company: "Creative Minds LLC" },
      { id: "j3", title: "Full Stack Engineer", company: "WebBuild Co." },
      { id: "j4", title: "Furniture Making (Carpentry)", company: "Zompa Co." },
    ];
    // Simulate API fetch for candidates
    const fetchCandidates = async () => {
      setIsLoading(true);
      setTimeout(() => {
        setCandidates(candidatesData);
        setSelectedCandidate(candidatesData[0]);
        setAvailableJobs(mockJobs);
        setIsLoading(false);
      }, 800);
    };
    fetchCandidates();
  }, []);

  return (
    <div className="mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">Candidate Search</h1>

      <SearchFilters
        onSearch={handleSearch}
        searchParams={searchParams}
      />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Card
                  key={i}
                  className="animate-pulse">
                  <CardHeader>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {[...Array(3)].map((_, j) => (
                        <div
                          key={j}
                          className="h-6 bg-gray-200 rounded-full w-16"></div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <CandidateList
              candidates={candidates}
              selectedCandidate={selectedCandidate}
              onSelectCandidate={handleSelectCandidate}
            />
          )}
        </div>
        <div className="lg:col-span-2">
          {selectedCandidate ? (
            <CandidateDetails
              candidate={selectedCandidate}
              availableJobs={availableJobs}
            />
          ) : (
            <div className="bg-muted rounded-lg p-6 text-center">
              <p className="text-muted-foreground">
                Select a candidate to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
