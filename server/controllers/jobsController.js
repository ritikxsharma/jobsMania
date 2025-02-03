const mongoose = require("mongoose");
const Job = require("../database/models/JobModel");
const HTTP_STATUS = require("../helpers/statusCodes");
const day = require("dayjs");

//Get all jobs
const getAllJobs = async (req, res, next) => {
  try {
    const { search } = req.query;
    const query = {
      createdBy: req.user.id,
    };
    if (search) {
      query.$or = [
        { position: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { jobStatus: { $regex: search, $options: "i" } },
        { jobType: { $regex: search, $options: "i" } },
        { jobLocation: { $regex: search, $options: "i" } },
      ];
    }

    //pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const jobs = await Job.find(query).skip(skip).limit(limit);
    const totalJobs = await Job.countDocuments(query);
    const totalPages = Math.ceil(totalJobs / limit);

    res.status(HTTP_STATUS.OK).json({ totalJobs, totalPages, currentPage: page, jobs });
  } catch (error) {
    next(error);
  }
};

//Create a new job
const createJob = async (req, res, next) => {
  try {
    req.body.createdBy = req.user.id;

    const job = await new Job(req.body).save();

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
    next(error);
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

const getStats = async (req, res, next) => {
  try {
    let stats = await Job.aggregate([
      { $match: { createdBy: new mongoose.Types.ObjectId(req.user.id) } },
      { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
    ]);

    stats = stats.reduce((acc, curr) => {
      const { _id: title, count } = curr;
      acc[title] = count;
      return acc;
    }, {});

    const userStats = {
      pending: stats.pending || 0,
      interview: stats.interview || 0,
      declined: stats.declined || 0,
    };

    let monthlyApplications = await Job.aggregate([
      { $match: { createdBy: new mongoose.Types.ObjectId(req.user.id) } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
      { $limit: 6 },
    ]);

    monthlyApplications = monthlyApplications
      .map((item) => {
        const {
          _id: { year, month },
          count,
        } = item;
        const date = day()
          .month(month - 1)
          .year(year)
          .format("MMM YY");

        return { date, count };
      })
      .reverse();

    res
      .status(HTTP_STATUS.OK)
      .json({ message: "success", stats: userStats, monthlyApplications });
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
  getStats,
};
