<template>
  <div
    :class="{ overlay: true, open, 'header-offset': headerOffset }"
    @click="close"
  ></div>
  <div
    ref="sidebar"
    :class="{ sidebar: true, open, 'header-offset': headerOffset, inset }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ headerOffset: boolean; inset: boolean }>();
const open = defineModel("open");
const sidebar = ref<HTMLDivElement>();
watch(open, (isOpening) => {
  if (isOpening) {
    if (sidebar.value) {
      sidebar.value.scrollTop = 0;
    }
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
@import "~/assets/styles/breakpoints.scss";

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
  width: 95%;
  height: 100vh;
  background-color: white;
  transition: left 200ms;
  z-index: 10;
  overflow-y: auto;
  box-sizing: border-box;
  &.open {
    left: 5%;
  }
  &.inset {
    padding: 2rem;
  }
  @media screen and (min-width: $breakpoint-sm) {
    width: 80%;
    &.open {
      left: 20%;
    }
  }
  @media screen and (min-width: $breakpoint-md) {
    width: 66.66%;
    &.open {
      left: 33.33%;
    }
  }
}
.header-offset {
  top: var(--navbar-height);
  height: calc(100vh - var(--navbar-height));
}
</style>
