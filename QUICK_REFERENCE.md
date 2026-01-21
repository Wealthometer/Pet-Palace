# Quick Reference Guide

## URLs at a Glance

### Main Pages
```
Home:        http://localhost:5173/
Shop:        http://localhost:5173/shop
Product:     http://localhost:5173/product/{id}
Cart:        http://localhost:5173/cart
Wishlist:    http://localhost:5173/wishlist
```

### Authentication
```
Sign Up:     http://localhost:5173/signup
Sign In:     http://localhost:5173/login
Sign Out:    Click button in header
```

### Admin (MUST BE LOGGED IN FIRST)
```
Admin Panel: http://localhost:5173/admin?admin=petpalace-admin-2024
```

### Other Pages
```
About:       http://localhost:5173/about
Contact:     http://localhost:5173/contact
Categories:  http://localhost:5173/categories
```

---

## Starting the App

### Terminal 1: Backend
```bash
cd backend
npm run dev
```
✓ Should show: "Server running on port 5000"

### Terminal 2: Frontend
```bash
npm run dev
```
✓ Should show: "http://localhost:5173"

---

## User Actions

### As a Customer
1. Sign Up: `/signup`
2. Browse: `/shop`
3. Heart icon: Add to wishlist
4. Button: Add to cart
5. Cart: `/cart`
6. Wishlist: `/wishlist`

### As an Admin
1. Sign In: `/login`
2. Visit: `/admin?admin=petpalace-admin-2024`
3. Click "Add Product"
4. Fill form and save
5. Products appear in shop immediately

---

## Key Features

### Cart
- Add/remove items
- Change quantities
- View total price
- Persistent (survives refresh + browser close)

### Wishlist
- Add/remove items
- View all favorites
- Add wishlist items to cart
- Persistent

### Admin
- View all products
- Add new products
- Edit existing products
- Delete products
- Update stock levels
- Mark as featured

### Stock System
| Stock | Display | Status |
|-------|---------|--------|
| 0 | Out of Stock | Red button |
| 1-2 | Only X left! | Red |
| 3 | 3 more available | Orange |
| 4-5 | X more available | Amber |
| 6+ | ✓ In Stock | Green |

---

## Troubleshooting

### "Layout not exported"
- ✅ FIXED - Added named export

### "Access Denied" in Admin
- ✅ Login first
- ✅ Use URL: `/admin?admin=petpalace-admin-2024`

### Cart/Wishlist Empty
- Refresh page (F5)
- Should still have items
- If not, check localStorage in DevTools

### Backend not connecting
- Make sure backend running: `npm run dev` in `/backend`
- Check if running on correct port (5000)
- Check network tab in DevTools

### Clerk login not working
- Make sure `.env` has `VITE_CLERK_PUBLISHABLE_KEY`
- Check browser console for Clerk errors
- Verify Clerk key is valid in Clerk Dashboard

---

## Browser DevTools Checks

### Local Storage
- Open DevTools (F12)
- Application tab → Local Storage
- Look for:
  - `petshop-cart` - Cart items
  - `petshop-wishlist` - Wishlist items
  - `consent-*` - Cookie preferences

### Cookies
- Application tab → Cookies
- Look for:
  - `analytics_consent`
  - `marketing_consent`
  - `essential_consent`

### Network
- Network tab
- Check for failed requests (404, 500)
- Verify API calls going to correct backend

### Console
- Console tab
- Look for red errors
- Check for Clerk auth messages

---

## Admin Key

```
petpalace-admin-2024
```

✅ Use this in URL: `/admin?admin=petpalace-admin-2024`

⚠️ For production, change this to something secure!

---

## Environment Variables Needed

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
```

### Backend (.env)
```
DATABASE_URL=your_mongodb_url
PORT=5000
NODE_ENV=development
```

---

## Quick Test Scenarios

### Test 1: Cart Works
1. Visit `/shop`
2. Click "Add to Cart"
3. See badge update
4. Visit `/cart`
5. See item there

### Test 2: Persistence Works
1. Add item to cart
2. Press F5 (refresh)
3. Item still there ✓

### Test 3: Admin Works
1. Login: `/login`
2. Visit: `/admin?admin=petpalace-admin-2024`
3. Click "Add Product"
4. Fill form, save
5. Go to `/shop`
6. See new product

### Test 4: Stock Badges Work
1. Add product with stock: 3
2. Go to `/shop`
3. See "3 more available" badge (orange)
4. Change stock to 0
5. See "Out of Stock" badge (red)

---

## Common Commands

```bash
# Start backend
cd backend && npm run dev

# Start frontend
npm run dev

# Clear cache and reload
# Windows/Linux: Ctrl+Shift+R
# Mac: Cmd+Shift+R

# Check backend status
curl http://localhost:5000/health

# View backend logs
# Check terminal where you ran: cd backend && npm run dev
```

---

## Getting Help

**Check these files in this order:**

1. **SESSION_2_SUMMARY.md** - Overview of what was fixed
2. **FIXES_APPLIED.md** - Detailed explanation of each fix
3. **ADMIN_ACCESS_QUICK.md** - Admin panel access methods
4. **TESTING_CHECKLIST.md** - Complete test guide
5. **This file** - Quick reference

---

## Feature Checklist

- [x] Sign Up / Sign In (Clerk)
- [x] Add to Cart (works for everyone)
- [x] Add to Wishlist (works for everyone)
- [x] Cart Persistence (survives refresh)
- [x] Wishlist Persistence (survives refresh)
- [x] Admin Panel Access (URL parameter)
- [x] Add Products (admin)
- [x] Edit Products (admin)
- [x] Delete Products (admin)
- [x] Stock Status Badges (automatic)
- [x] Cookies Consent (working)
- [x] Header Navigation (responsive)

---

## Most Important URLs

| What | URL |
|------|-----|
| Home | `http://localhost:5173/` |
| Shop | `http://localhost:5173/shop` |
| Cart | `http://localhost:5173/cart` |
| Admin | `http://localhost:5173/admin?admin=petpalace-admin-2024` |
| Login | `http://localhost:5173/login` |
| Signup | `http://localhost:5173/signup` |

---

**All Systems Go! 🚀**
