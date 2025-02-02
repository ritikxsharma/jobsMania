const express = require("express");
const {
  getCurrentUser,
  updateUser,
  getApplicationStatus,
} = require("../controllers/userController");
const {
  authenticateUser,
  hasValidPermission,
  isTestUser,
} = require("../middlewares/authentication");
const { validateUpdateUserInput } = require("../middlewares/validator");
const upload = require("../middlewares/multer");

const router = express.Router();

router.route("/current-user").get(getCurrentUser);
router
  .route("/update-user")
  .patch(
    isTestUser,
    authenticateUser,
    upload.single("avatar"),
    validateUpdateUserInput,
    updateUser
  );
router
  .route("/admin/stats")
  .get(hasValidPermission("admin"), getApplicationStatus);

module.exports = router;
