// events/[id]/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import { fetchEventById } from "@/lib/data";
import EventPictures from "@/components/ui/event-pictures";
import { EventDetail } from "@/components/ui/event-details";
import { ResponsiveContainer } from "@/components/responsive-container";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const event = await fetchEventById(id);
    const eventDate = new Date(event.datetime).toLocaleDateString("en-MY", {
      weekday: "long",
      year: "numeric", 
      month: "long",
      day: "numeric",
    });
    
    return {
      title: `${event.title} | Events | Islamic Society UNM`,
      description: `Join us for ${event.title} on ${eventDate}. ${event.description || "Organized by the Islamic Society at the University of Nottingham Malaysia."}`,
      keywords: [
        event.title,
        "ISOC event",
        "Islamic Society UNM",
        event.type || "community event",
        "University Nottingham Malaysia",
        "Muslim student activity"
      ],
      openGraph: {
        title: `${event.title} | Islamic Society UNM`,
        description: `Join us for ${event.title} on ${eventDate}.`,
        type: "website",
        images: event.pic_url ? [{ url: event.pic_url, alt: event.title }] : undefined,
      },
    };
  } catch (error) {
    return {
      title: "Event | Islamic Society UNM",
      description: "Event details from the Islamic Society at the University of Nottingham Malaysia.",
    };
  }
}

// Event pictures skeleton
function EventPicturesSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-48" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }, (_, i) => (
          <Skeleton key={i} className="aspect-square rounded-lg" />
        ))}
      </div>
    </div>
  );
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await fetchEventById(id);
  const eventDate = new Date(event.datetime);
  const currentDate = new Date();
  const eventsHref = "/events";

  // Check if event was more than 24 hours ago (for pictures)
  const showPictures = eventDate < new Date(Date.now() - 24 * 60 * 60 * 1000);

  return (
    <main>
      <ResponsiveContainer
        maxWidth={{
          default: "xl",
          md: "2xl",
          lg: "2xl",
          xl: "7xl",
        }}
      >
        <div className="space-y-8">
          {/* Breadcrumb */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={eventsHref}>Events</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{event.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Unified event detail */}
          <EventDetail event={event} />

          {/* Event pictures (if available) */}
          {/* {showPictures && (
            <div className="bg-white rounded-xl p-6 border-2">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Event Photos
              </h2>
              <Suspense fallback={<EventPicturesSkeleton />}>
                <EventPictures id={id} />
              </Suspense>
            </div>
          )} */}
        </div>
      </ResponsiveContainer>
    </main>
  );
}
