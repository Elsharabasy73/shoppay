const express = require("express");
const { protect, allowTo } = require("../middlewares/authMiddleware");

const {
  uploadBrandImage,
  resizeImage,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  changeUserPassword,
} = require("../services/userService");

const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  changeUserPasswordValidator,
} = require("../utils/validators/userValidator");

const router = express.Router();

router.use(protect, allowTo(["admin"]));

router
  .route("/")
  .get(getUsers)
  .post(uploadBrandImage, resizeImage, createUserValidator, createUser);
router
  .route("/:id")
  .get(getUserValidator, getUser)
  .put(updateUserValidator, uploadBrandImage, resizeImage, updateUser)
  .delete(deleteUserValidator, deleteUser);

router.put(
  "/changePassword/:id",
  changeUserPasswordValidator,
  changeUserPassword,
);
module.exports = router;
