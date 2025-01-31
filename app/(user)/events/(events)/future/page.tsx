import { EventsCard } from "@/components/events-card";
import { fetchFutureEvents } from "@/lib/data";

export default async function Events() {
  const futureEvents = await fetchFutureEvents();
  return (
    <main>
      <div className="flex flex-col gap-5">
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
