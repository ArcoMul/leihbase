<template>
  <Container width="sm" centered no-padding class="container">
    <Alert v-if="success" class="alert">{{ t("submit_success") }}</Alert>
    <Alert v-else-if="error" variant="error" class="alert">{{
      t("submit_general_error")
    }}</Alert>
    <Card class="card">
      <h1>{{ t("title") }}</h1>
      <p>{{ t("text") }}</p>
      <form @submit.prevent="handleSubmit">
        <Input
          label="E-mail"
          type="email"
          id="email"
          name="email"
          required
          v-model="email"
        />
        <Button size="lg" type="submit">{{ t("submit") }}</Button>
      </form>
    </Card>
    <footer>
      <a href="/login">{{ t("login") }}</a>
      •
      <a href="/signup">{{ t("signup") }}</a>
    </footer>
  </Container>
</template>

<script lang="ts" setup>
const { t } = useI18n({
  useScope: "local",
});

const { pb } = usePocketbase();

useHead({
  title: t("page_title"),
});

const email = ref(null);
const error = ref(false);
const success = ref(false);

async function handleSubmit() {
  error.value = false;

  try {
    await pb.collection("users").requestPasswordReset(email.value);
  } catch (e) {
    error.value = true;
    email.value = "";
    return;
  }
  success.value = true;
  email.value = "";
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/_breakpoints.scss";

@media (min-width: $breakpoint-md) {
  .container {
    padding-top: 2rem;
  }
  .card {
    margin-top: 1rem;
  }
  h1 {
    margin-top: -1rem;
  }
}
form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}
footer {
  width: 100%;
  margin-block: 1rem;
  text-align: center;
  color: var(--body-text-color-light);
  font-size: var(--body-font-sm);
}
</style>

<i18n lang="json">
{
  "en": {
    "page_title": "Reset password",
    "title": "Reset password",
    "text": "Enter the email address you used when you joined and we'll send you instructions to reset your password.",
    "submit": "Submit",
    "login": "Login",
    "signup": "Sign up",
    "submit_success": "We send you an e-mail with instruction on how to reset your password",
    "submit_general_error": "Something went wrong, please try again or send us an e-mail"
  },
  "de": {
    "page_title": "Passwort zurücksetzen",
    "title": "Passwort zurücksetzen",
    "text": "Bitte gib die E-Mail-Adresse ein, mit der du dich registriert hast. Wir senden dir dann Anweisungen zum Zurücksetzen deines Passworts zu.",
    "submit": "Senden",
    "login": "Einloggen",
    "signup": "Registrieren",
    "submit_success": "Wir haben dir eine E-Mail mit Anweisungen zum Zurücksetzen deines Passworts geschickt.",
    "submit_general_error": "Es ist ein Fehler aufgetreten. Bitte versuche es erneut oder sende uns eine E-Mail."
  }
}
</i18n>

p
