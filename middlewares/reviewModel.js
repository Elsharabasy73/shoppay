const mongoose = require("mongoose");
const Product = require("../models/productModel");
const User = require("../models/userModel");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a user"],
      validate: {
        validator: async function (value) {
          const userExists = await User.exists({ _id: value });
          return !!userExists;
        },
        message: "User does not exist",
      },
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Review must belong to a product"],
      validate: {
        validator: async function (value) {
          const productExists = await Product.exists({ _id: value });
          return !!productExists;
        },
        message: "Product does not exist",
      },
    },
    rating: {
      type: Number,
      required: true,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating must be at most 5"],
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// Prevent duplicated reviews from the same user for the same product.
reviewSchema.index({ user: 1, product: 1 }, { unique: true });

// Auto-populate review author data on find queries.
reviewSchema.pre(/^find/, function (next) {
  this.populate({ path: "user", select: "name profileImg" });
  next();
});

// Recalculate average rating and count for a product.
reviewSchema.statics.calcAverageRatingsAndQuantity = async function (
  productId,
) {
  const stats = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: "$product",
        avgRatings: { $avg: "$rating" },
        ratingsQuantity: { $sum: 1 },
      },
    },
  ]);

  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      ratingsAverage: stats[0].avgRatings,
      ratingsQuantity: stats[0].ratingsQuantity,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      ratingsAverage: 3,
      ratingsQuantity: 0,
    });
  }
};

reviewSchema.post("save", async function () {
  await this.constructor.calcAverageRatingsAndQuantity(this.product);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.reviewDoc = await this.findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  if (this.reviewDoc) {
    await this.reviewDoc.constructor.calcAverageRatingsAndQuantity(
      this.reviewDoc.product,
    );
  }
});

module.exports = mongoose.model("Review", reviewSchema);
