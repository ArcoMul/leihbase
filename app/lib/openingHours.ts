import { DateTime } from "luxon";
import { formatDate } from "./date";

type OpeningHoursRange = {
  from: string;
  to: string;
};

type OpeningHoursDays = {
  [key: string]: OpeningHoursRange[];
};

type OpeningHoursExcept = {
  dates: string[];
};

type OpeningHours = {
  days: OpeningHoursDays;
  except: OpeningHoursExcept;
};

export const Days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

/**
 * If a given date is in the days of the registered opening hours
 */
export function isInOpeningHoursDay(
  _openingHours: OpeningHours | OpeningHoursDays,
  date: Date
): boolean {
  const openDays = _openingHours.days
    ? Object.keys(_openingHours.days)
    : Object.keys(_openingHours);
  return openDays.includes(Days[date.getDay()]);
}

/**
 * Converts an opening hours data object into a readable string
 */
export function openingHoursToString(
  _openingHours: OpeningHours | OpeningHoursDays,
  locale: string
) {
  const openingHours = _openingHours.days
    ? (_openingHours as OpeningHours)
    : ({ days: _openingHours } as OpeningHours);
  const { t } = useI18n();

  // Opening hours
  const days = Object.keys(openingHours.days).map(
    (day) =>
      `${t(`week_days.${day}`)}, ${openingHours.days[day]
        .map((range) => `${range.from} - ${range.to} ${t("hour")}`)
        .join(" & ")}`
  );

  // Upcoming exceptions
  const nextWeek = DateTime.now().plus({ days: 7 }).toJSDate();
  const closed = (openingHours?.except?.dates || [])
    .filter(
      (d) =>
        new Date(d) < nextWeek &&
        isInOpeningHoursDay(_openingHours, new Date(d))
    )
    .map((d) => formatDate(d, "dd, DD.MM", locale));

  return `${days.join("<br />")}${
    closed.length > 0 ? `<br/>${t("closed_at")}: ${closed.join(", ")}` : ""
  }`;
}
