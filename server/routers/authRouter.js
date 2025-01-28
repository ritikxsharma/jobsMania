const express = require("express");
const {
  register,
  login,
  preRegister,
  logout,
} = require("../controllers/authController");
const {
  validatePreRegisterInput,
  validateRegisterInput,
  validateLoginInput,
} = require("../middlewares/validator");

const router = express.Router();

router.route("/pre-register").post(validatePreRegisterInput, preRegister);
router.route("/register").post(validateRegisterInput, register);
router.route("/login").post(validateLoginInput, login);
router.route("/logout").get(logout);
module.exports = router;
