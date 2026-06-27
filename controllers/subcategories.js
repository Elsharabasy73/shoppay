const slugify = require("slugify");
const asyncHandler = require("express-async-handler");

const SubcategoryModel = require("../models/subCategoryModel");
const AppError = require("../utils/apiError");

exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) {
    req.body.category = req.params.categoryId; // Assign categoryId from params if not provided in body
  }
  next();
};

//@desc Create a new subcategory
//@route POST /api/v1/subcategories
//@access Private
exports.createSubcategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;

  const subcategory = new SubcategoryModel({
    name,
    slug: slugify(name),
    category,
  });
  const doc = await subcategory.save();
  res.send(doc);
});

// nested route
// GET /api/v1/categories/:categoryId/subcategories
exports.createFilterObject = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObject = filterObject;
  next();
};

//@desc Get all subcategories
//@route GET /api/v1/subcategories
//@access Public
exports.getSubcategories = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 5;
  const skip = (page - 1) * limit;

  const subcategories = await SubcategoryModel.find(req.filterObject)
    .populate("category")
    .skip(skip)
    .limit(limit);
  res.status(200).json({ page: page, data: subcategories });
});

//@desc Get a single subcategory by ID
//@route GET /api/v1/subcategories/:id
//@access Public
exports.getSubcategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const subcategory = await SubcategoryModel.findById(id).populate("category");

  // Handle not found
  if (!subcategory) {
    return next(new AppError("Subcategory not found", 404));
  }

  // Return the subcategory
  res.status(200).json(subcategory);
});

//@desc Get subcategories by category
//@route GET /api/v1/categories/:categoryId/subcategories
//@access Public
exports.getSubcategoriesByCategory = asyncHandler(async (req, res, next) => {
  const { categoryId } = req.params;
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 5;
  const skip = (page - 1) * limit;

  const subcategories = await SubcategoryModel.find({ category: categoryId })
    .populate("category")
    .skip(skip)
    .limit(limit);

  res.status(200).json({ page: page, data: subcategories });
});

//@desc Update a subcategory
//@route PUT /api/v1/subcategories/:id
//@access Private
exports.updateSubcategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;

  const updatedSubcategory = await SubcategoryModel.findByIdAndUpdate(
    id,
    { name, slug: slugify(name), category },
    { new: true, runValidators: true },
  ).populate("category");

  if (!updatedSubcategory) {
    return next(new AppError("Subcategory not found", 404));
  }

  res.status(200).json(updatedSubcategory);
});

//@desc Delete a subcategory
//@route DELETE /api/v1/subcategories/:id
//@access Private
exports.deleteSubcategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const deletedSubcategory = await SubcategoryModel.findByIdAndDelete(id);

  if (!deletedSubcategory) {
    return next(new AppError("Subcategory not found", 404));
  }

  res.status(200).json({ message: "Subcategory deleted successfully" });
});
