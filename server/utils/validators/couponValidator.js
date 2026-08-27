const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getCouponValidator = [
  check("id").isMongoId().withMessage("Invalid coupon id format"),
  validatorMiddleware,
];

exports.createCouponValidator = [
  check("name").notEmpty().withMessage("Coupon name required").trim(),
  check("expire")
    .notEmpty()
    .withMessage("Coupon expire time required")
    .isISO8601()
    .withMessage("Invalid coupon expire date"),
  check("discount")
    .notEmpty()
    .withMessage("Coupon discount value required")
    .isFloat({ gt: 0 })
    .withMessage("Coupon discount must be greater than 0"),
  validatorMiddleware,
];

exports.updateCouponValidator = [
  check("id").isMongoId().withMessage("Invalid coupon id format"),
  body("name").optional().notEmpty().withMessage("Coupon name required").trim(),
  body("expire")
    .optional()
    .isISO8601()
    .withMessage("Invalid coupon expire date"),
  body("discount")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Coupon discount must be greater than 0"),
  validatorMiddleware,
];

exports.deleteCouponValidator = [
  check("id").isMongoId().withMessage("Invalid coupon id format"),
  validatorMiddleware,
];
