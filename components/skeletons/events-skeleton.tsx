import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ResponsiveContainer } from "@/components/responsive-container";

export function EventCardSkeleton() {
  return (
    <Card className="w-full max-w-2xl overflow-hidden border-2">
      <div className="flex flex-col h-[520px]">
        {/* Image Section - matches h-96 */}
        <div className="flex-none h-96 w-full relative">
          <Skeleton className="h-full w-full" />
          {/* Event type badge skeleton */}
          <div className="absolute top-3 right-3">
            <Skeleton className="h-7 w-24 rounded-full" />
          </div>
        </div>

        {/* Content Section - matches p-4 space-y-2 */}
        <div className="flex flex-col flex-1 p-4 space-y-2">
          {/* Title and Speaker */}
          <div className="space-y-1">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>

          {/* Event Details */}
          <div className="flex-1 flex flex-col justify-end space-y-2">
            {/* Location */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
            </div>

            {/* Date, Time, and Calendar Button */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="flex items-center gap-1.5">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
              {/* Calendar button skeleton */}
              <Skeleton className="h-7 w-12" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function EventsGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {Array.from({ length: count }, (_, i) => (
        <EventCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function RecurringEventsTableSkeleton() {
  return (
    <Card className="w-full border-0">
      <div className="p-0">
        <div className="space-y-1">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="flex items-start justify-between p-3 sm:p-4 border-b border-border/50 last:border-b-0">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                {/* Avatar skeleton */}
                <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
                
                <div className="flex-1 min-w-0 space-y-2">
                  {/* Title row - full width on mobile */}
                  <div className="space-y-1">
                    <Skeleton className="h-5 w-3/4" />
                    <div className="flex flex-wrap items-center gap-1">
                      {/* Status badge skeleton */}
                      <Skeleton className="h-5 w-16 rounded-full" />
                      {/* Gender indicator skeleton */}
                      <div className="flex items-center gap-1">
                        <Skeleton className="h-3 w-3" />
                        <Skeleton className="h-3 w-12" />
                      </div>
                    </div>
                  </div>

                  {/* Details row - stacked on mobile */}
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      <div className="flex items-center gap-1">
                        <Skeleton className="h-3 w-3" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                      <div className="flex items-center gap-1">
                        <Skeleton className="h-3 w-3" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                      <div className="flex items-center gap-1">
                        <Skeleton className="h-3 w-3" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                    {/* Next occurrence badge */}
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export function EventsPageSkeleton() {
  return (
    <main className="h-full">
      <ResponsiveContainer
        maxWidth={{
          default: "xl",
          md: "2xl",
          lg: "2xl",
          xl: "7xl",
        }}
      >
        <div className="flex flex-col gap-6">
          {/* Header Section Skeleton */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="h-10 w-32 mb-2" /> {/* "Events" title */}
                <Skeleton className="h-4 w-80" /> {/* Description */}
              </div>
            </div>
          </div>

          {/* Regular Events Section Skeleton */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <Skeleton className="h-6 w-6" /> {/* Icon */}
              <Skeleton className="h-8 w-40" /> {/* "Regular Events" title */}
            </div>
            <Skeleton className="h-4 w-96 mb-4" /> {/* Description */}
            <RecurringEventsTableSkeleton />
          </section>

          {/* Special Events Section Skeleton */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <Skeleton className="h-6 w-6" /> {/* Icon */}
              <Skeleton className="h-8 w-40" /> {/* "Special Events" title */}
            </div>
            <Skeleton className="h-4 w-96 mb-4" /> {/* Description */}

            {/* Tabs Skeleton */}
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex bg-muted/50 rounded-lg p-1 w-full max-w-md">
                  <Skeleton className="h-9 w-1/2 rounded-md mr-1" />
                  <Skeleton className="h-9 w-1/2 rounded-md" />
                </div>
              </div>

              {/* Event Cards Grid Skeleton */}
              <EventsGridSkeleton count={2} />
            </div>
          </section>
        </div>
      </ResponsiveContainer>
    </main>
  );
}

export function PrayerTimesPageSkeleton() {
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
        <div className="flex flex-col gap-4">
          {/* Breadcrumb and Local Time */}
          <div className="flex flex-col gap-4">
            <div className="flex sm:flex-row gap-4 items-start sm:items-center justify-between">
              {/* Breadcrumb skeleton */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-2" /> {/* Separator */}
                <Skeleton className="h-4 w-24" /> {/* "Prayer Times" */}
              </div>
              {/* Monthly View Button skeleton */}
              <Skeleton className="h-9 w-32" />
            </div>

            {/* Local Time Display skeleton */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5" /> {/* Clock icon */}
              <Skeleton className="h-5 w-48" /> {/* Current time text */}
            </div>
          </div>

          {/* Main Layout - Prayer Card + Info Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Prayer Card Skeleton */}
            <div className="flex justify-center lg:justify-start">
              <Card className="w-full h-full flex flex-col">
                {/* Card Header */}
                <CardHeader className="bg-muted rounded-t-lg">
                  <div className="flex flex-col gap-3">
                    {/* Title row with controls */}
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-7 w-32" /> {/* Title */}
                      <div className="flex gap-2">
                        <Skeleton className="h-8 w-8 rounded" /> {/* Calendar button */}
                        <Skeleton className="h-8 w-8 rounded" /> {/* Reset button */}
                      </div>
                    </div>

                    {/* Description row */}
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-40" /> {/* "UNM Islamic Center" */}
                    </div>
                  </div>
                </CardHeader>

                {/* Card Content - Prayer Times */}
                <CardContent className="flex-1 py-6 space-y-4">
                  {/* Date Display */}
                  <div className="text-center space-y-2">
                    <Skeleton className="h-6 w-48 mx-auto" /> {/* Date */}
                    <Skeleton className="h-4 w-32 mx-auto" /> {/* Hijri date */}
                  </div>

                  {/* Prayer Times List */}
                  <div className="space-y-3">
                    {Array.from({ length: 5 }, (_, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                        <div className="flex items-center gap-3">
                          <Skeleton className="h-5 w-5" /> {/* Prayer icon */}
                          <Skeleton className="h-5 w-16" /> {/* Prayer name */}
                        </div>
                        <div className="flex items-center gap-4">
                          <Skeleton className="h-4 w-12" /> {/* Adhan time */}
                          <Skeleton className="h-4 w-12" /> {/* Iqamah time */}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>

                {/* Card Footer - Countdown */}
                <CardFooter className="bg-primary text-primary-foreground py-3 rounded-b-lg mt-auto">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4 bg-primary-foreground/20" />
                      <Skeleton className="h-4 w-24 bg-primary-foreground/20" />
                    </div>
                    <Skeleton className="h-6 w-16 bg-primary-foreground/20" />
                  </div>
                </CardFooter>
              </Card>
            </div>

            {/* Stacked Info Cards */}
            <div className="flex flex-col gap-4">
              {/* Masjid Information Card */}
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5" /> {/* MapPin icon */}
                    <Skeleton className="h-6 w-36" /> {/* "UNM Islamic Center" */}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Skeleton className="h-4 w-4 mt-1" /> {/* MapPin icon */}
                    <div className="flex-1 space-y-1">
                      <Skeleton className="h-4 w-16" /> {/* "Location" */}
                      <Skeleton className="h-3 w-full" /> {/* Address line 1 */}
                      <Skeleton className="h-3 w-3/4" /> {/* Address line 2 */}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Skeleton className="h-4 w-4 mt-1" /> {/* Clock icon */}
                    <div className="flex-1 space-y-1">
                      <Skeleton className="h-4 w-20" /> {/* "Open Hours" */}
                      <Skeleton className="h-3 w-8" /> {/* "24/7" */}
                      <Skeleton className="h-3 w-32" /> {/* "Always open for prayers" */}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Prayer Guidelines Card */}
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5" /> {/* Info icon */}
                    <Skeleton className="h-6 w-32" /> {/* "Prayer Guidelines" */}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-28" /> {/* "Important Notes:" */}
                    <div className="space-y-1">
                      <Skeleton className="h-3 w-full" /> {/* Bullet point 1 */}
                      <Skeleton className="h-3 w-5/6" /> {/* Bullet point 2 */}
                      <Skeleton className="h-3 w-full" /> {/* Bullet point 3 */}
                      <Skeleton className="h-3 w-4/5" /> {/* Bullet point 4 */}
                      <Skeleton className="h-3 w-2/3" /> {/* Bullet point 5 */}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Important Notice - Full Width */}
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Skeleton className="h-5 w-5 mt-0.5" /> {/* Info icon */}
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-32" /> {/* "Important Notice" */}
                  <Skeleton className="h-4 w-full" /> {/* Notice text line 1 */}
                  <Skeleton className="h-4 w-5/6" /> {/* Notice text line 2 */}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ResponsiveContainer>
    </main>
  );
}

export function HomePageSkeleton() {
  return (
    <main>
      {/* Title skeleton */}
      <Skeleton className="hidden mb:block mb-4 h-6 w-16" />
      
      <div className="flex flex-col gap-5">
        {/* Hero Section Skeleton */}
        <div className="relative bg-gray-200 rounded-2xl h-[60vh] lg:h-[75vh] p-5">
          <div className="absolute inset-0 bg-black opacity-60 rounded-2xl"></div>
          <div className="relative flex flex-col justify-center items-center h-full gap-6 lg:gap-9">
            {/* Salam image skeleton */}
            <Skeleton className="h-20 w-96 lg:h-24 lg:w-[500px]" />
            {/* Welcome text skeleton */}
            <div className="text-center space-y-2">
              <Skeleton className="h-6 w-80 lg:h-8 lg:w-96 mx-auto" />
              <Skeleton className="h-6 w-60 lg:h-8 lg:w-80 mx-auto" />
            </div>
          </div>
        </div>

        {/* About Us Section Skeleton */}
        <div className="bg-blue-600 rounded-2xl p-5">
          <ResponsiveContainer
            maxWidth={{
              default: "xl",
              md: "2xl",
              lg: "2xl",
              xl: "6xl",
            }}
          >
            <div className="flex flex-col gap-8 xl:gap-12">
              {/* Who Are We Section */}
              <div className="flex flex-col gap-5 xl:hidden">
                <Skeleton className="h-10 w-48 bg-white/20" />
                <Skeleton className="h-64 w-full rounded-xl bg-white/20" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full bg-white/20" />
                  <Skeleton className="h-4 w-full bg-white/20" />
                  <Skeleton className="h-4 w-4/5 bg-white/20" />
                  <Skeleton className="h-4 w-full bg-white/20" />
                  <Skeleton className="h-4 w-3/4 bg-white/20" />
                </div>
              </div>

              {/* Desktop version */}
              <div className="hidden xl:flex gap-8 flex-row-reverse">
                <div className="flex-1">
                  <Skeleton className="h-64 w-full rounded-2xl bg-white/20" />
                </div>
                <div className="flex flex-1 flex-col justify-evenly gap-2">
                  <Skeleton className="h-10 w-48 bg-white/20" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full bg-white/20" />
                    <Skeleton className="h-4 w-full bg-white/20" />
                    <Skeleton className="h-4 w-4/5 bg-white/20" />
                    <Skeleton className="h-4 w-full bg-white/20" />
                    <Skeleton className="h-4 w-3/4 bg-white/20" />
                  </div>
                </div>
              </div>

              {/* Our Headquarters Section */}
              <div className="flex flex-col gap-5 xl:hidden">
                <Skeleton className="h-10 w-56 bg-white/20" />
                <Skeleton className="h-64 w-full rounded-xl bg-white/20" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full bg-white/20" />
                  <Skeleton className="h-4 w-full bg-white/20" />
                  <Skeleton className="h-4 w-4/5 bg-white/20" />
                  <Skeleton className="h-4 w-full bg-white/20" />
                  <Skeleton className="h-4 w-3/4 bg-white/20" />
                </div>
              </div>

              {/* Desktop version */}
              <div className="hidden xl:flex gap-8 flex-row">
                <div className="flex-1">
                  <Skeleton className="h-64 w-full rounded-2xl bg-white/20" />
                </div>
                <div className="flex flex-1 flex-col justify-evenly gap-2">
                  <Skeleton className="h-10 w-56 bg-white/20" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full bg-white/20" />
                    <Skeleton className="h-4 w-full bg-white/20" />
                    <Skeleton className="h-4 w-4/5 bg-white/20" />
                    <Skeleton className="h-4 w-full bg-white/20" />
                    <Skeleton className="h-4 w-3/4 bg-white/20" />
                  </div>
                </div>
              </div>
            </div>
          </ResponsiveContainer>
        </div>

        {/* What We Do Section Skeleton */}
        <div className="bg-gray-200 rounded-2xl p-5">
          <ResponsiveContainer
            maxWidth={{
              default: "xl",
              md: "2xl",
              lg: "2xl",
              xl: "6xl",
            }}
          >
            <div className="flex flex-col gap-5">
              <Skeleton className="h-10 w-40" />
              
              {/* Events Carousel Skeleton */}
              <div className="flex items-center justify-center">
                <div className="w-full">
                  <div className="overflow-hidden">
                    <div className="flex -ml-4">
                      {/* Carousel items */}
                      {Array.from({ length: 3 }, (_, i) => (
                        <div key={i} className="min-w-0 shrink-0 grow-0 basis-full md:basis-1/2 lg:basis-1/2 xl:basis-1/3 pl-4">
                          <div className="rounded-xl p-1">
                            <Card className="overflow-hidden border-2">
                              <CardContent className="flex items-center justify-center p-0 h-[600px]">
                                <div className="relative w-full h-full flex items-center justify-center bg-gray-300">
                                  <Skeleton className="h-8 w-48" />
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ResponsiveContainer>
        </div>

        {/* Footer Section Skeleton */}
        <div className="bg-blue-600 rounded-xl p-5">
          <ResponsiveContainer
            maxWidth={{
              default: "xl",
              md: "2xl",
              lg: "2xl",
              xl: "6xl",
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Footer columns */}
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-6 w-24 bg-white/20" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20 bg-white/20" />
                    <Skeleton className="h-4 w-16 bg-white/20" />
                    <Skeleton className="h-4 w-24 bg-white/20" />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-white/20">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <Skeleton className="h-4 w-48 bg-white/20" />
                <div className="flex gap-4">
                  <Skeleton className="h-8 w-8 rounded bg-white/20" />
                  <Skeleton className="h-8 w-8 rounded bg-white/20" />
                  <Skeleton className="h-8 w-8 rounded bg-white/20" />
                </div>
              </div>
            </div>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}
