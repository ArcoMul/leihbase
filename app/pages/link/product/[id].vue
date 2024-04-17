<template></template>

<script setup>
const route = useRoute();
const { pb } = usePocketbase();

const product = await pb
  .collection("public_products")
  .getOne(route.params.id, { expand: "location" });

await navigateTo({
  path: `/l/${product.expand.location.slug}/p/${route.params.id}`,
});
</script>
