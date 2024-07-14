"use client";

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
import { fetchPrayerTimes, getDate, getNextPrayerTime } from "@/lib/utils";
import { useState, useEffect } from "react";

type CardProps = React.ComponentProps<typeof Card>;

export function PrayerCard({ className, ...props }: CardProps) {
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState(getDate(time));
  const [prayerTimes, setPrayerTimes] = useState(fetchPrayerTimes(date));
  const [nextPrayerTime, setNextPrayerTime] = useState(
    getNextPrayerTime(time, prayerTimes),
  );
  const [countdown, setCountdown] = useState("");

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        const newTime = new Date(prevTime.getTime() + 1000); // Increment by 1 second
        const newDate = getDate(newTime);

        if (newDate !== date) {
          setDate(newDate);
          setPrayerTimes(fetchPrayerTimes(newDate));
          setNextPrayerTime(getNextPrayerTime(time, prayerTimes));
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer); // Clean up the interval on component unmount
  }, [date]);

  // Update countdown timer
  useEffect(() => {
    const countdownTimer = setInterval(() => {
      if (nextPrayerTime) {
        const now = new Date();
        const timeDifference = nextPrayerTime.getTime() - now.getTime();
        if (timeDifference > 0) {
          const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24)
            .toString()
            .padStart(2, "0");
          const minutes = Math.floor((timeDifference / (1000 * 60)) % 60)
            .toString()
            .padStart(2, "0");
          const seconds = Math.floor((timeDifference / 1000) % 60)
            .toString()
            .padStart(2, "0");
          setCountdown(`${hours}:${minutes}:${seconds}`);
        } else {
          setNextPrayerTime(getNextPrayerTime(time, prayerTimes));
        }
      }
    }, 1000);

    return () => clearInterval(countdownTimer); // Clean up the interval on component unmount
  }, [nextPrayerTime]);

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
              <p>{prayerTimes.info.hijri}</p>
            </div>
            <p>{prayerTimes.info.day}</p>
          </div>
        </div>
        <div>
          {Object.entries(prayerTimes.prayerTimes).map(
            ([key, timing], index) => (
              <div key={index} className="flex justify-between">
                <p>{key}</p>
                <p>{timing as string}</p>
              </div>
            ),
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between w-full">
          <p>Time to next prayer:</p>
          <p>{countdown}</p>
        </div>
      </CardFooter>
    </Card>
  );
}
