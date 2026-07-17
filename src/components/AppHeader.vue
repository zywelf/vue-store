<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useTheme } from '@/composables/useTheme'
import { useCartStore } from '@/stores/cart'
import { ShoppingCart } from 'lucide-vue-next'

const { theme, toggleTheme } = useTheme()
const cart = useCartStore()

defineProps<{
  categories: string[]
}>()

const route = useRoute()
const selectedCategory = computed(() => route.query.category as string | undefined)
</script>

<template>
  <header class="header">
    <h1 class="logo">Store Vue</h1>
    <nav class="nav" aria-label="Product categories">
      <RouterLink :to="{ name: 'home', query: {} }" :class="{ active: !selectedCategory }" class="filter-link"
        >All</RouterLink
      >

      <RouterLink
        v-for="category in categories"
        :key="category"
        :to="{ name: 'home', query: { category } }"
        :class="{ active: selectedCategory === category }"
        class="filter-link"
      >
        {{ category }}
      </RouterLink>
    </nav>
    <div class="actions">
      <button
        @click="toggleTheme"
        class="theme-toggle"
        :aria-label="`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`"
      >
        {{ theme === 'light' ? '🌙' : '☀️' }}
      </button>
      <div class="cart">
        <ShoppingCart :size="20" />
        <span v-if="cart.count > 0" class="cart-badge">{{ cart.count }}</span>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  gap: var(--space-xl);
  padding: var(--space-md) var(--space-lg);
  border-bottom: 1px solid var(--color-border);
  background: var(--color-bg);
  position: sticky;
  top: 0;
  z-index: 10;
}

.logo {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin: 0;
  white-space: nowrap;
}

.nav {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.filter-link {
  display: inline-block;
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  font-size: var(--font-size-sm);
  color: var(--color-text);
  text-decoration: none;
  text-transform: capitalize;
  white-space: nowrap;
  transition: all var(--transition);
}

.filter-link:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.filter-link:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.filter-link.active {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: #fff;
}

@media (max-width: 48rem) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-md);
  }
}

.theme-toggle {
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: var(--space-sm);
  cursor: pointer;
  font-size: var(--font-size-base);
  transition: border-color var(--transition);
}
.theme-toggle:hover {
  border-color: var(--color-accent);
}
.theme-toggle:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.actions {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.cart {
  position: relative;
  display: inline-flex;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: var(--color-accent);
  color: #fff;
  font-size: 0.7rem;
  min-width: 1.1rem;
  height: 1.1rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}
</style>
