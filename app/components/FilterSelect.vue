<template>
  <div class="dropdown">
    <button
      type="button"
      id="dropdown-menu"
      aria-haspopup="true"
      aria-expanded="false"
    >
      {{ label }}
    </button>
    <ul aria-label="submenu" aria-labelledby="dropdown-menu">
      <li v-for="item in items">
        <button @click="emit('input', item.key)">{{ item.value }}</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string;
  items: {
    key: string;
    value: string;
  }[];
}>();
const emit = defineEmits(["input"]);
</script>

<style scoped>
.dropdown {
  position: relative;
  display: block;
  width: 100%;
}
.dropdown > button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: white;
  border: 1px solid #aaa;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  position: relative;
  z-index: 2;
  font-size: 1rem;
  cursor: pointer;
}
.dropdown > button:after {
  content: "";
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  display: inline-block;
  background-color: black;
  width: 0.666rem;
  height: 0.333rem;
  margin-left: 0.333rem;
  vertical-align: middle;
}
.dropdown > button:focus {
  box-shadow: 0 0 0 2px #aaa;
  border-color: transparent;
}
.dropdown:focus-within ul {
  display: block;
}
.dropdown ul {
  display: none;
  list-style: none;
  background-color: white;
  padding: 0.5rem 0;
  left: 0;
  top: calc(100% + 3px);
  width: 100%;
  position: absolute;
  margin: 0;
  border: 1px solid #aaa;
  border-radius: 5px;
}
.dropdown ul li button {
  display: block;
  padding: 0.5rem 1rem;
  color: black;
  text-decoration: none;
  background-color: transparent;
  border: 0;
  width: 100%;
  text-align: left;
  cursor: pointer;
}
.dropdown ul li button:hover {
  background-color: #f3f3f3;
}
</style>
