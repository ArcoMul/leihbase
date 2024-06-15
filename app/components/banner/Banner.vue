<template>
  <div v-if="type === TYPE_AFTER_LOGIN" class="banner">
    <ThumbsUp />
    {{ t("success_login") }}
  </div>
  <div v-else-if="type === TYPE_AFTER_LOGIN_WITH_INTENT" class="banner">
    <ThumbsUp />
    {{ t("success_login_with_intent") }}
  </div>
  <div v-else-if="type === TYPE_AFTER_SIGNUP" class="banner">
    <ThumbsUp />
    {{ t("success_signup") }}
  </div>
  <div v-else-if="type === TYPE_AFTER_SIGNUP_WITH_INTENT" class="banner">
    <ThumbsUp />
    {{ t("success_signup_with_intent") }}
  </div>
</template>

<script setup lang="ts">
import { ThumbsUp } from "@iconoir/vue";
import {
  TYPE_AFTER_LOGIN,
  TYPE_AFTER_LOGIN_WITH_INTENT,
  TYPE_AFTER_SIGNUP,
  TYPE_AFTER_SIGNUP_WITH_INTENT,
} from "./Banner.model";

const { t } = useI18n({
  useScope: "local",
});

const userStore = useUserStore();

const show = ref(false);
const type = ref(null);

// If a banner should be shown
if (userStore.banner) {
  // Show banner
  show.value = true;
  type.value = userStore.banner;
  // Reset to make banner not appear twice
  userStore.resetBanner();
}
</script>

<style lang="scss" scoped>
.banner {
  background-color: var(--background-success);
  padding: 1rem 1.25rem;
  border-radius: 5px;
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}
</style>

<i18n lang="json">
{
  "en": {
    "success_login": "Logged in successfully!",
    "success_login_with_intent": "Logged in successfully! You can now continue reserving the product.",
    "success_signup": "Signed up successfully!",
    "success_signup_with_intent": "Signed up successfully! You can now continue reserving the product."
  },
  "de": {
    "success_login": "Erfolgreich eingeloggt!",
    "success_login_with_intent": "Erfolgreich eingeloggt! Der Gegenstand kann nun reserviert werden.",
    "success_signup": "Erfolgreich registriert!",
    "success_signup_with_intent": "Erfolgreich registriert! Der Gegenstand kann nun reserviert werden."
  }
}
</i18n>
