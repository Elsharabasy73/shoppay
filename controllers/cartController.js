const asyncHandler = require("express-async-handler");

const ApiError = require("../utils/apiError");
const Cart = require("../models/cartModel");
const Coupon = require("../models/couponModel");
const Product = require("../models/productModel");

// Return the product ID whether Mongoose populated the product or left it as an ID.
const getProductId = (cartItem) => {
  if (!cartItem.product) return null;
  return cartItem.product._id
    ? cartItem.product._id.toString()
    : cartItem.product.toString();
};

// Recalculate the cart total after an item changes.
const calculateCartTotalPrice = (cart) => {
  cart.totalPrice = cart.cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0,
  );

  // A cart change makes the previously calculated coupon total invalid.
  cart.totalPriceAfterDiscount = undefined;
};

// @desc    Add product to cart
// @route   POST /api/v1/cart
// @access  Private/user
exports.addProductToCart = asyncHandler(async (req, res, next) => {
  // The validator already normalized quantity/color and checked the stock.
  const product = await Product.findById(req.body.productId);

  // Each user has one cart. Create it when the user adds their first item.
  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      cartItems: [
        {
          product: product._id,
          quantity: req.body.quantity,
          color: req.body.color,
          price: product.priceAfterDiscount || product.price,
        },
      ],
    });
  } else {
    // The same product with the same color belongs to one cart line.
    const productIndex = cart.cartItems.findIndex(
      (item) =>
        getProductId(item) === product._id.toString() &&
        item.color === req.body.color,
    );

    if (productIndex > -1) {
      // POST adds the requested quantity; PUT sets an exact quantity.
      cart.cartItems[productIndex].quantity += req.body.quantity;
      cart.cartItems[productIndex].price =
        product.priceAfterDiscount || product.price;
    } else {
      // A different product or color creates a separate cart line.
      cart.cartItems.push({
        product: product._id,
        quantity: req.body.quantity,
        color: req.body.color,
        price: product.priceAfterDiscount || product.price,
      });
    }
  }

  calculateCartTotalPrice(cart);
  await cart.save();

  res.status(200).json({
    message: "Product added to cart successfully",
    data: cart,
  });
});

// @desc    Get logged user cart
// @route   GET /api/v1/cart
// @access  Private/user
exports.getLoggedUserCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return next(new ApiError("Cart not found", 404));
  }

  res.status(200).json({
    results: cart.cartItems.length,
    data: cart,
  });
});

// @desc    Remove specific cart item
// @route   DELETE /api/v1/cart/:itemId
// @access  Private/user
exports.removeSpecificCartItem = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return next(new ApiError("Cart not found", 404));
  }

  // Find the item inside the cart's embedded cartItems array.
  const cartItem = cart.cartItems.id(req.params.itemId);

  if (!cartItem) {
    return next(new ApiError("Cart item not found", 404));
  }

  // Remove the item, then calculate the total using the remaining items.
  cart.cartItems.pull(req.params.itemId);
  calculateCartTotalPrice(cart);
  await cart.save();

  res.status(200).json({
    message: "Cart item removed successfully",
    data: cart,
  });
});

// @desc    Clear logged user cart
// @route   DELETE /api/v1/cart
// @access  Private/user
exports.clearCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOneAndDelete({ user: req.user._id });

  if (!cart) {
    return next(new ApiError("Cart not found", 404));
  }

  res.status(204).send();
});

// @desc    Update cart item quantity
// @route   PUT /api/v1/cart/:itemId
// @access  Private/user
exports.updateCartItemQuantity = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return next(new ApiError("Cart not found", 404));
  }

  // Find the embedded item that the user wants to update.
  const cartItem = cart.cartItems.id(req.params.itemId);

  if (!cartItem) {
    return next(new ApiError("Cart item not found", 404));
  }

  // Read the current product price before saving the new quantity.
  const product = await Product.findById(getProductId(cartItem));

  if (!product) {
    return next(new ApiError("Product not found", 404));
  }

  const otherVariantsQuantity = cart.cartItems.reduce(
    (total, item) =>
      item._id.toString() !== cartItem._id.toString() &&
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

  cartItem.quantity = req.body.quantity;
  cartItem.price = product.priceAfterDiscount || product.price;
  calculateCartTotalPrice(cart);
  await cart.save();

  res.status(200).json({
    message: "Cart item quantity updated successfully",
    data: cart,
  });
});

// @desc    Apply coupon to logged user cart
// @route   PUT /api/v1/cart/applyCoupon
// @access  Private/user
exports.applyCoupon = asyncHandler(async (req, res, next) => {
  const coupon = await Coupon.findOne({
    name: req.body.coupon,
    expire: { $gt: Date.now() },
  });

  if (!coupon) {
    return next(new ApiError("Coupon is invalid or expired", 400));
  }

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return next(new ApiError("Cart not found", 404));
  }

  const discount = (cart.totalPrice * coupon.discount) / 100;
  cart.totalPriceAfterDiscount = Number(
    (cart.totalPrice - discount).toFixed(2),
  );
  await cart.save();

  res.status(200).json({
    message: "Coupon applied successfully",
    data: cart,
  });
});
