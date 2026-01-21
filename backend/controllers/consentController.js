import Consent from "../models/Consent.js"

export const setConsent = async (req, res, next) => {
  try {
    const { fingerprint, analytics, marketing, essential } = req.body

    if (!fingerprint) {
      return res.status(400).json({ error: "Missing fingerprint" })
    }

    let consent = await Consent.findOne({ fingerprint })
    if (consent) {
      consent.analytics = analytics || false
      consent.marketing = marketing || false
      consent.essential = essential !== false // essential is always true by default
      consent.timestamp = new Date()
    } else {
      consent = new Consent({
        fingerprint,
        analytics: analytics || false,
        marketing: marketing || false,
        essential: true,
      })
    }

    await consent.save()
    res.json(consent)
  } catch (error) {
    next(error)
  }
}

export const getConsent = async (req, res, next) => {
  try {
    const { fingerprint } = req.params

    const consent = await Consent.findOne({ fingerprint })
    if (!consent) {
      return res.json({
        fingerprint,
        analytics: false,
        marketing: false,
        essential: true,
        timestamp: null,
      })
    }

    res.json(consent)
  } catch (error) {
    next(error)
  }
}
