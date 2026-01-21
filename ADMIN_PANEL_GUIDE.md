# Admin Panel Access & Management Guide

## Quick Access

### Admin Panel URL
The admin panel is accessible at: **`/admin`**

Direct URL: `http://localhost:5173/admin` (development) or `https://yourdomain.com/admin` (production)

---

## Access Control & Authentication

### Who Can Access the Admin Panel?

The admin panel is **strictly protected** and can only be accessed by users with admin privileges. Access is controlled through Clerk user metadata.

### Setting Admin Privileges

To make a user an admin, you need to set their Clerk user metadata:

#### Option 1: Using Clerk Dashboard (Recommended)
1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Navigate to **Users** section
3. Click on the user you want to make admin
4. Scroll to **User Metadata** section
5. Add or update the following JSON:
   ```json
   {
     "isAdmin": true
   }
   ```
6. Save the changes

#### Option 2: Programmatically (Using Clerk Backend API)
If you need to set admin status programmatically, you can use the Clerk Backend SDK:

```javascript
// backend/routes/users.js or your admin setup script
const { Clerk } = require("@clerk/backend");

const clerk = new Clerk({
  apiKey: process.env.CLERK_SECRET_KEY,
});

// Set user as admin
await clerk.users.updateUser(userId, {
  unsafeMetadata: {
    isAdmin: true,
  },
});

console.log("User is now an admin");
```

### Removing Admin Privileges

To remove admin status:
1. Go to Clerk Dashboard → Users
2. Find the user
3. In User Metadata, set `"isAdmin": false` or remove the property
4. Save changes

---

## Admin Panel Features

### 1. Product Management

#### Add New Product
1. Click the **"Add Product"** button (top right)
2. Fill in the product details:
   - **Product Name**: Name of the product
   - **Description**: Detailed description
   - **Price**: Product price in USD
   - **Stock**: Number of units available
   - **Category**: Select from predefined categories (Pets, Food, Toys, Accessories, Health, Beds)
   - **Image URLs**: Add product images (one URL per line)
   - **Featured**: Check if this is a featured product
3. Click **"Create Product"** to save

#### Edit Product
1. Find the product in the Products table
2. Click **"Edit"** button
3. Modify any field
4. Click **"Update Product"** to save changes

#### Delete Product
1. Find the product in the Products table
2. Click **"Delete"** button
3. Confirm the deletion

#### Stock Management
- The stock level is displayed in the Products table with color-coded badges:
  - **Green**: More than 5 units in stock
  - **Yellow/Orange**: 3-5 units in stock
  - **Red**: 0-2 units in stock
- Update stock directly by editing the product and changing the Stock value

### 2. Product Availability Status

Products automatically display stock status on the frontend:

- **5+ units**: Shows "✓ In Stock (X available)"
- **3-5 units**: Shows "X more available - Limited stock"
- **3 units**: Shows "3 more available - Order soon!"
- **1-2 units**: Shows "Only X left in stock!" (red badge)
- **0 units**: Shows "Out of Stock - Currently Unavailable"

These statuses appear on:
- Product cards in the shop page
- Product detail pages
- Checkout validation

---

## Authentication Flow

### Login Requirements

