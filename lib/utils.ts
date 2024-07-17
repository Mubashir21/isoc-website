import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import prayerTimes from "../public/data/prayertimes.json";
import { PrayerTimesJSON, PrayerTimesData } from "@/lib/definitions";

const typedPrayerTimes: PrayerTimesJSON = prayerTimes as PrayerTimesJSON;

export function fetchPrayerTimes(date: string): PrayerTimesJSON[string] {
  return typedPrayerTimes[date];
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
  const day = String(now.getDate());

  const formattedDate = `${day} ${getCurrentMonthAbbreviation(now)} ${year}`;
  return formattedDate;
}

export function getNextPrayerTime(now: Date, data: PrayerTimesData) {
  let prayers: String[] = [];
  const prayerTimes = data.prayerTimes;
  const today = new Date(now.toDateString()); // Start of today
  const times = Object.entries(prayerTimes).map(([key, timing]) => {
    prayers.push(key);
    const [hours, minutes] = timing.split(":").map(Number);
    const prayerTime = new Date(today);
    prayerTime.setHours(hours, minutes, 0, 0);
    return prayerTime;
  });
  for (let i = 0; i < times.length; i++) {
    if (times[i] > now) {
      return {
        currentPrayer: prayers[i - 1],
        nextPrayer: prayers[i],
        time: times[i],
      };
    }
  }
  // If all prayer times are in the past, return the first prayer time of the next day
  return {
    currentPrayer: prayers[4],
    nextPrayer: prayers[0],
    time: new Date(times[0].getTime() + 24 * 60 * 60 * 1000),
  };
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
