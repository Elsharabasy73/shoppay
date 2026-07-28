const slugify = require("slugify");
const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Review = require("../../models/reviewModel");

exports.getReviewValidator = [
  check("id").isMongoId().withMessage("Invalid Brand id format"),
  validatorMiddleware,
];

exports.createReviewValidator = [
  check("user").isMongoId().withMessage("Invalid User id format"),
  check("product")
    .isMongoId()
    .withMessage("Invalid Product id format")
    .custom((val, { req }) =>
      // Check if logged user create review before
      Review.findOne({ user: req.user._id, product: req.body.product }).then(
        (review) => {
          if (review) {
            return Promise.reject(
              new Error("You already created a review before"),
            );
          }
        },
      ),
    ),
  check("comment")
    .notEmpty()
    .withMessage("comment is required")
    .isLength({ min: 10, max: 500 })
    .withMessage("comment must be between 10 and 500 characters"),
  check("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("rating must be between 1 and 5"),
  validatorMiddleware,
];

exports.updateReviewValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Review id format")
    .custom((val, { req }) =>
      // Check if logged user create review before
      Review.findOne({ user: req.user._id, product: req.body.product }).then(
        (review) => {
          if (
            review &&
            review.user._id.toString() !== req.user._id.toString()
          ) {
            return Promise.reject(
              new Error("You can't update other user review"),
            );
          }
        },
      ),
    ),
  check("product").isMongoId().withMessage("Invalid Product id format"),
  check("user").isMongoId().withMessage("Invalid User id format"),
  body("comment")
    .notEmpty()
    .withMessage("comment is required")
    .isLength({ min: 10, max: 500 })
    .withMessage("comment must be between 10 and 500 characters"),
  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("rating must be between 1 and 5"),
  validatorMiddleware,
];

exports.deleteReviewValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Brand id format")
    .custom((val, { req }) => {
      // Check if logged user create review before
      if (req.user.role === "user") {
        return Review.findOne({
          user: req.user._id,
          product: req.body.product,
        }).then((review) => {
          if (review && review.user.toString() !== req.user._id.toString()) {
            return Promise.reject(
              new Error("You can't update other user review"),
            );
          }
        });
      }
    }),
  validatorMiddleware,
];
