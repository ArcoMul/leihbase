<template></template>

<script lang="ts" setup>
const { pb } = usePocketbase();

const { data: locations } = await useAsyncData("locations", async () => {
  const locations = await pb.collection("location").getFullList();
  return structuredClone(locations);
});

if (!locations.value || locations.value.length === 0) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
  });
}

if (locations.value?.length === 1) {
  await navigateTo({
    path: `/admin/${locations.value[0].slug}`,
  });
}
</script>
