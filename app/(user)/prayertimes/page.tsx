import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { PrayerCard } from "@/components/ui/prayercard";

export default async function PrayerTimes() {
  const now = new Date();
  return (
    <main className="h-full">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Prayer Times</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col h-full justify-center  gap-5">
        <PrayerCard />
        <div>
          <p className="text-muted-foreground text-sm ml-2">
            Note: The UNM Islamic Center adheres to the above prayertimes.
          </p>
        </div>
      </div>
    </main>
  );
}
