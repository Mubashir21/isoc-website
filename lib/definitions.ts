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

export type EventsTable = {
  id: string;
  created_by: string;
  title: string;
  datetime: string;
  pic_url: string;
  location: string;
  speaker: string;
  updated_at: string;
  description: string;
};

export type EventsForm = {
  id: string;
  created_by: string;
  title: string;
  datetime: string;
  location: string;
  speaker: string;
  pic_url: string;
  description: string;
};

export type EventCard = {
  id: string;
  title: string;
  speaker: string;
  location: string;
  datetime: string;
  pic_url: string;
  description: string;
};

export type AdminField = {
  id: string;
  name: string;
};

export type Admin = {
  id: string;
  name: string;
  username: string;
  password: string;
};
