const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        color: String,
        price: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    shippingAddress: {
      details: String,
      phone: String,
      city: String,
      postalCode: String,
    },
    taxPrice: {
      type: Number,
      default: 0,
      min: 0,
    },
    shippingPrice: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalOrderPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentMethodType: {
      type: String,
      enum: ["cash", "card"],
      default: "cash",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: Date,
    paymob: {
      intentionId: String,
      orderId: Number,
      transactionId: Number,
      amountCents: Number,
      currency: String,
      status: {
        type: String,
        enum: ["not_started", "pending", "paid", "failed"],
        default: "not_started",
      },
      specialReference: String,
      initiatedAt: Date,
      lastWebhookAt: Date,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: Date,
  },
  { timestamps: true },
);

orderSchema.index({ "paymob.orderId": 1 }, { sparse: true, unique: true });
orderSchema.index(
  { "paymob.transactionId": 1 },
  { sparse: true, unique: true },
);

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name email phone profileImg",
  }).populate({
    path: "cartItems.product",
    select: "title price imageCover",
  });
  next();
});

module.exports = mongoose.model("Order", orderSchema);
