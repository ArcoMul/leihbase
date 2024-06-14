<template>
  <div
    :class="{ overlay: true, open, 'header-offset': headerOffset }"
    @click="close"
  ></div>
  <div :class="{ sidebar: true, open, 'header-offset': headerOffset, inset }">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ headerOffset: boolean; inset: boolean }>();
const open = defineModel("open");
watch(open, (isOpening) => {
  if (isOpening) {
    document.addEventListener("keydown", handleDocumentKeyDown);
  } else {
    document.removeEventListener("keydown", handleDocumentKeyDown);
  }
});
function close() {
  open.value = false;
}
function handleDocumentKeyDown(e: KeyboardEvent) {
  if (e.key === "Escape") {
    close();
  }
}
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0);
  transition: background-color 200ms;
  pointer-events: none;
  z-index: 9;
  &.open {
    background-color: rgba(0, 0, 0, 0.3);
    pointer-events: all;
  }
}
.sidebar {
  position: fixed;
  top: 0;
  left: 100%;
  width: 66.66%;
  height: 100vh;
  background-color: white;
  transition: left 200ms;
  z-index: 10;
  &.open {
    left: 33.33%;
  }
  &.inset {
    padding: 2rem;
  }
}
.header-offset {
  top: var(--navbar-height);
  height: calc(100vh - var(--navbar-height));
}
</style>
