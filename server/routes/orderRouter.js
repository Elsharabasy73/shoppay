const express = require("express");

const {
  createCashOrder,
  filterOrdersForLoggedUser,
  getOrders,
  getOrder,
  updateOrderToDelivered,
  updateOrderToPaid,
  // checkoutSession, // DISABLED: Stripe - uncomment when STRIPE_SECRET is set
} = require("../controllers/orderController");
// const { createPaymobPayment } = require("../controllers/paymobController"); // DISABLED: Paymob - uncomment when PAYMOB_* env is set

const router = express.Router();

const { protect, allowTo } = require("../middlewares/authMiddleware");

router.use(protect);

// stripe checkout must be before `/:id` else it is captured as an id
// router.get("/checkout-session/:cartId", allowTo(["user"]), checkoutSession);

router.get(
  "/",
  allowTo(["user", "admin", "manager"]),
  filterOrdersForLoggedUser,
  getOrders,
);
router.get("/:id", allowTo(["user", "admin", "manager"]), getOrder);

router.route("/:cartId").post(allowTo(["user"]), createCashOrder);

// router.post("/:id/paymob", allowTo(["user"]), createPaymobPayment);
router.put(
  "/:id/deliver",
  allowTo(["admin", "manager"]),
  updateOrderToDelivered,
);
router.put("/:id/pay", allowTo(["admin", "manager"]), updateOrderToPaid);

module.exports = router;
