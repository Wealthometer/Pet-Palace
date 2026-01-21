// backend/middleware/auth.js

// This middleware now just auto-passes everything
export const verifyToken = async (req, res, next) => {
  // For testing: skip Clerk token check
  req.user = {
    sub: "test-admin", // fake user ID
    email: "admin@test.com",
    firstName: "Admin",
  };
  next();
};

// Admin middleware: auto-pass for testing
export const requireAdmin = (req, res, next) => {
  // You can skip checking IDs for dev
  req.user.isAdmin = true; // optional
  next();
};
