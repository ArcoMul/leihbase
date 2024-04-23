import { DateTime } from "luxon";

export function formatDate(date: string, format: string, locale: string) {
  return DateTime.fromJSDate(new Date(date))
    .setLocale(locale)
    .toLocaleString(format);
}
