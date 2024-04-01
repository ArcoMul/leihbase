<template>
  <Container max-width centered>
    <section class="header">
      <h1>{{ location?.name }}</h1>
    </section>
    <section class="product">
      <div class="media-col">
        <img
          v-if="product?.images && product?.images.length > 0"
          :src="`${config.public.pocketbase.clientBaseUrl}/api/files/products/${product.id}/${product.images[0]}`"
          class="image"
        />
        <div v-else class="image"></div>
      </div>
      <div class="info-col">
        <div class="info-header">
          <h2>{{ product?.name }}</h2>
          <AvailabilityBadge :available="available" />
        </div>
        <div class="description" v-html="product?.description"></div>

        <hr />

        <ReservationsBox
          title="Reservierungen"
          :reservations="reservations"
          class="upcoming-reservations"
        />

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

            <sl-alert variant="danger" :open="showReservationCreationError">
              <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
              Beim Erstellen deiner Reservierung ist ein Fehler aufgetreten,
              bitte versuche es erneut.
            </sl-alert>

            <Button type="submit">Jetzt reservieren</Button>
          </form>
        </sl-dialog>
      </div>
    </section>
  </Container>
</template>

<script setup>
import Button from "~/components/Button.vue";
import { isToday } from "~/lib/reservation";

if (process.client) {
  await import("@shoelace-style/shoelace/dist/components/dialog/dialog.js");
  await import("@shoelace-style/shoelace/dist/components/input/input.js");
  await import("@shoelace-style/shoelace/dist/components/textarea/textarea.js");
  await import("@shoelace-style/shoelace/dist/components/alert/alert.js");
}

const { pb } = usePocketbase();
const config = useRuntimeConfig();

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const dialog = ref(null);
const form = ref(null);

const showReservationCreationError = ref(false);

// Fields
const start = ref(null);
const end = ref(null);
const message = ref(null);

const { data: location } = await useAsyncData("location", async () => {
  const location = await pb.collection("location").getOne("1351z318f7ehd9n");

  return structuredClone(location);
});
const { data: product } = await useAsyncData("product", async () => {
  const product = await pb.collection("products").getOne(route.params.product);

  return structuredClone(product);
});
const { data: reservations, refresh: refreshReservations } = await useAsyncData(
  "reservations",
  async () => {
    const reservations = await pb
      .collection("public_reservations")
      .getFullList({
        filter: pb.filter("product = {:product} && end > @now", {
          product: product.value.id,
        }),
        sort: "start",
      });
    return structuredClone(reservations);
  }
);

const available = computed(() =>
  reservations.value && reservations.value.length > 0
    ? reservations.value?.filter((r) => isToday(r)).length === 0
    : true
);

useHead({
  title: `${product.value?.name} | Leihapp`,
});

function onReserve() {
  if (!pb.authStore.isValid) {
    router.push(
      `/login?return=/l/${location.value.slug}/p/${product.value.id}`
    );
    return;
  }
  dialog.value.show();
}

async function onSubmit() {
  try {
    const reservation = await pb.collection("reservations").create({
      user: pb.authStore.model.id,
      product: product.value.id,
      start: start.value,
      end: end.value,
      note: message.value,
    });
  } catch (e) {
    console.log(e.data);
    showReservationCreationError.value = true;
    return;
  }

  await userStore.fetchUserReservations();
  refreshReservations();

  dialog.value.hide();
}
</script>

<style lang="scss" scoped>
section {
  margin-bottom: var(--fluid-spacing-8);
}
.header {
  max-width: var(--max-text-width);
  h1 {
    line-height: 1.15;
  }
}
.product {
  display: flex;
  flex-wrap: wrap;
  gap: var(--fluid-spacing-8);
  & > * {
    width: 100%;
  }
  .media-col {
    max-width: 500px;
    img {
      border-radius: 5px;
      overflow: hidden;
    }
  }
  .info-col {
    flex-grow: 1;
    .info-header {
      display: flex;
      align-items: center;
      gap: 2rem;
      margin-bottom: var(--fluid-spacing-4);
    }
    h2,
    h3 {
      margin: 0;
    }
    .description {
      margin-bottom: 2rem;
    }
    .upcoming-reservations {
      margin-bottom: 2rem;
    }
  }
  @media screen and (min-width: 512px) {
    .media-col {
      width: calc(40% - (var(--fluid-spacing-8) / 2));
    }
    .info-col {
      width: calc(60% - (var(--fluid-spacing-8) / 2));
    }
  }
  @media screen and (min-width: 767px) {
    .media-col,
    .info-col {
      width: calc(50% - (var(--fluid-spacing-8) / 2));
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
</style>
