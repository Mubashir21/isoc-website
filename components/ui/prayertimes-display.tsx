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

  // Determine if viewing past or future date
  const getDateContext = () => {
    if (!selectedDate || prayerData.isToday) {
      return null;
    }
    
    const today = new Date();
    const selected = new Date(selectedDate);
    
    // Reset time to compare only dates
    today.setHours(0, 0, 0, 0);
    selected.setHours(0, 0, 0, 0);
    
    if (selected < today) {
      return "past";
    } else if (selected > today) {
      return "future";
    }
    return null;
  };

  const dateContext = getDateContext();

  return (
    <div className="flex flex-col h-full">
      <CardContent className="flex-1 py-6 space-y-4">
        {/* Date context indicator */}
        {dateContext && (
          <div className={`rounded-lg p-3 flex items-center gap-2 ${
            dateContext === "past" 
              ? "bg-amber-50 border border-amber-200" 
              : "bg-blue-50 border border-blue-200"
          }`}>
            <AlertCircle className={`h-4 w-4 ${
              dateContext === "past" ? "text-amber-600" : "text-blue-600"
            }`} />
            <span className={`text-sm font-medium ${
              dateContext === "past" ? "text-amber-700" : "text-blue-700"
            }`}>
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
      {dateContext && (
        <CardFooter className="bg-muted text-muted-foreground py-3 rounded-b-lg mt-auto">
          <div className="w-full text-center text-sm">
            {dateContext === "past" 
              ? "Historical prayer times - no live countdown"
              : "Future prayer times - no live countdown"
            }
          </div>
        </CardFooter>
      )}
    </div>
  );
}
