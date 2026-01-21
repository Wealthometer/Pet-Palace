import mongoose from "mongoose"
import dotenv from "dotenv"
import Product from "../models/Product.js"

dotenv.config()

const products = [
  {
    name: "Golden Retriever Puppy",
    price: 1200,
    category: "pets",
    subcategory: "dogs",
    description:
      "Adorable Golden Retriever puppy, 8 weeks old. Vaccinated and dewormed. Perfect family companion with a gentle, friendly temperament. Comes with health certificate and initial vet checkup.",
    images: [
      "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800",
      "https://images.unsplash.com/photo-1625316708582-7c38734d5db0?w=800",
    ],
    stock: 3,
    rating: 4.9,
    reviews: 42,
    tags: ["puppy", "dog", "golden retriever", "family pet"],
    featured: true,
  },
  {
    name: "Persian Kitten",
    price: 800,
    category: "pets",
    subcategory: "cats",
    description:
      "Beautiful white Persian kitten with blue eyes. 10 weeks old, litter trained, and very affectionate. Perfect for indoor living.",
    images: ["https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800"],
    stock: 2,
    rating: 4.8,
    reviews: 35,
    tags: ["kitten", "cat", "persian", "white cat"],
    featured: true,
  },
  {
    name: "Premium Dog Food - Chicken & Rice",
    price: 45,
    originalPrice: 55,
    category: "food",
    subcategory: "dog-food",
    description:
      "High-quality dog food made with real chicken and wholesome grains. Formulated for adult dogs of all breeds. 15kg bag.",
    images: ["https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800"],
    stock: 50,
    rating: 4.7,
    reviews: 128,
    tags: ["dog food", "premium", "chicken"],
    featured: false,
  },
  {
    name: "Interactive Cat Toy Set",
    price: 25,
    category: "toys",
    subcategory: "cat-toys",
    description:
      "Set of 10 interactive toys including feather wands, mice, and balls. Keeps your cat entertained for hours.",
    images: ["https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=800"],
    stock: 75,
    rating: 4.6,
    reviews: 89,
    tags: ["cat toy", "interactive", "set"],
    featured: true,
  },
  {
    name: "French Bulldog Puppy",
    price: 2500,
    category: "pets",
    subcategory: "dogs",
    description:
      "Rare blue French Bulldog puppy. AKC registered, 12 weeks old. Excellent bloodline with champion parents.",
    images: ["https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800"],
    stock: 1,
    rating: 5.0,
    reviews: 15,
    tags: ["puppy", "french bulldog", "rare", "blue"],
    featured: true,
  },
  {
    name: "Orthopedic Dog Bed - Large",
    price: 89,
    originalPrice: 120,
    category: "beds",
    subcategory: "dog-beds",
    description:
      "Memory foam orthopedic bed for large dogs. Waterproof liner, removable washable cover. Perfect for senior dogs or dogs with joint issues.",
    images: ["https://images.unsplash.com/photo-1567612529009-afe25813a308?w=800"],
    stock: 20,
    rating: 4.8,
    reviews: 67,
    tags: ["dog bed", "orthopedic", "large", "memory foam"],
    featured: false,
  },
  {
    name: "Adjustable Dog Harness",
    price: 35,
    category: "accessories",
    subcategory: "dog-accessories",
    description:
      "No-pull adjustable harness with reflective strips. Comfortable padded design. Available in multiple sizes and colors.",
    images: ["https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=800"],
    stock: 100,
    rating: 4.7,
    reviews: 156,
    tags: ["dog harness", "adjustable", "no-pull", "reflective"],
    featured: true,
  },
  {
    name: "Cat Scratching Tower",
    price: 65,
    category: "toys",
    subcategory: "cat-furniture",
    description:
      "Multi-level cat tree with scratching posts, hammock, and hideaway. Covered in soft plush and natural sisal rope.",
    images: ["https://images.unsplash.com/photo-1545529468-42764ef8c85f?w=800"],
    stock: 15,
    rating: 4.6,
    reviews: 78,
    tags: ["cat tree", "scratching post", "cat furniture"],
    featured: false,
  },
  {
    name: "Pet Vitamin Supplements",
    price: 28,
    category: "health",
    subcategory: "supplements",
    description:
      "Complete multivitamin for dogs and cats. Supports immune system, coat health, and joint function. 90 chewable tablets.",
    images: ["https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=800"],
    stock: 45,
    rating: 4.4,
    reviews: 92,
    tags: ["vitamins", "supplements", "health", "pet care"],
    featured: false,
  },
  {
    name: "Labrador Retriever Puppy",
    price: 950,
    category: "pets",
    subcategory: "dogs",
    description:
      "Chocolate Labrador puppy, 10 weeks old. Excellent temperament, great with kids. Comes with first vaccinations.",
    images: ["https://images.unsplash.com/photo-1591160690555-5debfba289f0?w=800"],
    stock: 2,
    rating: 4.9,
    reviews: 31,
    tags: ["puppy", "labrador", "chocolate", "family dog"],
    featured: true,
  },
]

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Connected to MongoDB")

    // Clear existing products
    await Product.deleteMany({})
    console.log("Cleared existing products")

    // Insert new products
    await Product.insertMany(products)
    console.log(`Successfully seeded ${products.length} products`)

    await mongoose.connection.close()
    console.log("Connection closed")
  } catch (error) {
    console.error("Seeding error:", error)
    process.exit(1)
  }
}

seedDatabase()
