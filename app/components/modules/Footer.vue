<template>
  <footer>
    <NuxtLink to="/imprint">
      {{ t("imprint") }}
    </NuxtLink>
    <span>—</span>
    <NuxtLink to="/privacy-policy">
      {{ t("privacy_policy") }}
    </NuxtLink>
    <span>—</span>
    <NuxtLink target="_blank" href="https://github.com/ArcoMul/leihbase">
      Open-Source
    </NuxtLink>
    <span v-if="leihbase?.contact_link">—</span>
    <NuxtLink v-if="leihbase?.contact_link" :to="leihbase?.contact_link">
      {{ t("contact") }}
    </NuxtLink>
  </footer>
</template>

<script setup>
const { t } = useI18n({
  useScope: "local",
});
const { pb } = usePocketbase();

const [leihbase] = await pb
  .collection("leihbase")
  .getFullList({ fields: ["contact_link"] });
</script>

<style lang="scss" scoped>
footer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0rem 1rem;
  height: 4rem;
  background-color: var(--footer-bg-color);
  color: var(--footer-text-color);
  text-align: center;
  a {
    color: var(--footer-text-color);
    padding: 0 1rem;
    line-height: 1;
    text-underline-offset: 0.25rem;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>

<i18n lang="json">
{
  "en": {
    "imprint": "Imprint",
    "privacy_policy": "Privacy Policy",
    "contact": "Contact"
  },
  "de": {
    "imprint": "Impressum",
    "privacy_policy": "Datenschutz",
    "contact": "Kontakt"
  }
}
</i18n>
