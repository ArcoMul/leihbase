<template>
  <FormRow :for="id" :label="label" :required="required">
    <textarea
      :id="id"
      :name="name"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
      :data-testid="dataTestid"
      v-model="model"
      rows="3"
      class="lb-input"
    >
    </textarea>
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
  dataTestid?: string;
}>();
</script>

<style scoped>
.lb-input {
  line-height: 1.15;
  padding: var(--spacing-3) var(--spacing-3);
}
</style>
