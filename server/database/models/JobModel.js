const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    company: String,
    position: String,
    jobStatus: {
      type: String,
      enum: ["pending", "interview", "declined"],
      default: "pending",
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "internship"],
      default: "full-time",
    },
    jobLocation: String,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

schema.methods.toJSON = function(){
  let object = this.toObject()
  delete object.password
  return object
}

module.exports = mongoose.model("Job", schema);
