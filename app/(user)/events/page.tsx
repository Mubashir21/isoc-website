import { EventsToggle } from "@/components/events-toggle";
import { FutureEventsCard } from "@/components/events-card";

export default async function Events() {
  return (
    <main>
      <div className="flex flex-col items-center gap-5">
        <EventsToggle />
        <FutureEventsCard />
        <FutureEventsCard />
        <FutureEventsCard />
      </div>
    </main>
  );
}
