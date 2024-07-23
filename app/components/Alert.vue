<template>
  <div :class="{ alert: true, [variant]: true }">
    <ThumbsUp v-if="variant === 'success'" />
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ThumbsUp } from "@iconoir/vue";
withDefaults(defineProps<{ variant: "success" | "error" }>(), {
  variant: "success",
});
</script>

<style lang="scss" scoped>
.alert {
  padding: 1rem 1.25rem;
  border-radius: 5px;
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  &.success {
    background-color: var(--background-success);
  }
  &.error {
    background-color: var(--background-error);
  }
}
</style>
