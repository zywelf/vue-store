import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from './cart'

describe('cart store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('starts empty', () => {
    const cart = useCartStore()
    expect(cart.count).toBe(0)
  })

  it('increments count when adding an item', () => {
    const cart = useCartStore()
    const fakeProduct = {
      id: 1,
      title: 'Test',
      price: 10,
      description: '',
      category: '',
      image: '',
    }

    cart.addItem(fakeProduct)

    expect(cart.count).toBe(1)
  })
})
