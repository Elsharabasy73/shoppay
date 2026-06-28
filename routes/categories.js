const express = require("express");

const router = express.Router();

const subCategoriesRouter = require("./subCategories");

const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories");

const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validators/categoryValidators");

// nested route for subCategories
router.use("/:categoryId/subCategories", subCategoriesRouter);

// routes

//router.route('/')get().post(createCategory);
router.post("/", createCategoryValidator, createCategory);
router.get("/", getCategories);
// router.get("/:id", getCategory);
// router.put("/:id", updateCategory);
// router.delete("/:id", deleteCategory);
router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);

module.exports = router;
