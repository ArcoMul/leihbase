<template>
  <Container width="lg" centered>
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

const { pb } = usePocketbase();
const route = useRoute();

const slug = route.params.location;

const { data: location } = await useAsyncData("location", async () => {
  const location = await pb
    .collection("location")
    .getFirstListItem(pb.filter("slug = {:slug}", { slug }));

  return structuredClone(location);
});

useHead({
  title: `${location.value?.name} | Leihapp`,
});
</script>

<style lang="scss" scoped>
section {
  margin-bottom: var(--fluid-spacing-8);
}
header {
  .address {
    margin-bottom: var(--fluid-spacing-8);
  }
  h1 {
    margin-bottom: var(--fluid-spacing-8);
    display: flex;
    align-items: center;
    line-height: 1.15;
  }
  .description {
    max-width: var(--max-text-width);
  }
}
h2 {
  margin-bottom: 1rem;
}
</style>
