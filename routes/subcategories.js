const express = require("express");

const router = express.Router({ mergeParams: true });

const {
  createSubcategory,
  getSubcategories,
  getSubcategory,
  getSubcategoriesByCategory,
  updateSubcategory,
  deleteSubcategory,
} = require("../controllers/subcategories");

const {
  getSubcategoryValidator,
  createSubcategoryValidator,
  updateSubcategoryValidator,
  deleteSubcategoryValidator,
} = require("../utils/validators/subcategoryValidators");

router.post("/", createSubcategoryValidator, createSubcategory);
router.get("/", getSubcategories);
router
  .route("/:id")
  .get(getSubcategoryValidator, getSubcategory)
  .put(updateSubcategoryValidator, updateSubcategory)
  .delete(deleteSubcategoryValidator, deleteSubcategory);

module.exports = router;
