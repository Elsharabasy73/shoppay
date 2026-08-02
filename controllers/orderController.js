const asyncHandler = require("express-async-handler");

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

// // @desc    update order to delivered
// // @route   PUT /api/v1/orders/:id
// // @access  Private/user-manager-admin
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
