<script setup lang="ts">
import { useRoute } from 'vue-router'
import { api } from '@/services/api'
import { computed, ref, watch } from 'vue'
import type { Product } from '@/types'
import { useCartStore } from '@/stores/cart'
import { ShoppingCart } from 'lucide-vue-next'

const product = ref<Product | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)

const route = useRoute()
const cart = useCartStore()

const productId = computed(() => route.params.id as string)

const fetchProduct = async () => {
  isLoading.value = true
  error.value = null

  try {
    product.value = await api.getProduct(productId.value)
  } catch {
    error.value = 'Something went wrong'
  } finally {
    isLoading.value = false
  }
}

watch(productId, fetchProduct, { immediate: true })
</script>

<template>
  <div>
    <p v-if="isLoading" class="state-message">Loading...</p>
    <p v-else-if="error" class="state-message">{{ error }}</p>

    <div v-else-if="product">
      <RouterLink :to="{ name: 'home' }" class="back-link">← Back to products</RouterLink>
      <article class="product-detail">
        <img class="detail-image" :src="product.image" :alt="product.title" />
        <div class="detail-info">
          <h1 class="detail-title">{{ product.title }}</h1>
          <p class="detail-price">{{ product.price }} €</p>
          <p class="detail-description">{{ product.description }}</p>
          <button @click="cart.addItem(product)" class="add-to-cart">
            <ShoppingCart :size="20" />
            Add to cart
          </button>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.product-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-xl);
  align-items: start;
}

.detail-image {
  width: 100%;
  height: auto;
  max-height: 31.25rem; /* 500px */
  object-fit: contain;
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: var(--space-lg);
}

.detail-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.detail-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin: 0;
  line-height: 1.2;
}

.detail-price {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-accent);
  margin: 0;
}

.detail-description {
  font-size: var(--font-size-base);
  line-height: 1.6;
  color: var(--color-text-muted);
  margin: 0;
}

.state-message {
  text-align: center;
  padding: var(--space-xl);
  color: var(--color-text-muted);
  font-size: var(--font-size-base);
}

@media (max-width: 48rem) {
  .product-detail {
    grid-template-columns: 1fr;
    gap: var(--space-lg);
  }

  .detail-image {
    max-height: 25rem; /* 400px */
  }
}

.back-link {
  display: inline-block;
  margin-bottom: var(--space-lg);
  color: var(--color-text-muted);
  text-decoration: none;
  font-size: var(--font-size-sm);
  transition: color var(--transition);
}

.back-link:hover {
  color: var(--color-accent);
}

.back-link:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.add-to-cart {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  background: var(--color-accent);
  color: #fff;
  border: none;
  border-radius: var(--radius);
  padding: var(--space-md) var(--space-lg);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  font-family: var(--font-sans);
  cursor: pointer;
  transition: opacity var(--transition);
  align-self: flex-start;
}

.add-to-cart:hover {
  opacity: 0.85;
}

.add-to-cart:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
</style>
