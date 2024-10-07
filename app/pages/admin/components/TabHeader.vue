<template>
  <header>
    <slot name="prefix" />
    <h3 :class="{ 'fixed-width': fixedWidth }">{{ title }}</h3>
    <slot name="suffix" />
  </header>
</template>

<script setup lang="ts">
defineProps<{ title: string; fixedWidth?: boolean }>();
</script>

<style scoped>
header {
  display: flex;
  margin-bottom: 1rem;
  gap: var(--fluid-spacing-8);
}

header > h3 {
  margin: 0;
}

header > h3.fixed-width {
  min-width: 10rem;
  text-align: center;
}

header > button {
  background-color: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
}

header > button .icon {
  width: 1em;
  height: 1em;
}
</style>
