<template>
  <div>
    <header>
      <h2>{{ props.title || t("products") }}</h2>
    </header>
    <div class="filters">
      <ul class="categories">
        <li v-for="category in categories" :key="category.id">
          <NuxtLink
            :href="
              categoryId === category.id
                ? getUrl({ category: null, page: null, query: null })
                : getUrl({ category: category.id, page: null, query: null })
            "
            :class="{ active: categoryId === category.id }"
          >
            {{ category.name_de }}
          </NuxtLink>
        </li>
      </ul>
      <div>
        <InputField
          :placeholder="`${t('search')}...`"
          @input="onSearchInput"
          @blur="onSearchBlur"
          v-model="query"
          class="search-input"
        />
      </div>
    </div>
    <div v-if="products && products.length > 0" class="products">
      <div v-for="product in products" :key="product.id">
        <ProductCard
          :product="product"
          :to="`/l/${props.location.slug}/p/${product.id}`"
          class="product"
        />
      </div>
    </div>
    <div v-else>
      <p>{{ t("no_products_found") }} 🙃</p>
    </div>
    <section v-if="totalPages > 1" class="page-navigation">
      <NuxtLink
        v-if="currentPage > 1"
        :to="currentPage > 1 ? getUrl({ page: currentPage - 1 }) : null"
        class="page-button previous-page"
      >
        <ArrowLeft class="icon" />
        {{ t("previous_page") }}
      </NuxtLink>
      <NuxtLink
        :to="
          currentPage < totalPages ? getUrl({ page: currentPage + 1 }) : null
        "
        class="page-button next-page"
      >
        {{ t("next_page") }}
        <ArrowRight class="icon" />
      </NuxtLink>
    </section>
  </div>
</template>

<script setup>
import { ArrowRight } from "@iconoir/vue";
import { ArrowLeft } from "@iconoir/vue";
import ProductCard from "~/components/ProductCard.vue";

const { t } = useI18n({
  useScope: "local",
});

const props = defineProps({
  title: {
    type: String,
  },
  location: {
    type: Object,
  },
});

const { pb } = usePocketbase();
const router = useRouter();
const route = useRoute();

const categoryId = ref(route.query.category);
const page = ref(route.query.page);
const query = ref(route.query.query);

watch(
  () => route.query.category,
  (newId) => {
    categoryId.value = newId;
    refreshProducts();
  }
);

watch(
  () => route.query.page,
  (newPage) => {
    page.value = newPage;
    refreshProducts();
  }
);

watch(
  () => route.query.query,
  (newQuery) => {
    query.value = newQuery;
    refreshProducts();
  }
);

const { data: categories } = await useAsyncData("categories", async () => {
  const categories = await pb
    .collection("categories")
    .getFullList({ sort: "name_de" });
  return structuredClone(categories);
});

const { data: productsData, refresh: refreshProducts } = await useAsyncData(
  "products",
  async () => {
    const data = await pb
      .collection("public_products")
      .getList(page.value, 24, { filter: getFilter(), sort: "name" });
    return structuredClone(data);
  }
);

const products = computed(() => {
  return productsData.value?.items;
});
const currentPage = computed(() => productsData.value?.page);
const totalPages = computed(() => productsData.value?.totalPages);

function onSearchInput() {
  refreshProducts();
}

function onSearchBlur() {
  router.push(getUrl({ query: query.value || null }));
}

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
  if (query.value && query.value.length > 2) {
    filter.push("(name ~ {:query} || description ~ {:query})");
    args.query = query.value;
  }
  return pb.filter(filter.join(" && "), args);
}

function getUrl(overwrites) {
  const url = new URL(`https://example.com/l/${props.location.slug}`);
  if (categoryId.value) {
    url.searchParams.set("category", categoryId.value);
  }
  if (page.value && page.value > 1) {
    url.searchParams.set("page", page.value);
  }
  if (query.value) {
    url.searchParams.set("query", query.value);
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
@import "~/assets/styles/_breakpoints.scss";

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
  @media screen and (min-width: $breakpoint-sm) {
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
    color: var(--body-text-color);
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
    color: var(--body-text-color);
    text-decoration: none;
    width: 100%;
  }

  @media screen and (min-width: $breakpoint-sm) {
    --columns: 3;
  }
  @media screen and (min-width: $breakpoint-md) {
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
  .next-page {
    margin-left: auto;
  }
}
.icon {
  display: inline;
  width: 1em;
  height: 1em;
}
</style>

<i18n lang="json">
{
  "en": {
    "products": "Products",
    "search": "Search",
    "previous_page": "Previous page",
    "next_page": "Next page",
    "no_products_found": "No products found"
  },
  "de": {
    "products": "Gegenstände",
    "search": "Suchen",
    "previous_page": "Vorherige Seite",
    "next_page": "Nächste Seite",
    "no_products_found": "Keine Produkte gefunden"
  }
}
</i18n>
