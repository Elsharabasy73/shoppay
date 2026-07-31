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
  cartItemIdValidator,
  updateCartItemQuantityValidator,
  applyCouponValidator,
} = require("../utils/validators/cartValidator");

const router = express.Router();

router.use(protect, allowTo(["user"]));

router
  .route("/")
  .get(getLoggedUserCart)
  .post(addProductToCartValidator, addProductToCart)
  .delete(clearCart);

router.put("/applyCoupon", applyCouponValidator, applyCoupon);

router
  .route("/:itemId")
  .put(updateCartItemQuantityValidator, updateCartItemQuantity)
  .delete(cartItemIdValidator, removeSpecificCartItem);

module.exports = router;
