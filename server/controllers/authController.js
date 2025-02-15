const HTTP_Status = require("../helpers/statusCodes");
const {
  BAD_REQUEST_ERROR,
  UNAUTHORIZED_ERROR,
} = require("../helpers/customErrors");
const User = require("../database/models/UserModel");
const sendEmail = require("../aws/emailService");
const { generateToken, validateToken } = require("../helpers/tokenManager");
const {
  hashPassword,
  validatePassword,
} = require("../helpers/passwordManager");
const jwt = require("jsonwebtoken");

const preRegister = async (req, res, next) => {
  try {
    const { email, baseURL } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      throw new BAD_REQUEST_ERROR(
        "email/user already exists",
        HTTP_Status.BAD_REQUEST
      );
    }

    const token = generateToken({ email });

    await sendEmail(email, token, baseURL);

    res.status(HTTP_Status.OK).json({ message: "email sent", token });
  } catch (error) {
    error.message =
      "Unable to send verification link. Please try again later or try using another mail.";
    next(error);
  }
};

const validateEmail = async (req, res, next) => {
  try {
    const decodedToken = validateToken(req.body.token);

    const user = await User.findOne({ email: decodedToken.email });
    if (user) {
      throw new BAD_REQUEST_ERROR("User/email already exists");
    }

    res
      .status(HTTP_Status.OK)
      .json({ message: "Verification successful", email: decodedToken.email });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      error.message = "Link Expired.";
    }
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;

    const newUser = await new User(req.body).save();

    res
      .status(HTTP_Status.CREATED)
      .json({ message: "User created", user: newUser });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new UNAUTHORIZED_ERROR("user/email is not registered");
    }

    if (!(await validatePassword(req.body.password, user.password))) {
      throw new UNAUTHORIZED_ERROR("incorrect password. try again");
    }

    const token = generateToken({ userId: user._id, role: user.role });
    const refreshToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "30s" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 15,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 15,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    res
      .status(HTTP_Status.OK)
      .json({ message: "login successful", user, token });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    });
    res.cookie("refreshToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    });

    res.status(HTTP_Status.OK).json({ message: "logout successful" });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res.status(404).json({ message: "Refresh token is requried!" });
    }

    jwt.verify(refreshToken, process.env.JWT_SECRET, async (err, decoded) => {
      if (err)
        return res
          .status(HTTP_Status.FORBIDDEN)
          .json({ message: "Invalid or expired refresh token" });

      const user = await User.findById(decoded.userId);
      if (!user)
        return res
          .status(HTTP_Status.NOT_FOUND)
          .json({ message: "User not found" });

      const newToken = generateToken({ userId: user._id, role: user.role });
      const newRefreshToken = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "30s" }
      );

      res.cookie("token", newToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 15,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      });

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 15,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      });

      res.status(HTTP_Status.OK).json({ message: "Tokens refreshed" });
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  preRegister,
  validateEmail,
  register,
  login,
  logout,
  refreshToken,
};
