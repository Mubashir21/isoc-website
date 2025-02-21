import { EventsCard } from "@/components/events-card";
import { fetchFutureEvents } from "@/lib/data";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default async function Events() {
  const futureEvents = await fetchFutureEvents();
  return (
    <main className="h-full">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Future Events</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col md:grid md:grid-cols-[repeat(auto-fill,minmax(330px,1fr))] gap-5 mt-5">
        {futureEvents.length > 0 ? (
          futureEvents?.map((event) => (
            <EventsCard key={event.id} event={event} />
          ))
        ) : (
          <p className="text-gray-500">
            No future events. Stay tuned because we are cooking!
          </p>
        )}
      </div>
    </main>
  );
}
