const slugify = require("slugify");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const CategoryModel = require("../models/categories.js");

//@desc Create a new category
//@route POST /api/v1/categories
//@access Private
exports.createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = new CategoryModel({ name, slug: slugify(name) });
  const doc = await category.save();
  res.send(doc);
});

//@desc Get all categories
//@route GET /api/v1/categories
//@access Public
exports.getCategories = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;
  const categories = await CategoryModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ page: page, data: categories });
});

//@desc Get a single category by ID
//@route GET /api/v1/categories/:id
//@access Public
exports.getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const category = await CategoryModel.findById(id);

  // Handle not found
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  // Return the category
  res.status(200).json(category);
});

//@desc Update a category
//@route PUT /api/v1/categories/:id
//@access Private
exports.updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const updatedCategory = await CategoryModel.findByIdAndUpdate(
    id,
    { name, slug: slugify(name) },
    { new: true, runValidators: true },
  );

  if (!updatedCategory) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.status(200).json(updatedCategory);
});

//@desc Delete a category
//@route DELETE /api/v1/categories/:id
//@access Private
exports.deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedCategory = await CategoryModel.findByIdAndDelete(id);

  if (!deletedCategory) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.status(200).json({ message: "Category deleted successfully" });
});
