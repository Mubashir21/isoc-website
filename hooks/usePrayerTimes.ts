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

    // Night number: changes at Fajr (not midnight). Before Fajr we're still in
    // the previous Islamic night, so use hijriDay - 20. After Fajr, tonight's
    // night begins at Maghrib, so use hijriDay - 19.
    let ramadanNight: number | null = null;
    if (isRamadanPeriod) {
      const malaysiaTime = new Date(
        currentTime.toLocaleString("en-US", { timeZone: "Asia/Kuala_Lumpur" }),
      );
      const fajrTime = parseTimeToDate(prayerTimes.prayerTimes["Fajr"], malaysiaTime);
      const hijriDay = parseInt(prayerTimes.info.hijri.split(" ")[0], 10);
      ramadanNight = malaysiaTime < fajrTime ? hijriDay - 20 : hijriDay - 19;
    }

    // Only calculate next prayer info for today
    const isToday = selectedDate
      ? selectedDate.toDateString() === currentTime.toDateString()
      : true;

    let nextPrayerInfo = isToday
      ? getNextPrayerTime(currentTime, prayerTimes)
      : null;

    // During last 10 nights of Ramadan, inject tahajjud between Isha and Fajr
    if (isToday && isRamadanPeriod && tahajjudTime && nextPrayerInfo) {
      const malaysiaTime = new Date(
        currentTime.toLocaleString("en-US", { timeZone: "Asia/Kuala_Lumpur" }),
      );
      let tahajjudDateObj = parseTimeToDate(tahajjudTime, malaysiaTime);
      // If 02:30 has already passed today, roll to tomorrow's 02:30
      if (tahajjudDateObj <= malaysiaTime) {
        tahajjudDateObj = new Date(tahajjudDateObj.getTime() + 24 * 60 * 60 * 1000);
      }
      const firstPrayer = Object.keys(prayerTimes.prayerTimes)[0];

      // If all prayers have passed (next = Fajr) and tahajjud hasn't happened yet
      if (nextPrayerInfo.nextPrayer === firstPrayer && tahajjudDateObj > malaysiaTime) {
        nextPrayerInfo = {
          ...nextPrayerInfo,
          nextPrayer: "Qiyam ul Layl",
          nextPrayerTime: tahajjudDateObj,
        };
      }
    }

    return {
      date,
      hijri: prayerTimes.info.hijri,
      day: prayerTimes.info.day,
      prayerTimes: prayerTimes.prayerTimes,
      iqamaTimes,
      nextPrayerInfo,
      isRamadanPeriod,
      tahajjudTime,
      ramadanNight,
      currentTime,
      isToday,
      selectedDate,
    };
  }, [currentTime, selectedDate]);

  return prayerData;
}
