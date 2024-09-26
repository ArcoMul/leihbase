export async function useLeihbase(fields = "contact_link,style") {
  const { pb } = usePocketbase();

  // TODO: make sure fetch is cached/reused
  const { data: leihbases } = await useAsyncData(
    `leihbase-${fields.replaceAll(",", "-")}`,
    () => {
      console.log("!!! fetch", fields);
      return pb
        .collection("leihbase")
        .getFullList({ fields: [fields], $autoCancel: false });
    }
  );

  const leihbase = computed(() => leihbases.value?.[0]);

  return {
    leihbase,
  };
}
