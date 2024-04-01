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

const { pb } = usePocketbase();

const searchString = ref("");

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
  return pb.filter(filter.join(" && "), args);
}

const { data: page, refresh } = await useAsyncData("products", async () => {
  const page = await pb
    .collection("products")
    .getList(1, 12, { filter: getFilter() });
  return structuredClone(page);
});

const products = computed(() => page.value?.items);

function onInput() {
  refresh();
}
</script>

<style lang="scss" scoped>
header {
  display: grid;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  @media screen and (min-width: 411px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  h2 {
    margin: 0;
  }

  .search-input {
    width: 100%;
  }
}
.products {
  --columns: 2;
  display: grid;
  grid-template-columns: repeat(var(--columns), minmax(0, 1fr));
  gap: 1rem;

  .product {
    display: flex;
    color: black;
    text-decoration: none;
    width: 100%;
  }

  @media screen and (min-width: 524px) {
    --columns: 3;
  }
  @media screen and (min-width: 767px) {
    --columns: 4;
  }
}
</style>
