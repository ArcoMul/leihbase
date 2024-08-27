<template>
  <div>
    <nav>
      <ul class="tablist">
        <li v-for="tab in tabs">
          <button
            :class="activeTabId === tab.props?.id ? 'active' : ''"
            @click="handleClick(tab)"
          >
            {{ tab?.props?.title }}
          </button>
        </li>
      </ul>
    </nav>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type Tab from "./Tab.vue";

const props = defineProps<{ active: string }>();

defineSlots<{
  default(): InstanceType<typeof Tab>;
}>();

const slots = useSlots();
const tabs = ref<VNode[]>(slots.default ? slots.default() : []);
const activeTabId = ref<string | null>(props.active);

provide("activeTabId", activeTabId);

function handleClick(tab: VNode) {
  activeTabId.value = tab.props?.id;
}

onBeforeMount(() => {
  if (slots.default) {
    tabs.value = slots.default();
  }
});
</script>

<style lang="scss" scoped>
@import "~/assets/styles/breakpoints.scss";

ul {
  --spacing-between: var(--fluid-spacing-4);
  --spacing-start: var(--fluid-spacing-4);
  --spacing-end: var(--fluid-spacing-4);
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
  overflow-x: auto;
}
li {
  display: flex;
  align-items: flex-end;
}
li:first-child::before,
li::after {
  content: "";
  height: 1px;
  background-color: var(--body-text-color);
  width: var(--spacing-between);
}
li:first-child::before {
  width: var(--spacing-start);
}
li:last-child {
  width: 100%;
  &::after {
    width: 100%;
    min-width: var(--spacing-end);
  }
}
button {
  flex-shrink: 0;
  background: transparent;
  border-width: 1px 1px 1px 1px;
  border-color: var(--body-text-color);
  color: var(--body-text-color);
  border-style: solid;
  padding: 0.6rem 0.895rem;
  line-height: 1;
  cursor: pointer;
  border-radius: 5px 5px 0 0;
  &.active {
    font-weight: var(--font-weight-semibold);
    border-bottom: 1px solid transparent;
  }
  @media screen and (min-width: $breakpoint-sm) {
    min-width: 6rem;
  }
}
</style>
