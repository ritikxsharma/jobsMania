module.exports = (err, req, res, next) => {    
    const errCode = err.statusCode || 500    
    res.status(errCode).json({ message: err.message })
}