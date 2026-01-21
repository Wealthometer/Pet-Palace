import express from "express"
import * as consentController from "../controllers/consentController.js"

const router = express.Router()

router.post("/", consentController.setConsent)
router.get("/:fingerprint", consentController.getConsent)

export default router
