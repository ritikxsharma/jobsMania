const { nanoid } = require('nanoid');

let jobs = require('../server')

const throwError = require('../helpers/throwError')

const getAllJobs = (req, res) => {
    res.status(200).send(jobs)
}

const createJob = (req, res) => {
    const {
        company, position
    } = req.body

    if(!company || !position){
        return res.status(400).json({ message: 'please provide comopany and position!'})
    }
    const id = nanoid()
    const job = { id, company, position }
    jobs.push(job)
    console.log(jobs);
    
    res.status(201).json({ message: 'job created', data: job })
}

const findJobById = (req, res) => {
    const { id } = req.params
    const job = jobs.find((job) => job.id === id)
    if(!job){
        return res.status(404).json({ message: `no job found with associated id ${id}`})
    }

    res.status(200).json({ job })
}

const editJob = (req, res) => {
    const {
        company, position
    } = req.body

    if(!company || !position){
        return res.status(400).json({ message: 'please provide comopany and position!'})
    }

    const { id } = req.params
    
    const job = jobs.find((job) => job.id === id)
    
    if(!job){
        return res.status(404).json({ message: `no job found with associated id ${id}`})
    }

    job.company = company
    job.position = position

    res.status(200).json({ message: 'job modified', job })
}

const deleteJob = (req, res, next) => {
    const { id } = req.params
    const job = jobs.find((job) => job.id === id)
    if(!job){
        //return res.status(404).json({ message: `no job found with associated id ${id}`})
       return next(throwError('no job found', 404))
    }

    const newJobs = jobs.filter((job) => job.id !== id)
    jobs = newJobs
    res.status(200).json({ message: 'job deleted', job })
}

module.exports = {
    getAllJobs,
    createJob,
    findJobById,
    editJob,
    deleteJob
}