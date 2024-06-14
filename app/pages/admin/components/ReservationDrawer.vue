<template>
  <Drawer header-offset inset v-model:open="open">
    <h2>{{ state === "new" ? "New" : "Edit" }} Reservation</h2>
    <form>
      <AutoSuggest collection="product" search="name" />
      <AutoSuggest collection="user" search="name" />
      <DateInput label="Śtart" />
      <DateInput label="End" />
      <Input label="Note" />
      <Button type="submit">Save</Button>
    </form>
  </Drawer>
</template>

<script lang="ts" setup>
defineProps<{ state: "new" | "edit" }>();
const open = defineModel("open");
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
}
</style>
