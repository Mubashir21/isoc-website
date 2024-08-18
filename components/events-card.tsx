import Image from "next/image";
import { Card, CardTitle, CardDescription } from "./ui/card";
import { cn } from "@/lib/utils";
import { EventCard } from "@/lib/definitions";
import { formatDateToLocal, formatTimeTo24Hour } from "@/lib/utils";

type CardProps = React.ComponentProps<typeof Card>;

export function EventsCard({
  event,
  className,
  ...props
}: { event: EventCard } & CardProps) {
  return (
    <Card
      className={cn("w-[390px] h-[490px] overflow-hidden", className)}
      {...props}
    >
      <div className="flex flex-col h-[490px] w-[390px] overflow-hidden">
        <div className="flex-none h-[380px] w-full overflow-hidden">
          <Image
            src={event.pic_url}
            height={690}
            width={390}
            alt={`Image for ${event.title}`}
            className="object-cover h-full w-full transition-transform duration-150 ease-in-out transform hover:scale-105"
          />
        </div>
        <div className="flex-auto flex flex-col justify-around py-2 px-5">
          <div>
            <CardTitle>{event.title}</CardTitle>
            <CardDescription className="leading-6">
              {event.speaker}
            </CardDescription>
          </div>
          <div className="flex justify-between text-sm font-semibold text-blue-600">
            <p>{event.location}</p>
            <p>{formatTimeTo24Hour(event.datetime)}</p>
            <p>{formatDateToLocal(event.datetime)}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
