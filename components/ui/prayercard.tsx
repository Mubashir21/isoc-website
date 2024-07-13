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
import CountDown from "@/components/ui/countdown";
import { useState, useEffect } from "react";

type CardProps = React.ComponentProps<typeof Card>;

export function PrayerCard({ initialTime, className, ...props }: CardProps) {
  const [time, setTime] = useState(new Date(initialTime));
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
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer); // Clean up the interval on component unmount
  }, [date]);

  // Update next prayer time whenever the current time or prayer times change
  useEffect(() => {
    if (prayerTimes) {
      setNextPrayerTime(getNextPrayerTime(time, prayerTimes));
    }
  }, [prayerTimes]);

  // Update countdown timer
  useEffect(() => {
    const countdownTimer = setInterval(() => {
      if (nextPrayerTime) {
        const now = time;
        const timeDifference = nextPrayerTime - now;
        if (timeDifference > 0) {
          const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
          const seconds = Math.floor((timeDifference / 1000) % 60);
          setCountdown(`${hours}h ${minutes}m ${seconds}s`);
        } else {
          setCountdown("Time for the next prayer!");
        }
      }
    }, 1000);

    return () => clearInterval(countdownTimer); // Clean up the interval on component unmount
  }, [nextPrayerTime, time]);

  // useEffect(() => {
  //   const updateCountdown = () => {
  //     const timeDiff = nextPrayerTime - now;

  //     if (timeDiff <= 0) {
  //       setNextPrayerTime(getNextPrayerTime(time, prayerTimes));
  //       return;
  //     }

  //     const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  //     const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  //     const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  //     setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
  //   };

  //   const intervalId = setInterval(updateCountdown, 1000);
  //   return () => clearInterval(intervalId);
  // }, [nextPrayerTime, prayerTimes]);

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
        {/* <CountDown
        // initialTime={format(now.getTimezoneOffset(), "yyyy-MM-dd HH:mm:ss")}
        // initialTime={now}
        /> */}
        {countdown}
      </CardFooter>
    </Card>
  );
}

// function CountDown({ time }) {
//   const [time, setTime] = useState(new Date(initialTime));

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setTime(new Date());
//     }, 1000);
//     // console.log(time);

//     return () => clearInterval(intervalId);
//   }, [initialTime]);

//   return (
//     <div className="flex justify-between w-full">
//       <p>Time to next prayer:</p>
//       <p>{time.toLocaleTimeString()}</p>
//     </div>
//   );
// }
