const express = require('express');
const { protect, allowTo } = require('../middlewares/authMiddleware');
const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require('../utils/validators/brandValidator');

const {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
  uploadBrandImage,
  resizeImage,
} = require('../controllers/brandController');

const router = express.Router();

router
  .route('/')
  .get(getBrands)
  .post(
    protect,
    allowTo(['admin', 'manager']),
    uploadBrandImage,
    resizeImage,
    createBrandValidator,
    createBrand,
  );
router
  .route('/:id')
  .get(getBrandValidator, getBrand)
  .put(
    protect,
    allowTo(['admin', 'manager']),
    uploadBrandImage,
    resizeImage,
    updateBrandValidator,
    updateBrand,
  )
  .delete(
    protect,
    allowTo(['admin', 'manager']),
    deleteBrandValidator,
    deleteBrand,
  );

module.exports = router;
