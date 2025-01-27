const { body, validationResult, param } = require("express-validator");
const {
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
} = require("../helpers/customErrors");
const mongoose = require("mongoose");
const User = require("../database/models/UserModel");

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
  param("id").custom((value) => mongoose.Types.ObjectId.isValid(value)),
]);

const validatePreRegisterInput = withValidationResult([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
]);

const validateRegisterInput = withValidationResult([
  body("firstname").notEmpty().withMessage("name is required"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be atleast 8 characters"),
]);


module.exports = {
  validateJobInput,
  validateIdParam,
  validatePreRegisterInput,
  validateRegisterInput
};
