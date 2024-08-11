<template>
  <Container width="sm" centered no-padding>
    <Card class="card">
      <h1 data-test="signup-h1">{{ t("title") }}</h1>
      <i18n-t keypath="text" tag="p" for="login_text">
        <NuxtLink to="/login">{{ t("login_text") }}</NuxtLink>
      </i18n-t>
      <form @submit.prevent="onSignup">
        <Input
          name="name"
          :label="t('name')"
          id="name"
          type="text"
          required
          v-model="name"
          data-testid="name-input"
        />
        <Input
          id="email"
          type="email"
          :label="t('email')"
          name="email"
          required
          v-model="email"
          data-testid="email-input"
        />
        <Input
          id="password"
          type="password"
          :label="t('password')"
          name="password"
          required
          password-toggle
          v-model="password"
          data-testid="password-input"
        />
        <fieldset class="checkbox">
          <input
            id="terms-and-conditions"
            type="checkbox"
            name="terms_and_conditions"
            value="yes"
            data-testid="tac-checkbox"
            required
          />
          <label for="terms-and-conditions">
            <i18n-t
              keypath="terms_and_conditions"
              tag="span"
              for="terms_and_conditions_link"
            >
              <NuxtLink target="_blank" to="/privacy-policy">{{
                t("terms_and_conditions_link")
              }}</NuxtLink>
            </i18n-t>
          </label>
        </fieldset>

        <sl-alert
          v-if="!!signupError"
          variant="danger"
          :open="!!signupError"
          data-testid="signup-error"
        >
          <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
          {{ signupError }}
        </sl-alert>
        <Button size="lg" type="submit" data-testid="submit-button">
          {{ t("submit") }}
        </Button>
      </form>
    </Card>
  </Container>
</template>

<script setup>
import Container from "~/components/Container";
import Card from "~/components/Card";
import {
  AFTER_SIGNUP,
  AFTER_SIGNUP_RESERVATION_INTENT,
} from "~/components/page-alert/PageAlert.model";

if (process.client) {
  await import("@shoelace-style/shoelace/dist/components/alert/alert.js");
  await import("@shoelace-style/shoelace/dist/components/icon/icon.js");
}

const { t } = useI18n({
  useScope: "local",
});
const router = useRouter();
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
    const { path, intent } = userStore.$state.authenticationIntent;
    if (path) {
      if (intent && intent === "reservation") {
        userStore.showBanner(AFTER_SIGNUP_RESERVATION_INTENT);
      } else {
        userStore.showBanner(AFTER_SIGNUP);
      }
      router.push(path);
    } else {
      userStore.showBanner(AFTER_SIGNUP);
      router.push("/profile");
    }
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
    margin-block: 3rem;
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

fieldset.checkbox {
  border: 0;
  padding: 0.5rem 0;
  width: 100%;
  input {
    margin-right: 0.5rem;
  }
}
</style>

<i18n lang="json">
{
  "en": {
    "page_title": "Sign up",
    "title": "Sign up",
    "text": "Already have an account? {0}.",
    "login_text": "Sign in",
    "name": "Name",
    "email": "E-Mail",
    "password": "Password",
    "submit": "Sign up",
    "terms_and_conditions": "I have read and agree to the {0}, for the use of my personal data.",
    "terms_and_conditions_link": "data protection information",

    "errors": {
      "password_ength": "Password should be at least 8 characters long.",
      "invalid_mail": "E-mail address is invalid or already in use.",
      "general": "An error occured during sign up, please try again."
    }
  },
  "de": {
    "page_title": "Registrieren",
    "title": "Registrieren",
    "text": "Du hast bereits ein Konto? {0}.",
    "login_text": "Einloggen",
    "name": "Name",
    "email": "E-Mail",
    "password": "Kennwort",
    "terms_and_conditions": "Ich habe die {0}, zur Nutzung meiner personenbezogenen Daten gelesen und bin damit einverstanden.",
    "terms_and_conditions_link": "Datenschutzhinweisen",
    "submit": "Registrieren",
    "errors": {
      "password_length": "Dein Passwort sollte mindestens 8 Zeichen lang sein.",
      "invalid_email": "Die E-Mail ist ungültig oder wird bereits verwendet.",
      "general": "Beim Erstellen deiner Account ist ein Fehler aufgetreten, bitte versuche es erneut."
    }
  }
}
</i18n>
