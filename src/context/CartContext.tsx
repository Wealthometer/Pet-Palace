"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Product } from "@/data/products"
import { apiClient } from "@/config/api"
import { useAuthContext } from "./AuthContext"

export interface CartItem {
  product: Product
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { isSignedIn, token } = useAuthContext()

  useEffect(() => {
    if (isSignedIn && token) {
      loadCartFromBackend()
    } else {
      const savedCart = localStorage.getItem("petshop-cart")
      setItems(savedCart ? JSON.parse(savedCart) : [])
    }
  }, [isSignedIn, token])

  const loadCartFromBackend = async () => {
    try {
      setIsLoading(true)
      const response = await apiClient.get("/cart", token)
      setItems(
        response.items.map((item: any) => ({
          product: item.productId,
          quantity: item.quantity,
        })),
      )
    } catch (error) {
      console.error("Failed to load cart:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const addToCart = async (product: Product, quantity = 1) => {
    // Always use localStorage for now - works for both logged in and logged out users
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id)
      const newItems = existingItem
        ? prevItems.map((item) =>
            item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
          )
        : [...prevItems, { product, quantity }]

      localStorage.setItem("petshop-cart", JSON.stringify(newItems))
      return newItems
    })

    // If signed in, also sync to backend
    if (isSignedIn && token) {
      try {
        await apiClient.post(
          "/cart/add",
          {
            productId: product.id,
            quantity,
          },
          token,
        )
      } catch (error) {
        console.error("Failed to sync cart to backend:", error)
        // Continue anyway - user's cart is saved locally
      }
    }
  }

  const removeFromCart = async (productId: string) => {
    if (!isSignedIn || !token) {
      const newItems = items.filter((item) => item.product.id !== productId)
      setItems(newItems)
      localStorage.setItem("petshop-cart", JSON.stringify(newItems))
      return
    }

    try {
      await apiClient.delete(`/cart/${productId}`, token)
      await loadCartFromBackend()
    } catch (error) {
      console.error("Failed to remove from cart:", error)
    }
  }

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    if (!isSignedIn || !token) {
      const newItems = items.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
      setItems(newItems)
      localStorage.setItem("petshop-cart", JSON.stringify(newItems))
      return
    }

    try {
      await apiClient.put(`/cart/update/${productId}`, { quantity }, token)
      await loadCartFromBackend()
    } catch (error) {
      console.error("Failed to update cart:", error)
    }
  }

  const clearCart = async () => {
    if (!isSignedIn || !token) {
      setItems([])
      localStorage.removeItem("petshop-cart")
      return
    }

    try {
      await apiClient.delete("/cart", token)
      setItems([])
    } catch (error) {
      console.error("Failed to clear cart:", error)
    }
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal: () => items.reduce((total, item) => total + item.product.price * item.quantity, 0),
        getItemCount: () => items.reduce((count, item) => count + item.quantity, 0),
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
