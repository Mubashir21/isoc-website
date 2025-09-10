import Pagination from "@/components/ui/pagination";
import Search from "@/components/ui/search";
import { AnnouncementsTable } from "@/components/ui/table";
import { CreateAnnouncement } from "@/components/ui/events-edit";
import { Suspense } from "react";
import { fetchAnnouncementsPages } from "@/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Announcements Management - ISOC Admin",
};

export default async function Page({
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

  const totalPages = await fetchAnnouncementsPages(query);

  return (
    <div className="w-full">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Announcements Management
        </h1>
        <p className="text-gray-600 mt-2">
          Manage announcements for your community
        </p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="w-full sm:w-auto">
          <Search placeholder="Search announcements..." />
        </div>
        <CreateAnnouncement />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <AnnouncementsTable query={query} currentPage={currentPage} />
      </div>

      <div className="mt-6 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
