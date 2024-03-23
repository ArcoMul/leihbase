<template>
  <Container max-width centered>
    <header>
      <AddressBox class="address">{{ location?.address }}</AddressBox>
      <h1>
        {{ location?.name || "No location found" }}
      </h1>
      <div
        class="description"
        v-html="location?.description || 'No location found'"
      ></div>
    </header>
    <hr />
    <section>
      <ProductGrid :location="location" />
    </section>
  </Container>
</template>

<script setup>
import ProductGrid from "~/components/modules/ProductGrid.vue";

const locationId = "1351z318f7ehd9n";

const { data: location } = await useAsyncData("location", async (nuxtApp) => {
  const location = await nuxtApp.$pb.collection("location").getOne(locationId);

  return structuredClone(location);
});

useHead({
  title: `${location.value?.name} | Leihapp`,
});
</script>

<style lang="scss" scoped>
section {
  margin-bottom: 2rem;
}
header {
  .address {
    margin-bottom: 2rem;
  }
  h1 {
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
  }
  .description {
    max-width: var(--max-text-width);
  }
}
h1,
h2 {
  margin-bottom: 1rem;
}
</style>
