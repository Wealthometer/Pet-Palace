import Product from "../models/Product.js"

export const getAllProducts = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, sort = "-createdAt" } = req.query
    const skip = (page - 1) * limit

    const products = await Product.find({ status: "active" }).sort(sort).skip(skip).limit(Number.parseInt(limit))

    const total = await Product.countDocuments({ status: "active" })

    res.json({
      data: products,
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

export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      const error = new Error("Product not found")
      error.statusCode = 404
      throw error
    }
    res.json(product)
  } catch (error) {
    next(error)
  }
}

export const getProductsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params
    const { page = 1, limit = 20 } = req.query
    const skip = (page - 1) * limit

    const products = await Product.find({ category, status: "active" }).skip(skip).limit(Number.parseInt(limit))

    const total = await Product.countDocuments({ category, status: "active" })

    res.json({
      data: products,
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

export const searchProducts = async (req, res, next) => {
  try {
    const { q } = req.query
    if (!q || q.trim().length < 2) {
      return res.status(400).json({ error: "Search query too short" })
    }

    const searchRegex = new RegExp(q.trim(), "i")
    const products = await Product.find({
      status: "active",
      $or: [{ name: searchRegex }, { description: searchRegex }, { tags: searchRegex }],
    }).limit(50)

    res.json(products)
  } catch (error) {
    next(error)
  }
}

export const getFeaturedProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ featured: true, status: "active" }).limit(10)
    res.json(products)
  } catch (error) {
    next(error)
  }
}
