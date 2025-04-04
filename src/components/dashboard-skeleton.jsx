import { Skeleton } from "./ui/skeleton";
import { JobCardSkeleton } from "./job-card-skeleton";

export function DashboardSkeleton() {
  // Default to expanded sidebar for skeleton
  const sidebarCollapsed = false;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Skeleton */}
      <div
        className={`${
          sidebarCollapsed ? "w-[70px]" : "w-64"
        } bg-[#0078B4] text-white flex flex-col`}>
        <div
          className={`p-4 flex items-center ${
            sidebarCollapsed ? "justify-center" : "gap-2"
          }`}>
          <Skeleton className="h-10 w-10 bg-white/20" />
          {!sidebarCollapsed && (
            <div className="space-y-1">
              <Skeleton className="h-4 w-20 bg-white/20" />
              <Skeleton className="h-4 w-16 bg-white/20" />
            </div>
          )}
        </div>

        <div
          className={`mt-6 px-4 flex flex-col items-center ${
            sidebarCollapsed && "px-2"
          }`}>
          <Skeleton
            className={`${
              sidebarCollapsed ? "h-10 w-10" : "h-20 w-20"
            } rounded-full bg-white/20`}
          />
          {!sidebarCollapsed && (
            <>
              <Skeleton className="mt-2 h-5 w-16 bg-white/20" />
              <Skeleton className="mt-1 h-4 w-24 bg-white/20" />
            </>
          )}
        </div>

        <nav className="mt-8 flex-1 px-2">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <Skeleton
                key={i}
                className={`h-10 w-full my-1 bg-white/20 ${
                  sidebarCollapsed && "mx-auto"
                }`}
              />
            ))}
        </nav>

        <div className="p-4">
          <Skeleton className="h-10 w-full bg-white/20" />
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 overflow-auto">
        {/* Header Skeleton */}
        <header className="bg-white p-4 flex justify-between items-center border-b">
          <div className="flex items-center">
            <Skeleton className="h-5 w-5 mr-2 md:hidden" />
            <Skeleton className="h-7 w-48" />
          </div>
          <Skeleton className="h-10 w-10 rounded-full" />
        </header>

        {/* Search Section Skeleton */}
        <div className="p-4 bg-white border-b">
          <Skeleton className="h-4 w-24 mb-2" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-10 flex-1 min-w-[200px]" />
            <Skeleton className="h-10 flex-1 min-w-[200px]" />
            <Skeleton className="h-10 flex-1 min-w-[200px]" />
            <Skeleton className="h-10 flex-1 min-w-[200px]" />
            <Skeleton className="h-10 w-24" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>

        {/* Profile Completion Skeleton */}
        <div className="p-4">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 flex flex-wrap gap-6">
              <div className="flex-1 min-w-[300px]">
                <Skeleton className="h-7 w-64 mb-2" />
                <Skeleton className="h-4 w-full max-w-md mb-2" />
                <Skeleton className="h-4 w-3/4 max-w-sm mb-4" />
                <Skeleton className="h-10 w-36" />
              </div>
              <div className="flex-1 min-w-[300px] flex justify-center">
                <Skeleton className="h-[150px] w-[300px]" />
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Jobs Skeleton */}
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <JobCardSkeleton key={i} />
              ))}
          </div>
        </div>

        {/* Jobs Near You Skeleton */}
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <JobCardSkeleton key={i} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
