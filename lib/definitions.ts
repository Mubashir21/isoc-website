// Define an index signature for PrayerTimesData
export type PrayerTimesJSON = {
  [date: string]: PrayerTimesData;
};

export type PrayerTimesData = {
  prayerTimes: PrayerTimes;
  info: {
    hijri: string;
    day: string;
  };
};

export type PrayerTimes = {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
};

export type RamadanTahajjudTimes = PrayerTimes & {
  Tahajjud: string;
};

// Unified Events Table - supports both regular and recurring events
export type Event = {
  // Core event fields
  id: string;
  title: string;
  description: string;
  location: string;
  speaker: string;
  pic_url: string;
  pic_file_id: string;
  
  // Event categorization
  type: "major" | "lecture" | "masjid" | "sports";
  gender: "all" | "brothers" | "sisters"; // Changed from "mixed" to "all"
  
  // Timing (supports both single-day and multi-day events)
  datetime: string; // Start date/time
  end_datetime?: string; // End date/time (null = use duration_minutes)
  duration_minutes?: number; // For single-day events (default 120)
  
  // Recurring event fields
  is_recurring: boolean;
  recurrence_type?: "daily" | "weekly" | "monthly" | "yearly";
  interval_value?: number; // Every N intervals (default 1)
  days_of_week?: number[]; // [1-7] for Monday-Sunday (Monday=1)
  day_of_month?: number; // 1-31
  month_of_year?: number; // 1-12
  recurrence_end?: string; // When recurrence stops
  
  // Exception handling for recurring events
  parent_event_id?: string; // References events(id)
  is_exception?: boolean; // True if modified instance
  
  // Status and metadata
  status: "active" | "cancelled" | "completed" | "paused";
  created_by: string;
  created_at: string;
  updated_at: string;
};

// Legacy type alias for backward compatibility
export type EventsTable = Event;

export type AnnouncementsTable = {
  id: string;
  created_by: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

// Unified Event Form - handles both regular and recurring events
export type EventForm = {
  id: string;
  title: string;
  description: string;
  location: string;
  speaker: string;
  pic_url: string;
  pic_file_id: string;
  type: "major" | "lecture" | "masjid" | "sports";
  gender: "all" | "brothers" | "sisters";
  
  // Timing
  datetime: string;
  end_datetime?: string;
  duration_minutes?: number;
  
  // Recurring fields
  is_recurring: boolean;
  recurrence_type?: "daily" | "weekly" | "monthly" | "yearly";
  interval_value?: number;
  days_of_week?: number[];
  day_of_month?: number;
  month_of_year?: number;
  recurrence_end?: string;
  
  // Exception handling
  parent_event_id?: string;
  is_exception?: boolean;
  
  // Status and metadata
  status: "active" | "cancelled" | "completed" | "paused";
  created_by: string;
};

// Legacy type alias for backward compatibility  
export type EventsForm = EventForm;

export type AnnouncementsForm = {
  id: string;
  created_by: string;
  title: string;
  content: string;
};

export type EventCard = {
  id: string;
  title: string;
  speaker: string;
  location: string;
  datetime: string;
  end_datetime?: string;
  duration_minutes?: number;
  pic_url: string;
  description: string;
  type: "major" | "lecture" | "masjid" | "sports";
  gender: "all" | "brothers" | "sisters";
  is_recurring?: boolean;
  status?: "active" | "cancelled" | "completed" | "paused";
};

export type AnnouncementInfo = {
  id: string;
  title: string;
  content: string;
  updated_at: string;
};

