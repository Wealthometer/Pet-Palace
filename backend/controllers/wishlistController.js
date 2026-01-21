import Wishlist from "../models/Wishlist.js"
import Product from "../models/Product.js"

export const getWishlist = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findOne({ clerkId: req.userId }).populate("products")

    if (!wishlist) {
      return res.json({ products: [] })
    }

    res.json({ products: wishlist.products })
  } catch (error) {
    next(error)
  }
}

export const addToWishlist = async (req, res, next) => {
  try {
    const { productId } = req.params

    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ error: "Product not found" })
    }

    let wishlist = await Wishlist.findOne({ clerkId: req.userId })
    if (!wishlist) {
      wishlist = new Wishlist({ clerkId: req.userId, products: [] })
    }

    if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId)
      await wishlist.save()
    }

    res.json({ message: "Added to wishlist", wishlist: await wishlist.populate("products") })
  } catch (error) {
    next(error)
  }
}

export const removeFromWishlist = async (req, res, next) => {
  try {
    const { productId } = req.params

    const wishlist = await Wishlist.findOne({ clerkId: req.userId })
    if (!wishlist) {
      return res.status(404).json({ error: "Wishlist not found" })
    }

    wishlist.products = wishlist.products.filter((id) => id.toString() !== productId)
    await wishlist.save()

    res.json({ message: "Removed from wishlist" })
  } catch (error) {
    next(error)
  }
}
