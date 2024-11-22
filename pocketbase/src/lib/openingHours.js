export function isInOpeningHoursDay(openingHours, date) {
  const Days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const openDays = Object.keys(openingHours.days);
  return openDays.includes(Days[date.getDay()]);
}
