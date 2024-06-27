import { DateTime } from "luxon";

const Days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const FORMATS = {
  "DD MMM YYYY": DateTime.DATE_MED,
  "ddd, DD.MM": { weekday: "long", month: "2-digit", day: "2-digit" },
  "DD.MM.YYYY": { year: "numeric", month: "2-digit", day: "2-digit" },
};

export function formatDate(
  date: string | Date,
  format: string,
  locale: string
) {
  return DateTime.fromJSDate(new Date(date))
    .setLocale(locale)
    .toLocaleString(FORMATS[format]);
}

export function isDateOnDay(date: Date, days: string[]) {
  return days.includes(Days[date.getDay()]);
}

export function isToday(date: Date): boolean {
  return getStartOfDay().getTime() == startOfDate(date).getTime();
}

export function isSameDate(date1: Date, date2: Date): boolean {
  return startOfDate(date1).getTime() == startOfDate(date2).getTime();
}

export function getStartOfDay() {
  var startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  return startOfDay;
}

export function startOfDate(date: Date): Date {
  const d = new Date(date.getTime());
  d.setHours(0, 0, 0, 0);
  return d;
}

export function endOfDate(date: Date): Date {
  const d = new Date(date.getTime());
  d.setHours(23, 59, 59, 999);
  return d;
}

export function toShortISO(date: Date): string {
  return date.toISOString().split("T")[0];
}
