const asyncHandler = require("express-async-handler");

const ApiError = require("../utils/apiError");
const User = require("../models/userModel");

// @desc    Get logged user addresses
// @route   GET /api/v1/addresses
// @access  Private/user
exports.getLoggedUserAddresses = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("addresses");

  res.status(200).json({
    results: user.addresses.length,
    data: user.addresses,
  });
});

// @desc    Add address to logged user
// @route   POST /api/v1/addresses
// @access  Private/user
exports.addAddress = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  user.addresses.push(req.body);
  await user.save();

  res.status(201).json({
    message: "Address added successfully",
    data: user.addresses,
  });
});

// @desc    Update logged user address
// @route   PUT /api/v1/addresses/:addressId
// @access  Private/user
exports.updateAddress = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  const address = user.addresses.id(req.params.addressId);

  if (!address) {
    return next(new ApiError("Address not found", 404));
  }

  address.set(req.body);
  await user.save();

  res.status(200).json({
    message: "Address updated successfully",
    data: address,
  });
});

// @desc    Delete logged user address
// @route   DELETE /api/v1/addresses/:addressId
// @access  Private/user
exports.deleteAddress = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  const address = user.addresses.id(req.params.addressId);

  if (!address) {
    return next(new ApiError("Address not found", 404));
  }

  user.addresses.pull(req.params.addressId);
  await user.save();

  res.status(200).json({
    message: "Address deleted successfully",
    data: user.addresses,
  });
});
