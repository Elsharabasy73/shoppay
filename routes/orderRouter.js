const express = require("express");

const {
  createCashOrder,
  filterOrdersForLoggedUser,
  getOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
} = require("../controllers/orderController");

const router = express.Router();

const { protect, allowTo } = require("../middlewares/authMiddleware");

router.use(protect, allowTo("user"));

router.route("/:cartId").post(createCashOrder);
router.get("/", filterOrdersForLoggedUser, getOrders);

router.put("/:id/pay", updateOrderToPaid);
router.put("/:id/deliver", updateOrderToDelivered);

module.exports = router;
