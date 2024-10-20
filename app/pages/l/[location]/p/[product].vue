<template>
  <Container width="lg" centered>
    <PageAlert />
    <section class="product">
      <div class="media-col">
        <ProductImage
          :src="
            product?.images && product?.images.length > 0
              ? `${config.public.pocketbase.clientBaseUrl}/api/files/products/${product.id}/${product.images[imageIndex]}${thumbs.lg}`
              : null
          "
          fallback="/images/fallback-product-image-1200x1200.png"
          class="main-image"
          object-fit="contain"
          loading="lazy"
        />
        <div
          v-if="product?.images && product.images.length > 1"
          class="thumbnails"
        >
          <button
            v-for="(image, index) in product.images.slice(0, 4)"
            type="button"
            :class="index === imageIndex ? 'active' : ''"
            @click="imageIndex = index"
          >
            <img
              :src="`${config.public.pocketbase.clientBaseUrl}/api/files/products/${product.id}/${image}${thumbs.sm}`"
            />
          </button>
        </div>
      </div>
      <div class="info-col">
        <header>
          <ul class="breadcrumb">
            <li>
              <NuxtLink :to="`/l/${location?.slug}`">
                {{ location?.name }}
              </NuxtLink>
            </li>
            <li>
              <span v-for="category in product?.expand?.categories">
                <NuxtLink :to="`/l/${location?.slug}?category=${category.id}`">
                  {{ category.name_de }}
                </NuxtLink>
              </span>
            </li>
          </ul>
          <h3></h3>
        </header>

        <div class="info-header">
          <h1 data-testid="product-page-h1">{{ product?.name }}</h1>
          <AvailabilityBadge :available="available" />
        </div>

        <div class="info-body">
          <!-- Description -->
          <div v-html="product?.description"></div>
          <!-- Deposit -->
          <p v-if="product?.deposit">
            <strong>{{ t("deposit") }}</strong>
            <br />
            {{ formatCurrency(product.deposit, locale) }}
          </p>
        </div>

        <hr />

        <ReservationsBox
          :title="t('reservations')"
          :reservations="reservations"
          class="upcoming-reservations"
        />

        <Button
          size="lg"
          data-testid="reserve-button"
          @click.prevent="onReserve"
        >
          {{ t("reserve_button") }}
        </Button>

        <sl-dialog ref="dialog" label="Reservieren" class="dialog-overview">
          <!-- Opening hours -->
          <p
            v-if="location?.opening_hours"
            class="opening-hours"
            data-testid="opening-hours"
          >
            <span>{{ t("opening_hours_of") }} {{ location?.name }}:</span><br />
            <span v-html="openingHoursToString(location?.opening_hours)"></span>
          </p>
          <form ref="form" @submit.prevent="onSubmit">
            <Input
              type="text"
              :label="t('product')"
              v-model="product.name"
              disabled
              readonly
            />
            <DateInput
              :label="t('start')"
              v-model="start"
              :is-date-disallowed="isDateDisallowed"
              :show-outside-days="false"
              data-testid="start-input"
            />
            <DateInput
              :label="t('end')"
              v-model="end"
              :is-date-disallowed="isDateDisallowed"
              :show-outside-days="false"
              data-testid="end-input"
            />
            <Textarea :label="t('message')" v-model="message" />

            <sl-alert variant="danger" :open="reservationCreationError">
              <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
              {{ reservationCreationError }}
            </sl-alert>

            <Button
              :loading="isSubmittingReservation"
              size="lg"
              type="submit"
              data-testid="reserve-submit"
            >
              {{ t("reserve_now_button") }}
            </Button>
          </form>
        </sl-dialog>
      </div>
    </section>
  </Container>
</template>

<script setup>
import Button from "~/components/Button.vue";
import { isToday } from "~/lib/reservation";
import { formatCurrency } from "~/lib/currency";
import { isInOpeningHoursDay, openingHoursToString } from "~/lib/openingHours";
import {
  getStartOfDay,
  startOfDate as getStartOfDate,
  isSameDate,
} from "~/lib/date";

if (process.client) {
  await import("@shoelace-style/shoelace/dist/components/dialog/dialog.js");
  await import("@shoelace-style/shoelace/dist/components/textarea/textarea.js");
  await import("@shoelace-style/shoelace/dist/components/alert/alert.js");
}

const { t } = useI18n({
  useScope: "local",
});
const { pb } = usePocketbase();
const config = useRuntimeConfig();
const {
  product: { thumbs },
} = useAppConfig();

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const { locale } = useI18n();

const dialog = ref(null);
const form = ref(null);
const imageIndex = ref(0);

const reservationCreationError = ref(null);

// Fields
const start = ref(null);
const end = ref(null);
const message = ref(null);

userStore.clearAuthenticationIntent();

