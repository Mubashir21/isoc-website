"use client";
import { useState, useEffect } from "react";
import { getDate, getNextPrayerTime } from "@/lib/utils";

export default function CountDown({ initialTime }) {
  const [time, setTime] = useState(new Date(initialTime));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    // console.log(time);

    return () => clearInterval(intervalId);
  }, [initialTime]);

  return (
    <div className="flex justify-between w-full">
      <p>Time to next prayer:</p>
      <p>{time.toLocaleTimeString()}</p>
    </div>
  );
}
