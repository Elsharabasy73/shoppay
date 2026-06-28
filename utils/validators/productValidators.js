const { check, body } = require("express-validator");
const { validateRequest } = require("../../middlewares/validatorMiddleware");
const CategoryModel = require("../../models/categoryModel");
const subcategoryModel = require("../../models/subCategoryModel");

exports.getProductValidator = [
  check("id").isMongoId().withMessage("Invalid product ID"),
  validateRequest,
];

exports.createProductValidator = [
  check("title").notEmpty().withMessage("Product title is required"),
  check("title")
    .isLength({ min: 3 })
    .withMessage("Product title must be at least 3 characters long"),
  check("description")
    .notEmpty()
    .withMessage("Product description is required"),
  check("description")
    .isLength({ min: 20 })
    .withMessage("Product description must be at least 20 characters long"),
  check("quantity")
    .notEmpty()
    .withMessage("Product quantity is required")
    .isInt({ min: 0 })
    .withMessage("Product quantity must be a non-negative integer"),
  check("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isFloat({ min: 0 })
    .withMessage("Product price must be a non-negative number"),
  check("priceAfterDiscount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price after discount must be a non-negative number"),
  body("priceAfterDiscount").custom((value, { req }) => {
    if (
      value &&
      req.body.price &&
      parseFloat(value) >= parseFloat(req.body.price)
    ) {
      throw new Error(
        "Price after discount must be less than the original price",
      );
    }
    return true;
  }),
  check("imageCover").notEmpty().withMessage("Product image cover is required"),
  check("category")
    .isMongoId()
    .withMessage("Invalid category ID")
    .custom((categoryId) =>
      CategoryModel.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(new Error("Category not found"));
        }
      }),
    ),
  check("subCategories")
    .optional()
    .isArray()
    .withMessage("Subcategories must be an array of IDs")
    .custom((subCategoriesIds) =>
      subcategoryModel
        .find({ _id: { $exists: true, $in: subCategoriesIds } })
        .then((foundSubcategories) => {
          const foundIds = foundSubcategories.map((s) => s._id.toString());
          const missing = subCategoriesIds.filter(
            (id) => !foundIds.includes(id.toString()),
          );
          if (missing.length) {
            return Promise.reject(
              new Error(`Subcategory IDs not found: ${missing.join(", ")}`),
            );
          }
        }),
    ),
  check("subCategories.*")
    .optional()
    .isMongoId()
    .withMessage("Invalid subcategory ID in subCategories array"),
  check("brand").optional().isMongoId().withMessage("Invalid brand ID"),
  validateRequest,
];

exports.updateProductValidator = [
  check("id").isMongoId().withMessage("Invalid product ID"),
  check("title")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Product title must be at least 3 characters long"),
  check("description")
    .optional()
    .isLength({ min: 20 })
    .withMessage("Product description must be at least 20 characters long"),
  check("quantity")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Product quantity must be a non-negative integer"),
  check("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Product price must be a non-negative number"),
  check("priceAfterDiscount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price after discount must be a non-negative number"),
  body("priceAfterDiscount")
    .optional()
    .custom((value, { req }) => {
      if (
        value &&
        req.body.price &&
        parseFloat(value) >= parseFloat(req.body.price)
      ) {
        throw new Error(
          "Price after discount must be less than the original price",
        );
      }
      return true;
    }),
  check("category").optional().isMongoId().withMessage("Invalid category ID"),
  check("subCategories")
    .optional()
    .isArray()
    .withMessage("Subcategories must be an array of IDs"),
  check("subCategories.*")
    .optional()
    .isMongoId()
    .withMessage("Invalid subcategory ID in subCategories array"),
  check("brand").optional().isMongoId().withMessage("Invalid brand ID"),
  validateRequest,
];

exports.deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid product ID"),
  validateRequest,
];
