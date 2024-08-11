<template>
  <Container centered width="sm">
    <p>Loading...</p>
  </Container>
</template>

<script lang="ts" setup>
const { pb, isValid } = usePocketbase();

if (!isValid.value) {
  // Not authenticated, first login
  await navigateTo({
    path: "/login",
    query: {
      return: "/admin",
    },
  });
} else {
  // Fetch locations the user has access to from
  // the non-public location collection
  const { data: locations } = await useAsyncData("locations", async () => {
    const locations = await pb.collection("location").getFullList();
    return structuredClone(locations);
  });

  if (!locations.value || locations.value.length === 0) {
    showError({
      statusCode: 404,
      statusMessage: "Page Not Found",
    });
  } else if (locations.value?.length === 1) {
    await navigateTo({
      path: `/admin/${locations.value[0].slug}`,
    });
  }
}
</script>
