type OpeningHoursRange = {
  from: string;
  to: string;
};

type OpeningHours = {
  [key: string]: OpeningHoursRange[];
};

export function openingHoursToString(openingHours: OpeningHours) {
  const { t } = useI18n();
  return Object.keys(openingHours)
    .map(
      (day) =>
        `${t(`week_days.${day}`)}, ${openingHours[day]
          .map((range) => `${range.from} - ${range.to} ${t("hour")}`)
          .join(" & ")}`
    )
    .join("<br />");
}
