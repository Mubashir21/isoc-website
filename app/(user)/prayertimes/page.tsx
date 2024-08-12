import { PrayerCard } from "@/components/ui/prayercard";

export default async function PrayerTimes() {
  const now = new Date();
  return (
    <main className="h-full">
      <div className="flex h-full justify-center items-center">
        <PrayerCard />
      </div>
    </main>
  );
}
