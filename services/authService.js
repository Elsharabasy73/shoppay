const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/apiError");

const User = require("../models/userModel");

//@desc    Login user
//@route   POST /api/v1/auth/signup
//@access  Public
exports.signup = asyncHandler(async (req, res) => {
  //create user
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
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
  if (!user || !user.comparePassword(req.body.password)) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  //generate jwt token
  const token = user.generateAuthToken(user._id);
  //return user
  res.status(200).json({ data: user, token });
});
