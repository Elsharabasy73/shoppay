const { check } = require("express-validator");
const { validateRequest } = require("../../middlewares/validatorMiddleware");

exports.getBrandValidator = [
  check("id").isMongoId().withMessage("Invalid brand ID"),
  validateRequest,
];

exports.createBrandValidator = [
  check("name").notEmpty().withMessage("Brand name is required"),
  validateRequest,
];

exports.updateBrandValidator = [
  check("id").isMongoId().withMessage("Invalid brand ID"),
  check("name")
    .notEmpty()
    .withMessage("Brand name is required")
    .isLength({ min: 3 })
    .withMessage("Brand name must be at least 3 characters long")
    .isLength({ max: 50 })
    .withMessage("Brand name must be at most 50 characters long"),
  validateRequest,
];

exports.deleteBrandValidator = [
  check("id").isMongoId().withMessage("Invalid brand ID"),
  validateRequest,
];
