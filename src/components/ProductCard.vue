<script setup lang="ts">
import type { Product } from '@/types'

defineProps<{
  product: Product
}>()
</script>

<template>
  <RouterLink :to="{ name: 'product', params: { id: product.id } }" class="product-link">
    <article class="product-card">
      <img class="product-image" :src="product.image" :alt="product.title" />
      <h3 class="product-title">{{ product.title }}</h3>
      <p class="product-price">{{ product.price }} €</p>
    </article>
  </RouterLink>
</template>

<style scoped>
.product-link {
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
}

.product-link:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
  border-radius: var(--radius);
}

.product-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: var(--space-md);
  box-shadow: var(--shadow);
  transition:
    box-shadow var(--transition),
    transform var(--transition);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: var(--space-sm);
}

.product-card:hover {
  box-shadow: var(--shadow-hover);
  transform: translateY(-2px);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: contain;
  background: #fff;
  border-radius: var(--radius);
  padding: var(--space-sm);
}

.product-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-normal);
  color: var(--color-text);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-price {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-accent);
  margin: 0;
  margin-top: auto;
}
</style>
