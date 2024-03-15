<template>
  <article>
    <img
      v-if="product.images && product.images.length > 0"
      :src="`http://localhost:8080/api/files/products/${product.id}/${product.images[0]}`"
      class="image"
    />
    <div v-else class="image"></div>
    <div class="content">
      <p class="name">
        <strong>{{ product.name }}</strong>
      </p>
      <div v-html="product.description" class="rich-text"></div>
    </div>
  </article>
</template>

<script setup>
const props = defineProps(["product"]);
</script>

<style lang="scss" scoped>
article {
  background-color: white;
  border-radius: 5px;
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
  margin-bottom: 1rem;
}
</style>
