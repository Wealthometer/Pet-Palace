import Product from "../models/Product.js"
import Order from "../models/Order.js"
import Contact from "../models/Contact.js"

// Product Management
export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, subcategory, images, stock, tags } = req.body

    if (!name || !description || !price || !category || !images) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    const product = new Product({
      name,
      description,
      price,
      category,
      subcategory,
      images,
      stock: stock || 0,
      tags: tags || [],
    })

    await product.save()
    res.status(201).json(product)
  } catch (error) {
    next(error)
  }
}

export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    if (!product) {
      return res.status(404).json({ error: "Product not found" })
    }

    res.json(product)
  } catch (error) {
    next(error)
  }
}

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)

    if (!product) {
      return res.status(404).json({ error: "Product not found" })
    }

    res.json({ message: "Product deleted successfully" })
  } catch (error) {
    next(error)
  }
}

export const updateStock = async (req, res, next) => {
  try {
    const { quantity, action } = req.body // action: 'set', 'add', 'subtract'

    if (action === "set") {
      await Product.findByIdAndUpdate(req.params.id, { stock: quantity })
    } else if (action === "add") {
      await Product.findByIdAndUpdate(req.params.id, { $inc: { stock: quantity } })
    } else if (action === "subtract") {
      await Product.findByIdAndUpdate(req.params.id, { $inc: { stock: -quantity } })
    }

    const product = await Product.findById(req.params.id)
    res.json(product)
  } catch (error) {
    next(error)
  }
}

// Order Management
export const getAllOrders = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query
    const skip = (page - 1) * limit

    const query = {}
    if (status) query.status = status

    const orders = await Order.find(query)
      .populate("items.productId")
      .sort("-createdAt")
      .skip(skip)
      .limit(Number.parseInt(limit))

    const total = await Order.countDocuments(query)

    res.json({
      data: orders,
      pagination: {
        total,
        page: Number.parseInt(page),
        limit: Number.parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    next(error)
  }
}

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status, paymentStatus } = req.body

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status, paymentStatus, updatedAt: new Date() },
      { new: true },
    )

    if (!order) {
      return res.status(404).json({ error: "Order not found" })
    }

    res.json(order)
  } catch (error) {
    next(error)
  }
}

// Contact Messages
export const getContactMessages = async (req, res, next) => {
  try {
    const { status = "new", page = 1, limit = 20 } = req.query
    const skip = (page - 1) * limit

    const messages = await Contact.find(status ? { status } : {})
      .sort("-createdAt")
      .skip(skip)
      .limit(Number.parseInt(limit))

    const total = await Contact.countDocuments(status ? { status } : {})

    res.json({
      data: messages,
      pagination: { total, page: Number.parseInt(page), limit: Number.parseInt(limit) },
    })
  } catch (error) {
    next(error)
  }
}

export const updateMessageStatus = async (req, res, next) => {
  try {
    const { status } = req.body
    const message = await Contact.findByIdAndUpdate(req.params.id, { status }, { new: true })

    if (!message) {
      return res.status(404).json({ error: "Message not found" })
    }

    res.json(message)
  } catch (error) {
    next(error)
  }
}
