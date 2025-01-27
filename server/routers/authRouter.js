const express = require("express");
const { register, login, preRegister } = require("../controllers/authController");
const { validatePreRegisterInput } = require("../middlewares/validator");

const router = express.Router();

router.route("/pre-register").post(validatePreRegisterInput, preRegister);
router.route("/register").post(register);
router.route("/login").post(login);

module.exports = router;
