import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductCard from './ProductCard.vue'

const fakeProduct = {
  id: 1,
  title: 'Test Product',
  price: 29.99,
  description: 'A description',
  category: 'electronics',
  image: 'test.jpg',
}

describe('ProductCard', () => {
  it('displays the product title and price', () => {
    const wrapper = mount(ProductCard, {
      props: { product: fakeProduct },
      global: {
        stubs: {
          RouterLink: {
            template: '<a> <slot /></a>'
          },
        },
      },
    })
    const title = wrapper.find('.product-title').text()
    const price = wrapper.find('.product-price').text()

    expect(title).toBe(fakeProduct.title)
    expect(price).toContain(String(fakeProduct.price))
  })
})
