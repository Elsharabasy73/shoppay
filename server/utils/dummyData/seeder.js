const fs = require('fs');
require('colors');
const dotenv = require('dotenv');
const Product = require('../../models/productModel');
const dbConnection = require('../../config/database');

dotenv.config({ path: '../../config.env' });

// connect to DB
dbConnection();

// Read data
const products = JSON.parse(fs.readFileSync('./products.json'));


// Insert data into DB
const insertData = async () => {
  try {
    await Product.create(products);

    process.exit();
  } catch (error) {
  }
};

// Delete data from DB
const destroyData = async () => {
  try {
    await Product.deleteMany();
    process.exit();
  } catch (error) {
  }
};

// node seeder.js -d
if (process.argv[2] === '-i') {
  insertData();
} else if (process.argv[2] === '-d') {
  destroyData();
}
