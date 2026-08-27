const express = require("express");

const router = express.Router();

const {
  getLoggedUserWishList,
  addProductToWishList,
  removeProductFromWishList,
} = require("../controllers/wishListController");

const { protect, allowTo } = require("../middlewares/authMiddleware");

const {
  addWishListValidator,
  removeWishListValidator,
} = require("../utils/validators/wishListValidator");

router.get("/", protect, allowTo(["user"]), getLoggedUserWishList);

router.post(
  "/",
  protect,
  allowTo(["user"]),
  addWishListValidator,
  addProductToWishList,
);

router.delete(
  "/:productId",
  protect,
  allowTo(["user"]),
  removeWishListValidator,
  removeProductFromWishList,
);

module.exports = router;
