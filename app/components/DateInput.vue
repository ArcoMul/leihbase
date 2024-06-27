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
        <calendar-date
          ref="datepicker"
          show-outside-days
          @change="handleDateChange"
        >
          <calendar-month></calendar-month>
        </calendar-date>
      </template>
    </Popup>
  </FormRow>
</template>

<script lang="ts" setup>
import { DateTime } from "luxon";
import { formatDate, toShortISO } from "~/lib/date";

const { t, locale } = useI18n();

const datepicker = ref();

if (process.client) {
  await import("cally");
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
const showPopup = ref(false);

watch(model, (value) => {
  if (value) {
    datepicker.value.value = toShortISO(value);
  } else {
    datepicker.value.value = "";
  }
});

function handleInputFocus(e) {
  showPopup.value = true;
}

function handleDateChange(e) {
  model.value = new Date(datepicker.value.value);
  showPopup.value = false;
}
</script>
