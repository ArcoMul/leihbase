<template>
  <Container width="sm" centered no-padding>
    <Card class="card">
      <h1>{{ t("title") }}</h1>
      <i18n-t keypath="text" tag="p" for="signup_text">
        <NuxtLink :to="signupLink">{{ t("signup_text") }}</NuxtLink>
      </i18n-t>
      <form @submit.prevent="onLogin">
        <Input
          label="E-mail"
          type="email"
          id="email"
          name="email"
          required
          v-model="email"
        />
        <Input
          :label="t('password')"
          type="password"
          id="password"
          name="password"
          required
          password-toggle
          v-model="password"
        />

        <sl-alert variant="danger" :open="!!authenticationError">
          <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
          <i18n-t keypath="error" tag="span" for="error_signup">
            <NuxtLink :to="signupLink">{{ t("error_signup") }}</NuxtLink>
          </i18n-t>
        </sl-alert>
        <Button size="lg" type="submit">{{ t("submit") }}</Button>
      </form>
    </Card>
  </Container>
</template>

<script setup>
import Container from "~/components/Container";
import Input from "~/components/Input";
import Card from "~/components/Card";

if (process.client) {
  await import("@shoelace-style/shoelace/dist/components/alert/alert.js");
  await import("@shoelace-style/shoelace/dist/components/icon/icon.js");
}

const { t } = useI18n({
  useScope: "local",
});

const router = useRouter();
const route = useRoute();
const { login, isValid } = usePocketbase();

useHead({
  title: `Login | Leihapp`,
});

const email = ref(null);
const password = ref(null);

const authenticationError = ref(false);

const signupLink = route.query.return
  ? `/signup?return=${route.query.return}`
  : "/signup";

async function onLogin() {
  authenticationError.value = false;

  try {
    await login(email.value, password.value);
  } catch (e) {
    authenticationError.value = true;
    return;
  }

  if (isValid.value) {
    // userStore.login();
    router.push(route.query.return ? route.query.return : "/profile");
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/_breakpoints.scss";

@media (min-width: $breakpoint-md) {
  .card {
    margin-top: 3rem;
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
form sl-input {
  width: 100%;
}
</style>

<i18n lang="json">
{
  "en": {
    "title": "Log in",
    "text": "No account yet? {0}, to create an account.",
    "signup_text": "Sign up",
    "password": "Password",
    "error": "Log in not successful, please review your account details, or {0} to create an account",
    "error_signup": "sign up",
    "submit": "Log in"
  },
  "de": {
    "title": "Einloggen",
    "text": "Noch kein Konto? {0}, um ein Konto zu erstellen.",
    "signup_text": "Registriere dich",
    "password": "Kennwort",
    "error": "Einloggen nicht erfolgreich, bitte überprüfe deine Kontodaten, oder {0} um ein Konto zu erstellen",
    "error_signup": "melde dich an",
    "submit": "Einloggen"
  }
}
</i18n>
