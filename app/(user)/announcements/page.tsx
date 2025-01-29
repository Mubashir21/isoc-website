import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import AnnouncementCard from "@/components/ui/announcements-card";
import { fetchPastAnnouncements, fetchTodayAnnouncements } from "@/lib/data";

export default async function Announcements() {
  const todayAnnouncements = await fetchTodayAnnouncements();
  const pastAnnouncements = await fetchPastAnnouncements();
  return (
    <div>
      <div className="flex flex-col gap-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Announcements</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <p className="text-4xl font-bold text-blue-600">Today</p>
        {todayAnnouncements.length > 0 ? (
          todayAnnouncements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
            />
          ))
        ) : (
          <p className="text-gray-500">No announcements for today.</p>
        )}
        <p className="text-4xl font-bold text-blue-600">Past</p>
        {pastAnnouncements.length > 0 ? (
          pastAnnouncements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
            />
          ))
        ) : (
          <p className="text-muted-foreground">
            No past announcements available.
          </p>
        )}
      </div>
    </div>
  );
}
