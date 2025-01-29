import { EventsCard } from "@/components/events-card";
import { fetchPastEvents } from "@/lib/data";

export default async function Events() {
  const pastEvents = await fetchPastEvents();
  return (
    <main>
      <div className="flex flex-col gap-5">
        {pastEvents?.map((event) => (
          <EventsCard key={event.id} event={event} />
        ))}
      </div>
    </main>
  );
}
