<template>
  <Container width="sm" centered no-padding>
    <Card class="card">
      <h1>Sign up</h1>
      <form @submit.prevent="onSignup">
        <Input
          label="Name"
          name="name"
          id="name"
          type="text"
          required
          v-model="name"
        />
        <Input
          id="email"
          type="email"
          label="E-Mail"
          name="email"
          required
          v-model="email"
        />
        <Input
          id="password"
          type="password"
          label="Kernwort"
          name="password"
          required
          password-toggle
          v-model="password"
        />
        <sl-alert variant="danger" :open="!!signupError">
          <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
          {{ signupError }}
        </sl-alert>
        <Button type="submit">Sign up</Button>
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

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const { pb, login } = usePocketbase();

const signupError = ref(null);

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
      signupError.value =
        "Dein Passwort sollte mindestens 8 Zeichen lang sein.";
    } else if (e.data?.data?.email?.code === "validation_invalid_email") {
      signupError.value =
        "Die E-Mail ist ungültig oder wird bereits verwendet.";
    } else {
      signupError.value =
        "Beim Erstellen deiner Account ist ein Fehler aufgetreten, bitte versuche es erneut.";
    }
  }
}
</script>

<style lang="scss" scoped>
@media (min-width: 600px) {
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
