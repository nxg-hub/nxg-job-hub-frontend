import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Filter, RefreshCw, X } from "lucide-react";
import { useFeaturedTalent } from "@/hooks/Employer/employerHooks";
import FeaturedTalentCard from "@/components/Employer/Featured Talents/featuredTalentCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const filterOptions = [
  { label: "All", value: "all" },
  { label: "Frontend Developer", value: "frontend-dev" },
  { label: "UI/UX Designer", value: "ui/ux" },
  { label: "Backend Developer", value: "backend-dev" },
  { label: "Project Manager", value: "pm" },
  { label: "Data Analyst", value: "data-analyst" },
  { label: "Business Analyst", value: "business-analyst" },
  { label: "Scrum Master", value: "scrum-master" },
  { label: "Others", value: "others" },
];

export default function FeaturedTalentPagesTab() {
  const { data: featuredTalents, isFetching, isError } = useFeaturedTalent();
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  //filter featured talent
  const filteredFeaturedTalent =
    filter === "all"
      ? featuredTalents
      : featuredTalents.filter((talent) => talent.talentTechStack === filter);

  //Paginate talent
  const totalPages = Math.ceil(filteredFeaturedTalent?.length / itemsPerPage);
  const displayedFeaturedTalents = filteredFeaturedTalent?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  //rest page when filter changes
  const handleFilterChange = (val) => {
    setFilter(val);
    setCurrentPage(1);
  };

  if (isFetching)
    return (
      <div className="flex gap-4 ">
        {Array.from({ length: 4 }).map((_, index) => (
          <LoadingSkeleton
            key={index}
            className="min-w-[280px] flex-shrink-0"
          />
        ))}
      </div>
    );

  if (isError)
    return (
      <div className="w-full py-20 flex flex-col gap-2 justify-center items-center border rounded-lg">
        <h1 className="font-medium text-lg">Error!</h1>
        <p className="text-sm italic text-center text-gray-400">
          Something went wrong, Please try again
        </p>
        <Button
          size="sm"
          className="border-none bg-sky-500 text-white hover:bg-sky-600"
        >
          Refresh
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>
    );

  return (
    <div className="min-h-screen bg-stone-50 py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-semibold text-sm md:text-xl text-foreground">
            Featured Talents
          </h1>
          <div>
            <Select defaultValue="all" onValueChange={handleFilterChange}>
              <SelectTrigger className="font-normal text-xs md:text-sm">
                <Filter className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                <SelectValue placeholder="Filters" />
              </SelectTrigger>

              <SelectContent>
                {filterOptions.map((i) => (
                  <SelectItem key={i.value} value={i.value}>
                    {i.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-4">
          Showing {displayedFeaturedTalents?.length * currentPage} of{" "}
          {featuredTalents?.length} featured talents
        </p>

        {/* Featured Talents Grid */}
        {displayedFeaturedTalents?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {displayedFeaturedTalents?.map((applicant) => (
              <FeaturedTalentCard
                key={applicant.id}
                featuredTalent={applicant}
              />
            ))}
          </div>
        ) : (
          <Card className="p-8 bg-white border border-stone-200 text-center">
            <p className="text-muted-foreground">
              No applicants found matching your filters.
            </p>
          </Card>
        )}

        {/* Pagination */}
        {displayedFeaturedTalents?.length > 0 && (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={
                  currentPage === page
                    ? "bg-primary hover:bg-secondary text-white border-transparent"
                    : ""
                }
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

const LoadingSkeleton = ({ className }) => {
  return (
    <Card className={cn("animate-pulse", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-muted rounded-lg">
              <div className="h-6 w-6 bg-gray-300 rounded animate-shimmer" />
            </div>
            <div className="flex flex-col space-y-2">
              <div className="h-4 w-24 bg-gray-300 rounded animate-shimmer" />
              <div className="h-8 w-20 bg-gray-300 rounded animate-shimmer" />
            </div>
          </div>
          <div className="flex flex-col items-end space-y-1">
            <div className="h-6 w-16 bg-gray-300 rounded-full animate-shimmer" />
            <div className="h-3 w-20 bg-gray-300 rounded animate-shimmer" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
