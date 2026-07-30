const express = require("express");

const { protect, allowTo } = require("../middlewares/authMiddleware");
const {
  getCouponValidator,
  createCouponValidator,
  updateCouponValidator,
  deleteCouponValidator,
} = require("../utils/validators/couponValidator");
const {
  getCoupons,
  getCoupon,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} = require("../controllers/couponController");

const router = express.Router();

router.use(protect, allowTo(["admin", "manager"]));

router
  .route("/")
  .get(getCoupons)
  .post(createCouponValidator, createCoupon);

router
  .route("/:id")
  .get(getCouponValidator, getCoupon)
  .put(updateCouponValidator, updateCoupon)
  .delete(deleteCouponValidator, deleteCoupon);

module.exports = router;
