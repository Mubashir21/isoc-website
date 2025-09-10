import { AnnouncementCardSkeleton } from "@/components/skeletons/announcementcard-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

interface AnnouncementsSectionSkeletonProps {
  title: string;
  count?: number;
}

export function AnnouncementsSectionSkeleton({
  title,
  count = 3,
}: AnnouncementsSectionSkeletonProps) {
  return (
    <div className="bg-gray-200 rounded-xl p-5">
      <div className="flex flex-col gap-3">
        <p className="text-3xl font-bold text-blue-600 mb-2">{title}</p>
        <div className="flex flex-col gap-3">
          {Array.from({ length: count }, (_, i) => (
            <AnnouncementCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
