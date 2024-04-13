<template>
  <span class="availability-badge">
    <AvailabilityCircle :available="available" />
    <span v-if="props.available">Gerade verfügbar</span>
    <span v-else>Gerade nicht verfügbar</span>
  </span>
</template>

<script setup>
const props = defineProps({
  available: {
    type: Boolean,
    default: true,
  },
});
</script>

<style scoped>
.availability-badge {
  background-color: var(--bg-secondary-light);
  border-radius: 999px;
  padding: 0.333rem 0.75rem;
  display: inline-flex;
  align-items: center;
  gap: 0.666rem;
  font-size: var(--font-size-sm);
}
</style>
