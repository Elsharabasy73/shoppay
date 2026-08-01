const express = require("express");

const {
  createCashOrder,
  filterOrdersForLoggedUser,
  getOrders,
} = require("../controllers/orderController");

const router = express.Router();

const { protect, allowTo } = require("../middlewares/authMiddleware");

router.use(protect, allowTo("user"));

router.route("/:cartId").post(createCashOrder);
router.get("/", filterOrdersForLoggedUser, getOrders);

module.exports = router;
