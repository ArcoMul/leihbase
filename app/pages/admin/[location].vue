<template>
  <Container width="lg" centered>
    <h1>{{ t("title") }} - {{ location?.name }}</h1>

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
            v-if="todaysReservations.length > 0"
            :reservations="todaysReservations"
            :date="date"
            highlight-date="date"
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
            :reservations="ongoingReservations"
            highlight-date="end"
          />
        </section>
      </Tab>

      <Tab id="future" :title="t('tab_future')">
        <section>
          <h3>{{ t("future_title") }}</h3>
          <AdminReservationTable
            :reservations="futureReservations"
            highlight-date="start"
          />
        </section>
      </Tab>
    </TabList>
  </Container>
</template>

<script setup>
import AdminReservationTable from "~/components/admin/AdminReservationsTable.vue";
import { isToday, startOfDate, endOfDate, formatDate } from "~/lib/date";
import { ArrowRight, ArrowLeft } from "@iconoir/vue";

const { pb } = usePocketbase();
const route = useRoute();
const { locale } = useI18n();
const { t } = useI18n({
  useScope: "local",
});

const slug = route.params.location;

const date = ref(new Date(Date.now()));

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
          location: location.value.id,
          dateStart: startOfDate(date.value),
          dateEnd: endOfDate(date.value),
        }
      ),
      sort: "start",
      expand: "product,user",
      requestKey: "admin_todays_reservations",
    });
    return structuredClone(reservations);
  });

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
      sort: "end",
      expand: "product,user",
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
      sort: "start",
      expand: "product,user",
      requestKey: "admin_future_reservations",
    });
    return structuredClone(reservations);
  }
);

function handleDayBackward() {
  date.value.setDate(date.value.getDate() - 1);
  refreshTodaysReservations();
}
function handleDayForward() {
  date.value.setDate(date.value.getDate() + 1);
  refreshTodaysReservations();
}
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 3rem;
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
    "tab_shift": "Schicht",
    "tab_ongoing": "Laufend",
    "tab_future": "Zukunft",
    "today": "heute",
    "Today": "Heute",
    "no_reservations_on_date": "Es gibt keine Reservierungen welchem {date} start oder enden",
    "on": "am",
    "ongoing_title": "Laufende Reservierungen",
    "future_title": "Zukünftige Reservierungen"
  }
}
</i18n>
