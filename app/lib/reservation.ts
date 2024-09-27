import { DateTime } from "luxon";

const startOfToday = DateTime.now().startOf("day");
const endOfToday = DateTime.now().startOf("day");

export function isToday(reservation: { start: string; end: string }): boolean {
  return (
    DateTime.fromJSDate(new Date(reservation.start)).startOf("day") <=
      startOfToday &&
    DateTime.fromJSDate(new Date(reservation.end)).startOf("day") >= endOfToday
  );
}
