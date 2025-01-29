"use client";

import { useState, useEffect } from "react";
import {
  getDate,
  getNextPrayerTime,
  fetchPrayerTimes,
  fetchIqamaTimes,
} from "@/lib/utils";
import CountdownDisplay from "./countdown-timer";
import DateDisplay from "./date-display";
import { CardContent, CardFooter } from "@/components/ui/card";
import { PrayerCardSkeleton } from "../skeletons";
import clsx from "clsx";
import { PrayerTimes } from "@/lib/definitions";

export default function PrayerTimesDisplay() {
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState(getDate(time));
  const [prayerTimes, setPrayerTimes] = useState(fetchPrayerTimes(date));
  const [iqamaTimes, setIqamaTimes] = useState(
    fetchIqamaTimes(prayerTimes.prayerTimes),
  );
  const [nextPrayerTime, setNextPrayerTime] = useState(
    getNextPrayerTime(time, prayerTimes),
  );
  const [countdown, setCountdown] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        const newTime = new Date(prevTime.getTime() + 1000); // Increment by 1 second
        const newDate = getDate(newTime);

        if (newDate !== date) {
          setDate(newDate);
          setPrayerTimes(fetchPrayerTimes(newDate));
          setNextPrayerTime(
            getNextPrayerTime(newTime, fetchPrayerTimes(newDate)),
          );
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer); // Clean up the interval on component unmount
  }, [date]);

  useEffect(() => {
    const countdownTimer = setInterval(() => {
      if (nextPrayerTime) {
        const now = new Date();
        const timeDifference = nextPrayerTime.time.getTime() - now.getTime();
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
          setLoading(false);
        } else {
          setLoading(true);
          setNextPrayerTime(getNextPrayerTime(time, prayerTimes));
        }
      }
    }, 1000);

    return () => clearInterval(countdownTimer); // Clean up the interval on component unmount
  }, [nextPrayerTime]);

  if (loading) {
    return <PrayerCardSkeleton />;
  }

  return (
    <>
      <CardContent className="grid gap-4 py-6">
        <DateDisplay
          date={date}
          hijri={prayerTimes.info.hijri}
          day={prayerTimes.info.day}
        />
        <div className="my-3">
          <div className="flex justify-between text-md leading-loose font-medium text-muted-foreground">
            <p>Prayer</p>
            <p>Adhan</p>
            <p>Iqamah</p>
          </div>
          {Object.entries(prayerTimes.prayerTimes).map(
            ([key, timing], index) => (
              <div
                key={index}
                className={clsx(
                  "flex justify-between items-center text-md font-medium leading-loose",
                  {
                    "text-blue-600": key === nextPrayerTime.currentPrayer,
                  },
                )}
              >
                <p className="w-10">{key}</p>
                <p>{timing}</p>
                <p>{iqamaTimes[key as keyof PrayerTimes]}</p>
              </div>
            ),
          )}
        </div>
      </CardContent>
      <CardFooter className="bg-blue-600 py-3 rounded-b-lg">
        <CountdownDisplay
          countdown={countdown}
          nextPrayer={nextPrayerTime.nextPrayer}
        />
      </CardFooter>
    </>
  );
}
