import { useState } from "react";
import { CandidateDetails } from "@/components/candidates/candidate-details";
import { SearchFilters } from "@/components/candidates/search-filters";
import { candidatesData } from "@/utils/data/candidates";
import { CandidateList } from "@/components/Candidates/candidate-list";

export default function CandidatesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [candidates, setCandidates] = useState(candidatesData);
  const [selectedCandidate, setSelectedCandidate] = useState(candidatesData[0]);
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

  return (
    <div className="mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">Candidate Search</h1>

      <SearchFilters
        onSearch={handleSearch}
        searchParams={searchParams}
      />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <CandidateList
            candidates={candidates}
            selectedCandidate={selectedCandidate}
            onSelectCandidate={handleSelectCandidate}
          />
        </div>
        <div className="lg:col-span-2">
          {selectedCandidate ? (
            <CandidateDetails candidate={selectedCandidate} />
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
