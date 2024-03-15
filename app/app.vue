<template>
  <header>
    <NuxtLink to="/" class="logo">Leihbar<br />Köln</NuxtLink>
    <nav>
      <ul>
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

<script>
import "@shoelace-style/shoelace/dist/themes/light.css";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path";

setBasePath(
  "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.14.0/cdn/"
);
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
}
nav ul a {
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
}
</style>
