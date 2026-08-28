const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");

const factory = require("./handlersFactory");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const { processAndUploadImage } = require("../utils/imageStorage");
const Brand = require("../models/brandModel");

// Upload single image
exports.uploadBrandImage = uploadSingleImage("image");

// Image processing - storage agnostic (local vs cloudinary via STORAGE env)
exports.resizeImage = asyncHandler(async (req, res, next) => {
  if (req.file) {
    const filename = `brand-${uuidv4()}-${Date.now()}.jpg`;
    const stored = await processAndUploadImage(req.file.buffer, filename, "brands", {
      width: 600,
      height: 600,
      quality: 95,
    });
    // Save image into our db (filename for local, secure_url for cloudinary)
    req.body.image = stored;
  }

  next();
});

// @desc    Get list of brands
// @route   GET /api/v1/brands
// @access  Public
exports.getBrands = factory.getAll(Brand);

// @desc    Get specific brand by id
// @route   GET /api/v1/brands/:id
// @access  Public
exports.getBrand = factory.getOne(Brand);

// @desc    Create brand
// @route   POST  /api/v1/brands
// @access  Private
exports.createBrand = factory.createOne(Brand);

// @desc    Update specific brand
// @route   PUT /api/v1/brands/:id
// @access  Private
exports.updateBrand = factory.updateOne(Brand);

// @desc    Delete specific brand
// @route   DELETE /api/v1/brands/:id
// @access  Private
exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const document = await Brand.findByIdAndDelete(id);
  if (!document) {
    return next(new (require("../utils/apiError"))(`No document for this id ${id}`, 404));
  }
  const { deleteImage } = require("../utils/imageStorage");
  await deleteImage(document.image, "brands");
  res.status(204).send();
});
