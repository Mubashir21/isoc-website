import { EventsToggle } from "@/components/events-toggle";
import { FutureEventsCard } from "@/components/events-card";
import { fetchFutureEvents } from "@/lib/data";

export default async function Events() {
  const futureEvents = await fetchFutureEvents();
  return (
    <main>
      <div className="flex flex-col items-center gap-5">
        <EventsToggle />
        {futureEvents?.map((event) => (
          <FutureEventsCard key={event.id} event={event} />
        ))}
      </div>
    </main>
  );
}
