const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose.connect(process.env.DB_URI).then((conn) => {
  });
  // .catch((err) => {
  //   console.error(`Database Error: ${err}`);
  //   process.exit(1);
  // });
};

module.exports = dbConnection;
