"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useUser, useAuth } from "@clerk/clerk-react"
import { apiClient } from "@/config/api"

interface AuthContextType {
  user: any
  isSignedIn: boolean
  isLoading: boolean
  token: string | null
  syncUserToBackend: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, isLoaded, isSignedIn } = useUser()
  const { getToken } = useAuth()
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      if (!isLoaded) return

      if (isSignedIn && user) {
        try {
          const sessionToken = await getToken()
          setToken(sessionToken)

          await apiClient.post(
            "/users/sync",
            {
              clerkId: user.id,
              email: user.primaryEmailAddress?.emailAddress,
              firstName: user.firstName,
              lastName: user.lastName,
              profileImage: user.imageUrl,
            },
            sessionToken!,
          )
        } catch (error) {
          console.error("Auth initialization error:", error)
        }
      }

      setIsLoading(false)
    }

    initAuth()
  }, [isLoaded, isSignedIn, user, getToken])

  return (
    <AuthContext.Provider
      value={{
        user,
        isSignedIn,
        isLoading,
        token,
        syncUserToBackend: async () => {
          if (user && getToken) {
            const sessionToken = await getToken()
            await apiClient.post(
              "/users/sync",
              {
                clerkId: user.id,
                email: user.primaryEmailAddress?.emailAddress,
                firstName: user.firstName,
                lastName: user.lastName,
                profileImage: user.imageUrl,
              },
              sessionToken,
            )
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider")
  }
  return context
}
