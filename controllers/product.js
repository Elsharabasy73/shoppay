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
  const filterObject = {};
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
  // 1) Filtering
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  const queryStringObj = { ...req.query };
  const excludesFields = ["page", "sort", "limit", "fields", "keyword"];
  excludesFields.forEach((field) => delete queryStringObj[field]);

  // Apply filtration using [gte, gt, lte, lt]
  let queryStr = JSON.stringify(queryStringObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  // 2) Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) * 1 || 5;
  const skip = (page - 1) * limit;

  // Build query
  let mongooseQuery = ProductModel.find(JSON.parse(queryStr))
    .skip(skip)
    .limit(limit)
    .populate("category")
    .populate("subCategories")
    .populate("brand");

  // 3) Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    mongooseQuery = mongooseQuery.sort(sortBy);
  } else {
    mongooseQuery = mongooseQuery.sort("-createdAt");
  }

  // 4) Fields selection
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    mongooseQuery = mongooseQuery.select(fields);
  }

  // 5) Search
  if (req.query.keyword) {
    mongooseQuery = mongooseQuery.find({
      $or: [
        { title: { $regex: req.query.keyword, $options: "i" } },
        { description: { $regex: req.query.keyword, $options: "i" } },
      ],
    });
  }

  // Execute query
  const products = await mongooseQuery;

  res.status(200).json({ page, data: products });
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
