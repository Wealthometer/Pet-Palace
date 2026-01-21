import express from "express"
import { requireAdmin } from "../middleware/auth.js"
import * as adminController from "../controllers/adminController.js"

const router = express.Router()

// Product management
router.post("/products", requireAdmin, adminController.createProduct)
router.put("/products/:id", requireAdmin, adminController.updateProduct)
router.delete("/products/:id", requireAdmin, adminController.deleteProduct)
router.put("/products/:id/stock", requireAdmin, adminController.updateStock)

// Order management
router.get("/orders", requireAdmin, adminController.getAllOrders)
router.put("/orders/:id/status", requireAdmin, adminController.updateOrderStatus)

// Contact messages
router.get("/messages", requireAdmin, adminController.getContactMessages)
router.put("/messages/:id/status", requireAdmin, adminController.updateMessageStatus)

export default router
