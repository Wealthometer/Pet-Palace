# Stock Status Display Reference

## Stock Status Levels & Badges

Your product inventory system automatically displays different messages based on current stock levels.

### Visual Status Indicators

#### Stock Level: 0 Units
**Badge Color**: Red
**Message on Product Card**: "Out of Stock"
**Message on Detail Page**: "Out of Stock - Currently Unavailable"
**Add to Cart**: Disabled (button shows "Out of Stock")
**Priority**: High - Customer should not attempt purchase

```
Product in Stock: ❌ No
User Actions: Purchase disabled, may add to wishlist
```

---

#### Stock Level: 1-2 Units
**Badge Color**: Dark Red/Destructive
**Message on Product Card**: "Only X left!"
**Message on Detail Page**: "Only X left in stock!"
**Add to Cart**: Enabled (limited quantity)
**Priority**: Very High - Urgent action needed

```
Product in Stock: ⚠️ Extremely Low
User Actions: Purchase enabled with max quantity = available stock
Admin Action: Restock soon!
```

---

#### Stock Level: 3 Units
**Badge Color**: Orange
**Message on Product Card**: "3 more available"
**Message on Detail Page**: "3 more available - Order soon!"
**Add to Cart**: Enabled (limit 3 units max)
**Priority**: High

```
Product in Stock: ⚠️ Low
User Actions: Purchase enabled, encouraged to order soon
Admin Action: Consider restocking
```

---

#### Stock Level: 4-5 Units
**Badge Color**: Amber/Yellow
**Message on Product Card**: "X more available"
**Message on Detail Page**: "X more available - Limited stock"
**Add to Cart**: Enabled (limited quantity)
**Priority**: Medium - Alert users about limited availability

```
Product in Stock: ⚠️ Limited
User Actions: Purchase enabled with quantity limited to available
Admin Action: Plan to restock
```

---

#### Stock Level: 6+ Units
**Badge Color**: Green (outline style)
**Message on Product Card**: No special badge (normal "In Stock")
**Message on Detail Page**: "✓ In Stock (X available)"
**Add to Cart**: Enabled (normal quantity)
**Priority**: Low - Comfortable stock level

```
Product in Stock: ✓ Available
User Actions: Purchase normally enabled
Admin Action: No urgency
```

---

## How Stock Status Works

### Where It's Displayed

1. **Product Cards (Shop Page)**
   - Top left corner badge
   - Quick visual for customers browsing
   - Multiple badges can show (Sale, Featured, Stock)

2. **Product Detail Pages**
   - Below price, before quantity selector
   - Detailed message with instructions
   - Stock level in badge format

3. **Cart**
   - Stock validation before checkout
   - Error if stock changed since add

4. **Checkout**
   - Final stock verification
   - Order fails if insufficient stock

### Stock Status Auto-Updates

When you update a product in the admin panel:

```
Admin Updates Stock → Saves to Database → 
Frontend Checks Status → Shows Updated Badge → 
Product Card Updates → Customer Sees New Status
```

This happens **instantly** - no page refresh needed for new visitors.

---

## Admin Stock Management

### Viewing Stock
- Go to Admin Panel (`/admin`)
- See stock in Products table
- Color-coded badges:
  - Green badge: 5+ units
  - No color: 3-4 units
  - Red badge: 0-2 units

### Updating Stock
1. Click "Edit" on product
2. Change "Stock" field to new number
3. Click "Update Product"
4. Status updates immediately for all users

### Stock Thresholds

The system recognizes these breakpoints:
- **0 units**: Sold out (automatic status change)
- **1-2 units**: Critical low stock (red)
- **3 units**: Low stock (orange)
- **4-5 units**: Limited stock (amber)
- **5+ units**: Normal stock (no special badge)

---

## Real-World Examples

### Example 1: Popular Product Selling Out
```
Initial: 10 units → "✓ In Stock"
After sales: 7 units → "✓ In Stock" (no change)
After sales: 5 units → "✓ In Stock" (no change)
After sales: 4 units → "4 more available - Limited stock"
After sales: 3 units → "3 more available - Order soon!"
After sales: 2 units → "Only 2 left!"
After sales: 1 unit → "Only 1 left!"
After sales: 0 units → "Out of Stock"
```

### Example 2: Restocking
```
Current: 0 units → "Out of Stock"
Admin adds 5 units → "5 more available - Limited stock"
Admin adds 10 more units → "✓ In Stock (15 available)"
```

