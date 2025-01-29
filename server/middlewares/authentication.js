const { UNAUTHORIZED_ERROR } = require("../helpers/customErrors");
const { validateToken } = require("../helpers/tokenManager");

const authenticateUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new UNAUTHORIZED_ERROR("Authentication Error");

    const decodedToken = validateToken(token)
    if(!decodedToken)   throw new UNAUTHORIZED_ERROR('Authentication Error')
    req.user = { id: decodedToken.userId, role: decodedToken.role }    
    next()
  } catch (error) {
    next(error);
  }
};

const hasValidPermission = (...roles) => {
  return (req, res, next) => {
    if(!roles.includes(req.user.role)){
      throw new UNAUTHORIZED_ERROR('not authorized to access')
    }
    next()
  }
}

module.exports = {
  authenticateUser,
  hasValidPermission
}

