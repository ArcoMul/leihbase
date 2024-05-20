<template></template>

<script setup>
const { pb } = usePocketbase();
const locations = await pb.collection("public_locations").getFullList({
  filter: "active = true",
});
if (locations.length > 0) {
  await navigateTo({
    path: `/l/${locations[0].slug}`,
  });
} else {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
  });
}
</script>
