const express = require('express')
const router = express.Router()
const {
    getAllJobs,
    createJob,
    findJobById,
    editJob,
    deleteJob
} = require('../controllers/jobsController')
const { validateJobInput, validateIdParam } = require('../middlewares/validator')

router.route('/').get(getAllJobs)
router.route('/:id').get(validateIdParam, findJobById).patch(validateJobInput, editJob).delete(deleteJob)
router.route('/create').post(validateJobInput, createJob)

module.exports = router