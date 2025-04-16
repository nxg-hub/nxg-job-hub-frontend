import { MapPin, Briefcase, CircleUser } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import sarahicon from "@/static/images/admin-sarah.png";

export function CandidateCard({ candidate, isSelected, onClick }) {
  return (
    <div
      className={cn(
        "p-4 cursor-pointer transition-colors",
        isSelected ? "bg-accent" : "hover:bg-muted"
      )}
      onClick={onClick}>
      <div className="flex items-start gap-3">
        <div className="relative h-12 w-12 flex-shrink-0">
          <Avatar className="h-12 w-12 mb-4 border-none">
            <AvatarImage
              src={sarahicon}
              alt="Sarah"
            />
            <AvatarFallback>
              <CircleUser className="h-12 w-12 border-none" />
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-medium truncate">{candidate.name}</h3>
          <p className="text-sm text-muted-foreground truncate">
            {candidate.title}
          </p>

          <div className="mt-2 flex flex-wrap gap-1">
            {candidate.skills.slice(0, 3).map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="text-xs">
                {skill}
              </Badge>
            ))}
            {candidate.skills.length > 3 && (
              <Badge
                variant="outline"
                className="text-xs">
                +{candidate.skills.length - 3}
              </Badge>
            )}
          </div>

          <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center">
              <MapPin className="mr-1 h-3 w-3" />
              {candidate.location}
            </div>
            <div className="flex items-center">
              <Briefcase className="mr-1 h-3 w-3" />
              {candidate.preferredJobType}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
