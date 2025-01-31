const HTTP_Status = require("../helpers/statusCodes");
const { BAD_REQUEST_ERROR, UNAUTHORIZED_ERROR } = require("../helpers/customErrors");
const User = require("../database/models/UserModel");
const sendEmail = require("../aws/emailService");
const { generateToken, validateToken } = require("../helpers/tokenManager");
const { hashPassword, validatePassword } = require("../helpers/passwordManager");

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

    const token = generateToken({ email })

    await sendEmail(email, token);

    res.status(HTTP_Status.OK).json({ message: "email sent", token });
  } catch (error) {    
    error.message = 'Unable to send verification link. Please try again later or try using another mail.'    
    next(error);
  }
};

const validateEmail = async(req, res, next) => {
  try {    
    const decodedToken = validateToken(req.body.token);
    
    const user = await User.findOne({ email: decodedToken.email })
    if(user){
      throw new BAD_REQUEST_ERROR('User/email already exists')
    }
    
    res
    .status(HTTP_Status.OK)
    .json({ message: "Verification successful", email: decodedToken.email});
  } catch (error) {
    if(error.name === "TokenExpiredError"){
      error.message = "Link Expired."
    }
    next(error)
  }
}

const register = async (req, res, next) => {
  try {        
    const hashedPassword = await hashPassword(req.body.password)
    req.body.password = hashedPassword
    
    const newUser = await new User(req.body).save();

    res
      .status(HTTP_Status.CREATED)
      .json({ message: "User created", user: newUser});
  } catch (error) {        
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if(!user){
      throw new UNAUTHORIZED_ERROR('user/email is not registered')
    }

    if(! await validatePassword(req.body.password, user.password)){
      throw new UNAUTHORIZED_ERROR('incorrect password. try again')
    }

    const token = generateToken({ userId: user._id, role: user.role})

    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + (1000*60*60*24)),
      secure: process.env.NODE_ENV === 'production'
    })
    res.status(HTTP_Status.OK).json({ message: "login successful", user, token })

  } catch (error) {
    next(error);
  }
};

const logout = async(req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(Date.now())
  })

  res.status(HTTP_Status.OK).json({ message: 'logout successful' })
}

module.exports = {
  preRegister,
  validateEmail,
  register,
  login,
  logout
};
