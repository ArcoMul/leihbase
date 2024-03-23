<template>
  <Container>
    <h1>Log in</h1>
    <p>
      No account yet? <NuxtLink :to="signupLink">Sign up</NuxtLink> to create an
      account.
    </p>
    <form @submit.prevent="onLogin">
      <sl-input
        type="email"
        label="E-Mail"
        required
        @input="(event) => (email = event.target.value)"
      >
        <!-- <sl-icon name="envelope" slot="prefix"></sl-icon> -->
      </sl-input>
      <sl-input
        type="password"
        label="Kernwort"
        required
        password-toggle
        @input="(event) => (password = event.target.value)"
      >
        <!-- <sl-icon name="lock" slot="prefix"></sl-icon> -->
      </sl-input>
      <p v-if="authenticationError">
        Log in not successful, please review your account details, or
        <NuxtLink to="/signup">sign up</NuxtLink> to create an account
      </p>
      <Button type="submit">Log in</Button>
    </form>
  </Container>
</template>

<script setup>
import Container from "~/components/Container";

if (process.client) {
  await import("@shoelace-style/shoelace/dist/components/input/input.js");
}

const nuxtApp = useNuxtApp();
const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const email = ref(null);
const password = ref(null);

const authenticationError = ref(false);

const signupLink = `/signup?return=${route.query.return}`;

async function onLogin() {
  authenticationError.value = false;

  try {
    await nuxtApp.$pb
      .collection("users")
      .authWithPassword(email.value, password.value);
  } catch (e) {
    authenticationError.value = true;
    return;
  }

  if (nuxtApp.$pb.authStore.isValid) {
    userStore.login();
    router.push(route.query.return ? route.query.return : "/profile");
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
