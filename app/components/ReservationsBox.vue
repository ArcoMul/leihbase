<template>
  <div>
    <h3>{{ title }}</h3>
    <ul v-if="reservations && reservations.length > 0">
      <li
        v-for="reservation in reservations"
        :key="reservation.id"
        :class="{ active: isToday(reservation) }"
      >
        <span class="timespan">
          {{ formatDate(reservation.start, DateTime.DATE_MED, locale) }}
          - {{ formatDate(reservation.end, DateTime.DATE_MED, locale) }}
        </span>
        <span
          v-if="userReservationIds.includes(reservation.id)"
          class="user me"
        >
          <UserIcon class="user-icon" /> Du
        </span>
      </li>
    </ul>
    <p v-else><i>Keine kommenden Reservierungen</i></p>
  </div>
</template>

<script setup>
import { DateTime } from "luxon";
import { formatDate } from "~/lib/date";
import { User as UserIcon } from "@iconoir/vue";
import { isToday } from "~/lib/reservation";

const { locale } = useI18n();

defineProps({
  title: {
    type: String,
    default: "Reservations",
  },
  reservations: {
    type: Array,
    default: [],
  },
});

const userStore = useUserStore();

const userReservationIds = computed(() =>
  userStore.reservations.map((r) => r.id)
);
</script>

<style scoped>
ul {
  --border-color: #d3ad8d;
  border: 1px solid var(--border-color);
  margin: 0;
  padding: 0;
  list-style: none;
  border-radius: 15px;
  display: inline-block;
}
li {
  line-height: 2.5;
  padding: 0 1rem;
  display: flex;
  align-items: center;
}
li.active {
  font-weight: var(--font-weight-semibold);
}
li.active::before {
  content: "";
  width: 0.333rem;
  height: 0.333rem;
  border-radius: 0.333rem;
  background-color: red;
  margin-right: 0.5rem;
}
li:not(:last-child) {
  border-bottom: 1px solid var(--border-color);
}
span.user {
  display: inline-flex;
  align-items: center;
  line-height: 1;
  font-size: var(--font-size-sm);
  margin-left: 1rem;
}
span.user.me {
  background-color: rgba(255, 255, 255, 0.666);
  border-radius: 999px;
  padding: 0.25rem 0.75rem;
}
.user-icon {
  display: inline;
  height: 1em;
  width: 1em;
  margin-right: 0.25em;
}
</style>
