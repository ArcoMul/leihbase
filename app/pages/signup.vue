<template>
  <Container width="sm" centered no-padding>
    <Card class="card">
      <h1>{{ t("title") }}</h1>
      <form @submit.prevent="onSignup">
        <Input
          name="name"
          :label="t('name')"
          id="name"
          type="text"
          required
          v-model="name"
        />
        <Input
          id="email"
          type="email"
          :label="t('email')"
          name="email"
          required
          v-model="email"
        />
        <Input
          id="password"
          type="password"
          :label="t('password')"
          name="password"
          required
          password-toggle
          v-model="password"
        />
        <sl-alert variant="danger" :open="!!signupError">
          <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
          {{ signupError }}
        </sl-alert>
        <Button size="lg" type="submit">{{ t("submit") }}</Button>
      </form>
    </Card>
  </Container>
</template>

<script setup>
import Container from "~/components/Container";
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
const userStore = useUserStore();
const { pb, login } = usePocketbase();

const signupError = ref(null);

useHead({
  title: `${t("page_title")} | Leihbase`,
});

const name = ref(null);
const email = ref(null);
const password = ref(null);

async function onSignup() {
  const data = {
    name: name.value,
    email: email.value,
    password: password.value,
    passwordConfirm: password.value,
  };
  signupError.value = null;

  try {
    // Create account
    await pb.collection("users").create(data);

    // Send an email verification request
    await pb.collection("users").requestVerification(data.email);

    // Authenticate
    await login(data.email, data.password);

    // Login
    userStore.login();

    // Routing
    router.push(route.query.return ? route.query.return : "/profile");
  } catch (e) {
    console.log(e);
    if (e.data?.data?.password?.code === "validation_length_out_of_range") {
      signupError.value = t("errors.password_length");
    } else if (e.data?.data?.email?.code === "validation_invalid_email") {
      signupError.value = t("errors.invalid_email");
    } else {
      signupError.value = t("errors.general");
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/_breakpoints.scss";

@media (min-width: $breakpoint-sm) {
  .card {
    margin-top: 3rem;
  }
  h1 {
    margin-top: -1rem;
  }
}

form {
  max-width: var(--max-text-width);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}
form sl-input {
  width: 100%;
}
sl-alert::part(base) {
  width: 100%;
}
</style>

<i18n lang="json">
{
  "en": {
    "page_title": "Sign up",
    "title": "Sign up",
    "name": "Name",
    "email": "E-Mail",
    "password": "Password",
    "submit": "Sign up",
    "errors": {
      "password_ength": "Password should be at least 8 characters long.",
      "invalid_mail": "E-mail address is invalid or already in use.",
      "general": "An error occured during sign up, please try again."
    }
  },
  "de": {
    "page_title": "Registrieren",
    "title": "Registrieren",
    "name": "Name",
    "email": "E-Mail",
    "password": "Kennwort",
    "submit": "Registrieren",
    "errors": {
      "password_length": "Dein Passwort sollte mindestens 8 Zeichen lang sein.",
      "invalid_email": "Die E-Mail ist ungültig oder wird bereits verwendet.",
      "general": "Beim Erstellen deiner Account ist ein Fehler aufgetreten, bitte versuche es erneut."
    }
  }
}
</i18n>
