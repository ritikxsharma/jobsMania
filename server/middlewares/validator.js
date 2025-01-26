const { body, validationResult, param } = require("express-validator");
const { BAD_REQUEST_ERROR } = require("../helpers/customErrors");
const mongoose = require("mongoose");

const withValidationResult = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          const errorMessages = errors.array().map((err) => err.msg);
          throw new BAD_REQUEST_ERROR(errorMessages);
        }        
        next();
      } catch (error) {
        next(error);
      }
    },
  ];
};

const validateJobInput = withValidationResult([
  body("company").notEmpty().withMessage("company is required"),
  body("position").notEmpty().withMessage("position is required"),
]);

const validateIdParam = withValidationResult([
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("invalid mongodb id"),
]);

module.exports = {
  validateJobInput,
  validateIdParam,
};
