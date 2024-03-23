<template>
  <div>
    <header>
      <h2>{{ props.title }}</h2>
      <div>
        <InputField
          placeholder="Suchen..."
          @input="onInput"
          v-model="searchString"
          class="search-input"
        />
      </div>
    </header>
    <div class="products">
      <NuxtLink
        v-for="product in products"
        :to="`/l/${props.location.slug}/p/${product.id}`"
        :key="product.id"
        class="product"
      >
        <ProductCard :product="product" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import ProductCard from "~/components/ProductCard.vue";

const props = defineProps({
  title: {
    type: String,
    default: "Gegenstanden",
  },
  location: {
    type: Object,
  },
});

const nuxtApp = useNuxtApp();

const searchString = ref("");
const products = ref(null);

function getFilter() {
  const filter = [];
  const args = {};
  if (props.location && props.location.id) {
    filter.push("location = {:location}");
    args.location = props.location.id;
  }
  if (searchString.value && searchString.value.length > 2) {
    filter.push("(name ~ {:query} || description ~ {:query})");
    args.query = searchString.value;
  }
  return nuxtApp.$pb.filter(filter.join(" && "), args);
}

const { refresh } = await useAsyncData(async (nuxtApp) => {
  const page = await nuxtApp.$pb
    .collection("products")
    .getList(1, 12, { filter: getFilter() });
  products.value = page?.items;
});

function onInput() {
  refresh();
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > * {
    width: calc(25% - 0.75rem);
  }

  .search-input {
    margin-bottom: 1.5rem;
    width: 100%;
  }
}
.products {
  display: flex;
  gap: 1rem;
}
.product {
  width: calc(25% - 0.75rem);
  display: flex;
  color: black;
  text-decoration: none;
  flex-grow: 0;
}
</style>
