const Job = require('../database/models/JobModel')
const User = require('../database/models/UserModel')
const HTTP_STATUS = require('../helpers/statusCodes')

const getCurrentUser = async(req, res, next) => {
    try {       
        let user = await User.findById(req.user.id)
        user = user.toJSON()
        
        res.status(HTTP_STATUS.OK).json({ user })
    } catch (error) {
        next(error)
    }
}

const updateUser = async(req, res, next) => {
    try {
        const obj = { ...req.body }
        delete obj.password
        const updatedUser = await User.findByIdAndUpdate(req.user.id, obj)
        res.status(HTTP_STATUS.OK).json({ message: 'update successfull' })
    } catch (error) {
        next(error)
    }
}

const getApplicationStatus = async(req, res) => {
    const users = await User.countDocuments()
    const jobs = await Job.countDocuments()
    res.status(HTTP_STATUS.OK).json({ users, jobs })
}


module.exports = {
    getCurrentUser,
    updateUser,
    getApplicationStatus
}