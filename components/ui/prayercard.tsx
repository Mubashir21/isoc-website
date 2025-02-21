import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DatePicker from "@/components/ui/date-picker";

import PrayerTimesDisplay from "./prayertimes-display";

type CardProps = React.ComponentProps<typeof Card>;

export function PrayerCard({ className, ...props }: CardProps) {
  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardHeader className="bg-gray-200 rounded-t-lg">
        <div className="flex justify-between items-center">
          <CardTitle className="text-3xl">Prayer Times</CardTitle>
          {/* <DatePicker /> */}
        </div>
        <CardDescription>UNM Islamic Center</CardDescription>
      </CardHeader>
      <PrayerTimesDisplay />
    </Card>
  );
}
