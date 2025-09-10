import { EventCard } from "@/lib/definitions";
import { EventsCard } from "@/components/events-card";

interface EventsGridProps {
  events: EventCard[];
  emptyState: {
    title: string;
    description: string;
    icon?: React.ReactNode;
  };
}

export function EventsGrid({ events, emptyState }: EventsGridProps) {
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="text-center space-y-4">
          {emptyState.icon && (
            <div className="mx-auto w-16 h-16 text-gray-400">
              {emptyState.icon}
            </div>
          )}
          <h3 className="text-xl font-semibold text-gray-700">
            {emptyState.title}
          </h3>
          <p className="text-gray-500 max-w-md">{emptyState.description}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {events.map((event) => (
        <EventsCard key={event.id} event={event} />
      ))}
    </div>
  );
}
