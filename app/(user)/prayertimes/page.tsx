import { Suspense } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { PrayerCard } from "@/components/ui/prayercard";
import { ResponsiveContainer } from "@/components/responsive-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, Calendar, Info } from "lucide-react";
import { LocalTimeDisplay } from "@/components/localtime-display";
import {
  MonthlyViewButton,
  PrayerDateProvider,
} from "@/components/monthly-view-button";
import { PrayerTimesPageSkeleton } from "@/components/skeletons/events-skeleton";

async function PrayerTimesContent() {
  return (
    <main className="h-full">
      <ResponsiveContainer
        maxWidth={{
          default: "xl",
          md: "xl",
          lg: "3xl",
          xl: "6xl",
        }}
      >
        <PrayerDateProvider>
          <div className="flex flex-col gap-4">
            {/* Breadcrumb and Local Time */}
            <div className="flex flex-col gap-4">
              <div className="flex  sm:flex-row gap-4 items-start sm:items-center justify-between">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Prayer Times</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <MonthlyViewButton />
              </div>

              <LocalTimeDisplay />
            </div>

            {/* Main Layout - Prayer Card + Info Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Prayer Card */}
              <div className="flex justify-center lg:justify-start">
                <PrayerCard />
              </div>

              {/* Stacked Info Cards */}
              <div className="flex flex-col gap-4">
                {/* Masjid Information */}
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-600">
                      <MapPin className="h-5 w-5" />
                      UNM Islamic Center
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-1 text-gray-500" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-sm text-gray-600">
                          University of Nottingham Malaysia Campus
                          <br />
                          Jalan Broga, 43500 Semenyih, Selangor
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 mt-1 text-gray-500" />
                      <div>
                        <p className="font-medium">Open Hours</p>
                        <p className="text-sm text-gray-600">
                          24/7
                          <br />
                          Always open for prayers
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Prayer Guidelines */}
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-600">
                      <Info className="h-5 w-5" />
                      Prayer Guidelines
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <h4 className="font-medium">Important Notes:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Wudu facilities available on-site</li>
                        <li>
                          • Separate prayer areas for brothers and sisters
                        </li>
                        <li>
                          • Friday Jummah: Buses to PGA & TTS mosques at 12:45,
                          1:00 & 1:15 PM (depart from outside Islamic Center)
                        </li>
                  
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Important Notice - Full Width */}
            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="space-y-2">
                    <h3 className="font-semibold text-blue-800">
                      Important Notice
                    </h3>
                    <p className="text-sm text-blue-700">
                      The UNM Islamic Center adheres to the above prayer times.
                    </p>
                    <p className="text-sm text-blue-700">
                      All students, staff, and visitors are welcome to join our
                      daily prayers and activities.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </PrayerDateProvider>
      </ResponsiveContainer>
    </main>
  );
}

export default function PrayerTimes() {
  return (
    <Suspense fallback={<PrayerTimesPageSkeleton />}>
      <PrayerTimesContent />
    </Suspense>
  );
}
