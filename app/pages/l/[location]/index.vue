<template>
  <Container width="lg" centered>
    <header>
      <AddressBox class="address">{{ location?.address }}</AddressBox>
      <h1>
        {{ location?.name || t("no_location_found") }}
      </h1>
      <!-- Description -->
      <div
        v-if="location?.description"
        class="description"
        v-html="location.description"
      ></div>
      <!-- Opening hours -->
      <div v-if="location?.opening_hours">
        <strong>{{ t("opening_hours") }}:</strong><br />
        <span v-html="openingHoursToString(location?.opening_hours)"></span>
      </div>
    </header>
    <hr />
    <section>
      <ProductGrid :location="location" />
    </section>
  </Container>
</template>

<script setup>
import ProductGrid from "~/components/modules/ProductGrid.vue";
import { openingHoursToString } from "~/lib/openingHours";

const { t } = useI18n({
  useScope: "local",
});

const { pb } = usePocketbase();
const route = useRoute();

const slug = route.params.location;

const { data: location } = await useAsyncData("location", async () => {
  const location = await pb
    .collection("location")
    .getFirstListItem(pb.filter("slug = {:slug}", { slug }));
  return structuredClone(location);
});

useHead({
  title: `${location.value?.name} | Leihbase`,
});
</script>

<style lang="scss" scoped>
section {
  margin-bottom: var(--fluid-spacing-8);
}
header {
  .address {
    margin-bottom: var(--fluid-spacing-8);
  }
  h1 {
    margin-bottom: var(--fluid-spacing-8);
    display: flex;
    align-items: center;
    line-height: 1.15;
  }
  .description {
    max-width: var(--max-text-width);
  }
}
h2 {
  margin-bottom: 1rem;
}
</style>

<i18n lang="json">
{
  "en": {
    "no_location_found": "No location found",
    "opening_hours": "Opening hours"
  },
  "de": {
    "no_location_found": "Kein Ort gefunden",
    "opening_hours": "Aktuelle Öffnungszeiten"
  }
}
</i18n>
