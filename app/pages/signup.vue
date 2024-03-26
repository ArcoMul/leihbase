<template>
  <Container max-width centered>
    <h1>Sign up</h1>
    <form @submit.prevent="onSignup">
      <sl-input
        type="text"
        label="Name"
        name="name"
        required
        @input="(event) => (name = event.target.value)"
      >
        <!-- <sl-icon name="person" slot="prefix"></sl-icon> -->
      </sl-input>
      <sl-input
        id="email"
        type="email"
        label="E-Mail"
        name="email"
        required
        @input="(event) => (email = event.target.value)"
      >
        <!-- <sl-icon name="envelope" slot="prefix"></sl-icon> -->
      </sl-input>
      <sl-input
        id="password"
        type="password"
        label="Kernwort"
        name="password"
        required
        password-toggle
        @input="(event) => (password = event.target.value)"
      >
        <!-- <sl-icon name="lock" slot="prefix"></sl-icon> -->
      </sl-input>

      <sl-alert variant="danger" :open="showSignupError">
        <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
        Beim Erstellen deiner Account ist ein Fehler aufgetreten, bitte versuche
        es erneut.
      </sl-alert>

      <Button type="submit">Sign up</Button>
    </form>
  </Container>
</template>

<script setup>
import Container from "~/components/Container";

if (process.client) {
  await import("@shoelace-style/shoelace/dist/components/input/input.js");
  await import("@shoelace-style/shoelace/dist/components/alert/alert.js");
  await import("@shoelace-style/shoelace/dist/components/icon/icon.js");
}

const nuxtApp = useNuxtApp();
const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const showSignupError = ref(false);

useHead({
  title: `Signup | Leihapp`,
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

  try {
    await nuxtApp.$pb.collection("users").create(data);

    // Send an email verification request
    await nuxtApp.$pb.collection("users").requestVerification(data.email);

    // Authenticate
    await nuxtApp.$pb
      .collection("users")
      .authWithPassword(data.email, data.password);

    // Login
    userStore.login();

    // Routing
    router.push(route.query.return ? route.query.return : "/profile");
  } catch (e) {
    showSignupError.value = true;
  }
}
</script>

<style lang="scss" scoped>
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
</style>
