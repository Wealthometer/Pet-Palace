# Deployment & Setup Checklist

## Pre-Launch Checklist

### Clerk Configuration
- [ ] Clerk account created
- [ ] Clerk project created
- [ ] CLERK_PUBLISHABLE_KEY obtained
- [ ] CLERK_SECRET_KEY obtained
- [ ] Keys added to `.env` files
- [ ] Frontend: `VITE_CLERK_PUBLISHABLE_KEY` set
- [ ] Backend: `CLERK_SECRET_KEY` and `CLERK_PUBLISHABLE_KEY` set

### Admin User Setup
- [ ] Go to [Clerk Dashboard](https://dashboard.clerk.com)
- [ ] Create or select admin user account
- [ ] Add User Metadata:
  ```json
  {
    "isAdmin": true
  }
  ```
- [ ] Save changes
- [ ] Test login with admin account

### Backend Setup
- [ ] Node.js 16+ installed
- [ ] MongoDB Atlas account created
- [ ] MongoDB connection string obtained
- [ ] `MONGODB_URI` environment variable set
- [ ] Express server dependencies installed (`npm install`)
- [ ] Port 5000 available (or configured in `BACKEND_PORT`)
- [ ] Backend running: `npm run dev`
- [ ] API endpoints responding: `http://localhost:5000/api/products`

### Frontend Setup
- [ ] Node.js 16+ installed
- [ ] Vite dependencies installed (`npm install`)
- [ ] `VITE_CLERK_PUBLISHABLE_KEY` environment variable set
- [ ] `VITE_API_URL` set to backend API (`http://localhost:5000/api`)
- [ ] Frontend running: `npm run dev`
- [ ] App accessible at `http://localhost:5173`

### Feature Testing

#### Authentication
- [ ] Can visit `/login`
- [ ] Can sign up new account
- [ ] Can sign in with existing account
- [ ] Can sign out
- [ ] Auto-redirect from auth pages when already signed in
- [ ] Sign Out button appears in header when logged in

#### Admin Panel Access
- [ ] Non-admin cannot access `/admin` (gets error + redirect)
- [ ] Admin sees "Admin" button in header
- [ ] Admin can access `/admin`
- [ ] Admin dashboard loads products
- [ ] Can add new product
- [ ] Can edit existing product
- [ ] Can delete product
- [ ] Products appear in database after creation

#### Stock Status Display
- [ ] Set product stock to 0 → Shows "Out of Stock"
- [ ] Set stock to 1 → Shows "Only 1 left!"
- [ ] Set stock to 2 → Shows "Only 2 left!"
- [ ] Set stock to 3 → Shows "3 more available"
- [ ] Set stock to 4 → Shows "4 more available"
- [ ] Set stock to 5 → Shows "5 more available"
- [ ] Set stock to 10 → Shows "✓ In Stock"
- [ ] Add to cart button disabled when out of stock
- [ ] Quantity selector respects max stock

#### Cookies & Consent
- [ ] Cookie banner appears on first visit
- [ ] Can click "Accept All"
- [ ] Can click "Reject All"
- [ ] Can click "Save Preferences"
- [ ] Cookies set in browser (check DevTools → Application → Cookies)
- [ ] Consent persists after page refresh

### Documentation Review
- [ ] Read `ADMIN_PANEL_GUIDE.md`
- [ ] Read `QUICK_START_ADMIN.md`
- [ ] Read `STOCK_STATUS_REFERENCE.md`
- [ ] Read `IMPLEMENTATION_SUMMARY.md`
- [ ] Understand admin access process

---

## Deployment to Production

### Backend Deployment (Vercel/Railway/Render)

1. **Prepare Backend**
   - [ ] Clean up console.logs (or keep for debugging)
   - [ ] Ensure all env vars are set
   - [ ] Test locally one more time
   - [ ] Commit to Git if using version control

2. **Set Environment Variables**
   - [ ] `PORT=5000` (or platform default)
   - [ ] `NODE_ENV=production`
   - [ ] `FRONTEND_URL=https://yourdomain.com`
   - [ ] `MONGODB_URI=<production-db-url>`
   - [ ] `CLERK_SECRET_KEY=<production-key>`
   - [ ] `CLERK_PUBLISHABLE_KEY=<production-key>`

3. **Deploy**
   - [ ] Push code to Git/Deploy service
   - [ ] Wait for deployment to complete
   - [ ] Test API endpoints
   - [ ] Verify database connection
   - [ ] Note production backend URL

4. **Post-Deploy**
   - [ ] Test `/api/products` endpoint
   - [ ] Test admin endpoints with token
   - [ ] Monitor logs for errors
   - [ ] Set up error tracking (optional: Sentry)

### Frontend Deployment (Vercel/Netlify)

1. **Prepare Frontend**
   - [ ] Build: `npm run build`
   - [ ] Test build locally: `npm run preview`
   - [ ] Remove any test/debug data
   - [ ] Ensure all env vars reference production

2. **Build Configuration**
   - [ ] Vite build outputs to `dist/`
   - [ ] No build errors or warnings
   - [ ] Source maps optional for production

3. **Set Environment Variables**
   - [ ] `VITE_CLERK_PUBLISHABLE_KEY=<production-key>`
   - [ ] `VITE_API_URL=<production-backend-url>`
   - [ ] Example: `https://api.petpalace.com/api`

4. **Deploy**
   - [ ] Deploy `dist/` folder
   - [ ] Configure custom domain
   - [ ] Set up SSL/HTTPS
   - [ ] Note production frontend URL

5. **Post-Deploy**
   - [ ] Visit homepage - loads without errors
   - [ ] Test signup flow
   - [ ] Test login flow
   - [ ] Admin can access `/admin`
   - [ ] Products load correctly
   - [ ] Stock status displays

### Domain Setup

1. **DNS Configuration**
   - [ ] Purchase domain (or use existing)
   - [ ] Point frontend domain to Vercel/Netlify
   - [ ] Point backend domain to backend service
   - [ ] Wait for DNS propagation (~24 hours)

2. **HTTPS/SSL**
   - [ ] Frontend: Auto-configured by Vercel/Netlify
   - [ ] Backend: Configure SSL certificates
   - [ ] Test both work with HTTPS

3. **Update URLs**
   - [ ] Clerk: Add production domain to allowed redirects
   - [ ] Frontend env: Update `VITE_API_URL` to production backend
   - [ ] Backend env: Update `FRONTEND_URL` to production frontend

### Data Migration

1. **MongoDB**
   - [ ] Ensure production MongoDB cluster created
   - [ ] Backup development data if needed
   - [ ] Test connection string
   - [ ] Seed initial products if needed

2. **Clerk**
   - [ ] Create production Clerk application
   - [ ] Migrate admin users if needed
   - [ ] Update admin metadata in production

---

## Post-Launch Verification

### Frontend
- [ ] Homepage loads
- [ ] Shop page displays products
- [ ] Product detail page works
- [ ] Signup flow works
- [ ] Login flow works
- [ ] Cart functionality works
- [ ] Wishlist works
- [ ] Checkout process works
- [ ] Contact form works
- [ ] Header displays correctly
- [ ] Mobile responsive

### Admin Panel
- [ ] Admin can access `/admin`
- [ ] Can view all products
- [ ] Can add new product
- [ ] Can edit product
- [ ] Can delete product
- [ ] Stock updates are reflected
- [ ] Admin button only shows for admins

### Backend APIs
- [ ] `GET /api/products` returns products
- [ ] `POST /api/admin/products` creates product (auth required)
- [ ] `PUT /api/admin/products/:id` updates product (auth required)
- [ ] `DELETE /api/admin/products/:id` deletes product (auth required)
- [ ] Auth validation working on protected routes

### Monitoring
- [ ] Set up error logging (Sentry recommended)
- [ ] Monitor database performance
- [ ] Set up alerts for errors
- [ ] Monitor API response times
- [ ] Check logs regularly for issues

---

## Rollback Plan

If anything goes wrong:

1. **Frontend Issues**
   - [ ] Revert to previous deployment
   - [ ] Roll back env variables
   - [ ] Clear browser cache
   - [ ] Check logs for errors

2. **Backend Issues**
   - [ ] Check database connection
   - [ ] Verify env variables are set
   - [ ] Check API logs
   - [ ] Restart backend service
   - [ ] Rollback to previous version if needed

3. **Database Issues**
   - [ ] Check MongoDB connection
   - [ ] Verify credentials
   - [ ] Check for stuck transactions
   - [ ] Contact MongoDB support if needed

---

## Ongoing Maintenance

### Daily
- [ ] Monitor error logs
- [ ] Check for failed API requests
- [ ] Verify site is accessible

### Weekly
- [ ] Review database performance
- [ ] Check admin actions log
- [ ] Backup database
- [ ] Test admin panel functionality

### Monthly
- [ ] Security audit
- [ ] Performance review
- [ ] User feedback review
- [ ] Update dependencies if needed

### Quarterly
- [ ] Major feature updates
- [ ] Database optimization
- [ ] Security patches
- [ ] Infrastructure review

---

## Troubleshooting Deployment Issues

### "Cannot connect to database"
- Verify MongoDB URI is correct
- Check IP whitelist in MongoDB Atlas
- Verify credentials
- Test connection locally

### "Admin panel returns 401 Unauthorized"
- Verify Clerk keys are correct
- Check user has `isAdmin: true` in metadata
- Verify JWT token is being sent
- Check backend token verification logic

### "Products not loading"
- Check API endpoint is accessible
- Verify VITE_API_URL is set correctly
- Check for CORS errors in console
- Verify MongoDB has products

### "Stock status not displaying"
- Refresh page
- Check product has stock field
- Verify stock logic in ProductCard component
- Check for JavaScript errors in console

### "Cookies not persisting"
- Check browser allows cookies
- Verify SameSite attribute is set
- Check domain configuration
- Clear browser cache and try again

---

## Security Checklist

- [ ] HTTPS enabled on both frontend and backend
- [ ] Clerk keys not exposed in frontend code
- [ ] Database credentials not in version control
- [ ] Rate limiting enabled on API endpoints
- [ ] CORS properly configured
- [ ] Input validation on all API endpoints
- [ ] Admin-only routes protected at backend level
- [ ] Security headers configured
- [ ] No sensitive data in error messages
- [ ] Logging configured (don't log passwords/tokens)

---

## Performance Checklist

- [ ] Frontend build optimized
- [ ] Images optimized for web
- [ ] Database queries use indexes
- [ ] API responses cached where appropriate
- [ ] CDN configured for static assets (optional)
- [ ] Database connection pooling enabled
- [ ] Monitoring set up to track performance

---

## Documentation for Team

- [ ] All docs pushed to repository
- [ ] Team trained on admin panel
- [ ] Runbooks created for common issues
- [ ] Escalation procedures documented
- [ ] Contact info for support updated

---

## Launch Date Planning

- [ ] Target launch date: _______________
- [ ] Testing period: _______________
- [ ] Soft launch (internal): _______________
- [ ] Public launch: _______________
- [ ] Post-launch support plan: _______________

---

## Contacts

- Developer: _________________________
- DevOps: ____________________________
- Product Owner: ____________________
- Support Lead: ______________________

---

## Sign-Off

- [ ] All checklist items completed
- [ ] Testing passed
- [ ] Documentation complete
- [ ] Team trained
- [ ] Ready for launch

Approved By: ____________________  Date: ___________
Deployed By: ____________________  Date: ___________

---

**Version**: 1.0.0
**Last Updated**: January 21, 2026
