<template>
  <div>
    <header>
      <h2>{{ props.title }}</h2>
    </header>
    <div class="filters">
      <ul class="categories">
        <li v-for="category in categories">
          <NuxtLink
            :href="
              categoryId === category.id
                ? `/l/${location.slug}`
                : `/l/${location.slug}?c=${category.id}`
            "
            :class="{ active: categoryId === category.id }"
          >
            {{ category.name_de }}
          </NuxtLink>
        </li>
      </ul>
      <div>
        <InputField
          placeholder="Suchen..."
          @input="onInput"
          v-model="searchString"
          class="search-input"
        />
      </div>
    </div>
    <div class="products">
      <ProductCard
        v-for="product in products"
        :product="product"
        :to="`/l/${props.location.slug}/p/${product.id}`"
        :key="product.id"
        class="product"
      />
    </div>
  </div>
</template>

<script setup>
import ProductCard from "~/components/ProductCard.vue";

const props = defineProps({
  title: {
    type: String,
    default: "Gegenständen",
  },
  location: {
    type: Object,
  },
});

const { pb } = usePocketbase();
const route = useRoute();

const categoryId = ref(route.query.c);

const searchString = ref("");

function getFilter() {
  const filter = [];
  const args = {};
  if (props.location && props.location.id) {
    filter.push("location = {:location}");
    args.location = props.location.id;
  }
  if (categoryId.value) {
    filter.push("categories ~ {:category}");
    args.category = categoryId.value;
  }
  if (searchString.value && searchString.value.length > 2) {
    filter.push("(name ~ {:query} || description ~ {:query})");
    args.query = searchString.value;
  }
  return pb.filter(filter.join(" && "), args);
}

const { data: categories } = await useAsyncData("categories", async () => {
  const categories = await pb.collection("categories").getFullList();
  return structuredClone(categories);
});

const { data: page, refresh } = await useAsyncData("products", async () => {
  const page = await pb
    .collection("products")
    .getList(1, 12, { filter: getFilter() });
  return structuredClone(page);
});

const products = computed(() => page.value?.items);

watch(
  () => route.query.c,
  (newId) => {
    categoryId.value = newId;
    refresh();
  }
);

function onInput() {
  refresh();
}
</script>

<style lang="scss" scoped>
header {
  margin-bottom: var(--fluid-spacing-4);
  h2 {
    margin: 0;
  }
}
.filters {
  display: grid;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  @media screen and (min-width: 411px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .search-input {
    width: 100%;
  }
}
.categories {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  gap: 0.5rem;
  margin: 0;
  a {
    display: inline-block;
    background-color: var(--bg-secondary-light);
    border: 2px solid transparent;
    color: var(--text-body);
    text-decoration: none;
    padding: 0.5rem 1rem;
    &:hover {
      border: 2px solid var(--bg-primary);
    }
    &.active {
      background-color: var(--bg-primary);
      color: white;
    }
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
