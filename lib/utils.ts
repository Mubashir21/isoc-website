import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import prayerTimes from "../public/data/prayertimes_2026.json";
import {
  PrayerTimesJSON,
  PrayerTimesData,
  PrayerTimes,
} from "@/lib/definitions";
import { StringDecoder } from "node:string_decoder";

const typedPrayerTimes: PrayerTimesJSON = prayerTimes as PrayerTimesJSON;

export function fetchPrayerTimes(date: string): PrayerTimesJSON[string] {
  return typedPrayerTimes[date];
}

export function fetchIqamaTimes(
  adhanTimes: PrayerTimes,
  hijriMonth: string,
): PrayerTimes {
  // Helper function to add minutes to a given time in "HH:mm" format
  const addMinutes = (time: string, minutes: number): string => {
    const [hours, mins] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, mins + minutes);
    const newHours = date.getHours();
    const newMinutes = date.getMinutes();
    // Format as "HH:mm"
    return `${String(newHours).padStart(2, "0")}:${String(newMinutes).padStart(2, "0")}`;
  };

  // Check if current month is Ramadan (accounting for different spellings/abbreviations)
  const isRamadan = hijriMonth.toLowerCase().includes("rmdn");

  return {
    Fajr: addMinutes(adhanTimes.Fajr, 25),
    Dhuhr: addMinutes(adhanTimes.Dhuhr, 15),
    Asr: addMinutes(adhanTimes.Asr, 15),
    Maghrib: addMinutes(adhanTimes.Maghrib, 10),
    Isha: isRamadan ? "21:15" : addMinutes(adhanTimes.Isha, 15),
  };
}

function getCurrentMonthAbbreviation(date: Date) {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthIndex = date.getMonth();
  return monthNames[monthIndex];
}

export function getDate(now: Date) {
  const year = now.getFullYear().toString();
  const day = now.getDate().toString().padStart(2, "0");

  const formattedDate = `${day} ${getCurrentMonthAbbreviation(now)} ${year}`;
  return formattedDate;
}

export function getNextPrayerTime(now: Date, data: PrayerTimesData) {
  const prayers = Object.keys(data.prayerTimes);
  const prayerTimes = data.prayerTimes;

  // Convert current time to Malaysia time (UTC+8) to match prayer times
  const malaysiaTime = new Date(
    now.toLocaleString("en-US", {
      timeZone: "Asia/Kuala_Lumpur",
    }),
  );

  const today = new Date(malaysiaTime.toDateString()); // Start of today

  // Convert prayer times into Date objects
  const prayerTimeEntries = Object.entries(prayerTimes).map(([key, timing]) => {
    const [hours, minutes] = timing.split(":").map(Number);
    const prayerTime = new Date(today);
    prayerTime.setHours(hours, minutes, 0, 0);
    return { name: key, time: prayerTime };
  });

  // Find the current and next prayer - compare with Malaysia time
  for (let i = 0; i < prayerTimeEntries.length; i++) {
    if (prayerTimeEntries[i].time > malaysiaTime) {
      const currentPrayerIndex = i > 0 ? i - 1 : prayerTimeEntries.length - 1;
      return {
        currentPrayer: prayerTimeEntries[currentPrayerIndex].name,
        currentPrayerTime: prayerTimeEntries[currentPrayerIndex].time,
        nextPrayer: prayerTimeEntries[i].name,
        nextPrayerTime: prayerTimeEntries[i].time,
      };
    }
  }

  // If all prayers have passed today, return the first prayer of the next day
  const nextDayFirstPrayerTime = new Date(prayerTimeEntries[0].time);
  nextDayFirstPrayerTime.setDate(nextDayFirstPrayerTime.getDate() + 1);

  return {
    currentPrayer: prayerTimeEntries[prayerTimeEntries.length - 1].name,
    currentPrayerTime: prayerTimeEntries[prayerTimeEntries.length - 1].time,
    nextPrayer: prayerTimeEntries[0].name,
    nextPrayerTime: nextDayFirstPrayerTime,
  };
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = "en-US",
): string => {
  const date = new Date(dateStr);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const formatTimeTo24Hour = (
  dateStr: string,
  locale: string = "en-US",
): string => {
  const date = new Date(dateStr);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid Time";
  }

  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // This makes the time format 24-hour
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const formatDateTime = (datetime: string): string => {
  const date = new Date(datetime);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "";
  }

  // Convert to Malaysia time and format for datetime-local input
  const malaysiaDate = toMalaysiaTime(date);
  return malaysiaDate.toISOString().slice(0, 16);
};

export function isRamadan(hijriDate: string): boolean {
  const parts = hijriDate.split(" ");

  const dayNumber = parseInt(parts[0], 10);

  const monthAbbr = parts[1];

  return monthAbbr === "Rmdn." && dayNumber >= 21;
}

export function fetchTahajjudTime(date: string): string {
  return "02:30";
}

export function parseTimeToDate(timeStr: string, baseDate: Date): Date {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const date = new Date(baseDate);
  date.setHours(hours, minutes, 0, 0);
  return date;
}

// Malaysia timezone utilities
export function toMalaysiaTime(date: Date): Date {
  return new Date(
    date.toLocaleString("en-US", { timeZone: "Asia/Kuala_Lumpur" }),
  );
}

export function fromMalaysiaTimeToUTC(dateString: string): Date {
  // Parse the datetime-local input as if it's in Malaysia time
  const localDate = new Date(dateString);
  // Convert Malaysia time to UTC by subtracting 8 hours
  return new Date(localDate.getTime() - 8 * 60 * 60 * 1000);
}

export function formatDateTimeForMalaysia(datetime: string | Date): string {
  let date: Date;

  if (typeof datetime === "string") {
    date = new Date(datetime);
  } else {
    date = datetime;
  }

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "";
  }

  // Convert to Malaysia time and format for datetime-local input
  const malaysiaDate = toMalaysiaTime(date);
  return malaysiaDate.toISOString().slice(0, 16);
}

export function formatDuration(durationMinutes: number | null): string {
  if (!durationMinutes) return "";

  if (durationMinutes < 60) {
    return `${durationMinutes}m`;
  } else if (durationMinutes < 1440) {
    // Less than 24 hours
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  } else {
    // 24+ hours (multi-day events)
    const days = Math.floor(durationMinutes / 1440);
    const remainingHours = Math.floor((durationMinutes % 1440) / 60);
    return remainingHours > 0 ? `${days}d ${remainingHours}h` : `${days}d`;
  }
}
