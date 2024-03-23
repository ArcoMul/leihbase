<template>
  <section
    :class="{
      centered: props.centered,
      'max-width': props.maxWidth,
      centered: props.centered,
    }"
  >
    <slot></slot>
  </section>
</template>

<script setup>
const props = defineProps({
  centered: {
    type: Boolean,
    default: false,
  },
  maxWidth: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
section {
  padding: var(--fluid-spacing-8);
}
section.max-width {
  max-width: 1200px;
}
section.centered {
  margin: 0 auto;
}
</style>
