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
  "DD MM": { weekday: "long", month: "2-digit", day: "2-digit" },
};

export function formatDate(date: string, format: string, locale: string) {
  return DateTime.fromJSDate(new Date(date))
    .setLocale(locale)
    .toLocaleString(FORMATS[format]);
}

export function isDateOnDay(date: Date, days: string[]) {
  return days.includes(Days[date.getDay()]);
}

export function getStartOfDay() {
  var startOfDay = new Date();
  startOfDay.setUTCHours(0, 0, 0, 0);
  return startOfDay;
}
