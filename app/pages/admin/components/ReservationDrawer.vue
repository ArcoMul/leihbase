<template>
  <Drawer header-offset inset v-model:open="open">
    <header>
      <h2>{{ state === "new" ? t("new") : t("edit") }}</h2>
      <Button
        v-if="state === 'edit'"
        variant="secondary"
        circle
        @click="handleRemoveClick"
      >
        <Trash />
      </Button>
    </header>
    <form @submit.prevent="handleSubmit">
      <RecordPickerInput
        id="reservation-drawer-product-input"
        :label="t('product')"
        collection="products"
        :search="['name']"
        v-model="productId"
      />
      <RecordPickerInput
        id="reservation-drawer-user-input"
        :label="t('user')"
        collection="users"
        :search="['name', 'email']"
        v-model="userId"
      />
      <DateInput :label="t('start')" v-model="start" />
      <DateInput :label="t('end')" v-model="end" />
      <RichTextarea :label="t('note')" v-model="note" />
      <Alert v-if="error" variant="error">{{ error }}</Alert>
      <footer>
        <Button type="submit">{{ t("save") }}</Button>
        <Button variant="secondary" @click="handleCancelClick">{{
          t("cancel")
        }}</Button>
      </footer>
    </form>
  </Drawer>
  <Dialog
    v-model:open="removeDialogOpen"
    inset
    :title="t('remove_dialog.title')"
  >
    <p class="remove-dialog-text">{{ t("remove_dialog.text") }}</p>
    <footer>
      <Button @click="handleRemoveDialogConfirmClick">
        {{ t("remove_dialog.confirm") }}
      </Button>
      <Button variant="secondary" @click="handleRemoveDialogCancelClick">
        {{ t("remove_dialog.cancel") }}
      </Button>
    </footer>
  </Dialog>
</template>

<script lang="ts" setup>
import RecordPickerInput from "~/components/admin/RecordPickerInput.vue";
import { Trash } from "@iconoir/vue";
import type { RecordModel } from "pocketbase";
import type { Reservation } from "~/models/reservation";

const { pb } = usePocketbase();
const { t } = useI18n({
  useScope: "local",
});

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
const error = ref<string | null>(null);

watch(open, (isOpening) => {
  if (!isOpening) return;
  error.value = null;
  productId.value = props.reservation?.product || undefined;
  userId.value = props.reservation?.user || undefined;
  start.value = props.reservation?.start
    ? new Date(props.reservation.start)
    : null;
  end.value = props.reservation?.end ? new Date(props.reservation.end) : null;
  if (props.reservation) {
    note.value = props.reservation?.note || "";
  } else if (props.location.note_default) {
    // NOTE: this weird HTML formatting is required because the Quill richt-text
    // editor for some reason wants the HTML formatted this way, otherwise it
    // inserts extra paragraphs...
    note.value = props.location.note_default.replace(
      /<\/p>[\n\r]+<p>/g,
      "\n</p><p>"
    );
  } else {
    note.value = "";
  }
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
  error.value = "";
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
    if (err?.message === "Overlapping_reservation.") {
      error.value = t("errors.overlapping_reservation");
    } else if (err?.message === "Start_before_today.") {
      error.value = t("errors.start_before_today");
    } else if (err?.message === "End_before_today.") {
      error.value = t("errors.end_before_today");
    } else {
      error.value = t("errors.general");
    }
  }
}

function handleCancelClick() {
  open.value = false;
}

const removeDialogOpen = ref(false);

function handleRemoveClick() {
  removeDialogOpen.value = true;
}

async function handleRemoveDialogConfirmClick() {
  if (!props.reservation?.id) {
    console.error("No reservation id given to delete");
    return;
  }
  try {
    await pb.collection("reservations").delete(props.reservation.id);
    removeDialogOpen.value = false;
    open.value = false;
    emit("update");
  } catch (e) {
    console.error("Error removing reservation", e);
  }
}

function handleRemoveDialogCancelClick() {
  removeDialogOpen.value = false;
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
}
header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}
footer {
  display: flex;
  gap: 1rem;
}
.remove-dialog-text {
  margin-bottom: 1.666rem;
}
</style>

<i18n lang="json">
{
  "en": {
    "new": "New Reservation",
    "edit": "Edit Reservation",
    "product": "Product",
    "user": "User",
    "start": "Start",
    "end": "End",
    "note": "Note",
    "save": "Save",
    "cancel": "Cancel",
    "remove_dialog": {
      "title": "Remove reservieration",
      "text": "Are you sure you want to remove this reservation? There is no way to undo this.",
      "confirm": "Remove reservation",
      "cancel": "Cancel"
    },
    "errors": {
      "overlapping_reservation": "There is already a reservation for this product during the given period.",
      "start_before_today": "The start of the reservation is before today.",
      "end_before_today": "The end of the reservation is before today.",
      "general": "Something went wrong while creating the reservation, please try again."
    }
  },
  "de": {
    "new": "Neue Reservierung",
    "edit": "Reservierung bearbeiten",
    "product": "Produkt",
    "user": "Nutzer:in",
    "start": "Start",
    "end": "Ende",
    "note": "Notiz  ",
    "save": "Speichern",
    "cancel": "Abbrechen",
    "remove_dialog": {
      "title": "Reservierung entfernen",
      "text": "Bist du sicher, dass du diese Reservierung endgültig entfernen möchtest?",
      "confirm": "Reservierung entfernen",
      "cancel": "Annulieren"
    },
    "errors": {
      "overlapping_reservation": "Das Produkt ist für diesen Termin bereits reserviert.",
      "start_before_today": "Der Beginn der Reservierung liegt vor dem heutigen Tag.",
      "end_before_today": "Das Enddatum der Reservierung liegt vor dem heutigen Tag",
      "general": "Beim Erstellen deiner Reservierung ist ein Fehler aufgetreten, bitte versuche es erneut."
    }
  }
}
</i18n>
