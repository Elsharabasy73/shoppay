const { check } = require("express-validator");
const { validateRequest } = require("../../middlewares/validatorMiddleware");

exports.getCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category ID"),
  validateRequest,
];

exports.createCategoryValidator = [
  check("name").notEmpty().withMessage("Category name is required"),
  validateRequest,
];

exports.updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category ID"),
  check("name")
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 3 })
    .withMessage("Category name must be at least 3 characters long")
    .isLength({ max: 50 })
    .withMessage("Category name must be at most 50 characters long"),
  validateRequest,
];

exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category ID"),
  validateRequest,
];
