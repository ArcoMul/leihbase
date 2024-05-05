<template>
  <component
    :is="component"
    :href="href"
    :to="to"
    :class="{ root: true, clicked }"
    @click="clicked = true"
  >
    <img
      v-if="product.images && product.images.length > 0"
      :src="`${config.public.pocketbase.clientBaseUrl}/api/files/products/${product.id}/${product.images[0]}${thumbs.sm}`"
      class="image"
    />
    <div v-else class="image"></div>
    <div class="content">
      <sl-tooltip
        v-if="!!product.ongoingReservation"
        content="Gerade nicht verfügbar"
        distance="0"
      >
        <AvailabilityCircle
          class="availability-circle"
          :available="!product.ongoingReservation"
        />
      </sl-tooltip>
      <p class="name">
        {{ product.name }}
      </p>
    </div>
  </component>
</template>

<script setup>
if (process.client) {
  await import("@shoelace-style/shoelace/dist/components/tooltip/tooltip.js");
}

const props = defineProps({
  product: {
    type: Object,
  },
  to: {
    type: String,
  },
  href: {
    type: String,
  },
});

const {
  product: { thumbs },
} = useAppConfig();

const config = useRuntimeConfig();

// Has been clicked (for active state)
const clicked = ref(false);

// Pick component type based on to/href property
const component = computed(() => {
  if (props.to || props.href) return resolveComponent("NuxtLink");
  return "button";
});
</script>

<style lang="scss" scoped>
.root {
  background-color: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  width: 100%;
}
a.root:hover,
a.root:active,
a.root:focus {
  box-shadow: 0 0 0 2px var(--bg-primary);
  outline: 0;
  border: 0;
}
a.root.clicked {
  opacity: 0.8;
}
.image {
  aspect-ratio: 4/3;
  object-fit: cover;
  background-color: #eee;
  border-radius: 5px 5px 0 0;
}
.content {
  padding: clamp(1rem, 4vw, 2rem);
  display: flex;
  width: 100%;
  align-items: center;
  max-height: 1rem;
  line-height: 1;
}
.name {
  max-height: 1rem;
  margin-bottom: 0;
  line-height: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-weight: var(--font-weight-bold);
}
.availability-circle {
  margin-right: 0.5rem;
}
</style>
