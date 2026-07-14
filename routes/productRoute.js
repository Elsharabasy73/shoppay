const express = require("express");
const { protect, allowTo } = require("../middlewares/authMiddleware");
const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/validators/productValidator");

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  resizeProductImages,
} = require("../controllers/productController");

const router = express.Router();

router
  .route("/")
  .get((req, res, next) => {
    console.log("req1", req.filterObj);
    next();
  }, getProducts)
  .post(
    protect,
    allowTo(["admin", "manager"]),
    uploadProductImages,
    resizeProductImages,
    createProductValidator,
    createProduct,
  );
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(
    protect,
    allowTo(["admin", "manager"]),
    uploadProductImages,
    resizeProductImages,
    updateProductValidator,
    updateProduct,
  )
  .delete(
    protect,
    allowTo(["admin", "manager"]),
    deleteProductValidator,
    deleteProduct,
  );

module.exports = router;
