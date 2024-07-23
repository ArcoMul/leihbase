<template>
  <Dialog v-model:open="open" inset :title="title">
    <Input
      placeholder="Enter search query..."
      class="input"
      v-model="query"
      @input="handleQueryInput"
    />
    <Scrollable height="70vh">
      <table cellspacing="0">
        <tr v-for="record in records" :key="record.id">
          <td v-for="s in search" @click="handleRecordClick(record)">
            {{ record[s] }}
          </td>
        </tr>
      </table>
    </Scrollable>
  </Dialog>
</template>

<script lang="ts" setup>
import type { RecordModel } from "pocketbase";

const { pb } = usePocketbase();

const open = defineModel("open");

const title = ref("");
const collection = ref("");
const search = ref<string[]>([]);
const query = ref("");
let record = ref<RecordModel>();

const { data: records, refresh } = await useAsyncData(async () => {
  const records = await pb.collection(collection.value).getFullList({
    filter: query.value
      ? pb.filter(search.value.map((s) => `${s} ~ {:query}`).join(" || "), {
          query: query.value,
        })
      : null,
  });
  return structuredClone(records);
});

function handleQueryInput() {
  refresh();
}

function handleRecordClick(_record: RecordModel) {
  record.value = _record;
  open.value = false;
}

function show({
  title: _title,
  collection: _collection,
  search: _search,
  record: _record,
}: {
  title: string;
  collection: string;
  search: string[];
  record: Ref<RecordModel | undefined>;
}) {
  query.value = "";
  title.value = _title;
  open.value = true;
  collection.value = _collection;
  search.value = _search;
  record = _record;
  refresh();
}

defineExpose({
  show,
});
</script>

<style scoped>
.input {
  margin-bottom: 1rem;
}
table {
  width: 100%;
  border-collapse: collapse;
}
table tr:hover {
  background-color: #f9f9f9;
  cursor: pointer;
}
table td {
  border: 1px solid #f3f3f3;
  padding: 0.25rem 0.5rem;
}
</style>
