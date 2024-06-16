<template>
  <div :class="{ background: true, open }" @click="open = false"></div>
  <div :class="{ dialog: true, open, inset }">
    <header>
      <h2>{{ title }}</h2>
      <button @click="open = false">
        <Xmark />
      </button>
    </header>
    <div class="body">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Xmark } from "@iconoir/vue";

defineProps<{ inset: boolean; title: string }>();

const open = defineModel("open");
</script>

<style lang="scss" scoped>
.background {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 30;
  background-color: rgba(0, 0, 0, 0);
  pointer-events: none;
  transition: background-color 200ms;
  &.open {
    pointer-events: all;
    background-color: rgba(0, 0, 0, 0.2);
  }
}
.dialog {
  position: fixed;
  left: 50%;
  top: -100%;
  transform: translate(-50%, -50%);
  width: min(600px, 100%);
  background-color: white;
  z-index: 40;
  transition: top 200ms;
  &.open {
    top: 50%;
  }
  &.inset {
    padding: 2rem;
  }
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 1;
  margin-bottom: 1rem;
  h2 {
    margin: 0;
  }
  button {
    background: transparent;
    border: 0;
    padding: 0.5rem;
    cursor: pointer;
  }
}
</style>
