const express = require('express')
const router = express.Router()
const {
    getAllJobs,
    createJob,
    findJobById,
    editJob,
    deleteJob
} = require('../controllers/jobsController')

router.route('/').get(getAllJobs)
router.route('/:id').get(findJobById).patch(editJob).delete(deleteJob)
router.route('/create').post(createJob)

module.exports = router