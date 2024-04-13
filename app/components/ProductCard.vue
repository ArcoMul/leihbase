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
      :src="`${config.public.pocketbase.clientBaseUrl}/api/files/products/${product.id}/${product.images[0]}`"
      class="image"
    />
    <div v-else class="image"></div>
    <div class="content">
      <p class="name">
        <sl-tooltip content="Gerade nicht verfügbar" distance="0">
          <span class="availability-circle">
            <AvailabilityCircle
              v-if="!!product.ongoingReservation"
              :available="!product.ongoingReservation"
            />
          </span>
        </sl-tooltip>
        <strong>{{ product.name }}</strong>
      </p>
    </div>
  </component>
</template>

<script setup>
if (process.client) {
  await import("@shoelace-style/shoelace/dist/components/tooltip/tooltip.js");
}

const config = useRuntimeConfig();
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
const clicked = ref(false);
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
.content {
  padding: clamp(1rem, 4vw, 2rem);
}
.image {
  aspect-ratio: 4/3;
  object-fit: cover;
  background-color: #eee;
  border-radius: 5px 5px 0 0;
}
.name {
  margin-bottom: 0;
}
.availability-circle {
  display: inline-block;
  margin-left: -0.25rem;
  margin-right: 0.25rem;
  padding: 0 0.25rem;
}
</style>
