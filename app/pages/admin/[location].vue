<template>
  <Container width="lg" centered>
    <h1>Reservations - {{ location?.name }}</h1>

    <section>
      <h3>Today</h3>
      <AdminReservationTable
        v-if="finishedReservations.length > 0"
        :reservations="finishedReservations"
      />
      <p v-else><i>No reservations starting or ending today.</i></p>
    </section>

    <section>
      <h3>Ongoing</h3>
      <AdminReservationTable :reservations="ongoingReservations" />
    </section>

    <section>
      <h3>Future</h3>
      <AdminReservationTable :reservations="futureReservations" />
    </section>
  </Container>
</template>

<script lang="ts" setup>
import { DateTime } from "luxon";
import { formatDate } from "~/lib/date";
import AdminReservationTable from "~/components/admin/AdminReservationsTable.vue";

const { pb } = usePocketbase();
const route = useRoute();
const { locale } = useI18n();

const slug = route.params.location;

const { data: location } = await useAsyncData("admin_location", async () => {
  const location = await pb
    .collection("location")
    .getFirstListItem(pb.filter("slug = {:slug}", { slug }));
  return structuredClone(location);
});

console.log(
  pb.filter(
    "location = {:location} && start < @todayStart && end > @todayStart",
    {
      location: location.value.id,
    }
  )
);

const { data: finishedReservations } = await useAsyncData(
  "admin_finished_reservations",
  async () => {
    const reservations = await pb.collection("reservations").getFullList({
      filter: pb.filter(
        "location = {:location} && start < @todayStart && end >= @todayStart && end <= @todayEnd",
        {
          location: location.value.id,
        }
      ),
      expand: ["product,user"],
      requestKey: "admin_finished_reservations",
    });
    return structuredClone(reservations);
  }
);

const { data: ongoingReservations } = await useAsyncData(
  "admin_ongoing_reservations",
  async () => {
    const reservations = await pb.collection("reservations").getFullList({
      filter: pb.filter(
        "location = {:location} && start < @todayStart && end > @todayEnd",
        {
          location: location.value.id,
        }
      ),
      expand: ["product,user"],
      requestKey: "admin_ongoing_reservations",
    });
    return structuredClone(reservations);
  }
);

const { data: futureReservations } = await useAsyncData(
  "admin_future_reservations",
  async () => {
    const reservations = await pb.collection("reservations").getFullList({
      filter: pb.filter("location = {:location} && start > @todayEnd", {
        location: location.value.id,
      }),
      expand: ["product,user"],
      requestKey: "admin_future_reservations",
    });
    return structuredClone(reservations);
  }
);
</script>

<style scoped>
h1 {
  margin-bottom: 3rem;
}
section {
  margin-bottom: 3rem;
}
</style>
