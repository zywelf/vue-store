import type { Product } from "@/types"

const BASE_URL = 'https://fakestoreapi.com'

const request = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(`${BASE_URL}${endpoint}`)
  if (!response.ok) throw new Error (`Request failed: ${response.status}`)
  return response.json()
}

export const api = {
  getProducts: () => request<Product[]>('/products'),
  getProductsByCategory: (category: string) => request<Product[]>(`/products/category/${encodeURIComponent(category)}`),
  getProduct: (id: string) => request<Product>(`/products/${id}`),
  getCategories: () => request<string[]>('/products/categories'),
}