import { Skeleton } from "@/components/ui/skeleton";

export function PrayerCardSkeleton() {
  return (
    <div className="h-[316px] w-[380px] flex flex-col gap-6 p-6">
      <Skeleton className="h-[50px] w-[332px] rounded-lg" />
      <div className="flex flex-col gap-2">
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
