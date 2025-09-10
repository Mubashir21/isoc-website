import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "./ui/card";

export function PrayerCardSkeleton() {
  return (
    <div className="h-[372px] w-[380px] flex flex-col gap-6 p-6">
      <Skeleton className="h-[50px] w-[332px] rounded-lg" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-5 w-[250px]" />
        <Skeleton className="h-5 w-[250px]" />
        <Skeleton className="h-5 w-[250px]" />
        <Skeleton className="h-5 w-[250px]" />
        <Skeleton className="h-5 w-[250px]" />
        <Skeleton className="h-5 w-[250px]" />
        <Skeleton className="h-5 w-[250px]" />
      </div>
      <Skeleton className="h-10 w-[332px]" />
    </div>
  );
}

export function AnnouncementsSkeleton() {
  return (
    <div className="space-y-8">
      {Array.from({ length: 3 }, (_, sectionIndex) => (
        <div key={sectionIndex} className="relative">
          {/* Section header skeleton */}
          <div className="flex items-center gap-3 mb-6">
            <Skeleton className="w-12 h-12 rounded-full" />
            <Skeleton className="h-8 w-32" />
          </div>

          {/* Cards grid skeleton */}
          <div className="ml-18 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {Array.from(
              { length: sectionIndex === 0 ? 4 : 2 },
              (_, cardIndex) => (
                <Card key={cardIndex} className="border-l-4 border-l-gray-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3">
                      <Skeleton className="w-10 h-10 rounded-lg" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="pl-11 space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                      <Skeleton className="h-4 w-4/6" />
                    </div>
                  </CardContent>
                </Card>
              ),
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
