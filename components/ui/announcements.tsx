import { fetchPastAnnouncements } from "@/lib/data";
import AnnouncementCard from "./announcements-card";

export async function PastAnnouncements({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const pastAnnouncements = await fetchPastAnnouncements(query, currentPage);
  return (
    <>
      <div className="flex flex-col gap-3">
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
    </>
  );
}
