# Happy Paws E-Commerce Platform - Complete Setup Guide

## Project Structure Overview

### Backend Architecture
\`\`\`
backend/
├── server.js                 # Express server & MongoDB connection
├── middleware/
│   └── auth.js              # Clerk token verification & admin role check
├── models/                  # Mongoose schemas
│   ├── Product.js
│   ├── User.js
│   ├── Cart.js
│   ├── Wishlist.js
│   ├── Order.js
│   ├── Contact.js
│   └── Consent.js
├── routes/                  # API endpoints
│   ├── products.js          # Public product APIs
│   ├── users.js             # User profile, sync
│   ├── cart.js              # Cart CRUD operations
│   ├── wishlist.js          # Wishlist management
│   ├── orders.js            # Order creation & history
│   ├── admin.js             # Admin product & order management
│   ├── contact.js           # Contact form submission
│   └── consent.js           # Cookie consent tracking
├── controllers/             # Business logic
├── services/                # Reusable service functions
├── utils/                   # Validation utilities
├── scripts/
│   └── seedProducts.js      # Database seeding
└── .env.example

### Frontend Structure
\`\`\`
src/
├── config/
│   └── api.ts              # API client configuration
├── context/
│   ├── AuthContext.tsx      # Clerk authentication
│   ├── CartContext.tsx      # Cart with backend persistence
│   └── WishlistContext.tsx  # Wishlist with backend persistence
├── services/
│   ├── products.ts          # Product API calls
│   ├── orders.ts            # Order management
│   └── contact.ts           # Contact form submission
├── components/
│   └── CookieConsent.tsx    # Cookie banner & management
├── pages/
│   ├── Contact.tsx          # Contact form page
│   ├── About.tsx            # About page
│   └── Checkout.tsx         # Order creation with backend
└── App.tsx                  # Clerk provider + routes

## Installation & Setup

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Clerk account
- npm or yarn

### Backend Setup

1. **Install Dependencies**
   \`\`\`bash
   cd backend
   npm install
   \`\`\`

2. **Configure Environment Variables**
   Create `.env` file:
   \`\`\`
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/happypaws
   
   CLERK_SECRET_KEY=sk_test_xxxxx
   CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
   
   ADMIN_USER_IDS=user_xxxxx,user_yyyyy
   \`\`\`

3. **Seed Database with Initial Products**
   \`\`\`bash
   npm run seed
   \`\`\`

4. **Start Backend Server**
   \`\`\`bash
   npm run dev
   \`\`\`
   Server runs on `http://localhost:5000`

### Frontend Setup

1. **Install Dependencies**
   \`\`\`bash
   npm install
   \`\`\`

2. **Configure Environment Variables**
   Create `.env` file:
   \`\`\`
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
   VITE_API_URL=http://localhost:5000/api
   \`\`\`

3. **Start Frontend Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`
   Frontend runs on `http://localhost:5173`

## Key Features & Implementation

### 1. Authentication (Clerk)
- Sign up / Sign in with Clerk
- Automatic user sync to backend
- Protected routes on backend
- Admin role verification

### 2. Product Management
- Real-time product data from MongoDB
- Stock tracking and validation
- Search and filtering
- Product categories

### 3. Cart & Wishlist
- **Unauthenticated Users**: localStorage persistence
- **Authenticated Users**: Backend persistence with real-time sync
- Stock validation on add-to-cart
- Quantity limits based on availability

### 4. Orders & Checkout
- Real order creation in MongoDB
- Atomic stock deduction (prevents overselling)
- Order status tracking
- Order history retrieval

### 5. Stock Management
- Automatic stock reduction after order
- Low-stock warnings (quantity ≤ 10)
- Sold-out product handling
- Admin stock update endpoint

### 6. Cookie Consent System
- Banner on first visit
- Save preferences to backend & localStorage
- Respect consent before analytics/marketing
- 1-year expiration

### 7. Contact Form
- Backend submission to MongoDB
- Admin message retrieval
- Status tracking (new/read/replied)

## API Endpoints Reference

### Public Endpoints
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product details
- `GET /api/products/category/:category` - Filter by category
- `GET /api/products/search?q=query` - Search products
- `GET /api/products/featured/list` - Get featured products
- `POST /api/contact` - Submit contact form
- `POST /api/consent` - Save cookie consent
- `GET /api/consent/:fingerprint` - Get saved consent

