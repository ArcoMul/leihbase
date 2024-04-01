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
const { pb, isValid, logout } = usePocketbase();
const router = useRouter();

const user = ref(null);

useHead({
  title: `Profile | Leihapp`,
});

if (!isValid.value) {
  logout();
  router.push("/login");
} else {
  user.value = await pb.collection("users").getOne(pb.authStore.model.id);
}

function onLogout() {
  logout();
  router.push("/");
}
</script>
