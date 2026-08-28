const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");

const { uploadMixOfImages } = require("../middlewares/uploadImageMiddleware");
const { processAndUploadImage } = require("../utils/imageStorage");
const factory = require("./handlersFactory");
const Product = require("../models/productModel");

exports.uploadProductImages = uploadMixOfImages([
  {
    name: "imageCover",
    maxCount: 1,
  },
  {
    name: "images",
    maxCount: 5,
  },
]);

exports.resizeProductImages = asyncHandler(async (req, res, next) => {
  //1- Image processing for imageCover
  if (req.files && req.files.imageCover) {
    const imageCoverFileName = `product-${uuidv4()}-${Date.now()}-cover.jpg`;
    const stored = await processAndUploadImage(
      req.files.imageCover[0].buffer,
      imageCoverFileName,
      "products",
      { width: 2000, height: 1333, quality: 95 },
    );
    // Save image into our db (filename for local, secure_url for cloudinary)
    req.body.imageCover = stored;
  }
  //2- Image processing for images
  if (req.files && req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (img, index) => {
        const imageName = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpg`;
        const stored = await processAndUploadImage(img.buffer, imageName, "products", {
          width: 2000,
          height: 1333,
          quality: 95,
        });
        // Save image into our db
        req.body.images.push(stored);
      }),
    );
  }
  console.log(req.body);
  next();
});

// @desc    Get list of products
// @route   GET /api/v1/products
// @access  Public
exports.getProducts = factory.getAll(Product, "Products");

// @desc    Get specific product by id
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProduct = factory.getOne(Product, "reviews");

// @desc    Create product
// @route   POST  /api/v1/products
// @access  Private
exports.createProduct = factory.createOne(Product);
// @desc    Update specific product
// @route   PUT /api/v1/products/:id
// @access  Private
exports.updateProduct = factory.updateOne(Product);

// @desc    Delete specific product
// @route   DELETE /api/v1/products/:id
// @access  Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const document = await Product.findByIdAndDelete(id);
  if (!document) {
    return next(new (require("../utils/apiError"))(`No document for this id ${id}`, 404));
  }
  const { deleteImage, deleteImages } = require("../utils/imageStorage");
  // Delete cover + all gallery images (handles local and cloudinary via STORAGE)
  await deleteImage(document.imageCover, "products");
  await deleteImages(document.images, "products");
  res.status(204).send();
});
