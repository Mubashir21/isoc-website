"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Calendar, RotateCcw } from "lucide-react";
import { PrayerTimesDisplay } from "@/components/ui/prayertimes-display";
import { usePrayerDate } from "@/components/monthly-view-button";

type CardProps = React.ComponentProps<typeof Card>;

export function PrayerCard({ className, ...props }: CardProps) {
  const { selectedDate, setSelectedDate } = usePrayerDate();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  const resetToToday = () => {
    setSelectedDate(undefined);
  };

  const isViewingOtherDay =
    selectedDate && selectedDate.toDateString() !== new Date().toDateString();

  const getViewLabel = () => {
    if (!selectedDate || selectedDate.toDateString() === new Date().toDateString()) {
      return null;
    }
    
    const today = new Date();
    const selected = new Date(selectedDate);
    
    // Reset time to compare only dates
    today.setHours(0, 0, 0, 0);
    selected.setHours(0, 0, 0, 0);
    
    if (selected < today) {
      return "Historical View";
    } else if (selected > today) {
      return "Future View";
    }
    return null;
  };

  return (
    <Card className={cn("w-full h-full flex flex-col", className)} {...props}>
      <CardHeader
        className={cn(
          "rounded-t-lg transition-colors",
          isViewingOtherDay && getViewLabel() === "Historical View"
            ? "bg-amber-100 border-b border-amber-200"
            : isViewingOtherDay && getViewLabel() === "Future View"
            ? "bg-blue-100 border-b border-blue-200"
            : "bg-muted",
        )}
      >
        <div className="flex flex-col gap-3">
          {/* Title row with controls */}
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl">Prayer Times</CardTitle>

            <div className="flex items-center gap-2">
              {isViewingOtherDay && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetToToday}
                  className={cn(
                    "text-xs",
                    getViewLabel() === "Historical View"
                      ? "border-amber-300 bg-amber-50 text-amber-700"
                      : "border-blue-300 bg-blue-50 text-blue-700"
                  )}
                >
                  <RotateCcw className="h-3 w-3 mr-1" />
                  Today
                </Button>
              )}

              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  className={cn(
                    isViewingOtherDay && getViewLabel() === "Historical View" &&
                      "border-amber-300 bg-amber-50 text-amber-700",
                    isViewingOtherDay && getViewLabel() === "Future View" &&
                      "border-blue-300 bg-blue-50 text-blue-700",
                  )}
                >
                  <Calendar className="h-4 w-4" />
                </Button>

                {showDatePicker && (
                  <div className="absolute right-0 top-full mt-2 z-50 bg-white border rounded-lg shadow-lg p-3">
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate || new Date()}
                      onSelect={handleDateSelect}
                      disabled={(date) =>
                        date.getFullYear() !== new Date().getFullYear()
                      }
                      initialFocus
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Description row */}
          <div className="flex items-center justify-between">
            <CardDescription
              className={cn(
                isViewingOtherDay && getViewLabel() === "Historical View" && "text-amber-700 font-medium",
                isViewingOtherDay && getViewLabel() === "Future View" && "text-blue-700 font-medium"
              )}
            >
              UNM Islamic Center
            </CardDescription>

            {getViewLabel() && (
              <span className={cn(
                "text-xs px-2 py-1 rounded-full",
                getViewLabel() === "Historical View" 
                  ? "bg-amber-200 text-amber-800"
                  : "bg-blue-200 text-blue-800"
              )}>
                {getViewLabel()}
              </span>
            )}
          </div>
        </div>
      </CardHeader>

      <div className="flex-1">
        <PrayerTimesDisplay selectedDate={selectedDate} />
      </div>
    </Card>
  );
}
