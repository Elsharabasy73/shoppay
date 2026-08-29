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
  getLoggedInUser,
} = require("../controllers/userController");

const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  changeUserPasswordValidator,
} = require("../utils/validators/userValidator");

const router = express.Router();

router.get("/getMe", protect, getLoggedInUser, getUser);

// Only admin can access this route

router
  .route("/", protect, allowTo(["admin"]))
  .get(getUsers)
  .post(uploadBrandImage, resizeImage, createUserValidator, createUser);
router.use(protect, allowTo(["admin", "user"]));

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
