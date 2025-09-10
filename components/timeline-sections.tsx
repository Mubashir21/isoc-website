import { Calendar } from "lucide-react";
import { ReactNode } from "react";
import { ModernAnnouncementCard } from "./modern-announcementcard";

interface TimelineSectionProps {
  title: string;
  icon?: ReactNode;
  badge?: ReactNode;
  announcements: any[];
}

export function TimelineSection({
  title,
  icon,
  badge,
  announcements,
}: TimelineSectionProps) {
  return (
    <div className="relative">
      {/* Timeline line */}
      {/* <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 to-transparent"></div> */}

      {/* Section header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center text-white w-12 h-12 bg-blue-600 rounded-full shadow-lg">
          {icon || <Calendar className="h-5 w-5 text-white" />}
          <span className="text-white font-semibold">
            {/* {!icon && <Calendar className="h-5 w-5" />} */}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          {badge}
        </div>
      </div>

      {/* Announcements grid */}
      <div className="ml-18 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {announcements.map((announcement, index) => (
          <ModernAnnouncementCard
            key={announcement.id}
            announcement={announcement}
            size={"normal"}
            showFullDate={title === "Earlier"}
          />
        ))}
      </div>
    </div>
  );
}
