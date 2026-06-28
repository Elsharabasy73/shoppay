const slugify = require("slugify");
const asyncHandler = require("express-async-handler");

const ProductModel = require("../models/productModel");
const AppError = require("../utils/apiError");

// When product is nested under category or brand, set them to body
exports.setCategoryAndBrandToBody = (req, res, next) => {
  if (!req.body.category && req.params.categoryId)
    req.body.category = req.params.categoryId;
  if (!req.body.brand && req.params.brandId)
    req.body.brand = req.params.brandId;
  next();
};

// create filter object for listing (supports nested routes)
exports.createFilterObject = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject.category = req.params.categoryId;
  if (req.params.brandId) filterObject.brand = req.params.brandId;
  req.filterObject = filterObject;
  next();
};

//@desc Create a new product
//@route POST /api/v1/products
//@access Private
exports.createProduct = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    quantity,
    price,
    priceAfterDiscount,
    colors,
    imageCover,
    images,
    category,
    subCategories,
    brand,
  } = req.body;

  const product = new ProductModel({
    title,
    slug: slugify(title),
    description,
    quantity,
    price,
    priceAfterDiscount,
    colors,
    imageCover,
    images,
    category,
    subCategories,
    brand,
  });

  const doc = await product.save();
  res.status(201).json(doc);
});

//@desc Get all products
//@route GET /api/v1/products
//@access Public
exports.getProducts = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const products = await ProductModel.find(req.filterObject || {})
    .populate("category")
    .populate("subCategories")
    .populate("brand")
    .skip(skip)
    .limit(limit);

  res.status(200).json({ page: page, data: products });
});

//@desc Get a single product by ID
//@route GET /api/v1/products/:id
//@access Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await ProductModel.findById(id)
    .populate("category")
    .populate("subCategories")
    .populate("brand");

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  res.status(200).json(product);
});

//@desc Update a product
//@route PUT /api/v1/products/:id
//@access Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  // If title updated, update slug
  if (req.body.title) req.body.slug = slugify(req.body.title);

  const updatedProduct = await ProductModel.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  })
    .populate("category")
    .populate("subCategories")
    .populate("brand");

  if (!updatedProduct) {
    return next(new AppError("Product not found", 404));
  }

  res.status(200).json(updatedProduct);
});

//@desc Delete a product
//@route DELETE /api/v1/products/:id
//@access Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const deletedProduct = await ProductModel.findByIdAndDelete(id);

  if (!deletedProduct) {
    return next(new AppError("Product not found", 404));
  }

  res.status(200).json({ message: "Product deleted successfully" });
});
