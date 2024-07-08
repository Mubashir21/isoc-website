import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import prayerTimes from "@/public/data/prayerTimes.json";
import { PrayerTimesData } from "@/lib/definitions";

const typedPrayerTimes: PrayerTimesData = prayerTimes as PrayerTimesData;

export function fetchPrayerTimes(date: String) {
  const today = typedPrayerTimes[date];
  return today;
}

function getCurrentMonthAbbreviation() {
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
  const date = new Date();
  const monthIndex = date.getMonth();
  return monthNames[monthIndex];
}

export function getDate() {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const day = String(now.getDate());

  const formattedDate = `${day} ${getCurrentMonthAbbreviation()} ${year}`;
  return formattedDate;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
