import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { AnnouncementInfo } from "@/lib/definitions";
import { formatDateToLocal, formatTimeTo24Hour } from "@/lib/utils";

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
            <div>{formatTimeTo24Hour(announcement.updated_at)}</div>
            <div>{formatDateToLocal(announcement.updated_at)}</div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="">{announcement.content}</p>
        </CardContent>
      </Card>
    </div>
  );
}
