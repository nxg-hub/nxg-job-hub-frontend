import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  interactive = false,
  onRatingChange,
  className,
}) {
  // Determine star size based on the size prop
  const getStarSize = () => {
    switch (size) {
      case "sm":
        return "w-3 h-3";
      case "lg":
        return "w-5 h-5";
      case "md":
      default:
        return "w-4 h-4";
    }
  };

  const starSize = getStarSize();

  // Handle star click for interactive ratings
  const handleStarClick = (selectedRating) => {
    if (interactive && onRatingChange) {
      onRatingChange(selectedRating);
    }
  };

  return (
    <div className={cn("flex items-center", className)}>
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;
        return (
          <Star
            key={index}
            className={cn(
              starSize,
              "transition-colors",
              starValue <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-muted-foreground",
              interactive && "cursor-pointer hover:text-yellow-400"
            )}
            onClick={() => interactive && handleStarClick(starValue)}
          />
        );
      })}
    </div>
  );
}
