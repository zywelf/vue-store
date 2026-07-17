import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Product } from '@/types'

export const useCartStore = defineStore('cart', () => {
  const items = ref<Product[]>([])

  const count = computed(() => items.value.length)

  const addItem = (product: Product) => {
    items.value.push(product)
  }

  return { items, count, addItem }
})
