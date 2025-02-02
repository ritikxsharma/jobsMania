const Job = require("../database/models/JobModel");
const HTTP_STATUS = require("../helpers/statusCodes");

//Get all jobs
const getAllJobs = async (req, res, next) => {
  try {       

    const jobs = await Job.find({ createdBy: req.user.id });
    res.status(HTTP_STATUS.OK).json( {jobs});
  } catch (error) {
    next(error);
  }
};

//Create a new job
const createJob = async (req, res, next) => {
  try {
    
    req.body.createdBy = req.user.id
    
    const job = await new Job(req.body).save()

    res.status(HTTP_STATUS.CREATED).json({ message: "job created", data: job });
  } catch (error) {    
    next(error);
  }
};

//Find job with id
const findJobById = async (req, res, next) => {
  try {    
    const { id } = req.params;
    const job = await Job.findById(id);

    res.status(HTTP_STATUS.OK).json({ job });
  } catch (error) {
    next(error)
  }
};

//Edit an exisiting job using id
const editJob = async (req, res, next) => {
  try {
    
    const { id } = req.params;

    const job = await Job.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(HTTP_STATUS.OK).json({ message: "job modified", job });
  } catch (error) {
    next(error);
  }
};

//Delete a job with id
const deleteJob = async (req, res, next) => {
  try {
    const { id } = req.params;

    const job = await Job.findByIdAndDelete(id);

    res.status(HTTP_STATUS.OK).json({ message: "job deleted", job });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllJobs,
  createJob,
  findJobById,
  editJob,
  deleteJob,
};
