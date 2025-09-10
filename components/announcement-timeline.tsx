import {
  fetchTodayAnnouncements,
  fetchPastAnnouncements,
  fetchPastAnnouncementsPages,
} from "@/lib/data";
import { ModernAnnouncementCard } from "./modern-announcementcard";
import { TimelineSection } from "./timeline-sections";
import Pagination from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";

interface AnnouncementTimelineProps {
  query: string;
  currentPage: number;
}

export async function AnnouncementTimeline({
  query,
  currentPage,
}: AnnouncementTimelineProps) {
  const [todayAnnouncements, pastAnnouncements, totalPages] = await Promise.all(
    [
      fetchTodayAnnouncements(),
      fetchPastAnnouncements(query, currentPage),
      fetchPastAnnouncementsPages(query),
    ],
  );
  console.log("Today Announcements:", todayAnnouncements);

  // Combine and sort all announcements
  const allAnnouncements = [...todayAnnouncements, ...pastAnnouncements].sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
  );

  const groupAnnouncementsByTime = (announcements: any[]) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    return {
      today: announcements.filter((a) => new Date(a.updated_at) >= today),
      yesterday: announcements.filter((a) => {
        const date = new Date(a.updated_at);
        return date >= yesterday && date < today;
      }),
      thisWeek: announcements.filter((a) => {
        const date = new Date(a.updated_at);
        return date >= lastWeek && date < yesterday;
      }),
      older: announcements.filter((a) => new Date(a.updated_at) < lastWeek),
    };
  };

  const groupedAnnouncements = groupAnnouncementsByTime(allAnnouncements);

  if (allAnnouncements.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No announcements yet
        </h3>
        <p className="text-gray-500">
          Check back later for updates from UNM ISOC!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Today's Announcements */}
      {groupedAnnouncements.today.length > 0 && (
        <TimelineSection
          title="Today"
          icon={<Clock className="h-5 w-5" />}
          badge={
            <Badge variant="default" className="bg-blue-100 text-blue-700">
              Live
            </Badge>
          }
          announcements={groupedAnnouncements.today}
        />
      )}

      {/* Yesterday's Announcements */}
      {groupedAnnouncements.yesterday.length > 0 && (
        <TimelineSection
          title="Yesterday"
          announcements={groupedAnnouncements.yesterday}
        />
      )}

      {/* This Week's Announcements */}
      {groupedAnnouncements.thisWeek.length > 0 && (
        <TimelineSection
          title="This Week"
          announcements={groupedAnnouncements.thisWeek}
        />
      )}

      {/* Older Announcements */}
      {groupedAnnouncements.older.length > 0 && (
        <TimelineSection
          title="Earlier"
          announcements={groupedAnnouncements.older}
        />
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center pt-8 border-t">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}
