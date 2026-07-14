<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

const products = ref<Product[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

const route = useRoute()
const router = useRouter()

const selectedCategory = computed(() => route.query.category as string | undefined)

const selectCategory = (cat: string) => {
  router.push({ query: { category: cat } })
}

const categories = ['electronics', 'jewelery', "men's clothing", "women's clothing"]

const clearCategory = () => {
  router.push({ query: {} })
}

const fetchProducts = async () => {
  isLoading.value = true
  error.value = null

  const url = selectedCategory.value
    ? `https://fakestoreapi.com/products/category/${encodeURIComponent(selectedCategory.value)}` //
    : 'https://fakestoreapi.com/products'

  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error('Request failed')
    products.value = await response.json()
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
    <div class="filters">
      <button @click="clearCategory" :class="{ active: !selectedCategory }" class="filter-button">All</button>

      <button
        v-for="category in categories"
        :key="category"
        @click="selectCategory(category)"
        :class="{ active: selectedCategory === category }"
        class="filter-button"
      >
        {{ category }}
      </button>
    </div>

    <p v-if="isLoading" class="state-message">Loading...</p>

    <p v-else-if="error" class="state-message">
      {{ error }}
    </p>

    <ul v-else class="grid">
      <li v-for="product in products" :key="product.id">
        <article class="product-card">
          <img class="product-image" :src="product.image" :alt="product.title" />
          <h3 class="product-title">{{ product.title }}</h3>
          <p class="product-price">{{ product.price }} €</p>
        </article>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  margin-bottom: var(--space-xl);
}

.filter-button {
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: var(--space-sm) var(--space-md);
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  color: var(--color-text);
  cursor: pointer;
  text-transform: capitalize;
  transition: all var(--transition);
}

.filter-button:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.filter-button.active {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: #fff;
}

.grid {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr)); /* 240px */
  gap: var(--space-lg);
  align-items: stretch;
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

.state-message {
  text-align: center;
  padding: var(--space-xl);
  color: var(--color-text-muted);
  font-size: var(--font-size-base);
}
</style>
