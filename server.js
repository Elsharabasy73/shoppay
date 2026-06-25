//libraries
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config({ path: "config.env" });
const connectDB = require("./config/database");
const categoriesRouter = require("./routes/categories");
const AppError = require("./utils/apiError");
const globalErrorHandler = require("./middlewares/globalErrorHandler");

const app = express();

// Middleware
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`Mode: ${process.env.NODE_ENV}`);
}

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Routes
app.use("/api/v1/categories", categoriesRouter);

// Handle 404 errors for undefined routes
app.all("*", (req, res, next) => {
  const error = new AppError(
    `Can't find ${req.originalUrl} on this server!`,
    404,
  );
  next(error);
});

//error handling middleware
app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;
const server = app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Connect to database
connectDB();

// Handle rejections outside express
process.on("unhandledRejection", (err) => {
  console.log(`Unhandled Rejection: ${err.name} | ${err.message}`);
  // Close server so that it doesn't accept new requests and exit process
  // after making sure all existing requests are handled
  server.close(() => {
    console.log("Shutting down server due to unhandled promise rejection");
    process.exit(1);
  });
});
