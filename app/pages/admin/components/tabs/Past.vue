<template>
  <h3>{{ t("past_title") }}</h3>
  <AdminReservationTable
    v-if="pastReservations?.items && pastReservations.items.length > 0"
    :reservations="pastReservations.items"
    highlight-date="both"
    @select="(reservation) => emit('select', reservation)"
  />
  <p v-else>
    <i>
      {{ t("no_past_reservations") }}
    </i>
  </p>
</template>

<script lang="ts" setup>
import type { RecordModel, ListResult } from "pocketbase";
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

const { data: pastReservations, refresh } = await useAsyncData(
  "admin_past_reservations",
  async () => {
    const reservations = await pb.collection("reservations").getList(0, 50, {
      filter: pb.filter("location = {:location} && end < @todayStart", {
        location: props.location.id,
      }),
      sort: "-end",
      expand: "product,user",
      requestKey: "admin_past_reservations",
    });
    return structuredClone(reservations) as ListResult<Reservation>;
  }
);

// TODO: listen to reservation drawer update event & refresh
</script>

<i18n lang="json">
{
  "en": {
    "past_title": "Past Reservations (last 50)"
  },
  "de": {
    "past_title": "Vergangene Reservierungen (letzte 50)"
  }
}
</i18n>
