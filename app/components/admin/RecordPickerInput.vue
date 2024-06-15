<template>
  <FormRow :for="id" :label="label" :required="required">
    <button
      @click.prevent="recordPicker?.show({ title: label, collection, search })"
    >
      None
    </button>
  </FormRow>
</template>

<script lang="ts" setup>
import type RecordPicker from "./RecordPicker.vue";

const model = defineModel();
defineProps<{
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
