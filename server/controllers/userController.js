const { AWS_S3 } = require('../aws/config')
const uploadImage = require('../aws/uploadImage')
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
    const newUser = { ...req.body }
    try {
        if(req.file){
            const uploadedImage = await uploadImage(req.file) 
            
            const user = await User.findById(req.user.id)
            if(user.avatarPublicId){
                await AWS_S3.deleteObject({
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: user.avatarPublicId
                }).promise()
            } 
            newUser.avatar = uploadedImage.Location
            newUser.avatarPublicId = uploadedImage.key
        }
        await User.findByIdAndUpdate(req.user.id, newUser, { new: true })
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