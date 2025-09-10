// components/EventDetail.tsx
"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  CalendarPlus,
  Share2,
  MapPin,
  Clock,
  Calendar,
  Users,
  Info,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  LocalDateDisplay,
  LocalTimeDisplay,
} from "@/components/date-time-display";

interface EventDetailProps {
  event: any;
}

export function EventDetail({ event }: EventDetailProps) {
  const eventDate = new Date(event.datetime);
  const currentDate = new Date();
  const eventsHref = "/events";
  const isPastEvent = eventDate < currentDate;

  const handleAddToCalendar = () => {
    const startDate = new Date(event.datetime);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

    const formatDate = (date: Date) =>
      date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${encodeURIComponent(`Speaker: ${event.speaker}\n\nEvent organized by UNM Islamic Society`)}&location=${encodeURIComponent(event.location)}`;

    window.open(googleCalendarUrl, "_blank");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: `Check out this event: ${event.title} by ${event.speaker}`,
          url: window.location.href,
        });
      } catch (err) {
        navigator.clipboard.writeText(window.location.href);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="space-y-8">
      {/* Back button and actions */}
      <div className="flex items-center justify-between">
        <Link href={eventsHref}>
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Events
          </Button>
        </Link>

        <div className="flex items-center gap-2">
          {!isPastEvent && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddToCalendar}
              className="gap-2"
            >
              <CalendarPlus className="h-4 w-4" />
              Add to Calendar
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="gap-2"
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      {/* Main event card */}
      <Card className="overflow-hidden border-2">
        {/* Hero image section */}
        <div className="relative h-64 md:h-80 lg:h-96 w-full">
          <Image
            src={event.pic_url}
            fill
            alt={`${event.title} event image`}
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {isPastEvent && (
            <Badge
              variant="secondary"
              className="absolute top-4 left-4 bg-gray-800 text-white border-gray-600"
            >
              Past Event
            </Badge>
          )}

          <div className="absolute bottom-6 left-6 right-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 leading-tight">
              {event.title}
            </h1>
            {event.speaker && (
              <p className="text-lg md:text-xl text-gray-200">
                by {event.speaker}
              </p>
            )}
          </div>
        </div>

        {/* Event details section */}
        <CardContent className="p-6 space-y-6">
          {/* Quick info grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-blue-600 font-medium">Date</p>
                <p className="font-semibold text-gray-800">
                  <LocalDateDisplay datetime={event.datetime} />
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-blue-600 font-medium">Time</p>
                <p className="font-semibold text-gray-800">
                  <LocalTimeDisplay datetime={event.datetime} />
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <MapPin className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-blue-600 font-medium">Location</p>
                <p className="font-semibold text-gray-800">{event.location}</p>
              </div>
            </div>
          </div>
          {/* Speaker info */}
          {event.speaker && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-800">Speaker</h3>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border">
                <p className="font-medium text-gray-800">{event.speaker}</p>
                {event.speaker_bio && (
                  <p className="text-sm text-gray-600 mt-2">
                    {event.speaker_bio}
                  </p>
                )}
              </div>
            </div>
          )}
          {/* Event description */}
          {event.description && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-800">
                  About This Event
                </h3>
              </div>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed text-sm text-justify">
                  {event.description}
                </p>
              </div>
            </div>
          )}

          {/* Additional details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
            {event.capacity && (
              <div>
                <p className="text-sm text-gray-600">Capacity</p>
                <p className="font-semibold text-gray-800">
                  {event.capacity} people
                </p>
              </div>
            )}

            {event.price && (
              <div>
                <p className="text-sm text-gray-600">Price</p>
                <p className="font-semibold text-gray-800">
                  {event.price === 0 ? "Free" : `$${event.price}`}
                </p>
              </div>
            )}

            {event.registration_required && (
              <div>
                <p className="text-sm text-gray-600">Registration</p>
                <p className="font-semibold text-gray-800">Required</p>
              </div>
            )}

            <div>
              <p className="text-sm text-gray-600">Event Status</p>
              <Badge
                variant={isPastEvent ? "secondary" : "default"}
                className="mt-1"
              >
                {isPastEvent ? "Completed" : "Upcoming"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
