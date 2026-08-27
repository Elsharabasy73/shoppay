const { check } = require("express-validator");

const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const User = require("../../models/userModel");
const Product = require("../../models/productModel");

exports.addWishListValidator = [
  check("productId")
    .isMongoId()
    .withMessage("Invalid product id format")
    .custom((val) =>
      // check if product exists in db
      Product.findById(val).then((product) => {
        if (!product) {
          return Promise.reject(new Error("Product not found"));
        }
      }),
    )
    .custom((val, { req }) =>
      // check if product already in wishlist
      User.findById(req.user._id).then((user) => {
        const alreadyInWishList =
          user.wishList &&
          user.wishList.some((productId) => productId.toString() === val);

        if (alreadyInWishList) {
          return Promise.reject(new Error("Product already in wishlist"));
        }
      }),
    ),
  validatorMiddleware,
];

exports.removeWishListValidator = [
  check("productId")
    .isMongoId()
    .withMessage("Invalid product id format")
    .custom((val) =>
      // check if product exists in db
      Product.findById(val).then((product) => {
        if (!product) {
          return Promise.reject(new Error("Product not found"));
        }
      }),
    )
    .custom((val, { req }) =>
      // check if product exists in user wishlist
      User.findById(req.user._id).then((user) => {
        const existsInWishList =
          user.wishList &&
          user.wishList.some((productId) => productId.toString() === val);

        if (!existsInWishList) {
          return Promise.reject(new Error("Product not found in wishlist"));
        }
      }),
    ),
  validatorMiddleware,
];
