const express = require("express");

const {
  createReviewValidator,
  updateReviewValidator,
  getReviewValidator,
  deleteReviewValidator,
} = require("../utils/validators/reviewValidator");

const {
  getReview,
  getReviews,
  createReview,
  updateReview,
  deleteReview,
  createFilterObj,
  setProductIdAndUserIdToBody,
} = require("../controllers/reviewController");

const { protect, allowTo } = require("../middlewares/authMiddleware");

const router = express.Router({ mergeParams: true });

// api/v1/:productId/reviews
//all commenting from here treated like / here

router
  .route("/")
  .get(createFilterObj, getReviews)
  .post(
    protect,
    allowTo("user"),
    setProductIdAndUserIdToBody,
    createReviewValidator,
    createReview,
  );
router
  .route("/:id")
  .get(getReviewValidator, getReview)
  .put(protect, allowTo("user"), updateReviewValidator, updateReview)
  .delete(
    protect,
    allowTo("user", "manager", "admin"),
    deleteReviewValidator,
    deleteReview,
  );

module.exports = router;
