<template>
  <section v-if="leihbase?.imprint" v-html="leihbase?.imprint"></section>
  <section v-else>{{ t("no_imprint_defined") }}</section>
</template>

<script setup>
const { t } = useI18n({
  useScope: "local",
});
const { pb } = usePocketbase();

// TODO: remove/fix $autoCancel
const [leihbase] = await pb
  .collection("leihbase")
  .getFullList({ fields: ["imprint"], $autoCancel: false });
</script>

<style scoped>
section {
  padding: 2rem;
}
</style>

<i18n lang="json">
{
  "en": {
    "no_imprint_defined": "No imprint defined."
  },
  "de": {
    "no_imprint_defined": "Kein impressum definiert."
  }
}
</i18n>
