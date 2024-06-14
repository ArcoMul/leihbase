<template>
  <slot v-if="show"></slot>
</template>

<script setup lang="ts">
const props = defineProps<{
  id: string;
  title: string;
}>();

const activeTabId = inject<Ref<string>>("activeTabId");

const show = computed(() => activeTabId?.value === props.id);
</script>
