<template>
  <FormRow :for="id" :label="label" :required="required">
    <button @click.prevent="handleClick">
      {{ record ? record[search[0]] : "None" }}
    </button>
  </FormRow>
</template>

<script lang="ts" setup>
import type RecordPicker from "./RecordPicker.vue";

const model = defineModel<string>();
const props = defineProps<{
  id: string;
  label: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  dataTestid?: string;
  collection: string;
  search: string[];
}>();

const recordPicker =
  inject<Ref<InstanceType<typeof RecordPicker>>>("recordPicker");

const { record, show } = await useRecordPicker(recordPicker, {
  title: props.label,
  collection: props.collection,
  search: props.search,
  value: model.value,
});

watch(record, (newRecord) => {
  model.value = newRecord?.id;
});

function handleClick() {
  show();
}
</script>

<style lang="scss" scoped>
button {
  width: 100%;
  border-radius: var(--input-border-radius);
  border: 0;
  background: transparent;
  text-align: left;
  background-color: var(--background-neutral);
  padding: var(--spacing-2);
  border: 1px solid transparent;
  cursor: pointer;
  &:hover {
    border: 1px solid var(--border-neutral);
  }
}
</style>
