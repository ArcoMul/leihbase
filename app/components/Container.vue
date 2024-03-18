<template>
  <section :class="{ centered: props.centered }">
    <slot></slot>
  </section>
</template>

<script setup>
const props = defineProps({
  centered: {
    type: Boolean,
    deefault: false,
  },
});
</script>

<style scoped>
section {
  padding: 2rem;
}
section.centered {
  display: flex;
  justify-content: center;
}
</style>
