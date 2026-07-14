<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AppHeader from './components/AppHeader.vue'
import { api } from './services/api'

const categories = ref<string[]>([])

onMounted(async () => {
  try {
    categories.value = await api.getCategories()
  } catch {
    categories.value = []
  }
})
</script>

<template>
  <AppHeader :categories="categories" />

  <main class="main">
    <RouterView />
  </main>
</template>

<style scoped>
.main {
  max-width: 87.5rem; /* 1400px */
  margin: 0 auto;
  padding: var(--space-xl) var(--space-lg);
}
</style>
