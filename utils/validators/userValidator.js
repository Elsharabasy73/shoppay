const slugify = require("slugify");
const bcrypt = require("bcryptjs");
const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const User = require("../../models/userModel");

exports.getUserValidator = [
  check("id").isMongoId().withMessage("Invalid User id format"),
  validatorMiddleware,
];

exports.createUserValidator = [
  check("name")
    .notEmpty()
    .withMessage("The name is required")
    .isLength({ min: 3 })
    .withMessage("Too short User name")
    .isLength({ max: 60 })
    .withMessage("Too long User name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  check("email")
    .notEmpty()
    .withMessage("The email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .custom((val, { req }) =>
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("Email already in use"));
        }
      }),
    ),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  check("passwordConfirm")
    .notEmpty()
    .withMessage("Password confirmation is required")
    .custom((val, { req }) => {
      if (val !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  check("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("Invalid role value"),
  check("profileImg").optional(),
  check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA"]) //egypt and saudi arabia
    .withMessage("Invalid phone number"),
  validatorMiddleware,
];

exports.updateUserValidator = [
  check("id").isMongoId().withMessage("Invalid User id format"),
  body("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("email")
    .notEmpty()
    .withMessage("User email required")
    .isEmail()
    .withMessage("Invalid email address")
    .custom((val, { req }) =>
      User.findOne({ email: val }).then((user) => {
        if (user && user._id.toString() !== req.params.id) {
          return Promise.reject(new Error("Email already in use"));
        }
      }),
    ),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  check("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("Invalid role value"),
  check("profileImg").optional(),
  check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA"]) //egypt and saudi arabia
    .withMessage("Invalid phone number"),
  validatorMiddleware,
];

exports.deleteUserValidator = [
  check("id").isMongoId().withMessage("Invalid User id format"),
  validatorMiddleware,
];

exports.changeUserPasswordValidator = [
  check("id").isMongoId().withMessage("Invalid User id format"),
  check("currentPassword")
    .notEmpty()
    .withMessage("currentPassword is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  check("passwordConfirm")
    .notEmpty()
    .withMessage("passwordConfirm is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .custom(async (val, { req }) => {
      console.log(req.body);
      const user = await User.findById(req.params.id);
      if (!user) {
        throw new Error("There is no user for this id");
      }
      const isCorrectPassword = await bcrypt.compare(
        req.body.currentPassword,
        user.password,
      );

      if (!isCorrectPassword) {
        throw new Error("Passord Confirmation incorrect.");
      }

      if (val !== req.body.passwordConfirm) {
        throw new Error("Password don't match the confirmation password.");
      }
    }),
  validatorMiddleware,
];
