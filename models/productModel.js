const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
      unique: [true, "Product title must be unique"],
      minLength: [3, "Product title must be at least 3 characters long"],
      maxLength: [100, "Product title must be at most 100 characters long"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      minLength: [
        20,
        "Product description must be at least 20 characters long",
      ],
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
      min: [0, "Product quantity cannot be negative"],
    },
    sold: {
      type: Number,
      default: 0,
      min: [0, "Product sold cannot be negative"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Product price cannot be negative"],
    },
    priceAfterDiscount: {
      type: Number,
      validate: {
        validator: function (value) {
          return value < this.price;
        },
        message:
          "Price after discount ({VALUE}) should be less than the original price",
      },
    },
    colors: [String],
    imageCover: {
      type: String,
      required: [true, "Product image cover is required"],
    },
    images: [String],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product category is required"],
    },
    subCategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory",
      },
    ],
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    ratingsAverage: {
      type: Number,
      min: [1, "Rating must be at least 1.0"],
      max: [5, "Rating must be at most 5.0"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

productSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = mongoose.model("Product", productSchema);
