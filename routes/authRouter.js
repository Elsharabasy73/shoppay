const express = require("express");
const rateLimiter = require("express-rate-limit");

const router = express.Router();

const authLimiter = rateLimiter({
  windowMs: 30 * 60 * 1000,
  max: 10,
  message: "Too many authentication requests from this IP, please try again later",
});

const {
  signup,
  login,
  forgotPassword,
  verfyResetPasswordOTP,
  resetPassword,
} = require("../controllers/authController");
const {
  signupValidator,
  loginValidator,
} = require("../utils/validators/authValidator");

router.post("/signup", signupValidator, signup);

router.post("/login", authLimiter, loginValidator, login);

router.post("/forgotPassword", authLimiter, forgotPassword);

router.post("/verfyResetPasswordOTP", authLimiter, verfyResetPasswordOTP);

router.post("/resetPassword", authLimiter, resetPassword);

module.exports = router;
