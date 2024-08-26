<template>
  <Container width="sm" centered no-padding>
    <PageAlert class="banner" />
    <Card class="card">
      <h1>Profile</h1>
      <p>
        Name: {{ user?.name }}<br />
        E-mail: {{ user?.email }} {{ user?.verified ? "" : "(unbestätigt)" }}
      </p>
      <hr />
      <Button size="lg" :loading="loggingOut" @click="onLogout">Logout</Button>
    </Card>
  </Container>
</template>

<script setup>
const { pb, isValid, logout } = usePocketbase();
const router = useRouter();

const user = ref(null);
const loggingOut = ref(false);

useHead({
  title: "Profile",
});

if (!isValid.value) {
  logout();
  router.push("/login");
} else {
  user.value = await pb.collection("users").getOne(pb.authStore.model.id);
}

function onLogout() {
  loggingOut.value = true;
  logout();
  window.location.href = "/";
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/_breakpoints.scss";

@media (min-width: $breakpoint-md) {
  .banner {
    margin-top: 3rem;
  }
  .card {
    margin-top: 3rem;
  }
  h1 {
    margin-top: -1rem;
  }
}
</style>
