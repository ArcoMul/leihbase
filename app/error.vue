<template>
  <NavBar></NavBar>
  <main>
    <Container width="sm" centered>
      <Card>
        <h1>{{ error.message }} ({{ error.statusCode }})</h1>
        <p><NuxtLink to="/">Back to home</NuxtLink>.</p>
      </Card>
    </Container>
  </main>
  <Footer></Footer>
</template>

<script setup lang="ts">
import NavBar from "./components/modules/NavBar.vue";
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});
</script>

<style lang="scss">
@use "~/assets/styles/main.scss";
</style>

<style lang="scss" scoped>
main {
  min-height: calc(100vh - 8rem);
}
</style>
