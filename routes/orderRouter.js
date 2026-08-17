const express = require("express");

const {
  createCashOrder,
  filterOrdersForLoggedUser,
  getOrders,
  updateOrderToDelivered,
  checkoutSession,
} = require("../controllers/orderController");
const { createPaymobPayment } = require("../controllers/paymobController");

const router = express.Router();

const { protect, allowTo } = require("../middlewares/authMiddleware");

router.use(protect, allowTo(["user"]));

router.route("/:cartId").post(createCashOrder);
router.get("/", filterOrdersForLoggedUser, getOrders);

router.post("/:id/paymob", createPaymobPayment);
router.put("/:id/deliver", updateOrderToDelivered);

//stripe payment
router.get("/checkout-session/:cartId", checkoutSession);

module.exports = router;
