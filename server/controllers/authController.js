const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");
const generateOtp = require("../utils/generateOTP");
const sendEmail = require("../utils/sendEmail");
const ApiError = require("../utils/apiError");

//@desc    Login user
//@route   POST /api/v1/auth/signup
//@access  Public
exports.signup = asyncHandler(async (req, res) => {
  //create user
  const otp = generateOtp();
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    otp,
  });
  //geterate jwt token
  const token = user.generateAuthToken(user._id);
  res.status(201).json({ data: user, token });
});

//@doc    Login user
//@route   POST /api/v1/auth/login
//@access  Public
exports.login = asyncHandler(async (req, res) => {
  //check if user exists
  const user = await User.findOne({ email: req.body.email });
  //check if password is correct
  if (!user || !(await user.comparePassword(req.body.password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  //generate jwt token
  const token = user.generateAuthToken(user._id);
  //return user
  res.status(200).json({ data: user, token });
});

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const otp = generateOtp();
  user.passwordResetCode = bcrypt.hashSync(otp, 12);
  // Set passwordResetExpires to 1 hour from now
  user.passwordResetExpires = Date.now() + 3600000;
  user.passwordResetVerified = false;
  await user.save();
  // Send email with otp
  try {
    await sendEmail({
      email: user.email,
      subject: "Password reset link",
      message: `Your passwrod reset code  (valid for 1 hour) is \n ${otp}`,
    });
  } catch (err) {
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerified = false;

    await user.save();
    return next(new ApiError("Error sending email", 500));
  }

  res.status(200).json({
    status: "Success",
    message: `Password reset link sent to ${user.email}`,
  });
});

//@desc    Verify password reset OTP
//@route   POST /api/v1/auth/verfyResetPasswordOTP
//@access  Public

exports.verfyResetPasswordOTP = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ApiError("User not found", 404));
  }
  if (!user.passwordResetCode) {
    return next(new ApiError("No password reset code", 404));
  }
  if (user.passwordResetCode !== req.body.otp) {
    return next(new ApiError("Invalid OTP", 401));
  }
  if (user.passwordResetExpires < Date.now()) {
    return next(new ApiError("OTP expired", 401));
  }
  user.passwordResetVerified = true;
  await user.save();
  res
    .status(200)
    .json({ message: "Password reset successfully", status: "success" });
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ApiError("User not found", 404));
  }
  if (!user.passwordResetVerified) {
    return next(new ApiError("Password reset not verified", 401));
  }

  user.password = req.body.password;
  user.passwordResetCode = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetVerified = false;
  await user.save();

  //generate jwt token
  const token = user.generateAuthToken(user._id);
  res.status(200).json({ data: user, token });
});
