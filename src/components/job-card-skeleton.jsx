import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export function JobCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 pb-0 flex flex-row justify-between items-start">
        <div className="flex gap-2">
          <Skeleton className="w-8 h-8 rounded" />
          <div>
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
        <Skeleton className="h-8 w-8 rounded-full" />
      </CardHeader>
      <CardContent className="p-4">
        <Skeleton className="h-5 w-32 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-3" />
        <div className="flex flex-wrap gap-2 mb-3">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-14" />
        </div>
        <Skeleton className="h-5 w-20" />
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center border-t">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-9 w-24" />
      </CardFooter>
    </Card>
  );
}
