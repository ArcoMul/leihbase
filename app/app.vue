<template>
  <NavBar></NavBar>
  <main>
    <NuxtLoadingIndicator color="#fff" />
    <NuxtPage />
  </main>
  <Footer></Footer>
</template>

<script setup>
import "@shoelace-style/shoelace/dist/themes/light.css";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path.js";
import { useUserStore } from "./stores/user";
import NavBar from "./components/modules/NavBar.vue";
import Footer from "./components/modules/Footer.vue";

setBasePath(
  "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.14.0/cdn/"
);

const { isValid } = usePocketbase();
const userStore = useUserStore();
const config = useRuntimeConfig();

if (config.plausibleTrackingDomain) {
  useHead({
    script: [
      {
        defer: true,
        "data-domain": config.plausibleTrackingDomain,
        src: "https://plausible.io/js/script.js",
      },
    ],
  });
}

if (isValid.value) {
  userStore.fetchUserReservations();
}
</script>

<style lang="scss">
@use "~/assets/styles/main.scss";
</style>

<style lang="scss" scoped>
main {
  min-height: calc(100vh - 8rem);
}
</style>
