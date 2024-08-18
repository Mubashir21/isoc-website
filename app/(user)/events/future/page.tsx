import { EventsCard } from "@/components/events-card";
import { fetchFutureEvents } from "@/lib/data";

export default async function Events() {
  const futureEvents = await fetchFutureEvents();
  return (
    <main>
      <div className="flex flex-col gap-5">
        {futureEvents?.map((event) => (
          <EventsCard key={event.id} event={event} />
        ))}
      </div>
    </main>
  );
}
