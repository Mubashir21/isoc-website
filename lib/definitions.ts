export type PrayerTimesData = {
  [date: string]: {
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
};
