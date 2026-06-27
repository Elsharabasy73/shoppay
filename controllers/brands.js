const slugify = require("slugify");
const asyncHandler = require("express-async-handler");

const BrandModel = require("../models/brandsModel");
const AppError = require("../utils/apiError");

//@desc Create a new brand
//@route POST /api/v1/brands
//@access Private
exports.createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const brand = new BrandModel({ name, slug: slugify(name) });
  const doc = await brand.save();
  res.send(doc);
});

//@desc Get all brands
//@route GET /api/v1/brands
//@access Public
exports.getBrands = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 5;
  const skip = (page - 1) * limit;
  const brands = await BrandModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ page: page, data: brands });
});

//@desc Get a single brand by ID
//@route GET /api/v1/brands/:id
//@access Public
exports.getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const brand = await BrandModel.findById(id);

  // Handle not found
  if (!brand) {
    return next(new AppError("Brand not found", 404));
  }

  // Return the brand
  res.status(200).json(brand);
});

//@desc Update a brand
//@route PUT /api/v1/brands/:id
//@access Private
exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const updatedBrand = await BrandModel.findByIdAndUpdate(
    id,
    { name, slug: slugify(name) },
    { new: true, runValidators: true },
  );

  if (!updatedBrand) {
    return next(new AppError("Brand not found", 404));
  }

  res.status(200).json(updatedBrand);
});

//@desc Delete a brand
//@route DELETE /api/v1/brands/:id
//@access Private
exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const deletedBrand = await BrandModel.findByIdAndDelete(id);

  if (!deletedBrand) {
    return next(new AppError("Brand not found", 404));
  }

  res.status(200).json({ message: "Brand deleted successfully" });
});
