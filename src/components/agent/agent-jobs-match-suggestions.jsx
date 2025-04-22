import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, X, Search, MapPin, Briefcase } from "lucide-react";

export default function AgentJobMatchSuggestions({ job, candidates, onClose }) {
  const [searchQuery, setSearchQuery] = useState("");

  // Calculate match scores based on skills, location, and availability
  const candidatesWithScores = candidates
    .map((candidate) => {
      // Calculate skill match percentage
      const skillMatchCount = candidate.skills.filter((skill) =>
        job.skills.includes(skill)
      ).length;
      const skillMatchPercentage =
        job.skills.length > 0 ? (skillMatchCount / job.skills.length) * 100 : 0;

      // Location match (exact match or remote)
      const locationMatch =
        candidate.location === job.location || job.location === "Remote";

      // Calculate overall match score (weighted)
      const overallScore =
        skillMatchPercentage * 0.7 + (locationMatch ? 30 : 0);

      return {
        ...candidate,
        matchScore: Math.round(overallScore),
        skillMatch: skillMatchCount,
        locationMatch,
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);

  // Filter candidates based on search query
  const filteredCandidates = candidatesWithScores.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="w-80 border-l h-full overflow-hidden flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-semibold">Match Suggestions</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-3 border-b">
        <div className="flex items-center gap-2 mb-2">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={job.companyLogo || "/placeholder.svg"}
              alt={job.company}
            />
            <AvatarFallback>{job.company.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{job.title}</p>
            <p className="text-xs text-muted-foreground">{job.company}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {job.skills.map((skill, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      <div className="p-3 border-b">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search candidates..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto p-0">
        {filteredCandidates.length > 0 ? (
          filteredCandidates.map((candidate) => (
            <CandidateMatchCard
              key={candidate.id}
              candidate={candidate}
              job={job}
            />
          ))
        ) : (
          <div className="p-8 text-center text-muted-foreground">
            <p>No matching candidates found</p>
          </div>
        )}
      </div>
    </div>
  );
}

const CandidateMatchCard = ({ candidate, job }) => {
  const [status, setStatus] = useState(null); // null, 'confirmed', 'rejected'

  const handleConfirm = () => {
    setStatus("confirmed");
    // In a real app, you would send this to an API
  };

  const handleReject = () => {
    setStatus("rejected");
    // In a real app, you would send this to an API
  };

  return (
    <Card className="rounded-none border-x-0 border-t-0 shadow-none">
      <CardHeader className="p-3 pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={candidate.avatar || "/placeholder.svg"}
                alt={candidate.name}
              />
              <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-sm">{candidate.name}</CardTitle>
              <p className="text-xs text-muted-foreground">{candidate.type}</p>
            </div>
          </div>
          <Badge
            variant={
              candidate.matchScore > 70
                ? "default"
                : candidate.matchScore > 40
                ? "secondary"
                : "outline"
            }
            className="text-xs">
            {candidate.matchScore}% Match
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-0 space-y-2">
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Match Score</span>
            <span>{candidate.matchScore}%</span>
          </div>
          <Progress
            value={candidate.matchScore}
            className="h-1"
          />
        </div>

        <div className="space-y-1 text-xs">
          {candidate.location && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{candidate.location}</span>
              {candidate.locationMatch && (
                <CheckCircle className="h-3 w-3 text-green-500 ml-auto" />
              )}
            </div>
          )}
          {candidate.currentRole && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Briefcase className="h-3 w-3" />
              <span>{candidate.currentRole}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-1">
          {candidate.skills.map((skill, index) => {
            const isMatch = job.skills.includes(skill);
            return (
              <Badge
                key={index}
                variant={isMatch ? "secondary" : "outline"}
                className={`text-xs ${
                  isMatch ? "border-green-200 bg-green-100" : ""
                }`}>
                {skill}
              </Badge>
            );
          })}
        </div>

        {status === null ? (
          <div className="flex gap-2 pt-1">
            <Button
              size="sm"
              className="w-full h-8"
              onClick={handleConfirm}>
              <CheckCircle className="h-3 w-3 mr-1" /> Confirm
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="w-full h-8"
              onClick={handleReject}>
              <X className="h-3 w-3 mr-1" /> Reject
            </Button>
          </div>
        ) : (
          <div className="pt-1">
            <Badge
              variant={status === "confirmed" ? "default" : "destructive"}
              className="w-full justify-center py-1">
              {status === "confirmed" ? (
                <span className="flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1" /> Confirmed
                </span>
              ) : (
                <span className="flex items-center">
                  <X className="h-3 w-3 mr-1" /> Rejected
                </span>
              )}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
