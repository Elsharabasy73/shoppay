const asyncHandler = require("express-async-handler");

const ApiError = require("../utils/apiError");
const User = require("../models/userModel");

// @desc    Get logged user wishlist
// @route   GET /api/v1/wishlist
// @access  Private/user
exports.getLoggedUserWishList = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate("wishList");
  res.status(200).json({
    results: user.wishList.length,
    data: user.wishList,
  });
});

// @desc    Add product to user wishlist
// @route   POST /api/v1/wishlist
// @access  Private/user
exports.addProductToWishList = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      $addToSet: { wishList: req.body.productId },
    },
    { new: true },
  );

  if (!user) {
    return next(new ApiError("User not found", 404));
  }

  res.status(200).json({
    message: "Product added to wishlist",
    data: user,
  });
});

// @desc    Remove product from user wishlist
// @route   DELETE /api/v1/wishlist/:productId
// @access  Private/user
exports.removeProductFromWishList = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      $pull: { wishList: req.params.productId },
    },
    { new: true },
  );

  res.status(200).json({
    message: "Product removed from wishlist",
    data: user,
  });
});
