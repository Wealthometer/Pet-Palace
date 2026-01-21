# Complete Testing Checklist

## Before You Start
- [ ] Backend running: `cd backend && npm run dev`
- [ ] Frontend running: `npm run dev` (in another terminal)
- [ ] Browser is modern (Chrome, Firefox, Safari, Edge)
- [ ] Cookies enabled in browser

---

## Authentication Tests

### Sign Up
- [ ] Visit http://localhost:5173/signup
- [ ] Fill in email and password
- [ ] Click "Create account"
- [ ] Should redirect to home page
- [ ] Header shows "Sign Out" button

### Sign In
- [ ] Visit http://localhost:5173/login
- [ ] Enter email and password from sign up
- [ ] Click "Sign in"
- [ ] Should redirect to home page
- [ ] Header shows "Sign Out" button

### Sign Out
- [ ] Click "Sign Out" in header
- [ ] Should return to home
- [ ] Header shows "Sign In" button

---

## Shopping Cart Tests

### Add to Cart (While NOT Logged In)
- [ ] Visit /shop or /
- [ ] Click "Add to Cart" on any product
- [ ] "Added to cart" message appears
- [ ] Cart icon shows quantity badge
- [ ] Open DevTools → Application → Local Storage
- [ ] Look for "petshop-cart" key
- [ ] See product in JSON

### Add to Cart (While Logged In)
- [ ] Sign in first
- [ ] Click "Add to Cart" on a product
- [ ] Should add successfully
- [ ] Badge updates

### View Cart
- [ ] Visit /cart
- [ ] See all added products
- [ ] Shows price × quantity
- [ ] Shows total price
- [ ] Can change quantity
- [ ] Can remove items
- [ ] Can clear all

### Cart Persistence
- [ ] Add items to cart
- [ ] Refresh page (F5)
- [ ] Items still there ✓
- [ ] Close browser
- [ ] Reopen browser
- [ ] Items still there ✓

---

## Wishlist Tests

### Add to Wishlist (While NOT Logged In)
- [ ] Visit /shop or /
- [ ] Click heart icon on any product
- [ ] Heart icon fills in
- [ ] Wishlist badge updates
- [ ] Open DevTools → Local Storage
- [ ] Look for "petshop-wishlist" key

### Add to Wishlist (While Logged In)
- [ ] Sign in first
- [ ] Click heart icon on product
- [ ] Should add successfully
- [ ] Badge updates

### View Wishlist
- [ ] Visit /wishlist
- [ ] See all favorited products
- [ ] Can remove items
- [ ] Can add to cart from wishlist

### Wishlist Persistence
- [ ] Add items to wishlist
- [ ] Refresh page
- [ ] Items still there ✓
- [ ] Close browser
- [ ] Reopen browser
- [ ] Items still there ✓

---

## Admin Panel Tests

### Access Admin Panel
- [ ] Sign in to your account
- [ ] Visit: `http://localhost:5173/admin?admin=petpalace-admin-2024`
- [ ] Should load admin dashboard ✓
- [ ] See products table (might be empty if no products added)

### Add Product
- [ ] In admin, click "Add Product" or + button
- [ ] Fill in form:
  - Name: "Doggy Treats"
  - Price: "25.99"
  - Stock: "5"
  - Category: "pets"
  - Description: "Delicious dog treats"
  - Image URL: "https://via.placeholder.com/300"
- [ ] Check "Featured" if desired
- [ ] Click "Save"
- [ ] See success toast
- [ ] Product appears in table

### See Product on Shop
- [ ] Go to /shop
- [ ] See your new product
- [ ] Stock badge shows "5 more available" (amber)
- [ ] Can add to cart
- [ ] Works correctly

### Edit Product
- [ ] In admin, click Edit icon on product
- [ ] Change stock to "3"
- [ ] Click "Save"
- [ ] Go back to /shop
- [ ] Product now shows "3 more available" (orange)

### Delete Product
- [ ] In admin, click Trash icon
- [ ] Confirm delete
- [ ] Product disappears from table
- [ ] Go to /shop
- [ ] Product is gone ✓

---

## Stock Status Tests

### Test Each Stock Level

#### 0 Stock (Out of Stock)
- [ ] Add product with stock: 0
- [ ] Go to /shop
- [ ] Badge shows "Out of Stock" (red)
- [ ] Add to Cart button disabled
- [ ] Try clicking - should show "out of stock" message

