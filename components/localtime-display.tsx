"use client";
import { useState, useEffect } from "react";
import { Clock, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";

export function LocalTimeDisplay() {
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <Card className="px-4 py-3 bg-blue-50 border-blue-200">
        <div className="flex items-center gap-2 text-blue-600">
          <Clock className="h-4 w-4 animate-spin" />
          <span className="text-sm font-medium">Loading...</span>
        </div>
      </Card>
    );
  }

  // Get Malaysia time
  const malaysiaTime = new Date(
    time.toLocaleString("en-US", {
      timeZone: "Asia/Kuala_Lumpur",
    }),
  );

  const localTime = malaysiaTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const localDate = malaysiaTime.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <Card className="px-4 py-3 bg-blue-50 border-blue-200 hover:bg-blue-100 transition-colors">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-600 rounded-lg">
          <Clock className="h-4 w-4 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2 text-sm text-blue-600 font-medium">
            <MapPin className="h-3 w-3" />
            <span>Local Time (Malaysia)</span>
          </div>
          <div className="text-lg font-bold text-blue-800 font-mono">
            {localTime}
          </div>
        </div>
      </div>
    </Card>
  );
}
