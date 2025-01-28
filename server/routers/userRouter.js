const express = require("express");
const { getCurrentUser, updateUser, getApplicationStatus } = require("../controllers/userController");
const { authenticateUser, hasValidPermission } = require("../middlewares/authentication");
const { validateUpdateUserInput } = require("../middlewares/validator");

const router = express.Router();

router.route("/current-user").get(getCurrentUser);
router
  .route("/update-user")
  .post(authenticateUser, validateUpdateUserInput, updateUser);
router.route("/admin/stats").get(hasValidPermission('admin'), getApplicationStatus)

module.exports = router;
