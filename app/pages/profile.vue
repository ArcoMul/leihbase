<template>
  <Container max-width centered>
    <h1>Profile</h1>
    <p>
      Name: {{ user?.name }}<br />
      E-mail: {{ user?.email }}
    </p>
    <Button @click="onLogout">Logout</Button>
  </Container>
</template>

<script setup>
const nuxtApp = useNuxtApp();
const router = useRouter();
const user = ref(null);
const userStore = useUserStore();

useHead({
  title: `Profile | Leihapp`,
});

if (!nuxtApp.$pb.authStore.isValid) {
  userStore.logout();
  router.push("/login");
} else {
  user.value = await nuxtApp.$pb
    .collection("users")
    .getOne(nuxtApp.$pb.authStore.model.id);
}

function onLogout() {
  nuxtApp.$pb.authStore.clear();
  userStore.logout();
  router.push("/");
}
</script>
