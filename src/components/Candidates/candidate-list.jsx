import { ScrollArea } from "@/components/ui/scroll-area";
import { CandidateCard } from "./candidate-card";

export function CandidateList({
  candidates,
  selectedCandidate,
  onSelectCandidate,
}) {
  return (
    <div className="bg-card rounded-lg border shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">
          Candidates ({candidates.length})
        </h2>
      </div>

      {candidates.length === 0 ? (
        <div className="p-6 text-center">
          <p className="text-muted-foreground">
            No candidates match your search criteria
          </p>
        </div>
      ) : (
        <ScrollArea className="h-[calc(100vh-280px)]">
          <div className="divide-y">
            {candidates.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                isSelected={selectedCandidate?.id === candidate.id}
                onClick={() => onSelectCandidate(candidate)}
              />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
