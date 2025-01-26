const { nanoid } = require("nanoid");
let jobs = require("../server");
const throwError = require("../helpers/customErrors");
const Job = require("../database/models/JobModel");
const HTTP_STATUS = require("../helpers/statusCodes");
const {
  NOT_FOUND_ERROR
} = require('../helpers/customErrors')

//Get all jobs
const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find();
    res.status(HTTP_STATUS.OK).send(jobs);
  } catch (error) {
    next(error);
  }
};

//Create a new job
const createJob = async (req, res, next) => {
  try {
    const { company, position } = req.body;

    const job = await new Job({
      company,
      position,
    });

    job.save();

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
    if (!job) {
      throw new NOT_FOUND_ERROR('no job found with matching id')
    }

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

    if (!job) {
      throw new NOT_FOUND_ERROR('no job found with matching id')
    }

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

    if (!job) {
      throw new NOT_FOUND_ERROR('no job found with matching id')
    }

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
