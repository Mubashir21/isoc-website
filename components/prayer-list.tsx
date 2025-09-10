import { cn } from "@/lib/utils";

interface PrayerListProps {
  prayerTimes: Record<string, string>;
  iqamaTimes: Record<string, string>;
  currentPrayer?: string;
  isToday: boolean;
}

export function PrayerList({
  prayerTimes,
  iqamaTimes,
  currentPrayer,
  isToday,
}: PrayerListProps) {
  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="grid grid-cols-3 text-sm font-medium text-muted-foreground pb-2 border-b">
        <span>Prayer</span>
        <span className="text-center">Adhan</span>
        <span className="text-right">Iqamah</span>
      </div>

      {/* Prayer rows */}
      <div className="space-y-1">
        {Object.entries(prayerTimes).map(([prayerName, adhanTime]) => {
          const isCurrentPrayer = isToday && currentPrayer === prayerName;

          return (
            <div
              key={prayerName}
              className={cn(
                "grid grid-cols-3 py-2 px-3 rounded-md text-sm font-medium transition-colors",
                isCurrentPrayer
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "hover:bg-muted/50",
              )}
            >
              <span className="capitalize flex items-center gap-2">
                {prayerName}
                {isCurrentPrayer && (
                  <span className="h-2 w-2 bg-primary rounded-full animate-pulse" />
                )}
              </span>
              <span className="text-center">{adhanTime}</span>
              <span className="text-right">{iqamaTimes[prayerName]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
