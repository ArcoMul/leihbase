<template>
  <button type="button"><slot></slot></button>
</template>

<style lang="scss" scoped>
button {
  background-color: var(--bg-primary);
  color: var(--fg-primary);
  border: 0;
  border-radius: 0;
  padding: 0.666rem 1.5rem;
  font-size: 1.125rem;
  cursor: pointer;
}
</style>
