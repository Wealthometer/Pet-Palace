import express from "express"
import * as cartController from "../controllers/cartController.js"

const router = express.Router()

router.get("/", cartController.getCart)
router.post("/add", cartController.addToCart)
router.put("/update/:productId", cartController.updateCartItem)
router.delete("/:productId", cartController.removeFromCart)
router.delete("/", cartController.clearCart)

export default router
