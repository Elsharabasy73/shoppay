const path = require("path");

const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const rateLimiter = require("express-rate-limit");
//prevent http param pollution
const hpp = require("hpp");
//prevent mongodb injection
//ex: emai: "$gt:''""
const mongosanitize = require("express-mongo-sanitize");
//prevent xss(cross site scripting)
//ex: name:"<script>alert('xss')</script>"
const xss = require("xss-clean");

dotenv.config({ path: "config.env" });
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddleware");
const dbConnection = require("./config/database");
const mountRoutes = require("./routes");
const { webhookCheckout } = require("./controllers/orderController");
const { startOrphanCleanupSchedule } = require("./utils/cleanupOrphanImages");

// Connect with db
dbConnection();

// Orphan image cleanup – runs every 4h, deletes files in uploads/* that are no longer
// referenced in DB (products/brands/categories/user). See utils/cleanupOrphanImages.js
startOrphanCleanupSchedule(4 * 60 * 60 * 1000);

// express app
const app = express();

//hpp
app.use(
  hpp({
    whitelist: ["price", "quantity", "name", "images", "title", "price"],
  }),
);

//sanitize input data
app.use(mongosanitize());
app.use(xss());

//Stripe webhook
app.post(
  "/webhook-checkout",
  express.raw({ type: "application/json" }),
  webhookCheckout,
);

// Middlewares
// CORS_ORIGIN is a comma-separated allowlist; leave it unset in development.
app.use(
  cors({
    origin: process.env.CORS_ORIGIN
      ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
      : true,
  }),
);
app.use(express.json({ limit: "20kb" }));
app.use(express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later",
});

app.use("/api", limiter);

// Mount Routes
mountRoutes(app);

//test route
app.get("/test", (req, res) => {
  res.json({ message: "Hello World" });
});

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handling middleware for express
app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
});

// Handle rejection outside express
process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});
