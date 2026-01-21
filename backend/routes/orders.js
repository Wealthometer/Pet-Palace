import express from "express"
import * as orderController from "../controllers/orderController.js"

const router = express.Router()

router.get("/", orderController.getUserOrders)
router.post("/create", orderController.createOrder)
router.get("/:orderId", orderController.getOrderById)

export default router
