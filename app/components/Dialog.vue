<template>
  <div
    :class="{ background: true, 'header-offset': headerOffset, open }"
    @click="open = false"
  ></div>
  <div :class="{ dialog: true, 'header-offset': headerOffset, open, inset }">
    <header>
      <div class="title">
        <h2>{{ title }}</h2>
        <button @click="open = false">
          <Xmark />
        </button>
      </div>
      <slot name="header"></slot>
    </header>
    <div class="body">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Xmark } from "@iconoir/vue";

defineProps<{
  inset: boolean;
  title: string;
  headerOffset?: boolean;
}>();

const open = defineModel("open");
</script>

<style lang="scss" scoped>
@import "~/assets/styles/breakpoints.scss";

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
  &.header-offset {
    top: var(--navbar-height);
    height: calc(100% - var(--navbar-height));
  }
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
  height: 100vh;
  display: flex;
  flex-direction: column;
  &.header-offset {
    top: calc(-100% + var(--navbar-height));
    max-height: calc(90vh - var(--navbar-height));
  }
  &.open {
    top: 50%;
  }
  &.inset {
    padding: 2rem;
  }
  @media screen and (min-width: $breakpoint-sm) {
    height: auto;
    max-height: 90vh;
  }
}
header {
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 1;
    margin-bottom: 1rem;
  }
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
.body {
  overflow-y: scroll;
}
</style>
