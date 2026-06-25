const { check } = require("express-validator");
const { validateRequest } = require("../../middlewares/validatorMiddleware");

exports.getSubcategoryValidator = [
  check("id").isMongoId().withMessage("Invalid subcategory ID"),
  validateRequest,
];

exports.createSubcategoryValidator = [
  check("name").notEmpty().withMessage("Subcategory name is required"),
  check("category").isMongoId().withMessage("Invalid category ID"),
  validateRequest,
];

exports.updateSubcategoryValidator = [
  check("id").isMongoId().withMessage("Invalid subcategory ID"),
  check("name")
    .notEmpty()
    .withMessage("Subcategory name is required")
    .isLength({ min: 3 })
    .withMessage("Subcategory name must be at least 3 characters long")
    .isLength({ max: 50 })
    .withMessage("Subcategory name must be at most 50 characters long"),
  check("category").isMongoId().withMessage("Invalid category ID"),
  validateRequest,
];

exports.deleteSubcategoryValidator = [
  check("id").isMongoId().withMessage("Invalid subcategory ID"),
  validateRequest,
];
