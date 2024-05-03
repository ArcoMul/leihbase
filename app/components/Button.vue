<template>
  <component
    :is="component"
    :type="component === 'button' ? 'button' : undefined"
    :class="{ ['variant-' + variant]: true, ['size-' + size]: true, rounded }"
    :href="href"
  >
    <span v-if="$slots.prefix" class="prefix">
      <slot name="prefix"></slot>
    </span>
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    to?: string;
    href?: string;
    variant?: "primary" | "secondary";
    size?: "lg" | "md";
    rounded?: boolean;
  }>(),
  { variant: "primary", size: "md" }
);

const component = computed(() => {
  if (props.href) return "a";
  return "button";
});
</script>

<style lang="scss" scoped>
a,
button {
  display: inline-flex;
  border-radius: 0;
  cursor: pointer;
  align-items: center;
  text-decoration: none;

  &.variant-primary {
    background-color: var(--bg-primary);
    border: 0;
    color: var(--fg-primary);
  }
  &.variant-secondary {
    background-color: var(--bg-secondary-light);
    color: var(--text-body);
    border: 2px solid transparent;
    &:hover {
      border: 2px solid var(--bg-primary);
    }
    &.active {
      background-color: var(--bg-primary);
      color: white;
    }
  }

  &.size-md {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }
  &.size-lg {
    padding: 0.666rem 1.5rem;
    font-size: 1.125rem;
  }

  &.rounded {
    border-radius: 5px;
  }

  .prefix {
    display: inline-flex;
    flex-shrink: 0;
    width: 1em;
    height: 1em;
    margin-right: 0.5em;
    align-items: center;
  }
}
</style>
