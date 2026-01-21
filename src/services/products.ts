import { apiClient } from "@/config/api"
import type { Product } from "@/data/products"

interface ProductsResponse {
  data: Product[]
  pagination: {
    total: number
    page: number
    limit: number
    pages: number
  }
}

export const productService = {
  async getAll(page = 1, limit = 20): Promise<ProductsResponse> {
    return apiClient.get(`/products?page=${page}&limit=${limit}`)
  },

  async getById(id: string): Promise<Product> {
    return apiClient.get(`/products/${id}`)
  },

  async getByCategory(category: string, page = 1, limit = 20): Promise<ProductsResponse> {
    return apiClient.get(`/products/category/${category}?page=${page}&limit=${limit}`)
  },

  async search(query: string): Promise<Product[]> {
    return apiClient.get(`/products/search?q=${encodeURIComponent(query)}`)
  },

  async getFeatured(): Promise<Product[]> {
    return apiClient.get("/products/featured/list")
  },
}
