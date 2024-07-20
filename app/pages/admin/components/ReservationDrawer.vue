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
import RecordPickerInput from "~/components/admin/RecordPickerInput.vue";
import type { RecordModel } from "pocketbase";
import type { Reservation } from "~/models/reservation";

const { pb } = usePocketbase();

const props = defineProps<{
  state: "new" | "edit";
  location: RecordModel;
  reservation: Reservation | null;
}>();
const open = defineModel("open");
const emit = defineEmits(["update"]);

const productId = ref<string>();
const userId = ref<string>();
const start = ref<Date | null>(null);
const end = ref<Date | null>(null);
const note = ref<string>();

watch(open, (isOpening) => {
  if (!isOpening) return;
  productId.value = props.reservation?.product || undefined;
  userId.value = props.reservation?.user || undefined;
  start.value = props.reservation?.start
    ? new Date(props.reservation.start)
    : null;
  end.value = props.reservation?.end ? new Date(props.reservation.end) : null;
  note.value = props.reservation?.note || undefined;
});

async function handleSubmit() {
  const formData = {
    user: userId.value,
    product: productId.value,
    location: props.location.id,
    start: start.value,
    end: end.value,
    note: note.value,
  };
  try {
    if (props.state === "new") {
      // Create new reservation
      await pb.collection("reservations").create(formData);
    } else if (props.state === "edit") {
      if (!props.reservation?.id) {
        throw new Error("reservation_undefined");
      }
      // Update existing reservation
      await pb
        .collection("reservations")
        .update(props.reservation.id, formData);
    }

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
