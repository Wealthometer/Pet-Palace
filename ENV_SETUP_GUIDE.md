# Environment Variables Setup Guide

## Quick Setup (5 Minutes)

### Step 1: Clerk Keys
1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Select your project
3. Go to **API Keys** section
4. Copy your keys

### Step 2: Backend .env
Create `backend/.env`:
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/happypaws
CLERK_SECRET_KEY=sk_test_xxxxx_from_clerk
CLERK_PUBLISHABLE_KEY=pk_test_xxxxx_from_clerk

ADMIN_USER_IDS=user_xxxxx  # Your Clerk user ID (optional)
```

### Step 3: Frontend .env
Create `.env` in project root:
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx_from_clerk
VITE_API_URL=http://localhost:5000/api
```

### Step 4: Run Both
```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Frontend
npm install
npm run dev
```

---

## Detailed Environment Variables

### Backend (.env)

#### Server Configuration
```env
PORT=5000                              # Express server port
NODE_ENV=development                   # development/production
FRONTEND_URL=http://localhost:5173     # Frontend URL for CORS
```

#### Database
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/happypaws
# Format: mongodb+srv://[username]:[password]@[cluster].mongodb.net/[database]
# Get from: MongoDB Atlas → Database → Connect → Node.js
```

#### Clerk Authentication
```env
CLERK_SECRET_KEY=sk_test_xxxxx
CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
# Get from: Clerk Dashboard → API Keys → Show Token
```

#### Admin Configuration (Optional)
```env
ADMIN_USER_IDS=user_xxxxx,user_yyyyy
# Comma-separated list of Clerk user IDs to make admins
# Can also be set via Clerk Dashboard User Metadata
```

### Frontend (.env / .env.local)

#### Clerk
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
# Must match backend CLERK_PUBLISHABLE_KEY
```

#### API Configuration
```env
VITE_API_URL=http://localhost:5000/api
# Development: http://localhost:5000/api
# Production: https://api.yourdomain.com/api
```

---

## Where to Get Values

