<template>
  <div class="admin-reservations-table">
    <table cellspacing="0">
      <thead>
        <tr>
          <th>{{ t("start") }}</th>
          <th>{{ t("end") }}</th>
          <th>{{ t("product") }}</th>
          <th>{{ t("user") }}</th>
          <th>{{ t("picked_up") }}</th>
          <th>{{ t("returned") }}</th>
          <th>{{ t("deposit") }}</th>
          <th>{{ t("note") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="reservation in reservations"
          :class="{cancelled: reservation.cancelled}"
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
          <td>
            <Check v-if="reservation.started" class="check" />
            <Xmark v-else class="xmark" />
          </td>
          <td>
            <Check v-if="reservation.ended" class="check" />
            <Xmark v-else class="xmark" />
          </td>
          <td>€{{ reservation.deposit }}</td>
          <td>
            <Tooltip v-if="reservation.note" :html="reservation.note">
              <MessageText class="note-icon" />
            </Tooltip>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { formatDate, isSameDate } from "~/lib/date";
import type { Reservation } from "~/models/reservation";
import { Check, Xmark, MessageText } from "@iconoir/vue";

if (import.meta.client) {
  await import("@shoelace-style/shoelace/dist/components/tooltip/tooltip.js");
}

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
.admin-reservations-table {
  width: 100%;
  overflow-x: auto;
}
table {
  min-width: 100%;
}
th,
td {
  text-align: left;
  padding: 0.5rem;
  max-width: 200px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  text-overflow: ellipsis;
  text-wrap: nowrap;
  overflow: hidden;
  &.start,
  &.end {
    color: var(--body-text-color-light);
    &.highlight {
      color: var(--body-text-color);
    }
  }
}
tr.cancelled td {
  text-decoration: line-through;
  opacity: 0.5;
}

tbody tr:hover {
  background-color: rgba(0, 0, 0, 0.05);
  cursor: pointer;
}

.check {
  color: #15b845;
  stroke-width: 3px;
}
.xmark {
  stroke-width: 0.75px;
}
.note-icon {
  width: 1.1em;
  height: 1.1em;
  margin-bottom: -2px;
}
</style>

<style scoped>
sl-tooltip :deep(p),
sl-tooltip :deep(ul),
sl-tooltip :deep(ol) {
  margin-bottom: 0;
}
sl-tooltip :deep(ul),
sl-tooltip :deep(ol) {
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
    "picked_up": "Picked Up",
    "returned": "Returned",
    "deposit": "Deposit",
    "note": "Note"
  },
  "de": {
    "start": "Start",
    "end": "Ende",
    "product": "Produkt",
    "user": "Nutzer",
    "picked_up": "Abgeholt",
    "returned": "Zurückgegeben",
    "deposit": "Pfand",
    "note": "Notiz"
  }
}
</i18n>
