const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand required."],
      unique: [true, "Brand unique."],
      minLength: [3, "Brand name is too short."],
      maxLength: [32, "Brand name is too long."],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Brand", brandSchema);
