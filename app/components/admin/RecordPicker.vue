<template>
  <Dialog v-model:open="open" inset :title="title"> Test </Dialog>
</template>

<script lang="ts" setup>
const open = defineModel("open");
const title = ref("");

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
}

defineExpose({
  show,
});
</script>
