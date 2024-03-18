<template>
  <Container>
    <h1>Profile</h1>
    <p>
      Name: {{ user?.name }}<br />
      E-mail: {{ user?.email }}
    </p>
  </Container>
</template>

<script setup>
const nuxtApp = useNuxtApp();
const router = useRouter();
const user = ref(null);

console.log(nuxtApp.$pb.authStore);

if (!nuxtApp.$pb.authStore.isValid) {
  router.push("/login");
} else {
  user.value = await nuxtApp.$pb
    .collection("users")
    .getOne(nuxtApp.$pb.authStore.model.id);
}
</script>
