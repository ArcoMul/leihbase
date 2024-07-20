<template>
  <Container width="lg" centered>
    <header class="page-header">
      <h1>{{ t("title") }} - {{ location?.name }}</h1>
      <Button @click="handleNewReservationClick">{{
        t("new_reservation")
      }}</Button>
    </header>

    <TabList active="today">
      <Tab id="today" :title="t('tab_shift')">
        <section class="today">
          <header>
            <button @click="handleDayBackward">
              <ArrowLeft class="icon" />
            </button>
            <h3>
              {{
                isToday(date)
                  ? t("Today")
                  : formatDate(date, "ddd, DD.MM", locale)
              }}
            </h3>
            <button @click="handleDayForward">
              <ArrowRight class="icon" />
            </button>
          </header>
          <AdminReservationTable
            v-if="todaysReservations && todaysReservations.length > 0"
            :reservations="todaysReservations"
            :date="date"
            highlight-date="date"
            @select="handleReservationSelect"
          />
          <p v-else>
            <i>
              {{
                t("no_reservations_on_date", {
                  date: isToday(date)
                    ? t("today")
                    : t("on") + " " + formatDate(date, "DD.MM", locale),
                })
              }}.
            </i>
          </p>
        </section>
      </Tab>

      <Tab id="ongoing" :title="t('tab_ongoing')">
        <section>
          <h3>{{ t("ongoing_title") }}</h3>
          <AdminReservationTable
            v-if="ongoingReservations"
            :reservations="ongoingReservations"
            highlight-date="end"
            @select="handleReservationSelect"
          />
        </section>
      </Tab>

      <Tab id="future" :title="t('tab_future')">
        <section>
          <h3>{{ t("future_title") }}</h3>
          <AdminReservationTable
            v-if="futureReservations"
            :reservations="futureReservations"
            highlight-date="start"
            @select="handleReservationSelect"
          />
        </section>
      </Tab>
    </TabList>
  </Container>
  <ReservationDrawer
    v-model:open="reservationDrawerOpen"
    :state="selectedReservation ? 'edit' : 'new'"
    :location="location"
    :reservation="selectedReservation"
    @update="handleReservationUpdate"
  />
  <RecordPicker ref="recordPicker" />
</template>

<script lang="ts" setup>
import AdminReservationTable from "~/components/admin/AdminReservationsTable.vue";
import RecordPicker from "~/components/admin/RecordPicker.vue";
import ReservationDrawer from "./components/ReservationDrawer.vue";
import { isToday, startOfDate, endOfDate, formatDate } from "~/lib/date";
import { ArrowRight, ArrowLeft } from "@iconoir/vue";
import type { Reservation } from "~/models/reservation";

const { pb } = usePocketbase();
const route = useRoute();
const { locale } = useI18n();
const { t } = useI18n({
  useScope: "local",
});

const slug = route.params.location;

const date = ref(new Date(Date.now()));
const reservationDrawerOpen = ref(false);
const selectedReservation = ref<Reservation | null>(null);

const recordPicker = ref(null);
provide("recordPicker", recordPicker);

const { data: location } = await useAsyncData("admin_location", async () => {
  const location = await pb
    .collection("location")
    .getFirstListItem(pb.filter("slug = {:slug}", { slug }));
  return structuredClone(location);
});

if (!location.value || !location.value.id) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
  });
}

const { data: todaysReservations, refresh: refreshTodaysReservations } =
  await useAsyncData("admin_todays_reservations", async () => {
    const reservations = await pb.collection("reservations").getFullList({
      filter: pb.filter(
        "location = {:location} && ((start >= {:dateStart} && start <= {:dateEnd}) || (end >= {:dateStart} && end <= {:dateEnd}))",
        {
          location: location.value?.id,
          dateStart: startOfDate(date.value),
          dateEnd: endOfDate(date.value),
        }
      ),
      sort: "start",
      expand: "product,user",
      requestKey: "admin_todays_reservations",
    });
    return structuredClone(reservations) as Reservation[];
  });

const { data: ongoingReservations, refresh: refreshOngoingReservations } =
  await useAsyncData("admin_ongoing_reservations", async () => {
    const reservations = await pb.collection("reservations").getFullList({
      filter: pb.filter(
        "location = {:location} && start < @todayStart && end > @todayEnd",
        {
          location: location.value?.id,
        }
      ),
      sort: "end",
      expand: "product,user",
      requestKey: "admin_ongoing_reservations",
    });
    return structuredClone(reservations) as Reservation[];
  });

const { data: futureReservations, refresh: refreshFutureReservations } =
  await useAsyncData("admin_future_reservations", async () => {
    const reservations = await pb.collection("reservations").getFullList({
      filter: pb.filter("location = {:location} && start > @todayEnd", {
        location: location.value?.id,
      }),
      sort: "start",
      expand: "product,user",
      requestKey: "admin_future_reservations",
    });
    return structuredClone(reservations) as Reservation[];
  });

function handleDayBackward() {
  date.value.setDate(date.value.getDate() - 1);
  refreshTodaysReservations();
}
function handleDayForward() {
  date.value.setDate(date.value.getDate() + 1);
  refreshTodaysReservations();
}

function handleReservationUpdate() {
  refreshTodaysReservations();
  refreshOngoingReservations();
  refreshFutureReservations();
}

function handleReservationSelect(reservation: Reservation) {
  selectedReservation.value = reservation;
  reservationDrawerOpen.value = true;
}

function handleNewReservationClick() {
  selectedReservation.value = null;
  reservationDrawerOpen.value = true;
}
</script>

<style lang="scss" scoped>
header.page-header {
  margin-bottom: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    margin: 0;
  }
}
section {
  margin-bottom: 3rem;
  padding-top: 2rem;
}
section > header {
  display: flex;
  margin-bottom: 1rem;
  gap: 1rem;
  & > h3 {
    margin: 0;
  }
  & > button {
    background-color: transparent;
    border: 0;
    padding: 0;
    cursor: pointer;
    .icon {
      width: 1em;
      height: 1em;
    }
  }
}
section.today {
  h3 {
    min-width: 10rem;
    text-align: center;
  }
}
.date-field {
  display: none;
}
</style>

<i18n lang="json">
{
  "en": {
    "title": "Reservations",
    "new_reservation": "New reservation",
    "tab_shift": "Shift",
    "tab_ongoing": "Ongoing",
    "tab_future": "Future",
    "today": "heute",
    "Today": "Heute",
    "no_reservations_on_date": "No reservations starting or ending {date}",
    "on": "am",
    "ongoing_title": "Ongoing reservations",
    "future_title": "Future Reservations"
  },
  "de": {
    "title": "Reservierungen",
    "new_reservation": "Neue Reservierung",
    "tab_shift": "Schicht",
    "tab_ongoing": "Laufend",
    "tab_future": "Zukunft",
    "today": "heute",
    "Today": "Heute",
    "no_reservations_on_date": "Es gibt keine Reservierungen, die {date} starten oder enden",
    "on": "am",
    "ongoing_title": "Laufende Reservierungen",
    "future_title": "Zukünftige Reservierungen"
  }
}
</i18n>
