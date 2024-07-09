import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { fetchPrayerTimes, getDate } from "@/lib/utils";
import { CountDown } from "@/components/ui/countdown";

type CardProps = React.ComponentProps<typeof Card>;

export function PrayerCard({ className, ...props }: CardProps) {
  const date = getDate();
  const today = fetchPrayerTimes(date);
  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Prayer Times</CardTitle>
          <DatePicker />
        </div>
        <CardDescription>UNM Islamic Center</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          <div className="flex justify-between">
            <div>
              <p>{date}</p>
              <p>{today.info.hijri}</p>
            </div>
            <p>{today.info.day}</p>
          </div>
        </div>
        <div>
          {Object.entries(today.prayerTimes).map(([key, timing], index) => (
            <div key={index} className="flex justify-between">
              <p>{key}</p>
              <p>{timing as string}</p>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <CountDown />
      </CardFooter>
    </Card>
  );
}
