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
        <td>{{ formatDate(reservation.start, "DD MM", locale) }}</td>
        <td>{{ formatDate(reservation.end, "DD MM", locale) }}</td>
        <td>{{ reservation.expand.product.name }}</td>
        <td>{{ reservation.expand?.user?.name }}</td>
        <td class="note" v-html="reservation.note"></td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { formatDate } from "~/lib/date";

const { locale } = useI18n();

defineProps({
  reservations: Array,
});
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
