<template>
  <TabHeader :title="t('ongoing_title')" />
  <AdminReservationTable
    v-if="ongoingReservations && ongoingReservations.length > 0"
    :reservations="ongoingReservations"
    highlight-date="end"
    @select="(reservation) => emit('select', reservation)"
  />
  <p v-else>
    <i>
      {{ t("no_ongoing_reservations") }}
    </i>
  </p>
</template>

<script lang="ts" setup>
import type { RecordModel } from "pocketbase";
import AdminReservationTable from "~/components/admin/AdminReservationsTable.vue";
import type { Reservation } from "~/models/reservation";

const { pb } = usePocketbase();
const { t } = useI18n({
  useScope: "local",
});

const props = defineProps<{
  location: RecordModel;
}>();

const emit = defineEmits<{ select: [reservation: Reservation] }>();

const { data: ongoingReservations, refresh } = await useAsyncData(
  "admin_ongoing_reservations",
  async () => {
    const reservations = await pb.collection("reservations").getFullList({
      filter: pb.filter(
        "location = {:location} && start < @todayStart && end > @todayEnd",
        {
          location: props.location.id,
        }
      ),
      sort: "end",
      expand: "product,user",
      requestKey: "admin_ongoing_reservations",
    });
    return structuredClone(reservations) as Reservation[];
  }
);

// TODO: listen to reservation drawer update event & refresh
</script>

<i18n lang="json">
{
  "en": {
    "no_ongoing_reservations": "There are no ongoing reservations.",
    "ongoing_title": "Ongoing reservations"
  },
  "de": {
    "no_ongoing_reservations": "Es gibt keine laufende Reservierungen.",
    "ongoing_title": "Laufende Reservierungen"
  }
}
</i18n>
