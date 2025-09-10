export const dynamic = "force-dynamic";

import { Suspense } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ResponsiveContainer } from "@/components/responsive-container";
import { AnnouncementTimeline } from "@/components/announcement-timeline";
import { AnnouncementsSkeleton } from "@/components/skeletons";

export default async function AnnouncementsPage({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const query = params?.query || "";
  const currentPage = Number(params?.page) || 1;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <ResponsiveContainer
        maxWidth={{
          default: "xl",
          md: "2xl",
          lg: "2xl",
          xl: "7xl",
        }}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-800">
                Announcements
              </h1>
              <p className="text-gray-600 mt-2">
                Stay updated with the latest news from UNM ISOC
              </p>
            </div>
          </div>
        </div>
      </ResponsiveContainer>

      {/* Timeline Section */}
      <ResponsiveContainer
        maxWidth={{
          default: "xl",
          md: "2xl",
          lg: "2xl",
          xl: "7xl",
        }}
      >
        <Suspense fallback={<AnnouncementsSkeleton />}>
          <AnnouncementTimeline query={query} currentPage={currentPage} />
        </Suspense>
      </ResponsiveContainer>
    </div>
  );
}
