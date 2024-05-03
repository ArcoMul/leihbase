<template>
  <header>
    <NuxtLink to="/" class="logo">Leihbar<br />Köln</NuxtLink>
    <nav>
      <ul v-if="isValid">
        <li>
          <NuxtLink to="/profile">{{ t("profile") }}</NuxtLink>
        </li>
      </ul>
      <ul v-else>
        <li>
          <NuxtLink to="/signup">{{ t("sign_up") }}</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/login">{{ t("login") }}</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
  <main>
    <NuxtLoadingIndicator color="#fff" />
    <NuxtPage />
  </main>
  <footer>
    <NuxtLink to="/imprint">{{ t("imprint") }}</NuxtLink>
    —
    <NuxtLink to="mailto:hallo@leihbar-koeln.de">{{ t("contact") }}</NuxtLink>
    —
    <NuxtLink target="_blank" href="https://github.com/ArcoMul/leihbase">
      Open-Source
    </NuxtLink>
  </footer>
</template>

<script setup>
import "@shoelace-style/shoelace/dist/themes/light.css";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path.js";
import { useUserStore } from "./stores/user";

setBasePath(
  "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.14.0/cdn/"
);

const { t } = useI18n({
  useScope: "local",
});
const { isValid } = usePocketbase();
const userStore = useUserStore();

if (isValid.value) {
  userStore.fetchUserReservations();
}
</script>

<style lang="scss">
@use "~/assets/styles/main.scss";
</style>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0rem 1rem;
  height: 4rem;
  background-color: var(--header-bg-color);
  position: sticky;
  top: 0;
  .logo {
    font-family: Arial;
    color: var(--header-text-color);
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
    color: var(--header-text-color);
    &:hover {
      text-decoration: underline;
      text-underline-offset: 5px;
      text-decoration-thickness: 2px;
    }
  }
}
main {
  min-height: calc(100vh - 8rem);
}
footer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0rem 1rem;
  height: 4rem;
  background-color: var(--footer-bg-color);
  color: var(--footer-text-color);
  text-align: center;
  a {
    color: var(--footer-text-color);
    padding: 0 1rem;
    line-height: 1;
    text-underline-offset: 0.25rem;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>

<i18n lang="json">
{
  "en": {
    "sign_up": "Sign up",
    "login": "Login",
    "profile": "Profile",
    "contact": "Contact",
    "imprint": "Imprint"
  },
  "de": {
    "sign_up": "Registrieren",
    "login": "Einloggen",
    "profiel": "Profil",
    "contact": "Kontakt",
    "imprint": "Impressum"
  }
}
</i18n>
