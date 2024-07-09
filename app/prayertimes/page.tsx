import { PrayerCard } from "@/components/ui/prayercard";
import { Divide } from "lucide-react";
import { format } from "date-fns";

export default async function PrayerTimes() {
  return (
    <main className="h-full">
      <div className="flex h-full justify-center items-center">
        <PrayerCard />
      </div>
    </main>
  );
}
