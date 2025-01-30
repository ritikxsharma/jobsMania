const { body, validationResult, param } = require("express-validator");
const {
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  UNAUTHORIZED_ERROR,
} = require("../helpers/customErrors");
const mongoose = require("mongoose");
const User = require("../database/models/UserModel");
const Job = require("../database/models/JobModel");

const withValidationResult = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          const errorMessages = errors.array().map((err) => err.msg);
          if(errorMessages[0].startsWith('no job')){
            throw new NOT_FOUND_ERROR(errorMessages)
          }
          if(errorMessages[0].startsWith('not authorized')){
            throw new UNAUTHORIZED_ERROR(errorMessages)
          }
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
  param("id").custom(async(value, { req }) => {
    const isValidMongoId = mongoose.Types.ObjectId.isValid(value)
    if(!isValidMongoId) throw BAD_REQUEST_ERROR('invalid mongodb id')
    
    const job = await Job.findById(value)
    if(!job)  throw new NOT_FOUND_ERROR('no job found with associate id')
    
    const isAdmin = req.user.role
    const isOwner = req.user.id === job.createdBy.toString()

    if(!isAdmin || !isOwner)  throw new UNAUTHORIZED_ERROR('not authorized to access')
  }),
]);

const validatePreRegisterInput = withValidationResult([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
]);

const validateRegisterInput = withValidationResult([
  body("firstName").notEmpty().withMessage("firstname is required"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be atleast 8 characters"),
  body("location").notEmpty().withMessage("Location is required"),
]);

const validateLoginInput = withValidationResult([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("please enter email in a valid format"),
  body("password").notEmpty().withMessage("password is requried"),
]);

const validateUpdateUserInput = withValidationResult([
  body("firstName").notEmpty().withMessage('first name is required'),
  body("location").notEmpty().withMessage("Location is required"),
])

module.exports = {
  validateJobInput,
  validateIdParam,
  validatePreRegisterInput,
  validateRegisterInput,
  validateLoginInput,
  validateUpdateUserInput
};
