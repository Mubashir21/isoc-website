"use client";
import { CardContent, CardFooter } from "@/components/ui/card";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import { useCountdown } from "@/hooks/useCountdown";
import DateDisplay from "@/components/ui/date-display";
import { PrayerList } from "@/components/prayer-list";
import { CountdownDisplay } from "@/components/ui/countdown-timer";
import { RamadanSection } from "@/components/ramadan-section";
import { PrayerCardSkeleton } from "../skeletons";
import { AlertCircle } from "lucide-react";

interface PrayerTimesDisplayProps {
  selectedDate?: Date;
}

export function PrayerTimesDisplay({ selectedDate }: PrayerTimesDisplayProps) {
  const prayerData = usePrayerTimes(selectedDate);
  const countdown = useCountdown(
    prayerData.nextPrayerInfo,
    prayerData.iqamaTimes,
    prayerData.currentTime,
  );

  // Show skeleton while loading
  if (!prayerData) {
    return <PrayerCardSkeleton />;
  }

  return (
    <div className="flex flex-col h-full">
      <CardContent className="flex-1 py-6 space-y-4">
        {/* Historical date indicator */}
        {!prayerData.isToday && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <span className="text-sm text-amber-700 font-medium">
              Viewing prayer times for{" "}
              {prayerData.selectedDate?.toLocaleDateString()}
            </span>
          </div>
        )}

        <DateDisplay
          date={prayerData.date}
          hijri={prayerData.hijri}
          day={prayerData.day}
        />

        <PrayerList
          prayerTimes={prayerData.prayerTimes}
          iqamaTimes={prayerData.iqamaTimes}
          currentPrayer={prayerData.nextPrayerInfo?.currentPrayer}
          isToday={prayerData.isToday}
        />

        {prayerData.isRamadanPeriod && prayerData.tahajjudTime && (
          <RamadanSection tahajjudTime={prayerData.tahajjudTime} />
        )}
      </CardContent>

      {/* Only show countdown for today */}
      {countdown && prayerData.isToday && (
        <CardFooter className="bg-primary text-primary-foreground py-3 rounded-b-lg mt-auto">
          <CountdownDisplay
            countdown={countdown.timeString}
            targetPrayer={countdown.targetPrayer}
            isIqamah={countdown.isCountingToIqamah}
          />
        </CardFooter>
      )}

      {/* Show static footer for other days */}
      {!prayerData.isToday && (
        <CardFooter className="bg-muted text-muted-foreground py-3 rounded-b-lg mt-auto">
          <div className="w-full text-center text-sm">
            Historical prayer times - no live countdown
          </div>
        </CardFooter>
      )}
    </div>
  );
}
