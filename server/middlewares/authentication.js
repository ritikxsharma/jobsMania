const {
  UNAUTHORIZED_ERROR,
  BAD_REQUEST_ERROR,
} = require("../helpers/customErrors");
const { validateToken } = require("../helpers/tokenManager");

const authenticateUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new UNAUTHORIZED_ERROR("Authentication Error");

    const decodedToken = validateToken(token);
    if (!decodedToken) throw new UNAUTHORIZED_ERROR("Authentication Error");

    const testUser = decodedToken.userId === "679f6789058453c420b656de";
    req.user = { id: decodedToken.userId, role: decodedToken.role, testUser };

    next();
  } catch (error) {
    error.message = "Authentication error. Please try again!";
    next(error);
  }
};

const hasValidPermission = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UNAUTHORIZED_ERROR("not authorized to access");
    }
    next();
  };
};

const isTestUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new BAD_REQUEST_ERROR("Test User. Read Only...");
  }
  next();
};

module.exports = {
  authenticateUser,
  hasValidPermission,
  isTestUser,
};
