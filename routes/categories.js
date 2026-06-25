const express = require("express");

const router = express.Router();

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
