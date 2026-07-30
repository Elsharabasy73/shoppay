const express = require("express");

const {
  getLoggedUserAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} = require("../controllers/addressController");
const { protect, allowTo } = require("../middlewares/authMiddleware");
const {
  addAddressValidator,
  updateAddressValidator,
  deleteAddressValidator,
} = require("../utils/validators/addressValidator");

const router = express.Router();

router.use(protect, allowTo(["user"]));

router
  .route("/")
  .get(getLoggedUserAddresses)
  .post(addAddressValidator, addAddress);

router
  .route("/:addressId")
  .put(updateAddressValidator, updateAddress)
  .delete(deleteAddressValidator, deleteAddress);

module.exports = router;
