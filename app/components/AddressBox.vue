<template>
  <p><MapPin class="icon" /><slot></slot></p>
</template>

<script setup>
import { MapPin } from "@iconoir/vue";
</script>

<style scoped>
p {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: rgba(255, 255, 255, 0.666);
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
}
.icon {
  display: inline;
  width: 1em;
  height: 1em;
  margin-right: 0.5em;
}
</style>
