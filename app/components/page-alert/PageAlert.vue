<template>
  <Alert v-if="type === AFTER_LOGIN">
    {{ t("success_login") }}
  </Alert>
  <Alert v-else-if="type === AFTER_LOGIN_RESERVATION_INTENT">
    {{ t("success_login_with_intent") }}
  </Alert>
  <Alert v-else-if="type === AFTER_SIGNUP">
    {{ t("success_signup") }}
  </Alert>
  <Alert v-else-if="type === AFTER_SIGNUP_RESERVATION_INTENT">
    {{ t("success_signup_with_intent") }}
  </Alert>
</template>

<script setup lang="ts">
import {
  AFTER_LOGIN,
  AFTER_LOGIN_RESERVATION_INTENT,
  AFTER_SIGNUP,
  AFTER_SIGNUP_RESERVATION_INTENT,
} from "./PageAlert.model";

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
