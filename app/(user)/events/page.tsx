import { Suspense } from "react";
import {
  fetchFutureEvents,
  fetchPastEvents,
  fetchRecurringEvents,
} from "@/lib/data";
import { EventCard } from "@/lib/definitions";
import { EventsCard } from "@/components/events-card";
import { EventsPageSkeleton } from "@/components/skeletons/events-skeleton";
import { RecurringEventsTable } from "@/components/recurring-events-table";
import {
  Calendar,
  Clock,
  Sparkles,
  Archive,
  Plus,
  Filter,
  Search,
  Repeat,
  BookOpen,
  Users,
  Trophy,
  Building,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer } from "@/components/responsive-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const eventTypeConfig = {
  lecture: {
    label: "Lectures",
    icon: BookOpen,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  sports: {
    label: "Sports",
    icon: Trophy,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  masjid: {
    label: "Masjid",
    icon: Building,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  major: {
    label: "Major",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
};

async function EventsContent() {
  const [futureEvents, pastEvents, recurringEvents] = await Promise.all([
    fetchFutureEvents(),
    fetchPastEvents(),
    fetchRecurringEvents(),
  ]);

  // Group events by type for better organization
  const groupEventsByType = (events: EventCard[]) => {
    return events.reduce((acc: Record<string, EventCard[]>, event) => {
      const type = event.type || "lecture";
      if (!acc[type]) acc[type] = [];
      acc[type].push(event);
      return acc;
    }, {});
  };

  const futureEventsByType = groupEventsByType(futureEvents);
  const pastEventsByType = groupEventsByType(pastEvents);

  return (
    <main className="h-full">
      <ResponsiveContainer
        maxWidth={{
          default: "xl",
          md: "2xl",
          lg: "2xl",
          xl: "7xl",
        }}
      >
        <div className="flex flex-col gap-6">
          {/* Enhanced Header Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-800">Events</h1>
                <p className="text-gray-600 mt-2">
                  Stay connected with our society activities and programs
                </p>
              </div>
            </div>
          </div>

          {/* Regular Programs Section with Heading */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <Repeat className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Regular Events
              </h2>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Ongoing weekly and monthly activities at the UNM Islamic Center
            </p>
            <RecurringEventsTable events={recurringEvents} />
          </section>

          {/* Special Events Section with Heading */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="h-6 w-6 text-amber-600" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Special Events
              </h2>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              One-time events, celebrations, and special programs
            </p>

            {/* Main Events Section with Enhanced Tabs */}
            <div className="space-y-6">
              <Tabs defaultValue="future" className="w-full">
                <div className="flex items-center justify-between mb-4">
                  <TabsList className="grid w-full max-w-md grid-cols-2 bg-muted/50">
                    <TabsTrigger
                      value="future"
                      className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Upcoming</span>
                        {futureEvents.length > 0 && (
                          <Badge variant="secondary" className="ml-1 text-xs">
                            {futureEvents.length}
                          </Badge>
                        )}
                      </div>
                    </TabsTrigger>
                    <TabsTrigger
                      value="past"
                      className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    >
                      <div className="flex items-center gap-2">
                        <Archive className="h-4 w-4" />
                        <span>Past</span>
                        {pastEvents.length > 0 && (
                          <Badge variant="secondary" className="ml-1 text-xs">
                            {pastEvents.length}
                          </Badge>
                        )}
                      </div>
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="future" className="space-y-6 mt-4">
                  {futureEvents.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-border/60 bg-white/50 backdrop-blur-sm p-6">
                      <div className="flex flex-col items-center justify-center py-8">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 mb-4">
                          <Sparkles className="h-8 w-8 text-blue-500" />
                        </div>
                        <div className="text-center space-y-2 max-w-md">
                          <h3 className="text-xl font-semibold text-foreground">
                            Something exciting is coming
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            We&apos;re planning amazing events for our community.
                            Check out our regular programs above or stay tuned
                            for special event announcements.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-blue-600" />
                        <div>
                          <h3 className="text-lg font-medium">
                            All Upcoming Events
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {futureEvents.length} upcoming event
                            {futureEvents.length !== 1 ? "s" : ""}
                          </p>
                        </div>
                      </div> */}
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {futureEvents.map((event) => (
                          <EventsCard key={event.id} event={event} />
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="past" className="space-y-6 mt-4">
                  {pastEvents.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-border/60 bg-white/50 backdrop-blur-sm p-6">
                      <div className="flex flex-col items-center justify-center py-8">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 mb-4">
                          <Archive className="h-8 w-8 text-gray-400" />
                        </div>
                        <div className="text-center space-y-2 max-w-md">
                          <h3 className="text-xl font-semibold text-foreground">
                            Building our event history
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            As we host more community events, you&apos;ll be able to
                            browse through our past activities and memories
                            here.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Archive className="h-5 w-5 text-gray-600" />
                        <div>
                          <h3 className="text-lg font-medium">
                            All Past Events
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {pastEvents.length} past event
                            {pastEvents.length !== 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {pastEvents.map((event) => (
                          <EventsCard key={event.id} event={event} />
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </section>
        </div>
      </ResponsiveContainer>
    </main>
  );
}

export default function EventsPage() {
  return (
    <Suspense fallback={<EventsPageSkeleton />}>
      <EventsContent />
    </Suspense>
  );
}
