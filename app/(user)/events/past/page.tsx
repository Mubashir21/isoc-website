import { EventsCard } from "@/components/events-card";
import { fetchPastEvents } from "@/lib/data";

export default async function Events() {
  const pastEvents = await fetchPastEvents();
  return (
    <main>
      {pastEvents?.map((event) => <EventsCard key={event.id} event={event} />)}
    </main>
  );
}
