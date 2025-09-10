"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Event } from "@/lib/definitions";
import { LocalDateDisplay, LocalTimeDisplay } from "./date-time-display";
import { Trophy, School, PartyPopper, CalendarPlus, Clock, MapPin } from "lucide-react";
import MosqueOutlinedIcon from "@mui/icons-material/MosqueOutlined";
import { cn } from "@/lib/utils";

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

const recurrenceTypeLabels = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
  yearly: "Yearly",
  custom: "Custom",
};

const dayLabels = {
  1: "Mon",
  2: "Tue", 
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
  7: "Sun",
};

interface RecurringEventsSectionProps {
  events: Event[];
}

export function RecurringEventsSection({ events }: RecurringEventsSectionProps) {
  if (events.length === 0) {
    return null;
  }

  const brothersEvents = events.filter(event => event.gender === "brothers");
  const sistersEvents = events.filter(event => event.gender === "sisters");
  const mixedEvents = events.filter(event => event.gender === "all");

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Recurring Events</h2>
        <p className="text-gray-600">Regular events happening on schedule</p>
      </div>

      {/* Brothers Events */}
      {brothersEvents.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            Brothers Events
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {brothersEvents.map((event) => (
              <RecurringEventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}

      {/* Sisters Events */}
      {sistersEvents.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-pink-700 mb-4 flex items-center gap-2">
            <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
            Sisters Events
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sistersEvents.map((event) => (
              <RecurringEventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}

      {/* Mixed Events */}
      {mixedEvents.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            All Events
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mixedEvents.map((event) => (
              <RecurringEventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function RecurringEventCard({ event }: { event: Event }) {
  const typeConfig = eventTypeConfig[event.type] || eventTypeConfig.lecture;
  
  const getRecurrenceDescription = () => {
    if (event.recurrence_type === 'weekly' && (event.interval_value || 1) > 1) {
      return `Every ${event.interval_value} weeks`;
    } else if (event.recurrence_type === 'monthly' && (event.interval_value || 1) > 1) {
      return `Every ${event.interval_value} months`;
    } else if (event.recurrence_type === 'yearly' && (event.interval_value || 1) > 1) {
      return `Every ${event.interval_value} years`;
    }
    return recurrenceTypeLabels[event.recurrence_type as keyof typeof recurrenceTypeLabels] || "Unknown";
  };
  
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <Badge
            variant="secondary"
            className={cn(
              "flex items-center gap-1.5 font-medium border",
              typeConfig.className,
            )}
          >
            {typeConfig.icon}
            {typeConfig.label}
          </Badge>
          <Badge
            variant="secondary"
            className="bg-yellow-100 text-yellow-700 border-yellow-200"
          >
            <CalendarPlus className="h-3 w-3 mr-1" />
            {getRecurrenceDescription()}
          </Badge>
        </div>
        <CardTitle className="text-lg leading-tight">{event.title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <MapPin className="h-3 w-3 text-gray-500" />
          <span className="font-medium">{event.location}</span>
        </div>
        
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5 text-blue-600">
            <Clock className="h-3 w-3" />
            <LocalTimeDisplay datetime={event.datetime} />
          </div>
          <div className="flex items-center gap-1.5 text-green-600">
            <LocalDateDisplay datetime={event.datetime} />
          </div>
        </div>

        {event.description && (
          <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
        )}
        
      </CardContent>
    </Card>
  );
}
