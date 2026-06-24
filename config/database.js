const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose
    .connect(process.env.DB_URI)
    .then((conn) => {
      console.log(`DB connected: ${conn.connection.host}`);
    })
    .catch((err) => {
      console.log(`DB connection failed: ${err}`);
      process.exit(1);
    });
};
module.exports = connectDB;
