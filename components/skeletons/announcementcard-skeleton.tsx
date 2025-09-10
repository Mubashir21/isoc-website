import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AnnouncementCardSkeleton() {
  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="relative z-10">
        <div className="flex items-start gap-3">
          {/* Icon skeleton */}
          <Skeleton className="h-10 w-10 rounded-lg" />
          <div className="flex-1 min-w-0 space-y-2">
            {/* Title skeleton */}
            <Skeleton className="h-6 w-3/4" />
            {/* Date/time skeleton */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Skeleton className="h-3.5 w-3.5" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="flex items-center gap-1.5">
                <Skeleton className="h-3.5 w-3.5" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative z-10 pt-0">
        <div className="pl-11 space-y-2">
          {/* Content skeleton - multiple lines */}
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      </CardContent>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600" />
    </Card>
  );
}
