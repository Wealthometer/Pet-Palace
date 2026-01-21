import Cart from "../models/Cart.js"
import Product from "../models/Product.js"

export const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ clerkId: req.userId }).populate("items.productId")

    if (!cart) {
      return res.json({ items: [], total: 0 })
    }

    // Calculate total
    const total = cart.items.reduce((sum, item) => {
      return sum + item.productId.price * item.quantity
    }, 0)

    res.json({ items: cart.items, total })
  } catch (error) {
    next(error)
  }
}

export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body

    if (!productId || quantity < 1) {
      return res.status(400).json({ error: "Invalid product ID or quantity" })
    }

    // Verify product exists and check stock
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ error: "Product not found" })
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        error: "Insufficient stock",
        available: product.stock,
      })
    }

    // Find or create cart
    let cart = await Cart.findOne({ clerkId: req.userId })
    if (!cart) {
      cart = new Cart({ clerkId: req.userId, items: [] })
    }

    // Check if item already exists
    const existingItem = cart.items.find((item) => item.productId.toString() === productId)
    if (existingItem) {
      if (product.stock < existingItem.quantity + quantity) {
        return res.status(400).json({
          error: "Insufficient stock for requested quantity",
          available: product.stock - existingItem.quantity,
        })
      }
      existingItem.quantity += quantity
    } else {
      cart.items.push({ productId, quantity })
    }

    await cart.save()
    res.json({ message: "Added to cart", cart: await cart.populate("items.productId") })
  } catch (error) {
    next(error)
  }
}

export const updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body
    const { productId } = req.params

    if (quantity < 1) {
      return res.status(400).json({ error: "Invalid quantity" })
    }

    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ error: "Product not found" })
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        error: "Insufficient stock",
        available: product.stock,
      })
    }

    const cart = await Cart.findOne({ clerkId: req.userId })
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" })
    }

    const item = cart.items.find((i) => i.productId.toString() === productId)
    if (!item) {
      return res.status(404).json({ error: "Item not in cart" })
    }

    item.quantity = quantity
    await cart.save()

    res.json({ message: "Cart updated", cart: await cart.populate("items.productId") })
  } catch (error) {
    next(error)
  }
}

export const removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params

    const cart = await Cart.findOne({ clerkId: req.userId })
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" })
    }

    cart.items = cart.items.filter((item) => item.productId.toString() !== productId)
    await cart.save()

    res.json({ message: "Item removed from cart", cart })
  } catch (error) {
    next(error)
  }
}

export const clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ clerkId: req.userId })
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" })
    }

    cart.items = []
    await cart.save()

    res.json({ message: "Cart cleared" })
  } catch (error) {
    next(error)
  }
}
