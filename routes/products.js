const express = require("express");

const router = express.Router({ mergeParams: true });

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  setCategoryAndBrandToBody,
  createFilterObject,
} = require("../controllers/product");

const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/validators/productValidators");

// routes
router.post("/", setCategoryAndBrandToBody, createProductValidator, createProduct);
router.get("/", createFilterObject, getProducts);
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);

module.exports = router;
