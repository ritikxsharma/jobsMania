const { AWS_S3 } = require("../aws/config");
const generateSignedUrl = require("../aws/generateSignedUrl");
const Job = require("../database/models/JobModel");
const User = require("../database/models/UserModel");
const HTTP_STATUS = require("../helpers/statusCodes");
const { BAD_REQUEST_ERROR } = require("../helpers/customErrors");

const getCurrentUser = async (req, res, next) => {
  try {
    let user = await User.findById(req.user.id);
    user = user.toJSON();

    res.status(HTTP_STATUS.OK).json({ user });
  } catch (error) {
    next(error);
  }
};

const generateUploadURL = async (req, res, next) => {
  try {
    const { fileType } = req.query;

    if (!fileType) {
      throw new BAD_REQUEST_ERROR("File type is required");
    }

    const { uploadURL, Key } = await generateSignedUrl(fileType);

    res.status(200).json({ uploadURL, Key });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const newUser = { ...req.body };
  try {
    const user = await User.findById(req.user.id);    
    if (newUser.avatarPublicId) {
      newUser.avatar = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${newUser.avatarPublicId}`;
    }

    if (newUser.avatarPublicId && user.avatarPublicId) {
      await AWS_S3.deleteObject({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: user.avatarPublicId,
      }).promise();
    }
    await User.findByIdAndUpdate(req.user.id, newUser, { new: true });
    res.status(HTTP_STATUS.OK).json({ message: "update successfull" });
  } catch (error) {   
    next(error);
  }
};

const getApplicationStatus = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(HTTP_STATUS.OK).json({ users, jobs });
};

module.exports = {
  getCurrentUser,
  updateUser,
  getApplicationStatus,
  generateUploadURL,
};
