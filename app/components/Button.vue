<template>
  <component
    :is="component"
    :type="component === 'button' ? type : undefined"
    :class="{
      ['variant-' + variant]: true,
      ['size-' + size]: true,
      rounded,
      circle,
      loading,
    }"
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
    circle?: boolean;
    type?: "submit" | "reset" | "button" | undefined;
    loading?: boolean;
  }>(),
  { variant: "primary", size: "md", type: "button", loading: false }
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
  justify-content: center;
  align-items: center;
  border-radius: 0;
  cursor: pointer;
  text-decoration: none;

  &.variant-primary {
    background-color: var(--button-primary-bg-color);
    border: 0;
    color: var(--button-primary-text-color);
    font-weight: var(--font-weight-semibold);
  }
  &.variant-secondary {
    background-color: var(--button-secondary-bg-color);
    color: var(--button-secondary-text-color);
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
    font-size: var(--font-size-lg);
  }

  &.rounded {
    border-radius: 5px;
  }
  &.circle {
    border-radius: 100%;
    height: 2rem;
    width: 2rem;
    padding: 0.333rem;
    font-size: 1rem;
  }
  &.loading {
    pointer-events: none;
    opacity: 0.5;
    &:after {
      content: "";
      width: 1em;
      height: 1em;
      margin-left: 0.666rem;
      border: 2px solid currentColor;
      border-bottom-color: transparent;
      border-radius: 50%;
      display: inline-block;
      box-sizing: border-box;
      animation: rotation 1s linear infinite;
    }
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
@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
