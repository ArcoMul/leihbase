<template>
  <div v-if="src" class="container">
    <img
      :src="src"
      loading="lazy"
      :class="{
        [objectFit]: true,
        ['aspect-' + aspectRatio?.replace(':', '-')]: !!aspectRatio,
        ['border-radius-' + borderRadius]: true,
      }"
    />
  </div>
  <div v-else class="container">
    <p class="message">
      {{ t("no_image_message") }}
    </p>
    <img :src="fallback" loading="lazy" />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n({
  useScope: "local",
});

withDefaults(
  defineProps<{
    src: string | null;
    fallback: string;
    loading: string;
    objectFit?: "cover" | "contain";
    aspectRatio?: "1:1" | null;
    borderRadius?: "all" | "top";
  }>(),
  { objectFit: "cover", borderRadius: "all" }
);
</script>

<style scoped>
.container {
  position: relative;
  container: image;
  container-type: inline-size;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  container: image;
  container-type: inline-size;
}
img {
  border-radius: 5px;
  overflow: hidden;
  max-width: 100%;
  object-fit: contain;
  &.cover {
    object-fit: cover;
  }
  &.contain {
    object-fit: contain;
  }
  &.aspect-1-1 {
    aspect-ratio: 1/1;
  }
  &.border-radius-top {
    border-radius: 5px 5px 0 0;
  }
}
.message {
  --margin: clamp(1rem, 5cqi, 1.5rem);
  position: absolute;
  left: var(--margin);
  top: var(--margin);
  font-size: clamp(0.7rem, 7cqi, 1.6rem);
  font-weight: bold;
  color: white;
  line-height: 1.15;
  max-width: min(70cqi, 17rem);
}
</style>

<i18n lang="json">
{
  "en": {
    "no_image_message": "This item has no photo yet."
  },
  "de": {
    "no_image_message": "Diesen Gegenstand haben wir noch nicht fotografiert."
  }
}
</i18n>
