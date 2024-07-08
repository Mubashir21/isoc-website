import { BellRing, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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

type CardProps = React.ComponentProps<typeof Card>;

export function CardDemo({ className, ...props }: CardProps) {
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
              <p>{timing}</p>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between w-full">
          <p>Time to next prayer:</p>
          <p>04:30</p>
        </div>
      </CardFooter>
    </Card>
  );
}