### Clerk Keys
1. [Clerk Dashboard](https://dashboard.clerk.com)
2. Select your application
3. **API Keys** in sidebar
4. Copy both keys

### MongoDB URI
1. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Select your cluster
3. Click **Connect**
4. Choose **Drivers** (Node.js)
5. Copy connection string
6. Replace `<password>` and `<username>`

### Clerk User ID (for ADMIN_USER_IDS)
1. [Clerk Dashboard](https://dashboard.clerk.com)
2. Go to **Users**
3. Click on user
4. Copy User ID from top of page
5. Format: `user_xxxxx` or similar

---

## Development vs Production

### Development Environment
```env
# Backend
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
MONGODB_URI=mongodb+srv://dev-user:dev-pass@dev-cluster.mongodb.net/happypaws
CLERK_SECRET_KEY=sk_test_xxxxx  # Test key
CLERK_PUBLISHABLE_KEY=pk_test_xxxxx  # Test key

# Frontend
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
VITE_API_URL=http://localhost:5000/api
```

### Production Environment
```env
# Backend
NODE_ENV=production
FRONTEND_URL=https://petpalace.com
MONGODB_URI=mongodb+srv://prod-user:prod-pass@prod-cluster.mongodb.net/happypaws
CLERK_SECRET_KEY=sk_live_xxxxx  # Live key
CLERK_PUBLISHABLE_KEY=pk_live_xxxxx  # Live key

# Frontend
VITE_CLERK_PUBLISHABLE_KEY=pk_live_xxxxx
VITE_API_URL=https://api.petpalace.com/api
```

---

## Common Issues

### "Cannot find module dotenv"
**Solution**: Ensure `backend/.env` file exists with correct format

### "MongoNetworkError"
**Solution**:
1. Check MongoDB URI format
2. Verify IP whitelist: MongoDB Atlas → Network Access
3. Add IP: `0.0.0.0/0` (allows all, use specific IP in production)
4. Check username/password are correct (URL encode special chars)

### "Clerk error: Missing API key"
**Solution**:
1. Verify `CLERK_SECRET_KEY` is set in backend
2. Verify `VITE_CLERK_PUBLISHABLE_KEY` is set in frontend
3. Ensure keys are from same Clerk project
4. Check for typos

### "Admin panel shows 'Access denied'"
**Solution**:
1. Verify user is logged in
2. Go to Clerk Dashboard → Users → Your User
3. Add to User Metadata:
   ```json
   {
     "isAdmin": true
   }
   ```
4. Refresh app

### "API calls getting 401 errors"
**Solution**:
1. Check `VITE_API_URL` is correct
2. Verify backend `FRONTEND_URL` matches frontend origin
3. Check Clerk keys match between frontend and backend
4. Review browser console for detailed error

### "CORS errors when calling API"
**Solution**:
1. Check `FRONTEND_URL` in backend matches actual frontend URL
2. Verify both front/back are running
3. Check for typos in URLs
4. Test direct API call: `curl http://localhost:5000/api/products`

---

## Environment File Templates

### .env.example (Backend)
```env
# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Database
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/happypaws

# Clerk Authentication
CLERK_SECRET_KEY=sk_test_xxxxx
CLERK_PUBLISHABLE_KEY=pk_test_xxxxx

# Optional
ADMIN_USER_IDS=user_xxxxx
```

### .env (Frontend)
```env
# Clerk
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx

# API
VITE_API_URL=http://localhost:5000/api
```

---

## Verification Steps

### Backend Verification
```bash
# 1. Check MongoDB connection
# If no error appears, connection is working
npm run dev

# 2. Test API endpoint
curl http://localhost:5000/api/products
# Should return: []  or  [{ product data }]

# 3. Check Clerk setup
# Visit: http://localhost:5173/login
# Should load Clerk login component
```

### Frontend Verification
```bash
# 1. Start app
npm run dev

# 2. Check console
# Open browser DevTools (F12)
# Go to Console tab
# Should NOT show errors about missing env vars

# 3. Try login
# Click "Sign In" button
# Should show Clerk login component
```

---

## Secure Env Var Management

### Local Development
- Store .env files in project root
- Add to .gitignore (never commit)
- Share via secure means (not email)

### Team Sharing
```bash
# Do NOT do this:
git add .env
git commit -m "Add env vars"  ❌

# Do this:
echo .env >> .gitignore
git add .env.example  # Template only
git commit -m "Add env template"
# Share actual .env via 1Password, encrypted message, etc.
```

### Production Deployment
- Set vars in hosting platform:
  - **Vercel**: Settings → Environment Variables
  - **Railway**: Variables section
  - **Render**: Environment
- Never commit production .env files
- Rotate keys regularly
- Use separate keys for prod vs dev

---

## Testing Your Setup

### Quick Validation Script
```bash
# Run from project root
echo "Checking setup..."

echo "✓ Backend .env exists?" && ls backend/.env > /dev/null 2>&1 && echo "YES" || echo "NO - CREATE IT"
echo "✓ Frontend .env exists?" && ls .env > /dev/null 2>&1 && echo "YES" || echo "NO - CREATE IT"

echo ""
echo "Next steps:"
echo "1. Create backend/.env with MongoDB and Clerk keys"
echo "2. Create .env with Clerk key and API URL"
echo "3. Run: cd backend && npm run dev"
echo "4. Run: npm run dev (in another terminal)"
```

### Manual Verification
1. **Database**: `mongo "mongodb+srv://..."` → should connect
2. **Clerk**: Visit Clerk Dashboard → should show your app
3. **Frontend**: `http://localhost:5173` → should load
4. **Backend**: `http://localhost:5000/api/products` → should return products
5. **Auth**: Try login → should show Clerk UI
6. **Admin**: Login as admin → should access `/admin`

---

## Key Management Best Practices

1. **Rotate Keys Regularly**
   - Every 90 days ideally
   - After any security incident
   - When team member leaves

2. **Use Different Keys per Environment**
   - Test keys for development
   - Live keys for production
   - Staging keys separate

3. **Limit Key Permissions**
   - Use role-based access if available
   - Don't use master keys in frontend
   - Separate read/write permissions

4. **Monitor Key Usage**
   - Set up alerts for unusual activity
   - Review API usage logs
   - Track which services use which keys

5. **Secure Storage**
   - Use 1Password, LastPass, etc.
   - Never hardcode in comments
   - Don't share via email
   - Use encrypted messaging

---

## Support

- **Clerk Docs**: https://clerk.com/docs
- **MongoDB Docs**: https://docs.mongodb.com
- **Vite Docs**: https://vitejs.dev
- **Express Docs**: https://expressjs.com

---

**Last Updated**: January 21, 2026
**Version**: 1.0.0
