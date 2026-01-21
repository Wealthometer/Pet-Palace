import mongoose from "mongoose"

const consentSchema = new mongoose.Schema({
  fingerprint: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  analytics: {
    type: Boolean,
    default: false,
  },
  marketing: {
    type: Boolean,
    default: false,
  },
  essential: {
    type: Boolean,
    default: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
  },
})

export default mongoose.model("Consent", consentSchema)
