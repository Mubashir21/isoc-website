"use client";
import Image from "next/image";
import { Card, CardTitle, CardDescription } from "./ui/card";
import { cn, formatDuration } from "@/lib/utils";
import { EventCard } from "@/lib/definitions";
import { LocalDateDisplay, LocalTimeDisplay } from "./date-time-display";
import Title from "./ui/event-detail-link";
import { Badge } from "./ui/badge";
import {
  School,
  PartyPopper,
  MapPin,
  Clock,
  Calendar,
  CalendarPlus,
  Trophy,
  Hourglass,
} from "lucide-react";
import MosqueOutlinedIcon from "@mui/icons-material/MosqueOutlined";
import { Button } from "./ui/button";

const eventTypeConfig = {
  lecture: {
    icon: <School className="h-4 w-4" />,
    label: "Lecture",
    className: "bg-blue-100 text-blue-700 border-blue-200",
  },
  sports: {
    icon: <Trophy className="h-4 w-4" />,
    label: "Sports",
    className: "bg-orange-100 text-orange-700 border-orange-200",
  },
  masjid: {
    icon: <MosqueOutlinedIcon className="h-4 w-4" />,
    label: "Masjid Event",
    className: "bg-green-100 text-green-700 border-green-200",
  },
  major: {
    icon: <PartyPopper className="h-4 w-4" />,
    label: "Major Event",
    className: "bg-purple-100 text-purple-700 border-purple-200",
  },
};

type CardProps = React.ComponentProps<typeof Card>;

export function EventsCard({
  event,
  className,
  ...props
}: { event: EventCard } & CardProps) {
  const typeConfig = eventTypeConfig[event.type] || eventTypeConfig.lecture;

  // ADD THIS: Check if event is in the past
  const eventDate = new Date(event.datetime);
  const currentDate = new Date();
  const isPastEvent = eventDate < currentDate;

  return (
    <Card
      className={cn(
        "group w-full max-w-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col h-[520px]">
        {/* Image Section */}
        <div className="relative h-96 overflow-hidden">
          <Image
            src={event.pic_url}
            fill
            alt={`${event.title} event image`}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

          {/* Event type badge */}
          <Badge
            variant="secondary"
            className={cn(
              "absolute top-3 right-3 flex items-center gap-1.5 font-medium shadow-lg border",
              typeConfig.className,
            )}
          >
            {typeConfig.icon}
            {typeConfig.label}
          </Badge>

          {/* Recurring event indicator */}
          {/* {event.is_recurring && (
            <Badge
              variant="secondary"
              className="absolute top-3 left-3 bg-yellow-100 text-yellow-700 border-yellow-200 shadow-lg border"
            >
              <CalendarPlus className="h-3 w-3" />
              Recurring
            </Badge>
          )} */}

          {/* Gender badge */}
          <Badge
            variant="secondary"
            className={cn(
              "absolute top-3 left-3 shadow-lg border",
              event.gender === "brothers"
                ? "bg-blue-100 text-blue-700 border-blue-200"
                : event.gender === "sisters"
                  ? "bg-pink-100 text-pink-700 border-pink-200"
                  : "bg-green-100 text-green-700 border-green-200", // For "all"
            )}
          >
            {event.gender === "brothers"
              ? "Brothers"
              : event.gender === "sisters"
                ? "Sisters"
                : "All"}
          </Badge>
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-1 p-4 space-y-2">
          {/* Title and Speaker */}
          <div className="space-y-1">
            <CardTitle className="line-clamp-2 text-lg leading-tight group-hover:text-blue-600 transition-colors">
              <Title id={event.id} title={event.title} />
            </CardTitle>

            {event.speaker && (
              <CardDescription className="text-sm text-gray-600 font-medium">
                by {event.speaker}
              </CardDescription>
            )}
          </div>

          {/* Event Details and Actions */}
          <div className="flex-1 flex flex-col justify-end space-y-2">
            <div className="flex justify-between items-center">
              {/* Location */}
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <MapPin className="h-4 w-4 text-gray-500 shrink-0" />
                <span className="truncate font-medium">{event.location}</span>
              </div>
              {/* Add duration display */}
              {event.duration_minutes && (
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Hourglass className="h-3.5 w-3.5 text-gray-500 shrink-0" />
                  <span className="truncate font-medium">
                    {formatDuration(event.duration_minutes)}
                  </span>
                </div>
              )}
            </div>

            {/* Date, Time, and Calendar Button */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5 text-blue-600">
                  <Calendar className="h-4 w-4" />
                  <LocalDateDisplay datetime={event.datetime} />
                </div>

                <div className="flex items-center gap-1.5 text-blue-600">
                  <Clock className="h-4 w-4" />
                  <LocalTimeDisplay datetime={event.datetime} />
                </div>
              </div>

              {/* CHANGE THIS: Add conditional rendering for the calendar button */}
              {!isPastEvent && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 px-2 text-xs hover:bg-blue-50 hover:border-blue-300"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    // Create calendar event
                    const startDate = new Date(event.datetime);
                    const endDate = new Date(
                      startDate.getTime() + 2 * 60 * 60 * 1000,
                    ); // 2 hours duration

                    // Format dates for calendar URL
                    const formatDate = (date: Date) =>
                      date.toISOString().replace(/[-:]/g, "").split(".")[0] +
                      "Z";

                    // Google Calendar URL with conditional speaker information
                    const speakerInfo = event.speaker ? `Speaker: ${event.speaker}\n\n` : '';
                    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${encodeURIComponent(`${speakerInfo}Event organized by UNM Islamic Society`)}&location=${encodeURIComponent(event.location)}`;

                    window.open(googleCalendarUrl, "_blank");
                  }}
                >
                  <CalendarPlus className="h-3 w-3 mr-1" />
                  Add
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