const { data: location } = await useAsyncData("location", async () => {
  const location = await pb
    .collection("public_locations")
    .getFirstListItem(
      pb.filter("slug = {:slug}", { slug: route.params.location })
    );
  return structuredClone(location);
});
const { data: product } = await useAsyncData("product", async () => {
  const product = await pb
    .collection("public_products")
    .getOne(route.params.product, {
      expand: "categories",
    });
  return structuredClone(product);
});
const { data: reservations, refresh: refreshReservations } = await useAsyncData(
  "reservations",
  async () => {
    const reservations = await pb
      .collection("public_reservations")
      .getFullList({
        filter: pb.filter("product = {:product} && end >= @todayStart", {
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
  title: `${product.value?.name} | ${location.value?.name}`,
});

const startOfToday = getStartOfDay();
const closedDates = (location.value?.opening_hours?.except?.dates || []).map(
  (d) => getStartOfDate(new Date(d))
);
function isDateDisallowed(date) {
  const startOfDate = getStartOfDate(date);
  // Is on an open day according to opening hours
  const isOpenDay = location.value?.opening_hours
    ? isInOpeningHoursDay(location.value.opening_hours, date)
    : true;
  // Is in the past
  const isInPast = startOfDate < startOfToday;
  // Is on a closed date (opening hours exception)
  const isClosedDate = !!closedDates.find((date) =>
    isSameDate(date, startOfDate)
  );
  return !isOpenDay || isInPast || isClosedDate;
}

function onReserve() {
  if (!pb.authStore.isValid) {
    userStore.setAuthenticationIntent(
      "reservation",
      `/l/${location.value.slug}/p/${product.value.id}`
    );
    router.push("/signup");
    return;
  }
  dialog.value.show();
}

const isSubmittingReservation = ref(false);
async function onSubmit() {
  reservationCreationError.value = null;
  isSubmittingReservation.value = true;
  try {
    const reservation = await pb.collection("reservations").create({
      user: pb.authStore.model.id,
      product: product.value.id,
      start: start.value,
      end: end.value,
      message: message.value,
      send_confirmation: true,
    });
  } catch (e) {
    isSubmittingReservation.value = false;
    if (e.data.code === 400 && e.data.message === "Overlapping_reservation.") {
      reservationCreationError.value = t("errors.overlapping_reservation");
    } else if (
      e.data.code === 400 &&
      e.data.message === "Start_before_today."
    ) {
      reservationCreationError.value = t("errors.start_before_today");
    } else if (e.data.code === 400 && e.data.message === "End_before_today.") {
      reservationCreationError.value = t("errors.end_before_today");
    } else {
      reservationCreationError.value = t("errors.general");
    }
    return;
  }

  await userStore.fetchUserReservations();
  refreshReservations();

  dialog.value.hide();
  isSubmittingReservation.value = false;
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/_breakpoints.scss";

section {
  margin-bottom: var(--fluid-spacing-8);
}
.header {
  max-width: var(--max-text-width);
  h1 {
    line-height: 1.15;
  }
}
.breadcrumb {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  margin-bottom: var(--fluid-spacing-4);
  & > li:not(:last-child)::after {
    content: ">";
    margin-left: 0.5rem;
    color: var(--body-text-color-light);
  }
  li > span:not(:last-child)::after {
    content: ", ";
  }
  a {
    color: var(--body-text-color);
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
    .main-image {
      margin-bottom: var(--fluid-spacing-4);
    }
    .thumbnails {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      gap: var(--fluid-spacing-4);
      button {
        border-radius: 5px;
        overflow: hidden;
        background-color: rgba(0, 0, 0, 0.15);
        border: 0;
        cursor: pointer;
        padding: 0;
        aspect-ratio: 1/1;
        display: flex;
        img {
          object-fit: cover;
          object-position: center;
          width: 100%;
        }
        &.active {
          box-shadow: 0 0 0 2px white;
          opacity: 0.8;
        }
        &:focus,
        &:active,
        &:hover {
          box-shadow: 0 0 0 2px var(--bg-primary);
          outline: 0;
          border: 0;
        }
      }
    }
  }
  .info-col {
    flex-grow: 1;
    .info-header {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--fluid-spacing-4);
      margin-bottom: var(--fluid-spacing-4);
      h1 {
        margin: 0;
        margin-bottom: -5px;
      }
      @media screen and (min-width: $breakpoint-md) {
        flex-direction: row;
        align-items: center;
        h1 {
          margin: 0;
        }
      }
    }
    h2,
    h3 {
      margin: 0;
    }
    .info-body {
      margin-bottom: 2rem;
    }
    .upcoming-reservations {
      margin-bottom: 2rem;
    }
  }
  @media screen and (min-width: $breakpoint-sm) {
    .media-col {
      width: calc(40% - (var(--fluid-spacing-8) / 2) - 1px);
    }
    .info-col {
      width: calc(60% - (var(--fluid-spacing-8) / 2) - 1px);
    }
  }
  @media screen and (min-width: $breakpoint-md) {
    .media-col,
    .info-col {
      width: calc(50% - (var(--fluid-spacing-8) / 2) - 1px);
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
.opening-hours {
  padding: 1rem;
  background-color: #ecf4fe;
}
</style>

<i18n lang="json">
{
  "en": {
    "deposit": "Deposit",
    "reservations": "Reservations",
    "reserve_button": "Reserve",
    "opening_hours_of": "Opening hours of",
    "product": "Product",
    "start": "Start",
    "end": "End",
    "message": "Message",
    "reserve_now_button": "Reserve now",
    "errors": {
      "overlapping_reservation": "The product is already reserved for this period.",
      "start_before_today": "The start of the reservation is before today.",
      "end_before_today": "The end of the reservation is before today.",
      "general": "Something went wrong while creating the reservation, please try again."
    }
  },
  "de": {
    "deposit": "Pfand",
    "reservations": "Reservierungen",
    "reserve_button": "Reservieren",
    "opening_hours_of": "Öffnungszeiten von",
    "product": "Gegenstand",
    "start": "Start",
    "end": "Ende",
    "message": "Nachricht",
    "reserve_now_button": "Jetzt reservieren",
    "errors": {
      "overlapping_reservation": "Das Produkt ist für diesen Termin bereits reserviert.",
      "start_before_today": "Der Beginn der Reservierung liegt vor dem heutigen Tag.",
      "end_before_today": "Das Enddatum der Reservierung liegt vor dem heutigen Tag",
      "general": "Beim Erstellen deiner Reservierung ist ein Fehler aufgetreten, bitte versuche es erneut."
    }
  }
}
</i18n>
