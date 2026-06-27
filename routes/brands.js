const express = require("express");

const router = express.Router();

const {
  createBrand,
  getBrands,
  getBrand,
  updateBrand,
  deleteBrand,
} = require("../controllers/brands");

const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../utils/validators/brandValidators");

// routes
router.post("/", createBrandValidator, createBrand);
router.get("/", getBrands);
router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .put(updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);

module.exports = router;
