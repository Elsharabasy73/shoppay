const mongoose = require("mongoose");
const { body, check } = require("express-validator");

const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Cart = require("../../models/cartModel");
const Coupon = require("../../models/couponModel");
const Product = require("../../models/productModel");

// Return a consistent string ID for populated and unpopulated cart products.
const getProductId = (cartItem) => {
  if (!cartItem.product) return null;
  return cartItem.product._id
    ? cartItem.product._id.toString()
    : cartItem.product.toString();
};

// Validate and normalize the request before addProductToCart runs.
exports.addProductToCartValidator = [
  check("productId")
    .notEmpty()
    .withMessage("Product id is required")
    .isMongoId()
    .withMessage("Invalid product id format")
    .bail()
    .custom(async (val, { req }) => {
      // Store the product so the next validators can reuse it.
      req.product = await Product.findById(val);
      return true;
    }),
  body("quantity")
    // If quantity is omitted, add one product by default.
    .customSanitizer((quantity) =>
      quantity === undefined ? 1 : quantity,
    )
    .isInt({ min: 1 })
    .withMessage("Quantity must be a positive integer")
    .toInt()
    .custom(async (quantity, { req }) => {
      if (!req.product) return true;

      // Count this product across every color already in the cart.
      const cart = await Cart.findOne({ user: req.user._id });
      const productQuantityInCart = cart
        ? cart.cartItems.reduce(
            (total, item) =>
              getProductId(item) === req.product._id.toString()
                ? total + item.quantity
                : total,
            0,
          )
        : 0;

      if (productQuantityInCart + quantity > req.product.quantity) {
        throw new Error(
          `Only ${req.product.quantity} items available in stock`,
        );
      }

      return true;
    }),
  body("color")
    // Keep color undefined when the request does not select one.
    .customSanitizer((color) => color || undefined)
    .optional()
    .isString()
    .withMessage("Color must be a string")
    .trim()
    .notEmpty()
    .withMessage("Color cannot be empty")
    .custom((color, { req }) => {
      if (
        req.product &&
        req.product.colors.length > 0 &&
        !req.product.colors.includes(color)
      ) {
        throw new Error("Selected color is not available for this product");
      }

      return true;
    }),
  validatorMiddleware,
];

exports.cartItemIdValidator = [
  check("itemId").isMongoId().withMessage("Invalid cart item id format"),
  validatorMiddleware,
];

// Validate an exact quantity update and include other colors in the stock check.
exports.updateCartItemQuantityValidator = [
  check("itemId").isMongoId().withMessage("Invalid cart item id format"),
  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 1 })
    .withMessage("Quantity must be a positive integer")
    .toInt()
    .custom(async (quantity, { req }) => {
      if (!mongoose.isValidObjectId(req.params.itemId)) return true;

      const cart = await Cart.findOne({ user: req.user._id });
      if (!cart) return true;

      const cartItem = cart.cartItems.id(req.params.itemId);
      if (!cartItem) return true;

      const product = await Product.findById(getProductId(cartItem));
      if (!product) return true;

      const otherVariantsQuantity = cart.cartItems.reduce(
        (total, item) =>
          item._id.toString() !== cartItem._id.toString() &&
          getProductId(item) === product._id.toString()
            ? total + item.quantity
            : total,
        0,
      );

      if (otherVariantsQuantity + quantity > product.quantity) {
        throw new Error(`Only ${product.quantity} items available in stock`);
      }

      return true;
    }),
  validatorMiddleware,
];

// Verify the coupon before the controller calculates the discounted total.
exports.applyCouponValidator = [
  body("coupon")
    .notEmpty()
    .withMessage("Coupon name is required")
    .isString()
    .withMessage("Coupon name must be a string")
    .trim()
    .custom(async (couponName, { req }) => {
      const coupon = await Coupon.findOne({
        name: couponName,
        expire: { $gt: Date.now() },
      });

      if (!coupon) {
        throw new Error("Coupon is invalid or expired");
      }

      req.coupon = coupon;
      return true;
    }),
  validatorMiddleware,
];
