import { CardDemo } from "@/components/ui/carddemo";
import { Divide } from "lucide-react";
import { fetchPrayerTimes, getDate } from "@/lib/utils";

export default function PrayerTimes() {
  return (
    <main className="h-full">
      <div className="flex h-full justify-center items-center">
        <CardDemo />
      </div>
    </main>
  );
}
