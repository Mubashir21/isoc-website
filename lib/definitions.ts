// Define an index signature for PrayerTimesData
export type PrayerTimesJSON = {
  [date: string]: PrayerTimesData;
};

export type PrayerTimesData = {
  prayerTimes: PrayerTimes;
  info: {
    hijri: string;
    day: string;
  };
};

export type PrayerTimes = {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
};
