<template>
  <FormRow :for="id" :label="label" :required="required">
    <Popup v-model:open="showPopup">
      <input
        :id="id"
        :name="name"
        :required="required"
        :value="model ? formatDate(model, 'DD.MM.YYYY', locale) : ''"
        ref="input"
        class="lb-input"
        @click="handleInputFocus"
      />
      <template #popup>
        <ClientOnly>
          <calendar-date
            ref="datepicker"
            :show-outside-days="showOutsideDays"
            :isDateDisallowed="isDateDisallowed"
            :locale="locale"
            @change="handleDateChange"
          >
            <ArrowLeft slot="previous" :title="t('previous_month')" />
            <ArrowRight slot="next" :title="t('next_month')" />
            <calendar-month></calendar-month>
          </calendar-date>
        </ClientOnly>
      </template>
    </Popup>
  </FormRow>
</template>

<script lang="ts" setup>
import { formatDate, toShortISO } from "~/lib/date";
import { ArrowLeft, ArrowRight } from "@iconoir/vue";

const { t, locale } = useI18n();

const datepicker = ref();

if (process.client) {
  await import("cally");
}

const model = defineModel<Date>();
const props = withDefaults(
  defineProps<{
    id: string;
    label: string;
    name: string;
    required: boolean;
    isDateDisallowed: Function;
    showOutsideDays: boolean;
  }>(),
  { showOutsideDays: true }
);

const input = ref(null);
const showPopup = ref(false);

watch(model, (value) => {
  if (value) {
    datepicker.value.value = toShortISO(value);
  } else {
    datepicker.value.value = "";
  }
});

function handleInputFocus() {
  showPopup.value = true;
}

function handleDateChange() {
  model.value = new Date(datepicker.value.value);
  showPopup.value = false;
}
</script>

<style scoped>
calendar-date::part(previous),
calendar-date::part(next) {
  background: transparent;
  border: 0;
}
calendar-month::part(day) {
  inline-size: 2rem;
  block-size: 2rem;
}
calendar-month::part(today) {
  border: 1px solid black;
}
calendar-month::part(disallowed) {
  text-decoration: line-through;
  opacity: 0.333;
}
calendar-month::part(outside) {
  cursor: pointer;
}
</style>

<i18n lang="json">
{
  "en": {
    "next_month": "Next month",
    "previous_month": "Previous month"
  },
  "de": {
    "next_month": "Nächster Monat",
    "previous_month": "Voriger Monat"
  }
}
</i18n>
