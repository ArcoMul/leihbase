<template>
  <Container width="lg" centered>
    <PageAlert class="banner" />

    <header>
      <div>
        <h1 class="h2">{{ location?.name }}</h1>
        <h2 class="h1">{{ t("title") }}</h2>
      </div>
      <Button @click="handleNewReservationClick">{{
        t("new_reservation")
      }}</Button>
    </header>

    <TabList v-if="location" active="today" class="tablist">
      <Tab id="today" :title="t('tab_shift')">
        <section>
          <TodayTab :location="location" @select="handleReservationSelect" />
        </section>
      </Tab>
      <Tab id="ongoing" :title="t('tab_ongoing')">
        <section>
          <OngoingTab :location="location" @select="handleReservationSelect" />
        </section>
      </Tab>
      <Tab id="future" :title="t('tab_future')">
        <section>
          <FutureTab :location="location" @select="handleReservationSelect" />
        </section>
      </Tab>
      <Tab id="past" :title="t('tab_past')">
        <section>
          <PastTab :location="location" @select="handleReservationSelect" />
        </section>
      </Tab>
    </TabList>
  </Container>

  <ReservationDrawer
    v-if="location"
    v-model:open="reservationDrawerOpen"
    :state="selectedReservation ? 'edit' : 'new'"
    :location="location"
    :reservation="selectedReservation"
    @update="handleReservationUpdate"
  />
  <RecordPicker ref="recordPicker" />
</template>

<script lang="ts" setup>
import RecordPicker from "~/components/admin/RecordPicker.vue";
import ReservationDrawer from "./components/ReservationDrawer.vue";
import TodayTab from "./components/tabs/Today.vue";
import OngoingTab from "./components/tabs/Ongoing.vue";
import FutureTab from "./components/tabs/Future.vue";
import PastTab from "./components/tabs/Past.vue";
import type { Reservation } from "~/models/reservation";

const { pb } = usePocketbase();
const route = useRoute();
const { t } = useI18n({
  useScope: "local",
});

const slug = route.params.location;

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

function handleReservationUpdate() {
  // TODO: emit reservation drawer update event
  // using useEventBus?
  // useEmitter().emit('reservationDrawer:update')
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
@import "~/assets/styles/breakpoints.scss";

header {
  margin-bottom: var(--fluid-spacing-12);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  h1,
  h2 {
    margin: 0;
  }
  @media screen and (min-width: $breakpoint-sm) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}
section {
  padding-top: 2rem;
}
@media screen and (max-width: $breakpoint-sm) {
  .tablist :deep(ul.tablist) {
    --spacing-start: var(--fluid-spacing-8);
    --spacing-end: var(--fluid-spacing-8);
    margin-inline: calc(var(--fluid-spacing-8) * -1);
  }
}
</style>

<i18n lang="json">
{
  "en": {
    "title": "Reservations",
    "new_reservation": "New reservation",
    "tab_past": "Past",
    "tab_shift": "Today",
    "tab_ongoing": "Ongoing",
    "tab_future": "Future"
  },
  "de": {
    "title": "Reservierungen",
    "new_reservation": "Neue Reservierung",
    "tab_past": "Vergangene",
    "tab_shift": "Heutige",
    "tab_ongoing": "Laufende",
    "tab_future": "Anstehende"
  }
}
</i18n>
