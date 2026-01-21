import mongoose from "mongoose"

const cartSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Index for efficient lookups
cartSchema.index({ clerkId: 1, "items.productId": 1 })

export default mongoose.model("Cart", cartSchema)
