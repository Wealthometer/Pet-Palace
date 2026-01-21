import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  originalPrice: {
    type: Number,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    enum: ["pets", "food", "toys", "accessories", "health", "beds"],
  },
  subcategory: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  stock: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  lowStockThreshold: {
    type: Number,
    default: 10,
  },
  status: {
    type: String,
    enum: ["active", "sold_out", "discontinued"],
    default: "active",
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviews: {
    type: Number,
    default: 0,
  },
  tags: [String],
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Automatically update stock status
productSchema.pre("save", function (next) {
  if (this.stock === 0) {
    this.status = "sold_out"
  } else if (this.status === "sold_out") {
    this.status = "active"
  }
  this.updatedAt = Date.now()
  next()
})

export default mongoose.model("Product", productSchema)
