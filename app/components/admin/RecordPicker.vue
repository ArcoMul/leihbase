<template>
  <Dialog v-model:open="open" inset :title="title">
    <table cellspacing="0">
      <tr v-for="record in records" :key="record.id">
        <td v-for="s in search">
          {{ record[s] }}
        </td>
      </tr>
    </table>
  </Dialog>
</template>

<script lang="ts" setup>
const { pb } = usePocketbase();

const open = defineModel("open");

const title = ref("");
const collection = ref("");
const search = ref<string[]>([]);

const { data: records, refresh } = await useAsyncData(async () => {
  const records = await pb.collection(collection.value).getFullList();
  return structuredClone(records);
});

function show({
  title: _title,
  collection: _collection,
  search: _search,
}: {
  title: string;
  collection: string;
  search: string[];
}) {
  title.value = _title;
  open.value = true;
  collection.value = _collection;
  search.value = _search;
  refresh();
}

defineExpose({
  show,
});
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
table td {
  border: 1px solid #f3f3f3;
  padding: 0.25rem 0.5rem;
}
</style>
