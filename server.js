const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const app = express();

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`);
});
