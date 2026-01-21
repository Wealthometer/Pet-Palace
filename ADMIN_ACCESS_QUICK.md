# Admin Panel Quick Access Guide

## Access Method 1: Via URL Parameter (RECOMMENDED - Works Now!)

You can access the admin panel directly using a URL parameter without needing Clerk admin metadata:

```
http://localhost:5173/admin?admin=petpalace-admin-2024
```

Or in production:
```
https://yoursite.com/admin?admin=petpalace-admin-2024
```

**Steps:**
1. Log in with your Clerk account (Sign Up or Sign In)
2. Visit the URL above with the admin key parameter
3. You'll be granted access to the admin dashboard

---

## Access Method 2: Via Clerk Admin Metadata (PERMANENT)

For a permanent admin user setup:

1. Go to Clerk Dashboard (https://dashboard.clerk.com)
2. Navigate to **Users**
3. Find your user account
4. Click on **Edit** or the user details
5. Find **Metadata** section (might say "Unsafe Metadata")
6. Add this JSON:
   ```json
   {
     "isAdmin": true
   }
   ```
7. Save changes
8. Visit `/admin` without any URL parameters

---

## Quick Reference

| Method | URL | How to Use | When to Use |
|--------|-----|-----------|-----------|
| URL Parameter | `/admin?admin=petpalace-admin-2024` | Use immediately after login | Testing, temporary access, no setup needed |
| Clerk Metadata | `/admin` | Set once in Clerk Dashboard | Production, permanent admin users |

---

## Features Available

Once you're in the admin panel:

✓ **Add Products** - Upload images, set prices, stock, category
✓ **Edit Products** - Update any product information
✓ **Delete Products** - Remove products from database
✓ **Manage Stock** - Update inventory levels (triggers low-stock badges)
✓ **Set Featured** - Mark products as featured on homepage

---

## Admin Key

The admin access key is: **`petpalace-admin-2024`**

> **Note:** For production, change this key in `/src/pages/Admin.tsx` line 57-58 to something secure!

---

## Stock Status Triggers

Products automatically show status badges based on stock:

- **0 units**: "Out of Stock"
- **1-2 units**: "Only X left!" (urgent red)
- **3 units**: "3 more available" (orange)
- **4-5 units**: "X more available" (amber)
- **6+ units**: "✓ In Stock" (green)

---

## Troubleshooting

**"Access denied" message?**
- ✓ Make sure you're logged in first (Sign Up or Sign In)
- ✓ Check the URL parameter is exact: `admin=petpalace-admin-2024`
- ✓ Try clearing browser cache and refresh

**Products not showing?**
- ✓ Make sure backend is running (`npm run dev` in `/backend`)
- ✓ Check browser console for errors
- ✓ Verify `.env` files are set up correctly

**Can't add products?**
- ✓ Verify you have admin access (one of the two methods above)
- ✓ Make sure backend is connected and responding
- ✓ Check that image URLs are valid

---

## Security Note

⚠️ **For Production:**
1. Change the admin key in `/src/pages/Admin.tsx` to something secure
2. Remove the URL parameter method and use Clerk metadata only
3. Implement additional authentication if needed
4. Use HTTPS only

---

## Example Usage

**Scenario: You just signed up and want to add your first products**

1. Sign up at `/signup`
2. Visit `/admin?admin=petpalace-admin-2024` 
3. Click "Add Product"
4. Fill in details (name, price, images, stock, etc.)
5. Click "Save"
6. Products appear in shop immediately!
