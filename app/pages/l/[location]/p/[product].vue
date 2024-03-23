<template>
  <Container max-width centered>
    <section class="header">
      <h1>{{ location?.name }}</h1>
    </section>
    <section class="product">
      <div class="media-col">
        <img
          v-if="product?.images && product?.images.length > 0"
          :src="`http://localhost:8080/api/files/products/${product.id}/${product.images[0]}`"
          class="image"
        />
        <div v-else class="image"></div>
      </div>
      <div class="info-col">
        <h2>{{ product?.name }}</h2>
        <div class="description" v-html="product?.description"></div>

        <hr />

        <div class="upcoming-reservations">
          <h3>Reservierungen</h3>
          <ul v-if="reservations && reservations.length > 0">
            <li v-for="reservation in reservations" :key="reservation.id">
              {{ formatDate(reservation.start, DateTime.DATE_MED) }}
              - {{ formatDate(reservation.end, DateTime.DATE_MED) }}
            </li>
          </ul>
          <p v-else><i>Keine kommenden Reservierungen</i></p>
        </div>

        <hr />

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
  </Container>
</template>

<script setup>
import { DateTime } from "luxon";
import { formatDate } from "~/lib/date";
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
const { data: reservations } = await useAsyncData(async (nuxtApp) => {
  const reservations = await nuxtApp.$pb
    .collection("public_reservations")
    .getFullList({
      filter: nuxtApp.$pb.filter("product = {:product} && end > @now", {
        product: product.value.id,
      }),
      sort: "start",
    });
  console.log(reservations);
  return structuredClone(reservations);
});

console.log(reservations.value);

// const reservations = product?.value?.expand?.public_reservations_via_product;

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
  margin-bottom: 2rem;
}
.header {
  max-width: var(--max-text-width);
  margin-top: 2rem;
}
.product {
  display: flex;
  gap: 2rem;
  & > * {
    width: 50%;
  }
  .media-col {
    max-width: 500px;
    img {
      border-radius: 5px;
      overflow: hidden;
    }
  }
  .info-col {
    h3 {
      margin-top: 0;
      margin-bottom: 1rem;
    }
    .description {
      margin-bottom: 2rem;
    }
    .upcoming-reservations {
      margin-bottom: 2rem;
    }
  }
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

hr {
  width: 4rem;
  height: 3px;
  border-radius: 3px;
  margin: 2rem 0;
  border: 0;
  background-color: var(--bg-primary);
}
</style>
