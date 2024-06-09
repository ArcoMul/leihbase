<template>
  <FormRow :for="id" :label="label" :required="required">
    <input
      :type="type"
      :id="id"
      :name="name"
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
      :data-testid="dataTestid"
      v-model="model"
      class="lb-input"
    />
  </FormRow>
</template>

<script setup>
const model = defineModel();
const props = defineProps({
  id: String,
  label: String,
  name: String,
  required: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  type: String,
  dataTestid: String,
});
</script>
