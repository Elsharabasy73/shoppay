const express = require("express");

const {
  addProductToCart,
  getLoggedUserCart,
  removeSpecificCartItem,
  clearCart,
  updateCartItemQuantity,
  applyCoupon,
} = require("../controllers/cartController");
const { protect, allowTo } = require("../middlewares/authMiddleware");
const {
  addProductToCartValidator,
  getLoggedUserCartValidator,
  removeSpecificCartItemValidator,
  clearCartValidator,
  updateCartItemQuantityValidator,
  applyCouponValidator,
} = require("../utils/validators/cartValidator");

const router = express.Router();

router.use(protect, allowTo(["user"]));

router
  .route("/")
  .get(getLoggedUserCartValidator, getLoggedUserCart)
  .post(addProductToCartValidator, addProductToCart)
  .delete(clearCartValidator, clearCart);

router.put("/applyCoupon", applyCouponValidator, applyCoupon);

router
  .route("/:itemId")
  .put(updateCartItemQuantityValidator, updateCartItemQuantity)
  .delete(removeSpecificCartItemValidator, removeSpecificCartItem);

module.exports = router;
