<template>
  <span
    :class="{
      circle: true,
      available: available,
      'not-available': !available,
    }"
  ></span>
</template>

<script setup>
defineProps({
  available: Boolean,
});
</script>

<style scoped>
.circle {
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  background-color: grey;
  border-radius: 0.5rem;
}
.circle.available {
  background-color: #2fb10a;
}
.circle.not-available {
  background-color: red;
}
</style>
