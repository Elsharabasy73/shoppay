const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 3001;

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`Mode: ${process.env.NODE_ENV}`);
}

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose
  .connect(process.env.DB_URI)
  .then((conn) => {
    console.log(`DB connected: ${conn.connection.host}`);
  })
  .catch((err) => {
    console.log(`DB connection failed: ${err}`);
    process.exit(1);
  });
