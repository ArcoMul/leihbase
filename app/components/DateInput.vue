<template>
  <FormRow :for="id" :label="label" :required="required">
    <input
      :id="id"
      :name="name"
      :required="required"
      :value="model ? formatDate(model, 'DD.MM.YYYY', locale) : ''"
      @focus="handleInputFocus"
      ref="input"
      class="lb-input"
    />
    <ClientOnly>
      <Datepicker
        class="dateinput-datepicker"
        ref="datepicker"
        minimum-view="day"
        maximum-view="day"
        @selected="handleDatepickerSelected"
      ></Datepicker>
    </ClientOnly>
  </FormRow>
</template>

<script lang="ts" setup>
import { DateTime } from "luxon";
import { formatDate, isSameDate } from "~/lib/date";
// import "pikaday/css/pikaday.css";
import Datepicker from "vuejs3-datepicker";

const { t, locale } = useI18n();

const datepicker = ref();

// let Pikaday;

// if (process.client) {
//   ({ default: Pikaday } = await import("pikaday"));
// }

const model = defineModel<Date>();
const props = defineProps({
  id: String,
  label: String,
  name: String,
  required: Boolean,
  disableDayFn: Function,
});

const input = ref(null);
const picker = ref(null);

function handleInputFocus() {
  console.log(datepicker.value);
  setTimeout(() => {
    datepicker.value.showDayCalendar();
  }, 100);
}

function handleDatepickerSelected(value: Date) {
  model.value = value;
}

// watch(model, (newValue, oldValue) => {
//   console.log(newValue, oldValue);
//   if (
//     (newValue && !oldValue) ||
//     (!newValue && oldValue) ||
//     !isSameDate(newValue, oldValue)
//   ) {
//     picker?.value?.setDate(`${newValue.toISOString().split("T")[0]}`, true);
//   }
// });

// onMounted(() => {
//   picker.value = new Pikaday({
//     field: input.value,
//     disableDayFn: props.disableDayFn,
//     toString(date) {
//       return formatDate(date, DateTime.DATE_MED, locale.value);
//     },
//     onSelect(date) {
//       console.log("onSelect", date);
//       model.value = new Date(
//         Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
//       );
//     },
//     i18n: {
//       previousMonth: t("previous_month"),
//       nextMonth: t("next_month"),
//       months: [
//         t("months.january"),
//         t("months.february"),
//         t("months.march"),
//         t("months.april"),
//         t("months.may"),
//         t("months.june"),
//         t("months.july"),
//         t("months.august"),
//         t("months.september"),
//         t("months.october"),
//         t("months.november"),
//         t("months.december"),
//       ],
//       weekdays: [
//         t("week_days.sunday"),
//         t("week_days.monday"),
//         t("week_days.tuesday"),
//         t("week_days.wednesday"),
//         t("week_days.thursday"),
//         t("week_days.friday"),
//         t("week_days.saturday"),
//       ],
//       weekdaysShort: [
//         t("week_days_short.sunday"),
//         t("week_days_short.monday"),
//         t("week_days_short.tuesday"),
//         t("week_days_short.wednesday"),
//         t("week_days_short.thursday"),
//         t("week_days_short.friday"),
//         t("week_days_short.saturday"),
//       ],
//     },
//   });
//   picker.value.setDate(null);
// });

// onUnmounted(() => {
//   picker?.value?.destroy();
// });
</script>

<style>
.dateinput-datepicker .vuejs3-datepicker__value {
  display: none;
}
</style>
