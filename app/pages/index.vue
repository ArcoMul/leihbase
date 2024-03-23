<template>
  <section class="header">
    <h1>{{ location?.name || "No location found" }}</h1>
    <div v-html="location?.description || 'No location found'"></div>
  </section>
  <section>
    <h2>Gegenstanden</h2>
    <div class="products">
      <NuxtLink
        v-for="product in products"
        :to="`/l/${location.slug}/p/${product.id}`"
        :key="product.id"
        class="product"
      >
        <ProductCard :product="product" />
      </NuxtLink>
    </div>
  </section>
</template>

<script setup>
import ProductCard from "~/components/ProductCard.vue";

const { data: location } = await useAsyncData(async (nuxtApp) => {
  const location = await nuxtApp.$pb
    .collection("location")
    .getOne("1351z318f7ehd9n", { expand: "products_via_location" });

  return structuredClone(location);
});
const products = location?.value?.expand?.products_via_location;
</script>

<style lang="scss" scoped>
section {
  padding-inline: 2rem;
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
.products {
  display: flex;
  gap: 1rem;
}
.product {
  width: 33.33%;
  display: flex;
  color: black;
  text-decoration: none;
}
</style>
