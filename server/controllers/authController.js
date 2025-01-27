const HTTP_Status = require("../helpers/statusCodes");
const { BAD_REQUEST_ERROR } = require("../helpers/customErrors");
const User = require("../database/models/UserModel");
const jwt = require("jsonwebtoken");
const sendEmail = require("../aws/emailService");

const preRegister = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      throw new BAD_REQUEST_ERROR(
        "email/user already exists",
        HTTP_Status.BAD_REQUEST
      );
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    await sendEmail(email, token);

    res.status(HTTP_Status.OK).json({ message: "email sent" });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { token } = req.body;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await new User(req.body);
    res
      .status(HTTP_Status.CREATED)
      .json({ message: "User created", user, decodedToken });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    res.send("Login");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  preRegister,
  register,
  login,
};
