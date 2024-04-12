<template>
  <section
    :class="{
      centered: props.centered,
      centered: props.centered,
      ['width-' + props.width]: !!props.width,
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
  width: {
    type: String,
    default: null,
  },
});
</script>

<style scoped>
section {
  padding: var(--fluid-spacing-8);
}
section.width-xl {
  max-width: 1400px;
}
section.width-lg {
  max-width: 1200px;
}
section.width-md {
  max-width: 900px;
}
section.width-sm {
  max-width: 600px;
}
section.centered {
  margin: 0 auto;
}
</style>
