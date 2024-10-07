<template>
  <TabHeader
    :title="isToday(date) ? t('Today') : formatDate(date, 'ddd, DD.MM', locale)"
    fixed-width
  >
    <template #prefix>
      <button @click="handleDayBackward">
        <ArrowLeft class="icon" />
      </button>
    </template>
    <template #suffix>
      <button @click="handleDayForward">
        <ArrowRight class="icon" />
      </button>
    </template>
  </TabHeader>
  <AdminReservationTable
    v-if="todaysReservations && todaysReservations.length > 0"
    :reservations="todaysReservations"
    :date="date"
    highlight-date="date"
    :show-warning="
      (r) => {
        console.log(r);
        return new Date(r.end) < startOfUTCDate(date);
      }
    "
    @select="(reservation) => emit('select', reservation)"
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
</template>

<script lang="ts" setup>
import AdminReservationTable from "~/components/admin/AdminReservationsTable.vue";
import { isToday, startOfUTCDate, endOfUTCDate, formatDate } from "~/lib/date";
import { ArrowRight, ArrowLeft } from "@iconoir/vue";
import TabHeader from "../TabHeader.vue";
import type { Reservation } from "~/models/reservation";
import type { RecordModel } from "pocketbase";

const { pb } = usePocketbase();
const { locale } = useI18n();
const { t } = useI18n({
  useScope: "local",
});

const props = defineProps<{
  location: RecordModel;
}>();

const emit = defineEmits<{ select: [reservation: Reservation] }>();

const date = ref(new Date(Date.now()));

const { data: todaysReservations, refresh: refreshTodaysReservations } =
  await useAsyncData("admin_todays_reservations", async () => {
    const reservations = await pb.collection("reservations").getFullList({
      filter: pb.filter(
        "location = {:location} && ((start >= {:dateStart} && start <= {:dateEnd}) || (end >= {:dateStart} && end <= {:dateEnd}))",
        {
          location: props.location.id,
          dateStart: startOfUTCDate(date.value),
          dateEnd: endOfUTCDate(date.value),
        }
      ),
      sort: "start",
      expand: "product,user",
      requestKey: "admin_todays_reservations",
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

// TODO: listen to reservation drawer update event & refresh
</script>

<style scoped>
header > button {
  background-color: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
  .icon {
    width: 1em;
    height: 1em;
  }
}
</style>

<i18n lang="json">
{
  "en": {
    "today": "today",
    "Today": "Today",
    "no_reservations_on_date": "No reservations starting or ending {date}",
    "on": "at"
  },
  "de": {
    "today": "heute",
    "Today": "Heute",
    "no_reservations_on_date": "Es gibt keine Reservierungen, die {date} starten oder enden",
    "on": "am"
  }
}
</i18n>
