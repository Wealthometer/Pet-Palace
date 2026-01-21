"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Product } from "@/data/products"
import { apiClient } from "@/config/api"
import { useAuthContext } from "./AuthContext"

interface WishlistContextType {
  items: Product[]
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Product[]>([])
  const { isSignedIn, token } = useAuthContext()

  useEffect(() => {
    if (isSignedIn && token) {
      loadWishlistFromBackend()
    } else {
      const savedWishlist = localStorage.getItem("petshop-wishlist")
      setItems(savedWishlist ? JSON.parse(savedWishlist) : [])
    }
  }, [isSignedIn, token])

  const loadWishlistFromBackend = async () => {
    try {
      const response = await apiClient.get("/wishlist", token)
      setItems(response.products || [])
    } catch (error) {
      console.error("Failed to load wishlist:", error)
    }
  }

  const addToWishlist = async (product: Product) => {
    // Always use localStorage - works for both logged in and logged out users
    setItems((prevItems) => {
      if (prevItems.find((item) => item.id === product.id)) {
        return prevItems
      }
      const newItems = [...prevItems, product]
      localStorage.setItem("petshop-wishlist", JSON.stringify(newItems))
      return newItems
    })

    // If signed in, also sync to backend
    if (isSignedIn && token) {
      try {
        await apiClient.post(`/wishlist/add/${product.id}`, {}, token)
      } catch (error) {
        console.error("Failed to sync wishlist to backend:", error)
        // Continue anyway - user's wishlist is saved locally
      }
    }
  }

  const removeFromWishlist = async (productId: string) => {
    if (!isSignedIn || !token) {
      const newItems = items.filter((item) => item.id !== productId)
      setItems(newItems)
      localStorage.setItem("petshop-wishlist", JSON.stringify(newItems))
      return
    }

    try {
      await apiClient.delete(`/wishlist/${productId}`, token)
      await loadWishlistFromBackend()
    } catch (error) {
      console.error("Failed to remove from wishlist:", error)
    }
  }

  const clearWishlist = () => {
    setItems([])
    if (!isSignedIn || !token) {
      localStorage.removeItem("petshop-wishlist")
    }
  }

  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist,
        removeFromWishlist,
        isInWishlist: (productId: string) => items.some((item) => item.id === productId),
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
