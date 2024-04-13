<template>
  <Container width="sm" centered no-padding>
    <Card class="card">
      <h1>Profile</h1>
      <p>
        Name: {{ user?.name }}<br />
        E-mail: {{ user?.email }} {{ user?.verified ? "" : "(unbestätigt)" }}
      </p>
      <hr />
      <Button @click="onLogout">Logout</Button>
    </Card>
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

<style lang="scss" scoped>
@media (min-width: 600px) {
  .card {
    margin-top: 3rem;
  }
  h1 {
    margin-top: -1rem;
  }
}
</style>
