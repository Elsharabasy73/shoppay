const express = require("express");

const {
  createCashOrder,
  filterOrdersForLoggedUser,
  getOrders,
  getOrder,
  updateOrderToDelivered,
  checkoutSession,
} = require("../controllers/orderController");
const { createPaymobPayment } = require("../controllers/paymobController");

const router = express.Router();

const { protect, allowTo } = require("../middlewares/authMiddleware");

router.use(protect, allowTo(["user", "admin"]));

router.get("/", filterOrdersForLoggedUser, getOrders);
router.route("/:cartId").post(createCashOrder);

router.post("/:id/paymob", createPaymobPayment);
router.put("/:id/deliver", updateOrderToDelivered);

router.get("/:id", getOrder);
//stripe payment
router.get("/checkout-session/:cartId", checkoutSession);


module.exports = router;
