<template>
  <FormRow :for="id" :label="label" :required="required">
    <input
      :type="type"
      :id="id"
      :name="name"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
      :data-testid="dataTestid"
      v-model="model"
      class="lb-input"
    />
  </FormRow>
</template>

<script lang="ts" setup>
const model = defineModel();
const props = defineProps<{
  id?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  type?: string;
  dataTestid?: string;
}>();
</script>
