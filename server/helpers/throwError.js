module.exports = (message, statusCode = 500, next) => {    
    const error = new Error(message)
    error.statusCode = statusCode
    return error
}