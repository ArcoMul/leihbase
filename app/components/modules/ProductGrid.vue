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
                ? getUrl({ c: null })
                : getUrl({ c: category.id })
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
    <div v-if="products && products.length > 0" class="products">
      <ProductCard
        v-for="product in products"
        :product="product"
        :to="`/l/${props.location.slug}/p/${product.id}`"
        :key="product.id"
        class="product"
      />
    </div>
    <div v-else><p>Keine Produkte gefunden 🙃</p></div>
    <section v-if="totalPages > 1" class="page-navigation">
      <NuxtLink
        :to="currentPage > 1 ? getUrl({ p: currentPage - 1 }) : null"
        class="page-button previous-page"
      >
        <ArrowLeft class="icon" />
        Vorherige Seite
      </NuxtLink>
      <NuxtLink
        :to="currentPage < totalPages ? getUrl({ p: currentPage + 1 }) : null"
        class="page-button next-page"
      >
        Nächste Seite
        <ArrowRight class="icon" />
      </NuxtLink>
    </section>
  </div>
</template>

<script setup>
import { ArrowRight } from "@iconoir/vue";
import { ArrowLeft } from "@iconoir/vue";
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
const page = ref(route.query.p);

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

const { data, refresh } = await useAsyncData("products", async () => {
  const data = await pb
    .collection("public_products")
    .getList(page.value, 24, { filter: getFilter() });
  return structuredClone(data);
});

const products = computed(() => data.value?.items);
const currentPage = computed(() => data.value?.page);
const totalPages = computed(() => data.value?.totalPages);

watch(
  () => route.query.c,
  (newId) => {
    categoryId.value = newId;
    refresh();
  }
);

watch(
  () => route.query.p,
  (newPage) => {
    page.value = newPage;
    refresh();
  }
);

function onInput() {
  refresh();
}

function getUrl(overwrites) {
  const url = new URL(`https://example.com/l/${props.location.slug}`);
  if (categoryId.value) {
    url.searchParams.set("c", categoryId.value);
  }
  if (page.value && page.value > 1) {
    url.searchParams.set("p", page.value);
  }
  Object.keys(overwrites).forEach((key) => {
    if (overwrites[key] !== null) {
      url.searchParams.set(key, overwrites[key]);
    } else {
      url.searchParams.delete(key);
    }
  });
  return url.pathname + url.search;
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
  margin-bottom: var(--fluid-spacing-8);
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
.page-navigation {
  display: flex;
  justify-content: space-between;
  .page-button {
    background-color: var(--bg-primary);
    color: var(--fg-primary);
    text-decoration: none;
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .page-button:not([href]) {
    opacity: 0.5;
    pointer-events: none;
  }
}
.icon {
  display: inline;
  width: 1em;
  height: 1em;
}
</style>
