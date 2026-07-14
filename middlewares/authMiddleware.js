const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/apiError");

const User = require("../models/userModel");

//@desc    Protect route
//@route   All
//@access  Private
exports.protect = asyncHandler(async (req, res, next) => {
  //check if bearer token is provided
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return next(new ApiError("No token provided", 401));
  }

  //verify token not expired
  if (jwt.decode(token).exp < Date.now() / 1000) {
    return next(new ApiError("Token expired", 401));
  }

  //verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  //check if user exists
  req.user = await User.findById(decoded.userId);
  if (!req.user) {
    return next(new ApiError("user not found", 401));
  }
  //check if use changed password after creation of token
  if (req.user.passwordChangedAt / 1000 > decoded.iat) {
    return next(new ApiError("Token expired", 401));
  }
  next();
});

exports.allowTo = (roles) =>
  asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ApiError("You are not authorized to do this", 403));
    }
    next();
  });
