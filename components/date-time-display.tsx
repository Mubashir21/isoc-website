"use client";

import { formatDateToLocal, formatTimeTo24Hour } from "@/lib/utils";

export const LocalTimeDisplay = ({ datetime }: { datetime: string }) => {
  return <>{formatTimeTo24Hour(datetime)}</>;
};

export const LocalDateDisplay = ({ datetime }: { datetime: string }) => {
  return <>{formatDateToLocal(datetime)}</>;
};
