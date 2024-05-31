<template>
  <Container width="lg" centered>
    <h1>{{ location.name }}</h1>
    <h2>Reservations</h2>
    <h3>To be returned</h3>
    <ul>
      <li v-for="reservation in finishedReservations">
        {{ reservation.expand.product.name }}
        ({{ reservation.expand?.user?.name }}) ({{
          formatDate(reservation.start, "DD MM", locale)
        }}
        -
        {{ formatDate(reservation.end, "DD MM", locale) }})
      </li>
    </ul>
    <h3>Ongoing</h3>
    <ul>
      <li v-for="reservation in ongoingReservations">
        {{ reservation.expand.product.name }}
        ({{ reservation.expand?.user?.name }}) ({{
          formatDate(reservation.start, "DD MM", locale)
        }}
        -
        {{ formatDate(reservation.end, "DD MM", locale) }})
      </li>
    </ul>
    <h3>Future</h3>

    <ul>
      <li v-for="reservation in futureReservations">
        {{ reservation.expand.product.name }}
        ({{ reservation.expand?.user?.name }}) ({{
          formatDate(reservation.start, "DD MM", locale)
        }}
        -
        {{ formatDate(reservation.end, "DD MM", locale) }})
      </li>
    </ul>
  </Container>
</template>

<script lang="ts" setup>
import { DateTime } from "luxon";
import { formatDate } from "~/lib/date";

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
