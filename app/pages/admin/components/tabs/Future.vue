<template>
  <h3>{{ t("future_title") }}</h3>
  <AdminReservationTable
    v-if="futureReservations && futureReservations.length > 0"
    :reservations="futureReservations"
    highlight-date="start"
    @select="(reservation) => emit('select', reservation)"
  />
  <p v-else>
    <i>
      {{ t("no_future_reservations") }}
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

const { data: futureReservations, refresh: refreshFutureReservations } =
  await useAsyncData("admin_future_reservations", async () => {
    const reservations = await pb.collection("reservations").getFullList({
      filter: pb.filter("location = {:location} && start > @todayEnd", {
        location: props.location.id,
      }),
      sort: "start",
      expand: "product,user",
      requestKey: "admin_future_reservations",
    });
    return structuredClone(reservations) as Reservation[];
  });

// TODO: listen to reservation drawer update event & refresh
</script>

<i18n lang="json">
{
  "en": {
    "no_future_reservations": "There are no future reservations.",
    "future_title": "Future reservations"
  },
  "de": {
    "no_future_reservations": "Es gibt keine zukünftige Reservierungen.",
    "future_title": "Anstehende Reservierungen"
  }
}
</i18n>
