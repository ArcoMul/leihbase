<template>
  <Container width="sm" centered no-padding>
    <Card class="card">
      <h1>Log in</h1>
      <p>
        Noch kein Konto?
        <NuxtLink :to="signupLink">Meldest du dich an</NuxtLink>, um ein Konto
        zu erstellen.
      </p>
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
          label="Kernwort"
          type="password"
          id="password"
          name="password"
          required
          password-toggle
          v-model="password"
        />
        <p v-if="authenticationError">
          Log in not successful, please review your account details, or
          <NuxtLink to="/signup">sign up</NuxtLink> to create an account
        </p>
        <Button type="submit">Log in</Button>
      </form>
    </Card>
  </Container>
</template>

<script setup>
import Container from "~/components/Container";
import Input from "~/components/Input";
import Card from "~/components/Card";

const router = useRouter();
const route = useRoute();
const { login, isValid } = usePocketbase();

useHead({
  title: `Login | Leihapp`,
});

const email = ref(null);
const password = ref(null);

const authenticationError = ref(false);

const signupLink = `/signup?return=${route.query.return}`;

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
@media (min-width: 600px) {
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
