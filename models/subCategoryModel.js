const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "SubCategory required."],
      unique: [true, "SubCategory unique."],
      minLength: [3, "SubCategory name is too short."],
      maxLength: [32, "SubCategory name is too long."],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "SubCategory must belong to a category."],
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model("SubCategory", SubCategorySchema);
