<template>
  <FormRow :for="id" :label="label">
    <div class="row">
      <input
        type="checkbox"
        :id="id"
        :name="name"
        :data-testid="dataTestid"
        :disabled="disabled"
        :readonly="readonly"
        v-model="model"
      />
      <label :for="id" role="switch" :aria-checked="model">
        <Check class="check" />
      </label>
    </div>
  </FormRow>
</template>

<script lang="ts" setup>
import { Check } from "@iconoir/vue";
const model = defineModel();
const props = defineProps<{
  id: string;
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

<style scoped>
.row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
input {
  opacity: 0;
  position: absolute;
}
label {
  --margin: 0.2rem;
  --knob-size: 1.1rem;
  display: inline-block;
  height: calc(var(--knob-size) + var(--margin) * 2);
  width: calc(var(--knob-size) * 2 + var(--margin) * 2);
  background: #999;
  border-radius: calc(var(--knob-size) + 0.4rem);
  cursor: pointer;
  color: white;
  position: relative;
}
label .check {
  display: none;
  position: absolute;
  width: calc(var(--knob-size) - 4px);
  height: calc(var(--knob-size) - 4px);
  top: 50%;
  left: calc(var(--margin) + 1px);
  transform: translateY(-50%);
  stroke-width: 3px;
}
label:after {
  content: "";
  display: block;
  height: var(--knob-size);
  width: var(--knob-size);
  border-radius: var(--knob-size);
  background: #fff;
  margin-top: 0.2rem;
  margin-left: 0.2rem;
  transition: all 300ms;
}
input:checked + label {
  background: #4bd865;
}
input:checked + label .check {
  display: block;
}
input:checked + label:after {
  transform: translate3d(100%, 0, 0);
}
</style>
