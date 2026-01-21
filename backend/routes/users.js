import express from "express"
import * as userController from "../controllers/userController.js"

const router = express.Router()

router.get("/profile", userController.getProfile)
router.post("/sync", userController.syncUser)

export default router
