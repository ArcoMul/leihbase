<template>
  <table class="admin-reservations-table" cellspacing="0">
    <thead>
      <tr>
        <th>Start</th>
        <th>End</th>
        <th>Product</th>
        <th>User</th>
        <th class="note">Note</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="reservation in reservations">
        <td
          :class="{
            start: true,
            highlight:
              highlightDate === 'start' ||
              (highlightDate === 'date' &&
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
              (highlightDate === 'date' &&
                isSameDate(date, new Date(reservation.end))),
          }"
        >
          {{ formatDate(reservation.end, "ddd, DD.MM", locale) }}
        </td>
        <td>{{ reservation.expand.product.name }}</td>
        <td>{{ reservation.expand?.user?.name }}</td>
        <td class="note" v-html="reservation.note"></td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { formatDate, isSameDate } from "~/lib/date";
import type { Reservation } from "~/models/reservation";

const { locale } = useI18n();

defineProps<{
  reservations: Reservation[];
  date?: Date;
  highlightDate: "start" | "end" | "date";
}>();
</script>

<style scoped lang="scss">
table {
  width: 100%;
}
th,
td {
  text-align: left;
  padding: 0.5rem;
  width: 15%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    padding-right: 0;
  }
  &.start,
  &.end {
    color: var(--body-text-color-light);
    &.highlight {
      color: var(--body-text-color);
    }
  }
}

.note {
  width: 40%;
}
</style>

<style>
.admin-reservations-table td p:last-child {
  margin: 0;
}
</style>
