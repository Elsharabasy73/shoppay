const express = require("express");

const router = express.Router({ mergeParams: true });

const {
  setCategoryIdToBody,
  createSubcategory,
  createFilterObject,
  getSubcategories,
  getSubcategory,
  updateSubcategory,
  deleteSubcategory,
} = require("../controllers/subCategories");

const {
  getSubcategoryValidator,
  createSubcategoryValidator,
  updateSubcategoryValidator,
  deleteSubcategoryValidator,
} = require("../utils/validators/subcategoryValidators");

router.post(
  "/",
  setCategoryIdToBody,
  createSubcategoryValidator,
  createSubcategory,
);
router.get("/", createFilterObject, getSubcategories);
router
  .route("/:id")
  .get(getSubcategoryValidator, getSubcategory)
  .put(setCategoryIdToBody, updateSubcategoryValidator, updateSubcategory)
  .delete(deleteSubcategoryValidator, deleteSubcategory);

module.exports = router;
