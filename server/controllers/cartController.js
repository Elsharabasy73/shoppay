const asyncHandler = require("express-async-handler");

const Cart = require("../models/cartModel");

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
exports.addProductToCart = asyncHandler(async (req, res) => {
  const { product } = req;
  let { cart } = req;

  // Each user has one cart. Create it when the user adds their first item.
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
exports.getLoggedUserCart = asyncHandler(async (req, res) => {
  res.status(200).json({
    results: req.cart.cartItems.length,
    data: req.cart,
  });
});

// @desc    Remove specific cart item
// @route   DELETE /api/v1/cart/:itemId
// @access  Private/user
exports.removeSpecificCartItem = asyncHandler(async (req, res) => {
  req.cart.cartItems.pull(req.cartItem._id);
  calculateCartTotalPrice(req.cart);
  await req.cart.save();

  res.status(200).json({
    message: "Cart item removed successfully",
    data: req.cart,
  });
});

// @desc    Clear logged user cart
// @route   DELETE /api/v1/cart
// @access  Private/user
exports.clearCart = asyncHandler(async (req, res) => {
  await req.cart.deleteOne();
  res.status(204).send();
});

// @desc    Update cart item quantity
// @route   PUT /api/v1/cart/:itemId
// @access  Private/user
exports.updateCartItemQuantity = asyncHandler(async (req, res) => {
  req.cartItem.quantity = req.body.quantity;
  req.cartItem.price = req.product.priceAfterDiscount || req.product.price;
  calculateCartTotalPrice(req.cart);
  await req.cart.save();

  res.status(200).json({
    message: "Cart item quantity updated successfully",
    data: req.cart,
  });
});

// @desc    Apply coupon to logged user cart
// @route   PUT /api/v1/cart/applyCoupon
// @access  Private/user
exports.applyCoupon = asyncHandler(async (req, res) => {
  const discount = (req.cart.totalPrice * req.coupon.discount) / 100;
  req.cart.totalPriceAfterDiscount = Number(
    (req.cart.totalPrice - discount).toFixed(2),
  );
  await req.cart.save();

  res.status(200).json({
    message: "Coupon applied successfully",
    data: req.cart,
  });
});
