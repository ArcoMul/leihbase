<template>
  <section
    :class="{
      centered: props.centered,
      'no-padding': props.noPadding,
      'padding-x': props.paddingX,
      'padding-y': props.paddingY,
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
  noPadding: {
    type: Boolean,
  },
  paddingX: {
    type: Boolean,
  },
  paddingY: {
    type: Boolean,
  },
});
</script>

<style scoped>
section:not(.no-padding) {
  padding: var(--fluid-spacing-8);
}
section.padding-y {
  padding: var(--fluid-spacing-8) 0;
}
section.padding-x {
  padding: 0 var(--fluid-spacing-8);
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
  max-width: var(--container-sm);
}
section.centered {
  margin: 0 auto;
}
</style>
