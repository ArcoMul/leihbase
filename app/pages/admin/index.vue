<template></template>

<script lang="ts" setup>
const { pb, isValid } = usePocketbase();
const userStore = useUserStore();
const router = useRouter();

if (!isValid.value) {
  // Not authenticated, first login
  userStore.setAuthenticationIntent("/admin");
  router.push({ path: "/login" });
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
