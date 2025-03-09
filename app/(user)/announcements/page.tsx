export const dynamic = "force-dynamic";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import AnnouncementCard from "@/components/ui/announcements-card";
import {
  fetchPastAnnouncementsPages,
  fetchTodayAnnouncements,
} from "@/lib/data";
import Pagination from "@/components/ui/pagination";
import { PastAnnouncements } from "@/components/ui/announcements";

export default async function Announcements({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchPastAnnouncementsPages(query);

  const todayAnnouncements = await fetchTodayAnnouncements();
  return (
    <div className="flex flex-col gap-4">
      <div className="lg:px-28 md:px-16 2xl:px-64">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Announcements</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="bg-gray-200 rounded-xl ">
        <div className="lg:px-28 md:px-16 2xl:px-64 p-3 md:p-5 ">
          <p className="text-3xl font-bold text-blue-600 mb-5">Today</p>
          <div className="flex flex-col gap-3">
            {todayAnnouncements.length > 0 ? (
              todayAnnouncements.map((announcement) => (
                <AnnouncementCard
                  key={announcement.id}
                  announcement={announcement}
                />
              ))
            ) : (
              <p className="text-gray-500">No announcements for today.</p>
            )}
          </div>
        </div>
      </div>
      <div className="bg-gray-200 rounded-xl ">
        <div className="lg:px-28 md:px-16 2xl:px-64 p-3 md:p-5 ">
          <p className="text-3xl font-bold text-blue-600 mb-5">Past</p>
          <PastAnnouncements query={query} currentPage={currentPage} />
          <div className="flex mt-5 w-full justify-center">
            <Pagination totalPages={totalPages} />
          </div>
        </div>
      </div>
    </div>
  );
}
