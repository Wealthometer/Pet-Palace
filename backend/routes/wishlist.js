import express from "express"
import * as wishlistController from "../controllers/wishlistController.js"

const router = express.Router()

router.get("/", wishlistController.getWishlist)
router.post("/add/:productId", wishlistController.addToWishlist)
router.delete("/:productId", wishlistController.removeFromWishlist)

export default router
