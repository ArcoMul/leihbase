<template>
  <FormRow :for="id" :label="label" :required="required">
    <input
      :id="id"
      :name="name"
      :required="required"
      ref="input"
      class="lb-input"
    />
  </FormRow>
</template>

<script setup>
import { DateTime } from "luxon";
import { formatDate } from "~/lib/date";
import "pikaday/css/pikaday.css";

const { t, locale } = useI18n();

let Pikaday;

if (process.client) {
  ({ default: Pikaday } = await import("pikaday"));
}

const model = defineModel();
const props = defineProps({
  id: String,
  label: String,
  name: String,
  required: Boolean,
  disableDayFn: Function,
});

const input = ref(null);
const picker = ref(null);

onMounted(() => {
  picker.value = new Pikaday({
    field: input.value,
    disableDayFn: props.disableDayFn,
    toString(date) {
      return formatDate(date, DateTime.DATE_MED, locale.value);
    },
    onSelect(date) {
      model.value = new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
      );
    },
    i18n: {
      previousMonth: t("previous_month"),
      nextMonth: t("next_month"),
      months: [
        t("months.january"),
        t("months.february"),
        t("months.march"),
        t("months.april"),
        t("months.may"),
        t("months.june"),
        t("months.july"),
        t("months.august"),
        t("months.september"),
        t("months.october"),
        t("months.november"),
        t("months.december"),
      ],
      weekdays: [
        t("week_days.sunday"),
        t("week_days.monday"),
        t("week_days.tuesday"),
        t("week_days.wednesday"),
        t("week_days.thursday"),
        t("week_days.friday"),
        t("week_days.saturday"),
      ],
      weekdaysShort: [
        t("week_days_short.sunday"),
        t("week_days_short.monday"),
        t("week_days_short.tuesday"),
        t("week_days_short.wednesday"),
        t("week_days_short.thursday"),
        t("week_days_short.friday"),
        t("week_days_short.saturday"),
      ],
    },
  });
});
</script>
