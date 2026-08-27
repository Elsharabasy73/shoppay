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

const reviewRouter = require("./reviewRouter");

const router = express.Router();

router.use("/:productId/reviews", reviewRouter);

router
  .route("/")
  .get(getProducts)
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
