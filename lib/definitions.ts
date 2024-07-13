// Define an index signature for PrayerTimesData
export type PrayerTimesJSON = {
  [date: string]: PrayerTimesData;
};

export type PrayerTimesData = {
  prayerTimes: {
    fajr: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  };
  info: {
    hijri: string;
    day: string;
  };
};
