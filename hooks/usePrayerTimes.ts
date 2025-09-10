import { useMemo, useState, useEffect } from "react";
import {
  getDate,
  getNextPrayerTime,
  fetchPrayerTimes,
  fetchIqamaTimes,
  fetchTahajjudTime,
  isRamadan,
  parseTimeToDate,
} from "@/lib/utils";

export function usePrayerTimes(selectedDate?: Date) {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Compute all prayer-related data
  const prayerData = useMemo(() => {
    const date = selectedDate ? getDate(selectedDate) : getDate(currentTime);
    const prayerTimes = fetchPrayerTimes(date);
    const iqamaTimes = fetchIqamaTimes(
      prayerTimes.prayerTimes,
      prayerTimes.info.hijri,
    );
    const isRamadanPeriod = isRamadan(prayerTimes.info.hijri);
    const tahajjudTime = isRamadanPeriod ? fetchTahajjudTime(date) : null;

    // Only calculate next prayer info for today
    const isToday = selectedDate
      ? selectedDate.toDateString() === currentTime.toDateString()
      : true;

    const nextPrayerInfo = isToday
      ? getNextPrayerTime(currentTime, prayerTimes)
      : null;

    return {
      date,
      hijri: prayerTimes.info.hijri,
      day: prayerTimes.info.day,
      prayerTimes: prayerTimes.prayerTimes,
      iqamaTimes,
      nextPrayerInfo,
      isRamadanPeriod,
      tahajjudTime,
      currentTime,
      isToday,
      selectedDate,
    };
  }, [currentTime, selectedDate]);

  return prayerData;
}
