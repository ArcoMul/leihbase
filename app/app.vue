<template>
  <header>
    <NuxtLink to="/" class="logo">Leihbar<br />Köln</NuxtLink>
    <nav>
      <ul v-if="userStore.isAuthenticated">
        <li>
          <NuxtLink to="/profile">Profile</NuxtLink>
        </li>
      </ul>
      <ul v-else>
        <li>
          <NuxtLink to="/signup">Signup</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/login">Login</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
  <main>
    <NuxtPage />
  </main>
</template>

<script setup>
import "@shoelace-style/shoelace/dist/themes/light.css";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path.js";
import { useUserStore } from "./stores/user";

setBasePath(
  "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.14.0/cdn/"
);

const userStore = useUserStore();
</script>

<style lang="scss">
@use "~/assets/styles/main.scss";
</style>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: var(--bg-primary);
  position: sticky;
  top: 0;
}
.logo {
  font-family: Arial;
  color: #ffdbc4;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1;
  text-decoration: none;
}
nav ul {
  display: flex;
  list-style: none;
  gap: 1rem;
  margin: 0;
  margin-right: 1rem;
  padding: 0;
}
nav ul a {
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
  color: var(--text-primary);
}
</style>
