const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "name required"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "email required"],
      unique: true,
      lowercase: true,
    },
    phone: String,
    otp: String,
    profileImg: String,

    password: {
      type: String,
      required: [true, "password required"],
      minlength: [6, "Too short password"],
    },
    passwordChangedAt: {
      type: Date,
      default: Date.now,
    },
    passwordResetCode: String,
    passwordResetExpires: Date,
    passwordResetVerified: Boolean,
    role: {
      type: String,
      enum: ["user", "manager", "admin"],
      default: "user",
    },
    active: {
      type: Boolean,
      default: true,
    },
    //child reference
    wishList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    addresses: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          default: () => new mongoose.Types.ObjectId(),
        },
        alias: String,
        city: String,
        country: String,
        address: String,
        zipCode: String,
        phone: String,
      },
    ],
  },
  { timestamps: true },
);

const setImageURL = (doc) => {
  if (doc.profileImg) {
    if (doc.profileImg.startsWith("http://") || doc.profileImg.startsWith("https://")) return;
    doc.profileImg = `${process.env.BASE_URL}/user/${doc.profileImg}`;
  }
};
// apply for find queries and save
userSchema.post("init", (doc) => {
  setImageURL(doc);
});
userSchema.post("save", (doc) => {
  setImageURL(doc);
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  // Hashing user password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Instance method: generate JWT for this user
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRATION_DURATION,
  });
};

// Instance method: compare plaintext password with hashed one
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
