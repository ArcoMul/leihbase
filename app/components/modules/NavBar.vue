<template>
  <header>
    <NuxtLink to="/" class="logo">Leihbar<br />Köln</NuxtLink>
    <nav>
      <ul v-if="isValid">
        <li v-if="userStore.locations.length > 0">
          <NuxtLink to="/admin">{{ t("admin") }}</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/profile">{{ t("profile") }}</NuxtLink>
        </li>
      </ul>
      <ul v-else>
        <li class="hidden sm:block">
          <NuxtLink data-testid="signup-link" to="/signup">
            {{ t("sign_up") }}
          </NuxtLink>
        </li>
        <li class="hidden sm:block">
          <NuxtLink data-testid="login-link" to="/login">{{
            t("login")
          }}</NuxtLink>
        </li>
        <li class="account sm:hidden">
          <NuxtLink to="/login"><User class="user-icon" /></NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { User } from "@iconoir/vue";

const { t } = useI18n({
  useScope: "local",
});
const { isValid } = usePocketbase();
const userStore = useUserStore();
</script>

<style lang="scss" scoped>
@import "~/assets/styles/breakpoints.scss";

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0rem 1rem;
  height: var(--navbar-height);
  background-color: var(--header-bg-color);
  position: sticky;
  top: 0;
  z-index: 10;
  @media screen and (min-width: $breakpoint-sm) {
    padding: 0 2rem 0 1rem;
  }

  .logo {
    color: var(--header-text-color);
    font-size: 1.5rem;
    font-weight: var(--font-weight-black);
    line-height: 1;
    text-decoration: none;
  }

  nav {
    ul {
      display: flex;
      list-style: none;
      gap: 1rem;
      margin: 0;
      padding: 0;
    }
    a {
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

  .account {
    font-size: 2rem;
    a {
      line-height: 0;
      display: flex;
    }
    .user-icon {
      display: inline-block;
      width: 1em;
      height: 1em;
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
    "admin": "Admin"
  },
  "de": {
    "sign_up": "Registrieren",
    "login": "Einloggen",
    "profile": "Profil",
    "admin": "Admin"
  }
}
</i18n>
