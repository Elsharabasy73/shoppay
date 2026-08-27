const { body, check } = require("express-validator");

const validatorMiddleware = require("../../middlewares/validatorMiddleware");

const addressFields = [
  "alias",
  "city",
  "country",
  "address",
  "zipCode",
  "phone",
];

const addressPayloadValidator = [
  ...addressFields.map((field) =>
    body(field)
      .optional()
      .isString()
      .withMessage(`${field} must be a string`)
      .trim()
      .notEmpty()
      .withMessage(`${field} cannot be empty`),
  ),
  body().custom((value) => {
    if (!addressFields.some((field) => value[field] !== undefined)) {
      throw new Error("At least one address field is required");
    }
    return true;
  }),
];

exports.addAddressValidator = [...addressPayloadValidator, validatorMiddleware];

exports.updateAddressValidator = [
  check("addressId").isMongoId().withMessage("Invalid address id format"),
  ...addressPayloadValidator,
  validatorMiddleware,
];

exports.deleteAddressValidator = [
  check("addressId").isMongoId().withMessage("Invalid address id format"),
  validatorMiddleware,
];
