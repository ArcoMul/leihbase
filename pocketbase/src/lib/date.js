export function addDays(date, n) {
  return new Date(date.getTime() + n * 24 * 60 * 60 * 1000);
}

export function startOfDate(date) {
  return new Date(date.setUTCHours(0, 0, 0, 0));
}

export function endOfDate(date) {
  return new Date(date.setUTCHours(23, 59, 59, 999));
}
