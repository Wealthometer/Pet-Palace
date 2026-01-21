"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"
import { apiClient } from "../config/api"

interface ConsentState {
  analytics: boolean
  marketing: boolean
  essential: boolean
}

export const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false)
  const [consent, setConsent] = useState<ConsentState>({
    analytics: false,
    marketing: false,
    essential: true,
  })

  const [fingerprint, setFingerprint] = useState<string>("")

  useEffect(() => {
    // Generate a simple fingerprint (in production, use a proper library like fingerprintjs)
    const fp = `${navigator.userAgent}-${new Date().getFullYear()}`
    const hash = btoa(fp).substring(0, 16)
    setFingerprint(hash)

    // Check if consent is already saved
    const savedConsent = localStorage.getItem(`consent-${hash}`)
    if (!savedConsent) {
      setShowBanner(true)
    } else {
      try {
        const parsed = JSON.parse(savedConsent)
        setConsent(parsed)
      } catch {
        setShowBanner(true)
      }
    }
  }, [])

  const handleAcceptAll = async () => {
    const newConsent = { analytics: true, marketing: true, essential: true }
    saveConsent(newConsent)
  }

  const handleRejectAll = async () => {
    const newConsent = { analytics: false, marketing: false, essential: true }
    saveConsent(newConsent)
  }

  const handleSavePreferences = async () => {
    saveConsent(consent)
  }

  const setCookie = (name: string, value: string, days: number = 365) => {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    const expires = `expires=${date.toUTCString()}`
    const domain = window.location.hostname === "localhost" ? "" : `domain=${window.location.hostname};`
    document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/; ${domain} SameSite=Lax`
  }

  const saveConsent = async (consentData: ConsentState) => {
    try {
      if (fingerprint) {
        // Save to backend
        try {
          await apiClient.post("/consent", {
            fingerprint,
            ...consentData,
          })
        } catch (error) {
          console.warn("Backend consent save failed, continuing with local storage:", error)
        }

        // Save to localStorage
        localStorage.setItem(`consent-${fingerprint}`, JSON.stringify(consentData))

        // Set cookies based on consent
        setCookie("essential_consent", "true", 365) // Always set essential
        if (consentData.analytics) {
          setCookie("analytics_consent", "true", 365)
        } else {
          setCookie("analytics_consent", "false", 365)
        }
        if (consentData.marketing) {
          setCookie("marketing_consent", "true", 365)
        } else {
          setCookie("marketing_consent", "false", 365)
        }

        setConsent(consentData)
        setShowBanner(false)
      }
    } catch (error) {
      console.error("Failed to save consent:", error)
    }
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-heading font-semibold text-lg mb-2">Cookie Preferences</h3>
              <p className="text-sm text-muted-foreground">
                We use cookies to enhance your experience, analyze site traffic, and enable personalized advertising.
              </p>
            </div>
            <button
              onClick={() => setShowBanner(false)}
              className="shrink-0 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cookie Types */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <Checkbox id="essential" checked={true} disabled />
              <div>
                <Label htmlFor="essential" className="text-sm font-medium cursor-not-allowed">
                  Essential
                </Label>
                <p className="text-xs text-muted-foreground">Always required</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                id="analytics"
                checked={consent.analytics}
                onCheckedChange={(checked) => setConsent({ ...consent, analytics: checked as boolean })}
              />
              <div>
                <Label htmlFor="analytics" className="text-sm font-medium cursor-pointer">
                  Analytics
                </Label>
                <p className="text-xs text-muted-foreground">Site usage analysis</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                id="marketing"
                checked={consent.marketing}
                onCheckedChange={(checked) => setConsent({ ...consent, marketing: checked as boolean })}
              />
              <div>
                <Label htmlFor="marketing" className="text-sm font-medium cursor-pointer">
                  Marketing
                </Label>
                <p className="text-xs text-muted-foreground">Personalized ads</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={handleRejectAll}>
              Reject All
            </Button>
            <Button variant="outline" onClick={handleSavePreferences}>
              Save Preferences
            </Button>
            <Button onClick={handleAcceptAll}>Accept All</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
