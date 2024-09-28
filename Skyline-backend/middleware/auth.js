const jwt = require("jsonwebtoken");
const User = require("../models/register");
const ErrorResponse = require("../utils/errorResponse");

exports.isAuthenticated = async (req, res, next) => {
  const token = req.cookies.accessToken; // Make sure the token name matches

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      return next(new ErrorResponse("No user found with this id", 404));
    }
    next();
  } catch (error) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
};

// Middleware for admin
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new ErrorResponse("Access denied, you must be an admin", 401));
  }
  next();
};
