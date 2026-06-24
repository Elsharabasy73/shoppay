//libraries
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config({ path: "config.env" });
const connectDB = require("./config/database");
const categoriesRouter = require("./routes/categories");

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
  const error = new Error(`Can't find ${req.originalUrl} on this server!`);
  next(error);
});

//error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err });
});

const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Connect to database
connectDB();
