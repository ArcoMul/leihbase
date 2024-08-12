<template>
  <table class="admin-reservations-table" cellspacing="0">
    <thead>
      <tr>
        <th>{{ t("start") }}</th>
        <th>{{ t("end") }}</th>
        <th>{{ t("product") }}</th>
        <th>{{ t("user") }}</th>
        <th class="note">{{ t("note") }}</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="reservation in reservations"
        @click="handleReservationClick(reservation)"
      >
        <td
          :class="{
            start: true,
            highlight:
              highlightDate === 'start' ||
              highlightDate === 'both' ||
              (highlightDate === 'date' &&
                date &&
                isSameDate(date, new Date(reservation.start))),
          }"
        >
          {{ formatDate(reservation.start, "ddd, DD.MM", locale) }}
        </td>
        <td
          :class="{
            end: true,
            highlight:
              highlightDate === 'end' ||
              highlightDate === 'both' ||
              (highlightDate === 'date' &&
                date &&
                isSameDate(date, new Date(reservation.end))),
          }"
        >
          {{ formatDate(reservation.end, "ddd, DD.MM", locale) }}
        </td>
        <td>
          <NuxtLink
            :to="`/link/product/${reservation.expand.product.id}`"
            target="_blank"
            @click.stop
          >
            {{ reservation.expand.product.name }}
          </NuxtLink>
        </td>
        <td>{{ reservation.expand?.user?.name }}</td>
        <td class="note" v-html="reservation.note"></td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { formatDate, isSameDate } from "~/lib/date";
import type { Reservation } from "~/models/reservation";

const { t, locale } = useI18n({
  useScope: "local",
});
const emit = defineEmits<{ select: [reservation: Reservation] }>();

defineProps<{
  reservations: Reservation[];
  date?: Date;
  highlightDate: "start" | "end" | "date" | "both";
}>();

function handleReservationClick(reservation: Reservation) {
  emit("select", reservation);
}
</script>

<style scoped lang="scss">
table {
  width: 100%;
  display: block;
  overflow-x: auto;
  white-space: nowrap;
}
th,
td {
  text-align: left;
  padding: 0.5rem;
  width: 15%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  &.start,
  &.end {
    color: var(--body-text-color-light);
    &.highlight {
      color: var(--body-text-color);
    }
  }
}

tbody tr:hover {
  background-color: rgba(0, 0, 0, 0.05);
  cursor: pointer;
}
</style>

<style scoped>
.note {
  width: 40%;
}
.note :deep(p),
.note :deep(ul),
.note :deep(ol) {
  margin-bottom: 0;
}
.note :deep(ul),
.note :deep(ol) {
  padding-left: 1.333rem;
}
</style>

<i18n lang="json">
{
  "en": {
    "start": "Start",
    "end": "End",
    "product": "Product",
    "user": "User",
    "note": "Note"
  },
  "de": {
    "start": "Start",
    "end": "Ende",
    "product": "Produkt",
    "user": "Nutzer",
    "note": "Notiz"
  }
}
</i18n>