**Before accessing the admin panel, you must:**
1. Have a Clerk account (sign up at [Clerk.com](https://clerk.com))
2. Be authenticated (logged in) on the platform
3. Have admin privileges set in your user metadata

### Step-by-Step Access

1. **Sign In**: 
   - Navigate to `/login`
   - Enter your credentials
   - Click "Sign In"

2. **Access Admin Panel**:
   - Once logged in, if you're an admin, an "Admin" button appears in the header
   - Click the "Admin" button or navigate to `/admin`
   - The admin dashboard loads with full product management access

3. **Sign Out**:
   - Click "Sign Out" button in the header
   - You'll be logged out and redirected to home page

### Access Denied

If you try to access `/admin` without admin privileges:
- You'll see an error message: "Access denied. Admin privileges required."
- You'll be redirected to the home page
- Contact your super admin to request admin privileges

---

## URL Parameters for Admin Access

### Direct Admin URL

The admin panel is accessible via a simple URL pattern:

```
/admin
```

No additional URL parameters are required or supported. The access control is entirely based on:
1. **Authentication Status** (Clerk JWT token)
2. **User Metadata** (isAdmin flag)

### Example URLs

- Local Development: `http://localhost:5173/admin`
- Production: `https://petpalace.com/admin`
- Staging: `https://staging.petpalace.com/admin`

### Invalid URL Patterns

These URL patterns will NOT work:
- ❌ `/admin?role=admin` - No query parameters needed
- ❌ `/admin?accessToken=xxx` - Access is controlled via Clerk session
- ❌ `/admin/dashboard` - Direct `/admin` is the only access point

### Secure Access Protocol

The actual security mechanism:

```
User visits /admin
    ↓
React App checks Clerk authentication
    ↓
If not authenticated → Redirect to /login
    ↓
If authenticated but not admin → Show error & redirect to /
    ↓
If authenticated AND admin → Load admin dashboard
    ↓
Admin attempts action (create/edit/delete product)
    ↓
Frontend sends JWT token to backend
    ↓
Backend verifies Clerk token AND admin status
    ↓
If valid → Execute action
    ↓
If invalid → Return 401/403 error
```

---

## Database Integration

### Product Schema

When you create/edit products, the following data is stored:

```json
{
  "_id": "ObjectId",
  "name": "String",
  "description": "String",
  "price": "Number",
  "originalPrice": "Number (optional)",
  "category": "String (enum)",
  "subcategory": "String",
  "images": ["String"],
  "stock": "Number",
  "lowStockThreshold": "Number (default: 10)",
  "status": "String (active/sold_out/discontinued)",
  "rating": "Number",
  "reviews": "Number",
  "tags": ["String"],
  "featured": "Boolean",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Real-Time Stock Updates

- When you update product stock, it's immediately saved to MongoDB
- The frontend fetches updated products on every admin page load
- Stock status automatically updates on product cards and detail pages
- When stock reaches 0, product status automatically changes to "sold_out"

---

## Troubleshooting

### Problem: "Access denied. Admin privileges required."

**Solution:**
1. Verify you're logged in (check for "Sign Out" button in header)
2. Go to Clerk Dashboard
3. Check if your user has `"isAdmin": true` in User Metadata
4. If not, add it and try again

### Problem: Admin button doesn't appear in header

**Causes:**
- You're not logged in
- Your user metadata doesn't have `isAdmin: true`

**Solution:**
1. Verify you're logged in
2. Refresh the page (Ctrl+R / Cmd+R)
3. Check Clerk Dashboard for metadata settings

### Problem: Can't add/edit/delete products

**Causes:**
- Network issue
- Invalid form data
- Backend server is down

**Solution:**
1. Check browser console for error messages (F12 → Console tab)
2. Verify all required fields are filled
3. Check that backend server is running
4. Try refreshing the page

### Problem: Product doesn't appear after creating it

**Causes:**
- Still loading
- Form validation failed

**Solution:**
1. Check for error toast messages at top of page
2. Wait a few seconds for the table to update
3. Refresh the page
4. Check browser console for errors

---

## Cookie Consent System

### What Happens When Admin Visits?

The cookie consent banner appears on first visit. You can:
- **Accept All**: Accept all cookie types
- **Reject All**: Only essential cookies
- **Save Preferences**: Custom selection

### Cookie Settings

Cookies set include:
- `essential_consent`: Always true (required for site function)
- `analytics_consent`: Set based on preference (tracks usage)
- `marketing_consent`: Set based on preference (personalized ads)

Expiration: 1 year from acceptance

---

## Security Best Practices

1. **Never share your login credentials**
2. **Log out when using shared computers**
3. **Don't modify metadata for other users without authorization**
4. **Report security issues immediately**
5. **Keep your Clerk account secure**

---

## API Endpoints Reference

These are the admin-only endpoints used by the admin panel:

### Get All Products
```
GET /api/admin/products
Headers: Authorization: Bearer {token}
```

### Create Product
```
POST /api/admin/products
Headers: Authorization: Bearer {token}
Body: { name, description, price, stock, category, images, featured }
```

### Update Product
```
PUT /api/admin/products/{productId}
Headers: Authorization: Bearer {token}
Body: { name, description, price, stock, category, images, featured }
```

### Delete Product
```
DELETE /api/admin/products/{productId}
Headers: Authorization: Bearer {token}
```

All endpoints require a valid Clerk JWT token and admin status verification.

---

## Support & Contact

For issues or questions:
1. Check this documentation first
2. Check browser console for errors (F12)
3. Review backend logs if available
4. Contact your system administrator
  
---

**Last Updated**: January 21, 2026
**Version**: 1.0.0
