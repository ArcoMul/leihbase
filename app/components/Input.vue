<template>
  <fieldset>
    <label :for="id">{{ label }}</label>
    <input
      :type="type"
      :id="id"
      :name="name"
      :required="required"
      v-model="model"
    />
  </fieldset>
</template>

<script setup>
const model = defineModel();
const props = defineProps({
  id: String,
  label: String,
  name: String,
  required: Boolean,
  type: String,
});
</script>

<style scoped>
fieldset {
  border: 0;
  padding: 0;
  width: 100%;
}
label {
  display: block;
  font-weight: bold;
  margin-bottom: var(--spacing-2);
}
input {
  display: block;
  width: 100%;
  line-height: 2;
  padding: 0 var(--spacing-2);
}
</style>
