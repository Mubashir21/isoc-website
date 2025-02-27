export const dynamic = "force-dynamic";

import { EventsCard } from "@/components/events-card";
import { fetchPastEvents } from "@/lib/data";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default async function Events() {
  const pastEvents = await fetchPastEvents();
  return (
    <main className="h-full ">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Past Events</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col md:grid md:grid-cols-[repeat(auto-fill,minmax(330px,1fr))] gap-5 mt-5">
        {pastEvents.length > 0 ? (
          pastEvents?.map((event) => (
            <EventsCard key={event.id} event={event} />
          ))
        ) : (
          <p className="text-gray-500">No past events.</p>
        )}
      </div>
    </main>
  );
}