#### 1-2 Stock (Urgent)
- [ ] Add product with stock: 2
- [ ] Go to /shop
- [ ] Badge shows "Only 2 left!" (dark red)
- [ ] Add to /shop and /product/:id - same badge

#### 3 Stock (Low)
- [ ] Add product with stock: 3
- [ ] Go to /shop
- [ ] Badge shows "3 more available" (orange)
- [ ] Add to /product/:id - same badge

#### 4-5 Stock (Limited)
- [ ] Add product with stock: 5
- [ ] Go to /shop
- [ ] Badge shows "5 more available" (amber)
- [ ] Add to /product/:id - same badge

#### 6+ Stock (Normal)
- [ ] Add product with stock: 10
- [ ] Go to /shop
- [ ] Badge shows "✓ In Stock (10 available)" (green)
- [ ] Add to /product/:id - same badge

---

## Cookie Tests

### Accept Cookies
- [ ] Fresh browser or clear cookies
- [ ] See cookie banner at bottom
- [ ] Check "Analytics" checkbox
- [ ] Check "Marketing" checkbox
- [ ] Click "Accept All"
- [ ] Banner disappears

### Cookie Persistence
- [ ] Open DevTools → Application → Cookies
- [ ] Look for "analytics_consent" cookie
- [ ] Look for "marketing_consent" cookie
- [ ] Value should be "true"
- [ ] Refresh page - banner gone ✓
- [ ] Close browser and reopen
- [ ] Banner still gone ✓

### Reject Cookies
- [ ] Clear cookies
- [ ] See cookie banner
- [ ] Click "Reject"
- [ ] Banner disappears
- [ ] Check cookies again
- [ ] Cookies should be set to "false"

---

## Product Card Tests

### On Shop Page
- [ ] Products display in grid
- [ ] Images load
- [ ] Names visible
- [ ] Prices visible
- [ ] Stock badges visible (for low stock)
- [ ] "Add to Cart" button works
- [ ] Heart icon works

### On Product Detail Page
- [ ] Click on any product
- [ ] Large image displays
- [ ] Description shows
- [ ] Price shows
- [ ] Stock status detailed
- [ ] Can add to cart
- [ ] Can add to wishlist
- [ ] Can change quantity before adding

---

## Navigation Tests

### Header Links
- [ ] Home (/) works
- [ ] Shop (/shop) works
- [ ] Categories (/categories) works
- [ ] Contact (/contact) works
- [ ] About (/about) works
- [ ] Cart (/cart) works
- [ ] Wishlist (/wishlist) works
- [ ] Admin (/admin?admin=petpalace-admin-2024) works when logged in

### Mobile Navigation
- [ ] Resize browser to mobile (< 768px)
- [ ] Hamburger menu appears
- [ ] Click menu - opens
- [ ] Links visible
- [ ] Click link - navigates
- [ ] Menu closes

---

## Error Handling Tests

### Try Adding to Cart (Out of Stock Product)
- [ ] Create product with 0 stock
- [ ] Try to add to cart
- [ ] Error message shows
- [ ] Not added to cart

### Try Accessing Admin (Not Logged In)
- [ ] Log out
- [ ] Visit /admin?admin=petpalace-admin-2024
- [ ] Should redirect to login
- [ ] See "Please log in" message

### Try Accessing Admin (Wrong Key)
- [ ] Log in
- [ ] Visit /admin?admin=wrongkey
- [ ] See "Access denied" message
- [ ] Redirected to home

---

## Performance Tests

### Page Load Speed
- [ ] Open DevTools → Network
- [ ] Refresh home page
- [ ] Should load in < 2 seconds
- [ ] No 404 errors

### Image Loading
- [ ] All product images load
- [ ] Placeholder shown if image fails
- [ ] No broken image icons

### Cart/Wishlist Performance
- [ ] Add 10+ items to cart
- [ ] Page still responsive
- [ ] Scroll smooth
- [ ] No lag

---

## Final Sign-Off

- [ ] All tests passed
- [ ] Features working as expected
- [ ] No console errors
- [ ] Ready for deployment

**Tested By:** ________________
**Date:** ________________
**Notes:** ________________

---

## Quick Debug Commands

If something isn't working, try these:

```javascript
// Check cart in browser console
localStorage.getItem('petshop-cart')

// Check wishlist
localStorage.getItem('petshop-wishlist')

// Check cookies
document.cookie

// Check Clerk user
// Open any page and look for Clerk in DevTools
```
