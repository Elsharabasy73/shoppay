const crypto = require("crypto");
const axios = require("axios");

const ApiError = require("./apiError");

const PAYMOB_INTENTION_URL = "https://accept.paymob.com/v1/intention/";
const PAYMOB_CHECKOUT_URL = "https://eg.checkout.paymob.com/";

const getRequiredEnv = (name) => {
  const value = process.env[name];
  if (!value) {
    throw new ApiError(`${name} is not configured`, 500);
  }
  return value;
};

// Paymob expects money in the smallest currency unit (100 piastres = 1 EGP).
exports.toCents = (amount) => {
  const amountCents = Math.round(Number(amount) * 100);

  if (!Number.isSafeInteger(amountCents) || amountCents <= 0) {
    throw new ApiError("Order has an invalid payment amount", 400);
  }

  return amountCents;
};

// Step 1: create an intention that represents one ShopPay order at Paymob.
exports.createIntention = async ({
  amountCents,
  billingData,
  orderId,
  specialReference,
}) => {
  const integrationId = Number(process.env.PAYMOB_INTEGRATION_ID);

  if (!Number.isSafeInteger(integrationId)) {
    throw new ApiError("PAYMOB_INTEGRATION_ID must be a number", 500);
  }

  try {
    const response = await axios.post(
      PAYMOB_INTENTION_URL,
      {
        amount: amountCents,
        currency: process.env.PAYMOB_CURRENCY || "EGP",
        payment_methods: [integrationId],
        // A single item keeps Paymob's total exactly equal to the order total.
        items: [
          {
            name: `ShopPay order ${orderId}`,
            amount: amountCents,
            description: "ShopPay order payment",
            quantity: 1,
          },
        ],
        billing_data: billingData,
        special_reference: specialReference,
        expiration: Number(process.env.PAYMOB_EXPIRATION_SECONDS || 3600),
        notification_url: getRequiredEnv("PAYMOB_NOTIFICATION_URL"),
        redirection_url: getRequiredEnv("PAYMOB_REDIRECTION_URL"),
      },
      {
        headers: {
          Authorization: `Token ${process.env.PAYMOB_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 15000,
      },
    );

    return response.data;
  } catch (error) {
    if (error instanceof ApiError) throw error;

    // Do not expose Paymob's full response or credentials to the API client.
    const responseData = error.response && error.response.data;
    const message =
      (responseData && responseData.detail) || "Could not initialize payment";
    throw new ApiError(message, 502);
  }
};

// Step 2: send this URL to the frontend, which redirects the customer to Paymob.
exports.buildCheckoutUrl = (clientSecret) => {
  const publicKey = encodeURIComponent(process.env.PAYMOB_PUBLIC_KEY);
  const encodedClientSecret = encodeURIComponent(clientSecret);
  return `${PAYMOB_CHECKOUT_URL}?publicKey=${publicKey}&clientSecret=${encodedClientSecret}`;
};

const getTransactionHmacValues = (transaction) => [
  transaction.amount_cents,
  transaction.created_at,
  transaction.currency,
  transaction.error_occured,
  transaction.has_parent_transaction,
  transaction.id,
  transaction.integration_id,
  transaction.is_3d_secure,
  transaction.is_auth,
  transaction.is_capture,
  transaction.is_refunded,
  transaction.is_standalone_payment,
  transaction.is_voided,
  transaction.order && transaction.order.id,
  transaction.owner,
  transaction.pending,
  transaction.source_data && transaction.source_data.pan,
  transaction.source_data && transaction.source_data.sub_type,
  transaction.source_data && transaction.source_data.type,
  transaction.success,
];

// Step 3: Paymob signs callback fields with HMAC-SHA512. Verify before any update.
exports.verifyTransactionHmac = (transaction, providedHmac) => {
  if (
    !transaction ||
    typeof providedHmac !== "string" ||
    !/^[a-f\d]{128}$/i.test(providedHmac)
  ) {
    return false;
  }

  const values = getTransactionHmacValues(transaction);
  if (values.some((value) => value === undefined || value === null)) {
    return false;
  }

  const calculatedHmac = crypto
    .createHmac("sha512", getRequiredEnv("PAYMOB_HMAC_KEY"))
    .update(values.map(String).join(""))
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(calculatedHmac, "hex"),
    Buffer.from(providedHmac, "hex"),
  );
};
