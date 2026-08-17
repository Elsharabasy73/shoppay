const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const ApiError = require("../utils/apiError");
const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const factory = require("./handlersFactory");

// @desc    Create cash order
// @route   POST /api/v1/orders/:cartId
// @access  Private/user
exports.createCashOrder = asyncHandler(async (req, res, next) => {
  const taxPrice = 0;
  const shippingPrice = 0;

  const cart = await Cart.findOne({
    _id: req.params.cartId,
    user: req.user._id,
  });

  if (!cart) {
    return next(new ApiError("Cart not found", 404));
  }

  if (cart.cartItems.length === 0) {
    return next(new ApiError("Cannot create an order from an empty cart", 400));
  }

  const cartPrice =
    cart.totalPriceAfterDiscount !== undefined
      ? cart.totalPriceAfterDiscount
      : cart.totalPrice;
  const totalOrderPrice = cartPrice + taxPrice + shippingPrice;

  const order = await Order.create({
    user: req.user._id,
    cartItems: cart.cartItems,
    shippingAddress: req.body.shippingAddress,
    taxPrice,
    shippingPrice,
    totalOrderPrice,
    paymentMethodType: "cash",
  });

  const bulkOperations = cart.cartItems.map((item) => ({
    updateOne: {
      filter: { _id: item.product },
      update: {
        $inc: {
          quantity: -item.quantity,
          sold: item.quantity,
        },
      },
    },
  }));

  await Product.bulkWrite(bulkOperations);
  await Cart.findByIdAndDelete(cart._id);

  res.status(201).json({
    message: "Order created successfully",
    data: order,
  });
});

// @desc    Get  orders
// @route   GET /api/v1/orders
// @access  Private/user-manager-admin
exports.filterOrdersForLoggedUser = asyncHandler(async (req, res, next) => {
  let filter = {};
  if (req.user.role === "user") filter = { user: req.user._id };
  req.filterObj = filter;

  next();
});

exports.getOrders = factory.getAll(Order);

// @desc    update order to paid
// @route   PUT /api/v1/orders/:id
// @access  Private/user-manager-admin
exports.updateOrderToPaid = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ApiError("Order not found", 404));
  }
  if (order.isPaid) {
    return next(new ApiError("Order already paid", 400));
  }
  order.isPaid = true;
  order.paidAt = new Date();
  await order.save();

  res.status(200).json({
    message: "Order paid successfully",
    data: order,
  });
});

// @desc    update order to delivered
// @route   PUT /api/v1/orders/:id
// @access  Private/user-manager-admin
exports.updateOrderToDelivered = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ApiError("Order not found", 404));
  }
  if (order.isDelivered) {
    return next(new ApiError("Order already delivered", 400));
  }
  order.isDelivered = true;
  order.deliveredAt = new Date();
  await order.save();

  res.status(200).json({
    message: "Order delivered successfully",
    data: order,
  });
});

// @desc    get checkout session for stripe and send it as response
// @route   GET /api/v1/orders/checkout-session/:cartId
// @access  Private/user
exports.checkoutSession = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findById(req.params.cartId);
  if (!cart) {
    return next(new ApiError("Cart not found", 404));
  }

  const totalPrice = cart.totalPrice || cart.totalPriceAfterDiscount;
  console.log("here1", Math.round(totalPrice * 100));
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: req.user.name,
            description: "description",
            images: ["images/1.png", "images/2.png"],
          },
          unit_amount: Math.round(totalPrice * 100), // price in cents, must be integer
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${req.protocol}://${req.hostname}/orders`,
    cancel_url: `${req.protocol}://${req.hostname}/cart`,
    payment_method_types: ["card"],
    customer_email: req.user.email,
    client_reference_id: req.params.cartId,
    metadata: {
      cartId: cart._id,
      // totalPrice: totalPrice,
    },
    // Provide a name (for example, hosted_web_0001) to label this Checkout integration and measure its conversion independently
    integration_identifier: `integrationidentifier`,
  });
  res.status(200).json({
    message: "Checkout session created successfully",
    data: session,
  });
});
