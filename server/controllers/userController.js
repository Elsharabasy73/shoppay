const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const { processAndUploadImage } = require("../utils/imageStorage");
const factory = require("./handlersFactory");
const User = require("../models/userModel");
const ApiError = require("../utils/apiError");

exports.uploadBrandImage = uploadSingleImage("profileImg");

// Image processing - storage agnostic (local vs cloudinary via STORAGE env)
exports.resizeImage = asyncHandler(async (req, res, next) => {
  if (req.file) {
    const filename = `user-${uuidv4()}-${Date.now()}.jpg`;
    const stored = await processAndUploadImage(req.file.buffer, filename, "user", {
      width: 600,
      height: 600,
      quality: 95,
    });
    // Save image into our db (filename for local, secure_url for cloudinary)
    req.body.profileImg = stored;
  }

  next();
});

// @desc    Get list of users
// @route   GET /api/v1/users
// @access  public
exports.getUsers = factory.getAll(User);

// @desc    Get specific user by id
// @route   GET /api/v1/users/:id
// @access  public
exports.getUser = factory.getOne(User);

// @desc    Create user
// @route   POST  /api/v1/users
// @access  Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
  if (req.body.role === "admin") {
    return next(new ApiError("Admins cannot create admin users. Allowed roles: user, manager", 403));
  }
  return factory.createOne(User)(req, res, next);
});

// @desc    Update specific user
// @route   PUT /api/v1/users/:id
// @access  Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  if (req.body.role === "admin") {
    return next(new ApiError("Admins cannot assign admin role. Allowed roles: user, manager", 403));
  }
  // hash password if provided via admin edit, avoid plaintext persistence (see CLAUDE.md known issue)
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 12);
    req.body.passwordChangedAt = Date.now();
    // remove passwordConfirm if present - not in schema
    delete req.body.passwordConfirm;
  }
  const document = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!document) {
    return next(new (require("../utils/apiError"))(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});

// @desc    change user password
// @route   PUT /api/v1/users/changePassword/:id
// @access  Private/Admin
exports.changeUserPassword = asyncHandler(async (req, res, next) => {
  const hashed = await bcrypt.hash(req.body.password, 12);
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { password: hashed, passwordChangedAt: Date.now() },
    { new: true },
  );

  if (!user) {
    return res
      .status(404)
      .json({ message: `No user for this id ${req.params.id}` });
  }

  res.status(200).json({ data: user });
});

// @desc    Delete specific user
// @route   DELETE /api/v1/users/:id
// @access  Private
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const document = await User.findByIdAndDelete(id);
  if (!document) {
    return next(new (require("../utils/apiError"))(`No document for this id ${id}`, 404));
  }
  const { deleteImage } = require("../utils/imageStorage");
  await deleteImage(document.profileImg, "user");
  res.status(204).send();
});

//@dosc    Get Logged in user data
//@route   GET /api/v1/users/me
//@access  Private
exports.getLoggedInUser = asyncHandler(async (req, res, next) => {
  req.params.id = req.user._id;
  next();
});
