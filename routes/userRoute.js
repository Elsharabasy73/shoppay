const express = require("express");

const {
  uploadBrandImage,
  resizeImage,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../services/userService");

const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
} = require("../utils/validators/userValidator");

const router = express.Router();

router
  .route("/")
  .get(getUsers)
  .post(uploadBrandImage, resizeImage, createUserValidator, createUser);
router
  .route("/:id")
  .get(getUserValidator, getUser)
  .put(updateUserValidator, uploadBrandImage, resizeImage, updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;
