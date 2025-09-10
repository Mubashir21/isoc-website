// app/admin/events/page.tsx
import Pagination from "@/components/ui/pagination";
import Search from "@/components/ui/search";
import { RegularEventsTable } from "@/components/ui/table";
import { RecurringEventsTable } from "@/components/ui/recurring-events-table";
import { CreateEventButton } from "@/components/ui/create-event-button";
import { EventTypeFilter } from "@/components/ui/event-type-filter";
import { fetchEventsPages, fetchAdmins } from "@/lib/data";
import { Metadata } from "next";
import { Suspense } from "react";
import { Calendar, Repeat, Clock, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Events Management - ISOC Admin",
};

interface SearchParams {
  query?: string;
  page?: string;
  tab?: string; // 'regular' | 'recurring'
  category?: string; // 'lecture' | 'sports' | 'masjid' | 'major'
}

export default async function EventsPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const resolvedSearchParams = (await searchParams) || {};
  const query = resolvedSearchParams.query || "";
  const currentPage = Number(resolvedSearchParams.page) || 1;
  const activeTab = resolvedSearchParams.tab || "regular";
  const category = resolvedSearchParams.category || "all";

  const [regularPages, recurringPages, admins] = await Promise.all([
    fetchEventsPages(query, "regular", category),
    fetchEventsPages(query, "recurring", category),
    fetchAdmins(),
  ]);

  console.log("hello" +  recurringPages);

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Events Management
        </h1>
        <p className="text-gray-600 mt-2">
          Manage all events for your community
        </p>
      </div>

      {/* Quick Stats */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          icon={Calendar}
          label="Total Events"
          count="12"
          color="blue"
        />
        <StatsCard icon={Clock} label="Upcoming" count="8" color="green" />
        <StatsCard icon={Repeat} label="Recurring" count="5" color="purple" />
        <StatsCard icon={Users} label="This Week" count="3" color="orange" />
      </div> */}

      {/* Filters and Actions */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="w-full sm:w-64">
            <Search placeholder="Search events..." />
          </div>
          {/* <EventTypeFilter currentType="all" currentCategory={category} /> */}
        </div>
        <CreateEventButton admins={admins} />
      </div>

      {/* Events Tables with Tabs */}
      <Tabs defaultValue={activeTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="regular" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Regular Events
          </TabsTrigger>
          <TabsTrigger value="recurring" className="flex items-center gap-2">
            <Repeat className="h-4 w-4" />
            Recurring Events
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="regular" className="mt-6">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <Suspense fallback={<div className="p-4">Loading regular events...</div>}>
              <RegularEventsTable
                query={query}
                currentPage={currentPage}
                category={category}
              />
            </Suspense>
          </div>
          
          {/* Pagination for Regular Events */}
          {regularPages > 1 && (
            <div className="flex justify-center mt-6">
              <Pagination totalPages={regularPages} />
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="recurring" className="mt-6">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <Suspense fallback={<div className="p-4">Loading recurring events...</div>}>
              <RecurringEventsTable
                query={query}
                currentPage={currentPage}
                category={category}
              />
            </Suspense>
          </div>
          
          {/* Pagination for Recurring Events */}
          {recurringPages > 1 && (
            <div className="flex justify-center mt-6">
              <Pagination totalPages={recurringPages} />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatsCard({
  icon: Icon,
  label,
  count,
  color,
}: {
  icon: any;
  label: string;
  count: string;
  color: string;
}) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
      <div className="flex items-center">
        <div
          className={`p-2 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-2xl font-semibold text-gray-900">{count}</p>
        </div>
      </div>
    </div>
  );
}
