import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnnouncementInfo } from "@/lib/definitions";
import { LocalDateDisplay, LocalTimeDisplay } from "./date-time-display";
import { Clock, Calendar, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModernAnnouncementCardProps {
  announcement: AnnouncementInfo;
  size?: "normal" | "large";
  showFullDate?: boolean;
}

export function ModernAnnouncementCard({
  announcement,
  size = "normal",
  showFullDate = false,
}: ModernAnnouncementCardProps) {
  const isToday =
    new Date(announcement.updated_at).toDateString() ===
    new Date().toDateString();
  const isLarge = size === "large";

  const getRelativeTime = (date: string) => {
    const now = new Date();
    const announcementDate = new Date(date);
    const diffInHours = Math.floor(
      (now.getTime() - announcementDate.getTime()) / (1000 * 60 * 60),
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return `${Math.floor(diffInDays / 7)}w ago`;
  };

  return (
    <Card
      className={cn(
        "group hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500 hover:border-l-blue-600",
        isLarge && "lg:col-span-2 xl:col-span-2",
        isToday && "ring-2 ring-blue-200 shadow-md",
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="p-2 bg-blue-600 rounded-lg group-hover:bg-blue-700 transition-colors">
              <Bell className="h-4 w-4 text-white" />
            </div>

            <div className="flex-1 min-w-0">
              <h3
                className={cn(
                  "font-bold text-gray-800 group-hover:text-blue-600 transition-colors leading-tight",
                  isLarge ? "text-xl" : "text-lg",
                )}
              >
                {announcement.title}
              </h3>

              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  {isToday ? (
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-700 text-xs"
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      {getRelativeTime(announcement.updated_at)}
                    </Badge>
                  ) : (
                    <>
                      <Calendar className="h-3 w-3" />
                      {showFullDate ? (
                        <LocalDateDisplay datetime={announcement.updated_at} />
                      ) : (
                        <span>{getRelativeTime(announcement.updated_at)}</span>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="pl-11">
          <p
            className={cn(
              "text-gray-600 leading-relaxed",
              isLarge ? "text-base" : "text-sm",
              isLarge ? "line-clamp-4" : "line-clamp-3",
            )}
          >
            {announcement.content}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
