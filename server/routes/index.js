const categoryRoute = require("./categoryRoute");
const subCategoryRoute = require("./subCategoryRoute");
const brandRoute = require("./brandRoute");
const productRoute = require("./productRoute");
const userRoute = require("./userRoute");
const authRoute = require("./authRouter");
const reviewRouter = require("./reviewRouter");
const wishlistRouter = require("./wishListRouter");
const addressRouter = require("./addressRouter");
const couponRouter = require("./couponRouter");
const cartRouter = require("./cartRouter");
const orderRouter = require("./orderRouter");
const paymobRouter = require("./paymobRouter");

const mountRoutes = (app) => {
  app.use("/api/v1/categories", categoryRoute);
  app.use("/api/v1/subcategories", subCategoryRoute);
  app.use("/api/v1/brands", brandRoute);
  app.use("/api/v1/products", productRoute);
  app.use("/api/v1/users", userRoute);
  app.use("/api/v1/auth", authRoute);
  app.use("/api/v1/reviews", reviewRouter);
  app.use("/api/v1/wishlist", wishlistRouter);
  app.use("/api/v1/addresses", addressRouter);
  app.use("/api/v1/coupons", couponRouter);
  app.use("/api/v1/cart", cartRouter);
  app.use("/api/v1/orders", orderRouter);
  // This path matches PAYMOB_NOTIFICATION_URL in config.env.
  app.use("/api/paymob", paymobRouter);
};

module.exports = mountRoutes;
