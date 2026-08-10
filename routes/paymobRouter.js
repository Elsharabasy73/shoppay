const express = require("express");

const { handlePaymobWebhook } = require("../controllers/paymobController");

const router = express.Router();

// Paymob cannot send a ShopPay JWT. The HMAC query parameter protects this route.
router.post("/webhook", handlePaymobWebhook);

module.exports = router;
