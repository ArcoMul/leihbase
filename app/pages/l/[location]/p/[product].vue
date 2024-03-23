<template>
  <section class="header">
    <h1>{{ location?.name }}</h1>
  </section>
  <section class="product">
    <div class="media">
      <img
        v-if="product?.images && product?.images.length > 0"
        :src="`http://localhost:8080/api/files/products/${product.id}/${product.images[0]}`"
        class="image"
      />
      <div v-else class="image"></div>
    </div>
    <div>
      <h2>{{ product?.name }}</h2>
      <div class="description" v-html="product?.description"></div>
      <Button @click="onReserve">Reservieren</Button>
      <sl-dialog ref="dialog" label="Reservieren" class="dialog-overview">
        <form ref="form" @submit.prevent="onSubmit">
          <sl-input
            type="text"
            label="Gegenstand"
            :value="product.name"
            disabled
            readonly
          />
          <sl-input
            type="date"
            label="Start"
            @input="(event) => (start = event.target.value)"
          />
          <sl-input
            type="date"
            label="End"
            @input="(event) => (end = event.target.value)"
          />
          <sl-textarea
            label="Nachricht"
            @input="(event) => (message = event.target.value)"
          />
          <Button type="submit">Jetzt reservieren</Button>
        </form>
      </sl-dialog>
    </div>
  </section>
</template>

<script setup>
import Button from "~/components/Button.vue";

if (process.client) {
  await import("@shoelace-style/shoelace/dist/components/dialog/dialog.js");
  await import("@shoelace-style/shoelace/dist/components/input/input.js");
  await import("@shoelace-style/shoelace/dist/components/textarea/textarea.js");
}

const nuxtApp = useNuxtApp();

const route = useRoute();
const router = useRouter();
const dialog = ref(null);
const form = ref(null);

const start = ref(null);
const end = ref(null);
const message = ref(null);

const { data: location } = await useAsyncData(async (nuxtApp) => {
  const location = await nuxtApp.$pb
    .collection("location")
    .getOne("1351z318f7ehd9n");

  return structuredClone(location);
});
const { data: product } = await useAsyncData(async (nuxtApp) => {
  const product = await nuxtApp.$pb
    .collection("products")
    .getOne(route.params.product);

  return structuredClone(product);
});

function onReserve() {
  if (!nuxtApp.$pb.authStore.isValid) {
    router.push(
      `/login?return=/l/${location.value.slug}/p/${product.value.id}`
    );
    return;
  }
  dialog.value.show();
}

function onSubmit() {
  console.log({
    start: start.value,
    end: end.value,
    message: message.value,
  });
}
</script>

<style lang="scss" scoped>
section {
  padding-inline: 2rem;
  margin-bottom: 2rem;
}
.header {
  max-width: var(--max-text-width);
  margin-top: 2rem;
}
.product {
  display: flex;
  gap: 2rem;
}
.description {
  margin-bottom: 1.5rem;
}
.media {
  width: 50%;
}
sl-dialog {
  --header-spacing: 2rem;
  --body-spacing: 0 2rem 2.5rem 2rem;
}
sl-dialog form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
