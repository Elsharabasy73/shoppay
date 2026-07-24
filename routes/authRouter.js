const express = require("express");

const router = express.Router();

const {
  signup,
  login,
  forgotPassword,
  verfyResetPasswordOTP,
} = require("../controllers/authController");
const {
  signupValidator,
  loginValidator,
} = require("../utils/validators/authValidator");

router.post("/signup", signupValidator, signup);

router.post("/login", loginValidator, login);

router.post("/forgotPassword", forgotPassword);

router.post("/verfyResetPasswordOTP", verfyResetPasswordOTP);
module.exports = router;
