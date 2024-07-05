"use client"
import { error } from "console";
import Image from "next/image";
import { clearScreenDown } from "readline";
import { useState } from "react";

export default function Home() {
  const [isPrayerTimes, setIsPrayerTimes] = useState(false);
  const [prayerTimes, setPrayerTimes] = useState(null);

  const fetchPrayerTimes = async () => {
    try {
      const response = await fetch("https://api.aladhan.com/v1/timingsByCity?city=Jeddah&country=Saudi Arabia&method=4");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const json = await response.json();
      setPrayerTimes(json.data.timings);
      console.log(json.data.timings);

      setIsPrayerTimes(true);
      
    } catch (error) {
      console.log("Fetch error: ", error);
    }
  };
  
  return (
      <div className="hidden h-screen md:flex flex-col gap-3 justify-center items-center">
        <div className="flex gap-5">        
          <h1 className="font-bold text-3xl">ISOC Website</h1>
          <button onClick={fetchPrayerTimes} className="border p-2 rounded-lg bg-black text-white">Submit</button>
        </div>
        {isPrayerTimes && prayerTimes && (
        <div className="prayer-times">
          <h2>Jeddah Prayer Times</h2>
          <ul>
            {Object.entries(prayerTimes).map(([prayer, time]) => (
              <li key={prayer}>{`${prayer}: ${time}`}</li>
            ))}
          </ul>
        </div>
      )}
      </div>
  );
}
