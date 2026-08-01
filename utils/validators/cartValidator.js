const asyncHandler = require("express-async-handler");
const { body, check } = require("express-validator");

const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const ApiError = require("../apiError");
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

// Load the logged-in user's cart before the controller runs.
const loadLoggedUserCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return next(new ApiError("Cart not found", 404));
  }

  req.cart = cart;
  next();
});

// Load the requested embedded cart item.
const loadCartItem = (req, res, next) => {
  const cartItem = req.cart.cartItems.id(req.params.itemId);

  if (!cartItem) {
    return next(new ApiError("Cart item not found", 404));
  }

  req.cartItem = cartItem;
  next();
};

// Validate the product and stock before adding it to the cart.
const validateProductToAdd = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.body.productId);

  if (!product) {
    return next(new ApiError("Product not found", 404));
  }

  if (
    req.body.color &&
    product.colors.length > 0 &&
    !product.colors.includes(req.body.color)
  ) {
    return next(
      new ApiError("Selected color is not available for this product", 400),
    );
  }

  const cart = await Cart.findOne({ user: req.user._id });
  const productQuantityInCart = cart
    ? cart.cartItems.reduce(
        (total, item) =>
          getProductId(item) === product._id.toString()
            ? total + item.quantity
            : total,
        0,
      )
    : 0;

  if (productQuantityInCart + req.body.quantity > product.quantity) {
    return next(
      new ApiError(`Only ${product.quantity} items available in stock`, 400),
    );
  }

  req.product = product;
  req.cart = cart;
  next();
});

// Validate the cart item product and its requested quantity.
const validateCartItemQuantity = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(getProductId(req.cartItem));

  if (!product) {
    return next(new ApiError("Product not found", 404));
  }

  const otherVariantsQuantity = req.cart.cartItems.reduce(
    (total, item) =>
      item._id.toString() !== req.cartItem._id.toString() &&
      item.product &&
      getProductId(item) === product._id.toString()
        ? total + item.quantity
        : total,
    0,
  );

  if (otherVariantsQuantity + req.body.quantity > product.quantity) {
    return next(
      new ApiError(`Only ${product.quantity} items available in stock`, 400),
    );
  }

  req.product = product;
  next();
});

// Load a valid coupon before applying it to the cart.
const loadCoupon = asyncHandler(async (req, res, next) => {
  const coupon = await Coupon.findOne({
    name: req.body.coupon,
    expire: { $gt: Date.now() },
  });

  if (!coupon) {
    return next(new ApiError("Coupon is invalid or expired", 400));
  }

  req.coupon = coupon;
  next();
});

exports.addProductToCartValidator = [
  check("productId")
    .notEmpty()
    .withMessage("Product id is required")
    .isMongoId()
    .withMessage("Invalid product id format"),
  body("quantity")
    // If quantity is omitted, add one product by default.
    .customSanitizer((quantity) => (quantity === undefined ? 1 : quantity))
    .isInt({ min: 1 })
    .withMessage("Quantity must be a positive integer")
    .toInt(),
  body("color")
    // Keep color undefined when the request does not select one.
    .customSanitizer((color) => color || undefined)
    .optional()
    .isString()
    .withMessage("Color must be a string")
    .trim()
    .notEmpty()
    .withMessage("Color cannot be empty"),
  validatorMiddleware,
  validateProductToAdd,
];

exports.getLoggedUserCartValidator = [loadLoggedUserCart];

exports.removeSpecificCartItemValidator = [
  check("itemId").isMongoId().withMessage("Invalid cart item id format"),
  validatorMiddleware,
  loadLoggedUserCart,
  loadCartItem,
];

exports.clearCartValidator = [loadLoggedUserCart];

exports.updateCartItemQuantityValidator = [
  check("itemId").isMongoId().withMessage("Invalid cart item id format"),
  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 1 })
    .withMessage("Quantity must be a positive integer")
    .toInt(),
  validatorMiddleware,
  loadLoggedUserCart,
  loadCartItem,
  validateCartItemQuantity,
];

exports.applyCouponValidator = [
  body("coupon")
    .notEmpty()
    .withMessage("Coupon name is required")
    .isString()
    .withMessage("Coupon name must be a string")
    .trim(),
  validatorMiddleware,
  loadCoupon,
  loadLoggedUserCart,
];
