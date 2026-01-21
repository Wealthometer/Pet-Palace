import mongoose from "mongoose"
import Order from "../models/Order.js"
import Cart from "../models/Cart.js"
import Product from "../models/Product.js"

export const createOrder = async (req, res, next) => {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const { shippingAddress, paymentMethod } = req.body

    if (!shippingAddress || !paymentMethod) {
      return res.status(400).json({ error: "Missing shipping address or payment method" })
    }

    const cart = await Cart.findOne({ clerkId: req.userId }).session(session)
    if (!cart || cart.items.length === 0) {
      await session.abortTransaction()
      return res.status(400).json({ error: "Cart is empty" })
    }

    // Prepare order items and verify stock atomically
    const orderItems = []
    let totalPrice = 0

    for (const item of cart.items) {
      const product = await Product.findById(item.productId).session(session)

      if (!product || product.stock < item.quantity) {
        await session.abortTransaction()
        return res.status(400).json({
          error: `Insufficient stock for ${product?.name || "product"}`,
        })
      }

      // Deduct stock atomically
      product.stock -= item.quantity
      await product.save({ session })

      orderItems.push({
        productId: item.productId,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      })

      totalPrice += product.price * item.quantity
    }

    // Create order
    const order = new Order({
      clerkId: req.userId,
      items: orderItems,
      totalPrice,
      shippingAddress,
      paymentMethod,
      status: "pending",
      paymentStatus: "pending",
    })

    await order.save({ session })

    // Clear cart
    cart.items = []
    await cart.save({ session })

    await session.commitTransaction()

    res.status(201).json({
      message: "Order created successfully",
      order,
    })
  } catch (error) {
    await session.abortTransaction()
    next(error)
  } finally {
    await session.endSession()
  }
}

export const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ clerkId: req.userId }).populate("items.productId").sort("-createdAt")

    res.json(orders)
  } catch (error) {
    next(error)
  }
}

export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId).populate("items.productId")

    if (!order) {
      return res.status(404).json({ error: "Order not found" })
    }

    if (order.clerkId !== req.userId) {
      return res.status(403).json({ error: "Unauthorized" })
    }

    res.json(order)
  } catch (error) {
    next(error)
  }
}