### Protected Endpoints (Requires Clerk Auth)
- `GET /api/users/profile` - Get user profile
- `POST /api/users/sync` - Sync user to backend
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add to cart
- `PUT /api/cart/update/:productId` - Update cart item
- `DELETE /api/cart/:productId` - Remove from cart
- `DELETE /api/cart` - Clear cart
- `GET /api/wishlist` - Get wishlist
- `POST /api/wishlist/add/:productId` - Add to wishlist
- `DELETE /api/wishlist/:productId` - Remove from wishlist
- `GET /api/orders` - Get user orders
- `POST /api/orders/create` - Create order
- `GET /api/orders/:orderId` - Get order details

### Admin Endpoints (Requires Admin Role)
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `PUT /api/admin/products/:id/stock` - Update stock
- `GET /api/admin/orders` - Get all orders
- `PUT /api/admin/orders/:id/status` - Update order status
- `GET /api/admin/messages` - Get contact messages
- `PUT /api/admin/messages/:id/status` - Update message status

## Database Schemas

### Product Schema
\`\`\`javascript
{
  name: String (required),
  description: String (required),
  price: Number (required),
  originalPrice: Number,
  category: String (required, enum),
  subcategory: String (required),
  images: [String] (required),
  stock: Number (default: 0),
  lowStockThreshold: Number (default: 10),
  status: String (enum: active/sold_out/discontinued),
  rating: Number (0-5),
  reviews: Number,
  tags: [String],
  featured: Boolean,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### Order Schema
\`\`\`javascript
{
  clerkId: String (required),
  items: [{
    productId: ObjectId (ref: Product),
    name: String,
    price: Number,
    quantity: Number
  }],
  totalPrice: Number (required),
  status: String (enum: pending/confirmed/shipped/delivered/cancelled),
  paymentStatus: String (enum: pending/completed/failed),
  shippingAddress: {
    fullName, email, phone, street, city, state, zipCode, country
  },
  paymentMethod: String,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

## Best Practices Implemented

1. **Security**
   - Clerk JWT token verification on protected routes
   - Input validation on all endpoints
   - Role-based access control for admin features
   - Secure password hashing (via Clerk)
   - HTTP-only cookie support

2. **Database**
   - Single MongoDB connection, reused for all operations
   - Mongoose schema validation
   - Proper indexing for queries
   - Atomic transactions for order creation

3. **Performance**
   - Pagination on list endpoints
   - Efficient stock queries
   - Indexed lookups by clerkId
   - Response caching considerations

4. **Scalability**
   - Clean separation of concerns (routes → controllers → services)
   - Reusable service functions
   - Proper error handling and logging
   - Environment configuration

5. **Data Persistence**
   - All data in MongoDB (no in-memory storage)
   - Cart/Wishlist synced between frontend & backend
   - Order history fully persistent
   - Contact messages stored for admin review

## Deployment

### Backend (Express on Vercel/Railway)
1. Add environment variables
2. Deploy `backend/` folder
3. Ensure MongoDB connection string works

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy `dist/` folder
3. Add environment variables
4. Configure API URL for production

## Troubleshooting

### MongoDB Connection Issues
- Verify MONGODB_URI format
- Check IP whitelist in MongoDB Atlas
- Ensure credentials are correct

### Clerk Authentication Errors
- Verify CLERK_SECRET_KEY and CLERK_PUBLISHABLE_KEY
- Check Clerk dashboard for user creation
- Ensure frontend Clerk config matches

### Cart Not Persisting
- Check if user is authenticated (token present)
- Verify backend cart endpoint is being called
- Check browser console for API errors

### Order Creation Fails
- Verify all required shipping fields are filled
- Check product stock availability
- Review MongoDB transaction logs

## Production Checklist

- [ ] HTTPS enabled on backend
- [ ] MongoDB backups configured
- [ ] Environment variables secured
- [ ] Admin user IDs configured
- [ ] CORS origins whitelisted
- [ ] Rate limiting enabled
- [ ] Logging and monitoring setup
- [ ] Error tracking (Sentry) configured
- [ ] Email notifications for orders
- [ ] Stripe integration (if payment processing needed)
