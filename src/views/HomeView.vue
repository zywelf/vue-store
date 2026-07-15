<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { Product } from '@/types'
import { api } from '@/services/api'
import ProductCard from '@/components/ProductCard.vue'
import ProductCardSkeleton from '@/components/ProductCardSkeleton.vue'

const products = ref<Product[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

const route = useRoute()

const selectedCategory = computed(() => route.query.category as string | undefined)

const fetchProducts = async () => {
  isLoading.value = true
  error.value = null

  try {
    products.value = selectedCategory.value
      ? await api.getProductsByCategory(selectedCategory.value)
      : await api.getProducts()
  } catch {
    error.value = 'Something went wrong'
  } finally {
    isLoading.value = false
  }
}

watch(selectedCategory, fetchProducts, { immediate: true })
</script>

<template>
  <div>
    <p v-if="isLoading" class="state-message">
      <ul v-if="isLoading" class="grid">
        <li v-for="n in 8" :key="n">
          <ProductCardSkeleton />
        </li>
      </ul>
    </p>

    <p v-else-if="error" class="state-message">
      {{ error }}
    </p>

    <ul v-else class="grid">
      <li v-for="product in products" :key="product.id">
        <ProductCard :product="product" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.grid {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr)); /* 240px */
  gap: var(--space-lg);
  align-items: stretch;
}

.state-message {
  text-align: center;
  padding: var(--space-xl);
  color: var(--color-text-muted);
  font-size: var(--font-size-base);
}
</style>
