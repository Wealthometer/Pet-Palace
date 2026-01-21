import express from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import { verifyToken } from "./middleware/auth.js"
import productRoutes from "./routes/products.js"
import cartRoutes from "./routes/cart.js"
import wishlistRoutes from "./routes/wishlist.js"
import orderRoutes from "./routes/orders.js"
import userRoutes from "./routes/users.js"
import adminRoutes from "./routes/admin.js"
import contactRoutes from "./routes/contact.js"
import consentRoutes from "./routes/consent.js"
// import cors from "cors";

const app = express()
const PORT = process.env.PORT || 5000

// Middleware 
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }), 
)
app.use(express.json())
app.use(express.urlencoded({ limit: "10mb", extended: true }))
app.use(cookieParser())

// MongoDB Connection - Single connection, reused for all operations
let mongoConnection 
  
const connectDB = async () => { 
  if (mongoConnection) {  
    return mongoConnection
  }
  try {
    mongoConnection = await mongoose.connect(process.env.MONGODB_URI) 
    console.log("MongoDB connected successfully")
    return mongoConnection
  } catch (error) {
    console.error("MongoDB connection error:", error)
    process.exit(1)
  }
}

// Initialize connection on startup
connectDB()
// Health check endpoint
app.get("/api/health", (req, res) => { 
  res.json({ status: "Backend is running", timestamp: new Date().toISOString() })
})

// Public Routes
app.use("/api/products", productRoutes)
app.use("/api/consent", consentRoutes)
app.use("/api/contact", contactRoutes)

// Protected Routes (require Clerk authentication)
app.use("/api/users", verifyToken, userRoutes)
app.use("/api/cart", verifyToken, cartRoutes)
app.use("/api/wishlist", verifyToken, wishlistRoutes)
app.use("/api/orders", verifyToken, orderRoutes)

// Admin Routes (require Clerk authentication + admin role)
app.use("/api/admin", verifyToken, adminRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"
  res.status(statusCode).json({
    error: message,
    timestamp: new Date().toISOString(),
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
  console.log(`MongoDB URI: ${process.env.MONGODB_URI ? "Connected" : "Not configured"}`)
  console.log(`Clerk Secret Key: ${process.env.CLERK_SECRET_KEY ? "Loaded" : "Not configured"}`)
})
