const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

const Order = require("../models/orderModel");
const ApiError = require("../utils/apiError");
const {
  buildCheckoutUrl,
  createIntention,
  toCents,
  verifyTransactionHmac,
} = require("../utils/paymob");

const splitCustomerName = (name = "Customer") => {
  const parts = name.trim().split(/\s+/);
  return {
    firstName: parts[0] || "Customer",
    lastName: parts.slice(1).join(" ") || "Customer",
  };
};

// @desc    Initialize a Paymob card payment for an existing order
// @route   POST /api/v1/orders/:id/paymob
// @access  Private/user
exports.createPaymobPayment = asyncHandler(async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return next(new ApiError("Invalid order id", 400));
  }

  // Ownership is checked on the server; the client cannot pay another user's order.
  const order = await Order.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!order) {
    return next(new ApiError("Order not found", 404));
  }
  if (order.isPaid) {
    return next(new ApiError("Order already paid", 400));
  }

  const phone =
    (order.shippingAddress && order.shippingAddress.phone) || req.user.phone;
  if (!phone) {
    return next(new ApiError("A phone number is required for payment", 400));
  }

  const amountCents = toCents(order.totalOrderPrice);
  const currency = process.env.PAYMOB_CURRENCY || "EGP";
  const specialReference = `${order._id}-${Date.now()}`;
  const { firstName, lastName } = splitCustomerName(req.user.name);

  // Paymob creates a client secret for its hosted card checkout page.
  const intention = await createIntention({
    amountCents,
    orderId: order._id.toString(),
    specialReference,
    billingData: {
      first_name: firstName,
      last_name: lastName,
      email: req.user.email,
      phone_number: phone,
    },
  });

  if (
    !intention.id ||
    !intention.intention_order_id ||
    !intention.client_secret
  ) {
    return next(new ApiError("Paymob returned an incomplete response", 502));
  }

  const checkoutUrl = buildCheckoutUrl(intention.client_secret);
  // Do not log checkoutUrl because it contains the Paymob client secret.

  // Store only references needed to match and validate Paymob's later webhook.
  order.paymentMethodType = "card";
  order.paymob = {
    intentionId: intention.id,
    orderId: intention.intention_order_id,
    amountCents,
    currency,
    status: "pending",
    specialReference,
    initiatedAt: new Date(),
  };
  await order.save();

  res.status(200).json({
    message: "Payment initialized successfully",
    data: {
      orderId: order._id,
      checkoutUrl,
      paymentStatus: order.paymob.status,
    },
  });
});

// @desc    Receive and verify Paymob's server-to-server transaction callback
// @route   POST /api/paymob/webhook
// @access  Public (authenticated by Paymob HMAC)
exports.handlePaymobWebhook = asyncHandler(async (req, res, next) => {
  const transaction = req.body && req.body.obj;

  if (req.body && req.body.type && req.body.type !== "TRANSACTION") {
    return res.status(200).json({ message: "Callback ignored" });
  }

  if (!verifyTransactionHmac(transaction, req.query.hmac)) {
    return next(new ApiError("Invalid Paymob webhook signature", 401));
  }

  const order = await Order.findOne({ "paymob.orderId": transaction.order.id });
  if (!order) {
    return next(new ApiError("Payment order not found", 404));
  }

  // These checks prevent a valid callback for another amount/integration being reused.
  if (
    Number(transaction.integration_id) !==
      Number(process.env.PAYMOB_INTEGRATION_ID) ||
    Number(transaction.amount_cents) !== order.paymob.amountCents ||
    transaction.currency !== order.paymob.currency
  ) {
    return next(new ApiError("Paymob payment details do not match", 400));
  }

  // A duplicate successful callback is valid and should not repeat the paid transition.
  if (order.isPaid) {
    return res.status(200).json({ message: "Payment already processed" });
  }

  const paymentSucceeded =
    transaction.success === true &&
    transaction.pending === false &&
    transaction.error_occured === false &&
    transaction.is_voided === false &&
    transaction.is_refunded === false;

  let paymentStatus = "failed";
  if (paymentSucceeded) paymentStatus = "paid";
  else if (transaction.pending) paymentStatus = "pending";

  const update = {
    paymentMethodType: "card",
    "paymob.status": paymentStatus,
    "paymob.transactionId": transaction.id,
    "paymob.lastWebhookAt": new Date(),
  };

  if (paymentSucceeded) {
    update.isPaid = true;
    update.paidAt = new Date();
  }

  // The isPaid condition makes simultaneous successful callbacks idempotent.
  await Order.findOneAndUpdate(
    { _id: order._id, isPaid: false },
    { $set: update },
    { runValidators: true },
  );

  res.status(200).json({ message: "Paymob callback processed" });
});
