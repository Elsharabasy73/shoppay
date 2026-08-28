const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");

const factory = require("./handlersFactory");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const { processAndUploadImage } = require("../utils/imageStorage");
const Category = require("../models/categoryModel");

// Upload single image
exports.uploadCategoryImage = uploadSingleImage("image");

// Image processing - storage agnostic (local vs cloudinary via STORAGE env)
exports.resizeImage = asyncHandler(async (req, res, next) => {
  if (req.file) {
    const filename = `category-${uuidv4()}-${Date.now()}.jpg`;
    const stored = await processAndUploadImage(req.file.buffer, filename, "categories", {
      width: 600,
      height: 600,
      quality: 95,
    });
    // Save image into our db (filename for local, secure_url for cloudinary)
    req.body.image = stored;
  }

  next();
});

// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public
exports.getCategories = factory.getAll(Category);

// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public
exports.getCategory = factory.getOne(Category);

// @desc    Create category
// @route   POST  /api/v1/categories
// @access  Private
exports.createCategory = factory.createOne(Category);

// @desc    Update specific category
// @route   PUT /api/v1/categories/:id
// @access  Private
exports.updateCategory = factory.updateOne(Category);

// @desc    Delete specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const document = await Category.findByIdAndDelete(id);
  if (!document) {
    return next(new (require("../utils/apiError"))(`No document for this id ${id}`, 404));
  }
  const { deleteImage } = require("../utils/imageStorage");
  // Delete stored image (local or cloudinary) – never blocks response on failure
  await deleteImage(document.image, "categories");
  res.status(204).send();
});
