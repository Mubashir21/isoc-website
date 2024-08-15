import Pagination from "@/components/ui/pagination";
import Search from "@/components/ui/search";
import Table from "@/components/ui/table";
import { CreateEvent } from "@/components/ui/events-edit";
// import { lusitana } from "@/app/ui/fonts";
// import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { fetchEventsPages } from "@/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchEventsPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        {/* <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1> */}
        <h1 className={`text-2xl`}>Events</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search events..." />
        <CreateEvent />
      </div>
      {/* <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}> */}
      <Table query={query} currentPage={currentPage} />
      {/* </Suspense> */}
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
