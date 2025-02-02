const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    location: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    avatar: String,
    avatarPublicId: String
  },
  { timestamps: true }
);

schema.methods.toJSON = function() {

  let user = this.toObject()  
  delete user.password

  return user
}

module.exports = mongoose.model('User', schema)