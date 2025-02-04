const express = require("express");
const {
  getCurrentUser,
  updateUser,
  getApplicationStatus,
  generateUploadURL,
} = require("../controllers/userController");
const {
  authenticateUser,
  hasValidPermission,
  isTestUser,
} = require("../middlewares/authentication");
const { validateUpdateUserInput } = require("../middlewares/validator");

const router = express.Router();

router.route('/generate-upload-url').get(generateUploadURL)
router.route("/current-user").get(getCurrentUser);
router
  .route("/update-user")
  .patch(
    isTestUser,
    authenticateUser,
    validateUpdateUserInput,
    updateUser
  );
router
  .route("/admin/stats")
  .get(hasValidPermission("admin"), getApplicationStatus);

module.exports = router;
