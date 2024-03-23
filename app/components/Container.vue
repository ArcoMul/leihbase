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
  padding: clamp(1rem, 3.5vw, 3rem);
}
section.max-width {
  max-width: 1200px;
}
section.centered {
  margin: 0 auto;
}
</style>