### Example 3: Holiday Season
```
Before promotion: 20 units → "✓ In Stock"
Heavy sales day: 8 units → "✓ In Stock"
Late afternoon: 4 units → "4 more available - Limited stock"
Evening: 2 units → "Only 2 left!"
Midnight: 0 units → "Out of Stock"
```

---

## Testing Stock Status

### Manual Test Checklist

1. **Out of Stock Display**
   - [ ] Set product stock to 0
   - [ ] Verify "Out of Stock" badge appears
   - [ ] Verify "Add to Cart" button is disabled
   - [ ] Verify product status in admin is "sold_out"

2. **Low Stock (1-2)**
   - [ ] Set stock to 1
   - [ ] Verify "Only 1 left!" appears
   - [ ] Set stock to 2
   - [ ] Verify "Only 2 left!" appears
   - [ ] Quantity selector allows max 2

3. **Critical (3)**
   - [ ] Set stock to 3
   - [ ] Verify "3 more available" appears
   - [ ] Quantity selector allows max 3

4. **Limited (4-5)**
   - [ ] Set stock to 4
   - [ ] Verify "4 more available - Limited stock"
   - [ ] Set stock to 5
   - [ ] Verify "5 more available - Limited stock"

5. **Normal (6+)**
   - [ ] Set stock to 10
   - [ ] Verify "✓ In Stock" appears
   - [ ] No special low-stock warnings
   - [ ] Quantity selector allows normal input

---

## API Integration

### Product Schema (Database)

```json
{
  "stock": 10,
  "lowStockThreshold": 10,
  "status": "active"  // or "sold_out"
}
```

### Frontend Display Logic

```javascript
if (stock === 0) {
  // Show: "Out of Stock"
  // Color: Red
}
else if (stock <= 2) {
  // Show: "Only X left!"
  // Color: Dark Red
}
else if (stock === 3) {
  // Show: "3 more available"
  // Color: Orange
}
else if (stock <= 5) {
  // Show: "X more available"
  // Color: Amber
}
else {
  // Show: "✓ In Stock (X available)"
  // Color: Green
}
```

### Stock Auto-Update (MongoDB Pre-Hook)

```javascript
if (stock === 0) {
  status = "sold_out"  // Automatic
} else if (status === "sold_out") {
  status = "active"  // Back in stock
}
```

---

## Customer Experience

### What Customers See

**Browsing Products**:
- Stock badge helps them make quick decisions
- Red badges catch attention - product might sell out
- Encourages faster purchases for low-stock items

**Product Detail Page**:
- Detailed stock message
- "Order soon!" for limited stock
- Quantity selector respects available stock

**Checkout**:
- Final stock verification
- Clear error if stock changed
- Prevents overselling

**Order Confirmation**:
- Confirms purchased quantity
- Shows order is reserved

---

## Troubleshooting

### Stock Status Not Updating

**Problem**: Updated product stock but still shows old status

**Solutions**:
1. Refresh the page (Ctrl+R)
2. Clear browser cache (Ctrl+Shift+Delete)
3. Close and reopen admin panel
4. Check that update succeeded (look for success toast)

### Incorrect Stock Count

**Problem**: Stock shows wrong number in database

**Solutions**:
1. Edit product and check actual value
2. Update to correct number
3. Check for failed transactions
4. Review backend logs

### Button Still Enabled When Out of Stock

**Problem**: Customer can add to cart when stock = 0

**Solutions**:
1. Refresh page
2. Check product status is actually "sold_out"
3. Backend validation should still prevent order

---

## Best Practices

1. **Keep Stock Accurate** - Update admin panel when stock changes
2. **Regular Audits** - Weekly inventory checks
3. **Proactive Restocking** - Don't wait until out of stock
4. **Monitor Low Stock** - Set up alerts when approaching 5 units
5. **Plan Promotions** - Stock up before sales
6. **Clear Messaging** - Be transparent about availability

---

## FAQ

**Q: Can customers buy more than available stock?**
A: No - quantity selector is limited by available stock, and backend validates.

**Q: Does status update instantly?**
A: For new page visitors, yes. For current viewers, they'll see updated badge on product cards.

**Q: What happens if stock changes during checkout?**
A: Backend validates during order creation - if insufficient stock, order fails.

**Q: Can admin edit stock while someone is checking out?**
A: Yes - backend has atomic transactions to prevent overselling.

**Q: How often does stock sync?**
A: Stock is read fresh from database on every product view. Real-time.

---

**Reference Date**: January 21, 2026
**Stock System Version**: 1.0.0
