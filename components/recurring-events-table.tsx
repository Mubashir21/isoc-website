"use client";

import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Clock, MapPin, Calendar, Users, Repeat } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecurringEvent {
  id: string;
  title: string;
  description?: string;
  location?: string;
  datetime: string;
  end_datetime?: string;
  duration_minutes?: number;
  recurrence_type?: string;
  interval_value?: number;
  days_of_week?: number[];
  day_of_month?: number;
  month_of_year?: number;
  gender: string;
  type: string;
  status: string;
}

interface RecurringEventsTableProps {
  events: RecurringEvent[];
}

export function RecurringEventsTable({ events }: RecurringEventsTableProps) {
  // Debug logging to see what we're receiving

  const formatTime = (datetime: string) => {
    const date = new Date(datetime);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const hour12 = hours % 12 || 12;
    const ampm = hours >= 12 ? "PM" : "AM";
    return `${hour12}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  };

  const formatRecurrence = (event: RecurringEvent) => {
    const dayNames = ["", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    if (event.recurrence_type === "weekly" && event.days_of_week && event.days_of_week.length > 0) {
      const days = event.days_of_week.map((day) => dayNames[day]).join(", ");
      return days;
    }
    if (event.recurrence_type === "monthly" && event.day_of_month) {
      const suffix = event.day_of_month === 1 ? "st" : 
                   event.day_of_month === 2 ? "nd" : 
                   event.day_of_month === 3 ? "rd" : "th";
      return `${event.day_of_month}${suffix} of month`;
    }
    if (event.recurrence_type === "yearly") {
      if (event.month_of_year && event.day_of_month) {
        const months = [
          "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ];
        return `${months[event.month_of_year]} ${event.day_of_month}`;
      }
      return "Yearly";
    }
    return event.recurrence_type || "Unknown";
  };

  const formatDuration = (event: RecurringEvent) => {
    if (event.end_datetime) {
      const start = new Date(event.datetime);
      const end = new Date(event.end_datetime);
      const days = Math.ceil(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
      );
      return `${days} day${days > 1 ? "s" : ""}`;
    } else {
      const duration = event.duration_minutes || 0;
      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;
      if (hours > 0 && minutes > 0) {
        return `${hours}h ${minutes}m`;
      } else if (hours > 0) {
        return `${hours}h`;
      } else {
        return `${minutes}m`;
      }
    }
  };

  const getNextOccurrence = (event: RecurringEvent) => {
    const now = new Date();
    const eventDate = new Date(event.datetime);
    
    // If the event hasn't started yet, return the original start date
    if (eventDate > now) {
      return eventDate;
      
    }
    
    // Extract time components from the original event
    const eventHours = eventDate.getHours();
    const eventMinutes = eventDate.getMinutes();
    
    if (event.recurrence_type === "weekly" && event.days_of_week && event.days_of_week.length > 0) {
      // Find the next occurrence for weekly events
      const today = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
      
      // Convert our days_of_week (1=Mon, 7=Sun) to JS format (0=Sun, 1=Mon)
      const jsDaysOfWeek = event.days_of_week.map(day => day === 7 ? 0 : day);
      
      // Find the next occurrence
      for (let i = 0; i < 14; i++) { // Check next 2 weeks to be safe
        const checkDay = (today + i) % 7;
        if (jsDaysOfWeek.includes(checkDay)) {
          const candidateDate = new Date(now);
          candidateDate.setDate(now.getDate() + i);
          candidateDate.setHours(eventHours, eventMinutes, 0, 0);
          
          // If it's today, check if the time hasn't passed yet
          if (i === 0 && candidateDate > now) {
            return candidateDate;
          } else if (i > 0) {
            return candidateDate;
          }
        }
      }
    }
    
    if (event.recurrence_type === "monthly" && event.day_of_month) {
      // Find next monthly occurrence
      let nextDate = new Date(now.getFullYear(), now.getMonth(), event.day_of_month, eventHours, eventMinutes);
      
      if (nextDate <= now) {
        // Move to next month
        nextDate = new Date(now.getFullYear(), now.getMonth() + 1, event.day_of_month, eventHours, eventMinutes);
      }
      
      return nextDate;
    }
    
    if (event.recurrence_type === "yearly" && event.month_of_year && event.day_of_month) {
      // Find next yearly occurrence
      let nextDate = new Date(now.getFullYear(), event.month_of_year - 1, event.day_of_month, eventHours, eventMinutes);
      
      if (nextDate <= now) {
        // Move to next year
        nextDate = new Date(now.getFullYear() + 1, event.month_of_year - 1, event.day_of_month, eventHours, eventMinutes);
      }
      
      return nextDate;
    }
    
    return null;
  };

  const formatNextOccurrence = (event: RecurringEvent) => {
    // Don't show next occurrence for cancelled events
    if (event.status === "cancelled") {
      return null;
    }
    
    // For paused events, show that it's paused
    if (event.status === "paused") {
      return "Paused";
    }
    
    const nextDate = getNextOccurrence(event);
    if (!nextDate) return "TBD";
    
    const now = new Date();
    const diffTime = nextDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Tomorrow";
    } else if (diffDays <= 7) {
      return nextDate.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return nextDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case "active":
        return "Active";
      case "paused":
        return "Paused";
      case "cancelled":
        return "Cancelled";
      default:
        return "Unknown";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600";
      case "paused":
        return "text-yellow-600";
      case "cancelled":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  if (events.length === 0) {
    return (
      <Card className="w-full border-0 shadow-none">
        <CardContent className="p-8 text-center">
          <Repeat className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Regular Programs
          </h3>
          <p className="text-sm text-muted-foreground">
            Regular programs will appear here once they&apos;re created.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full border-0">
      <CardContent className="p-0">
        <div className="space-y-1">
          {events.map((event, index) => (
            <div
              key={event.id}
              className={cn(
                "flex items-start justify-between p-3 sm:p-4 hover:bg-muted/50 transition-colors",
                index !== events.length - 1 && "border-b border-border/50",
                event.status === "paused" && "opacity-75",
                event.status === "cancelled" && "opacity-50"
              )}
            >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div
                  className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0",
                    event.gender === "sisters"
                      ? "bg-pink-50 text-pink-700"
                      : event.gender === "brothers"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-emerald-50 text-emerald-700",
                  )}
                >
                  {event.title
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>

                <div className="flex-1 min-w-0 space-y-2">
                  {/* Title row - full width on mobile */}
                  <div className="space-y-1">
                    <h3 className="font-medium text-foreground leading-tight">
                      {event.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-1">
                      {/* <Badge variant="outline" className="text-xs">
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </Badge> */}
                      <Badge 
                        variant="secondary" 
                        className={cn(
                          "text-xs font-medium",
                          event.status === "active" && "bg-green-100 text-green-800",
                          event.status === "paused" && "bg-yellow-100 text-yellow-800",
                          event.status === "cancelled" && "bg-red-100 text-red-800"
                        )}
                      >
                        {getStatusDisplay(event.status)}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <span className={cn(
                          event.gender === "brothers" ? "text-blue-600 font-medium" :
                          event.gender === "sisters" ? "text-pink-600 font-medium" :
                          "text-muted-foreground"
                        )}>
                          {event.gender === "all" ? "All" : 
                           event.gender === "brothers" ? "Brothers" :
                           event.gender === "sisters" ? "Sisters" : 
                           event.gender}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Details row - stacked on mobile */}
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatRecurrence(event)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>
                          {formatTime(event.datetime)} ({formatDuration(event)})
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate max-w-32 sm:max-w-none">
                          {event.location || "TBD"}
                        </span>
                      </div>
                    </div>
                    {formatNextOccurrence(event) && formatNextOccurrence(event) !== "Paused" && (
                      <Badge 
                        variant="secondary" 
                        className={cn(
                          "text-xs font-medium",
                          formatNextOccurrence(event) === "Today" && "bg-green-100 text-green-800",
                          formatNextOccurrence(event) === "Tomorrow" && "bg-blue-100 text-blue-800"
                        )}
                      >
                        {`Next: ${formatNextOccurrence(event)}`}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}