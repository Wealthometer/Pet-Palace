import { apiClient } from "@/config/api"

export interface Order {
  _id: string
  items: Array<{
    productId: string
    name: string
    price: number
    quantity: number
  }>
  totalPrice: number
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  paymentStatus: "pending" | "completed" | "failed"
  shippingAddress: {
    fullName: string
    email: string
    phone: string
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  createdAt: string
}

export const orderService = {
  async createOrder(shippingAddress: Order["shippingAddress"], paymentMethod: string, token: string) {
    return apiClient.post(
      "/orders/create",
      {
        shippingAddress,
        paymentMethod,
      },
      token,
    )
  },

  async getUserOrders(token: string): Promise<Order[]> {
    return apiClient.get("/orders", token)
  },

  async getOrderById(orderId: string, token: string): Promise<Order> {
    return apiClient.get(`/orders/${orderId}`, token)
  },
}
