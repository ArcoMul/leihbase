<template>
  <Container max-width centered>
    <section class="header">
      <h1>{{ location?.name || "No location found" }}</h1>
      <div v-html="location?.description || 'No location found'"></div>
    </section>
    <hr />
    <section>
      <ProductGrid :location="location" />
    </section>
  </Container>
</template>

<script setup>
import ProductGrid from "~/components/ProductGrid.vue";

const locationId = "1351z318f7ehd9n";

const { data: location } = await useAsyncData(async (nuxtApp) => {
  const location = await nuxtApp.$pb.collection("location").getOne(locationId);

  return structuredClone(location);
});
</script>

<style lang="scss" scoped>
section {
  margin-bottom: 2rem;
}
.header {
  max-width: var(--max-text-width);
  margin-top: 2rem;
}
h1,
h2 {
  margin-bottom: 1rem;
}
</style>
