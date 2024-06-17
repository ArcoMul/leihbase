<template>
  <Drawer header-offset inset v-model:open="open">
    <h2>{{ state === "new" ? "New" : "Edit" }} Reservation</h2>
    <form @submit.prevent="handleSubmit">
      <RecordPickerInput
        id="reservation-drawer-product-input"
        label="Product"
        collection="products"
        :search="['name']"
        v-model="productId"
      />
      <RecordPickerInput
        id="reservation-drawer-user-input"
        label="User"
        collection="users"
        :search="['name', 'email']"
        v-model="userId"
      />
      <DateInput label="Start" v-model="start" />
      <DateInput label="End" v-model="end" />
      <Input label="Note" v-model="note" />
      <Button type="submit">Save</Button>
    </form>
  </Drawer>
</template>

<script lang="ts" setup>
import type { RecordModel } from "pocketbase";
import RecordPickerInput from "~/components/admin/RecordPickerInput.vue";

const { pb } = usePocketbase();

const props = defineProps<{ state: "new" | "edit"; location: RecordModel }>();
const open = defineModel("open");
const emit = defineEmits(["update"]);

const productId = ref<string>();
const userId = ref<string>();
const start = ref<Date>();
const end = ref<Date>();
const note = ref<string>();

async function handleSubmit() {
  try {
    await pb.collection("reservations").create({
      user: userId.value,
      product: productId.value,
      location: props.location.id,
      start: start.value,
      end: end.value,
      note: note.value,
    });
    open.value = false;
    emit("update");
  } catch (err) {
    console.error(err);
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
}
</style>
