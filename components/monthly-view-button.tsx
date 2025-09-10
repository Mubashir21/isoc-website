"use client";
import { createContext, useContext, useState } from "react";
import { MonthlyPrayerTimes } from "@/components/monthly-prayertimes";

// Context for sharing selected date between prayer card and monthly view button
interface PrayerDateContextType {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
}

const PrayerDateContext = createContext<PrayerDateContextType | undefined>(
  undefined,
);

export function usePrayerDate() {
  const context = useContext(PrayerDateContext);
  if (!context) {
    throw new Error("usePrayerDate must be used within a PrayerDateProvider");
  }
  return context;
}

export function PrayerDateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  return (
    <PrayerDateContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </PrayerDateContext.Provider>
  );
}

export function MonthlyViewButton() {
  const { selectedDate } = usePrayerDate();

  return (
    <div className="flex items-center gap-2">
      <MonthlyPrayerTimes currentDate={selectedDate || new Date()} />
      {selectedDate && (
        <span className="text-xs text-muted-foreground">
          Viewing {selectedDate.toLocaleDateString()}
        </span>
      )}
    </div>
  );
}
