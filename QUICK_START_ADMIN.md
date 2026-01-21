# Quick Start: Admin Panel

## 30-Second Setup

### 1. Make User Admin
Go to [Clerk Dashboard](https://dashboard.clerk.com) → Users → Select User → User Metadata:
```json
{
  "isAdmin": true
}
```

### 2. Access Admin Panel
- Login at `/login`
- Click "Admin" button in header OR go to `/admin`
- Start managing products!

---

## Admin Panel URL

- **Development**: `http://localhost:5173/admin`
- **Production**: `https://yourdomain.com/admin`

**Note**: No URL parameters needed. Access is controlled by:
1. Clerk authentication (must be logged in)
2. Admin metadata flag (must have `isAdmin: true`)

---

## Quick Operations

### Add Product
1. Click "Add Product" button
2. Fill form (name, description, price, stock, category, images)
3. Click "Create Product"

### Edit Product
1. Find product in table
2. Click "Edit"
3. Modify fields
4. Click "Update Product"

### Delete Product
1. Find product in table
2. Click "Delete"
3. Confirm deletion

### Update Stock
1. Click "Edit" on product
2. Change "Stock" number
3. Click "Update Product"

---

## Stock Status (Auto-Display)

Products automatically show status on store:
- **0 units**: "Out of Stock"
- **1-2 units**: "Only X left!"
- **3 units**: "3 more available"
- **4-5 units**: "X more available"
- **5+ units**: "✓ In Stock"

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Can't access admin panel | Check Clerk Dashboard - add `"isAdmin": true` to User Metadata |
| No "Admin" button in header | Make sure you're logged in and metadata is set |
| Product won't save | Check all required fields are filled & backend is running |
| Stock not updating | Refresh page & check browser console for errors |

---

## Support

- Full documentation: `ADMIN_PANEL_GUIDE.md`
- API details: `SETUP_GUIDE.md`
- Backend: `backend/` directory
- Frontend: `src/` directory

For detailed information, see **ADMIN_PANEL_GUIDE.md**
