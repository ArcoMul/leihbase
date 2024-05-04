<template>
  <section
    v-if="leihbase?.privacy_policy"
    v-html="leihbase?.privacy_policy"
  ></section>
  <section v-else>{{ t("no_privacy_policy_defined") }}</section>
</template>

<script setup>
const { t } = useI18n({
  useScope: "local",
});
const { pb } = usePocketbase();

// TODO: remove/fix $autoCancel
const [leihbase] = await pb
  .collection("leihbase")
  .getFullList({ fields: ["privacy_policy"], $autoCancel: false });
</script>

<style scoped>
section {
  padding: 2rem;
}
</style>

<i18n lang="json">
{
  "en": {
    "no_privacy_policy_defined": "No privacy policy defined."
  },
  "de": {
    "no_privacy_policy_defined": "Kein Datenschutzrichtlinie definiert."
  }
}
</i18n>
