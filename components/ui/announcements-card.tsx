import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { AnnouncementInfo } from "@/lib/definitions";
import { LocalDateDisplay, LocalTimeDisplay } from "../date-time-display";

type CardProps = React.ComponentProps<typeof Card>;

export default function AnnouncementCard({
  announcement,
  className,
  ...props
}: { announcement: AnnouncementInfo } & CardProps) {
  return (
    <div>
      <Card className="rounded-lg overflow-hidden">
        <CardHeader className="">
          <CardTitle>{announcement.title}</CardTitle>
          <CardDescription className="flex justify-between">
            <span>
              <LocalTimeDisplay datetime={announcement.updated_at} />
            </span>
            <span>
              <LocalDateDisplay datetime={announcement.updated_at} />
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="">{announcement.content}</p>
        </CardContent>
      </Card>
    </div>
  );
}
