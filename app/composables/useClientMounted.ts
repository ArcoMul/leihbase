export function useClientMounted() {
  const isMounted = ref(false);
  onMounted(() => {
    if (import.meta.server) return;
    isMounted.value = true;
  });
  return {
    isClientMounted: isMounted,
  };
}
