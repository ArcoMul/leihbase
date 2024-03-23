<template>
  <article>
    <img
      v-if="product.images && product.images.length > 0"
      :src="`${config.public.apiBaseUrlClient}/api/files/products/${product.id}/${product.images[0]}`"
      class="image"
    />
    <div v-else class="image"></div>
    <div class="content">
      <p class="name">
        <strong>{{ product.name }}</strong>
      </p>
    </div>
  </article>
</template>

<script setup>
const config = useRuntimeConfig();
const props = defineProps(["product"]);
</script>

<style lang="scss" scoped>
article {
  background-color: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}
.content {
  padding: 2rem;
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
</style>
