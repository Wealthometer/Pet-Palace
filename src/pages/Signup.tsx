"use client"

import { useEffect } from "react"
import { useUser } from "@clerk/clerk-react"
import { SignUp } from "@clerk/clerk-react"
import { useNavigate } from "react-router-dom"
import { Layout } from "../components/layout/Layout"

const Signup = () => {
  const { isSignedIn, isLoaded } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      navigate("/")
    }
  }, [isSignedIn, isLoaded, navigate])

  if (!isLoaded) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Create Account</h1>
            <p className="text-muted-foreground">Sign up to start shopping for your pets</p>
          </div>

          <div className="flex justify-center">
            <SignUp
              signInUrl="/login"
              redirectUrl="/"
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "bg-card border border-border rounded-lg shadow-sm",
                  formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground",
                  dividerLine: "bg-border",
                  dividerText: "text-muted-foreground",
                  formFieldInput: "bg-input border-border text-foreground",
                  formFieldLabel: "text-foreground font-medium",
                  footerActionText: "text-muted-foreground",
                  footerActionLink: "text-primary hover:text-primary/90 font-medium",
                },
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Signup
