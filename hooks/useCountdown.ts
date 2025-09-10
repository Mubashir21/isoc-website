import { parseTimeToDate } from "@/lib/utils";
import { useMemo } from "react";

export function useCountdown(
  nextPrayerInfo: any,
  iqamaTimes: any,
  currentTime: Date,
) {
  return useMemo(() => {
    if (!nextPrayerInfo) return null;

    // Convert current time to Malaysia time (UTC+8)
    const malaysiaTime = new Date(
      currentTime.toLocaleString("en-US", {
        timeZone: "Asia/Kuala_Lumpur",
      }),
    );

    const current = malaysiaTime.getTime();
    const currentAdhanTime = nextPrayerInfo.currentPrayerTime.getTime();
    const nextAdhanTime = nextPrayerInfo.nextPrayerTime.getTime();

    // Get iqamah time for current prayer - use Malaysia time for parsing
    const currentPrayerName =
      nextPrayerInfo.currentPrayer as keyof typeof iqamaTimes;
    const iqamahTime = iqamaTimes[currentPrayerName];
    const iqamahTimeObj = parseTimeToDate(iqamahTime, malaysiaTime).getTime();

    let targetTime: number;
    let isCountingToIqamah = false;
    let targetPrayer = nextPrayerInfo.nextPrayer;

    // Logic: Are we between Adhan and Iqamah?
    if (current >= currentAdhanTime && current < iqamahTimeObj) {
      targetTime = iqamahTimeObj;
      isCountingToIqamah = true;
      targetPrayer = nextPrayerInfo.currentPrayer;
    } else {
      targetTime = nextAdhanTime;
    }

    // If we're past the target time, no countdown
    if (current >= targetTime) return null;

    const diff = targetTime - current;
    const hours = Math.floor(diff / (1000 * 60 * 60))
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      .toString()
      .padStart(2, "0");

    return {
      timeString: `${hours}:${minutes}:${seconds}`,
      isCountingToIqamah,
      targetPrayer,
    };
  }, [nextPrayerInfo, iqamaTimes, currentTime]);
}
