<template>
  <Drawer header-offset inset v-model:open="open">
    <h2>{{ state === "new" ? "New" : "Edit" }} Reservation</h2>
    <form>
      <RecordPickerInput
        id="reservation-drawer-product-input"
        label="Product"
        collection="products"
        :search="['name']"
      />
      <RecordPickerInput
        id="reservation-drawer-user-input"
        label="User"
        collection="users"
        :search="['name', 'email']"
      />
      <DateInput label="Start" />
      <DateInput label="End" />
      <Input label="Note" />
      <Button type="submit">Save</Button>
    </form>
  </Drawer>
</template>

<script lang="ts" setup>
import RecordPickerInput from "~/components/admin/RecordPickerInput.vue";

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
