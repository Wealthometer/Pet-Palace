import express from "express"
import * as productController from "../controllers/productController.js"

const router = express.Router()

// Public product endpoints
router.get("/", productController.getAllProducts)
router.get("/:id", productController.getProductById)
router.get("/category/:category", productController.getProductsByCategory)
router.get("/search", productController.searchProducts)
router.get("/featured/list", productController.getFeaturedProducts)

export default router
