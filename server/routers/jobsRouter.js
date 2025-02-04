const express = require('express')
const router = express.Router()
const {
    getAllJobs,
    createJob,
    findJobById,
    editJob,
    deleteJob,
    getStats,
} = require('../controllers/jobsController')
const { validateJobInput, validateIdParam } = require('../middlewares/validator')
const { isTestUser } = require('../middlewares/authentication')

router.route('/').get(getAllJobs)

router.route('/stats').get(getStats)
router.route('/:id').get(validateIdParam, findJobById).patch(isTestUser, validateJobInput, editJob).delete(isTestUser, deleteJob)
router.route('/create').post(isTestUser, validateJobInput, createJob)

module.exports = router